// src/hooks/useFetchProjects.ts
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { Project, Action } from '@/types';
import { getToday, getTodayFB } from '@/lib/timeUtils';

// 가정: 현재 인증된 사용자 정보와 인증 상태 로딩 여부를 인수로 받음
export const useFetchPendings = (user: any | null, authLoading: boolean, refreshTrigger: any) => {
  const [pendings, setPendings] = useState<Action[]>([]);
  const [loadingPendings, setLoadingPendings] = useState(false);
  const [pendingError, setPendingError] = useState<Error | null>(null); // 오류 처리도 추가
  const today = getTodayFB();

  useEffect(() => {
    if (authLoading) {
      return;
    }
    setLoadingPendings(true);
    setPendingError(null);

    const fetchActions = async () => {
      if (!user) {
        setPendings([]);
        setLoadingPendings(false);
        return;
      }

      try {
        const q = query(
          collection(db, "Actions"),
          where("isCompleted", "==", false),
          where("userId", "==", user.email),
          where("date", "!=", today),
          orderBy("date")
        );

        const querySnapshot = await getDocs(q);
        
        const actionList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Action, 'id'>
        }));

        setPendings(actionList);

      } catch (e) {
        console.error("펜딩 액션 조회 중 오류 발생:", e);
        setPendingError(e as Error); // 오류 상태 저장
        setPendings([]);
      } finally {
        setLoadingPendings(false);
      }
    };

    fetchActions();
  }, [user, authLoading, refreshTrigger]);

  // 필요한 상태와 값을 반환
  return { pendings, loadingPendings, pendingError }; 
};