// src/hooks/useFetchProjects.ts

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { Project, Action } from '@/types';
import { getToday } from '@/lib/timeUtils';

// 가정: 현재 인증된 사용자 정보와 인증 상태 로딩 여부를 인수로 받음
export const useFetchProjectsToday = (user: any, projects: any | null, authLoading: boolean, refreshTrigger:any) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loadingActions, setLoadingActions] = useState(false);
  const [error, setError] = useState<Error | null>(null); // 오류 처리도 추가
  const today = getToday();

  useEffect(() => {
    if (authLoading || !projects || projects.length === 0) {
      setActions([]);
      setLoadingActions(false);
      return;
    }

    setLoadingActions(true);
    setError(null);

    const fetchActions = async () => {
      if (!user) {
        setActions([]);
        setLoadingActions(false);
        return;
      }

      try {
        const q = query(
          collection(db, "Actions"),
          where("projectId", "in", projects),
          where("isCompleted", "==", false)
        );

        const querySnapshot = await getDocs(q);
        
        const actionList: Action[] = querySnapshot.docs.map(doc => {
            // Firestore 데이터는 Omit<Action, 'id'> 형태라고 가정하고 매핑
            const data = doc.data() as Omit<Action, 'id'>;
            
            return {
                id: doc.id, // 문서 ID를 id 필드에 명시적으로 추가
                ...data,    // 나머지 필드 스프레드
            } as Action; // 최종적으로 Action 타입임을 단언
        });


        setActions(actionList);
        console.log('set action list result ' + actionList)

      } catch (e) {
        console.error("액션 조회 중 오류 발생:", e);
        setError(e as Error); // 오류 상태 저장
        setActions([]);
      } finally {
        setLoadingActions(false);
      }
    };

    fetchActions();
  }, [projects, authLoading, refreshTrigger]);

  // 필요한 상태와 값을 반환
  return { actions, loadingActions, error, refreshTrigger}; 
};