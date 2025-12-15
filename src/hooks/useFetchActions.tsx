// src/hooks/useFetchProjects.ts

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { Project, Action } from '@/types';
import { getToday, getTodayFB } from '@/lib/timeUtils';

// 가정: 현재 인증된 사용자 정보와 인증 상태 로딩 여부를 인수로 받음
export const useFetchActions = (user: any | null, authLoading: boolean, refreshTrigger: any) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loadingActions, setLoadingActions] = useState(false);
  const [error, setError] = useState<Error | null>(null); // 오류 처리도 추가
  const today = getTodayFB();

  useEffect(() => {
    if (authLoading) {
      return;
    }
    console.log(today)
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
          where("userId", "==", user.email),
          where("isCompleted", "==", false),
          where("date", "==", today),
          where("isCompleted", "==",false)
        );

        const querySnapshot = await getDocs(q);
        
        const actionList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Action, 'id'>
        }));

        setActions(actionList);

      } catch (e) {
        console.error("프로젝트 조회 중 오류 발생:", e);
        setError(e as Error); // 오류 상태 저장
        setActions([]);
      } finally {
        setLoadingActions(false);
      }
    };

    fetchActions();
  }, [user, authLoading, refreshTrigger]);

  // 필요한 상태와 값을 반환
  return { actions, loadingActions, error }; 
};