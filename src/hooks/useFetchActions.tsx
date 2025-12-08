// src/hooks/useFetchProjects.ts

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { createDailyBounds } from '@/lib/timeUtils';
import { Project, Action } from '@/types';
import ActionList from '@/components/ActionList';
import { getTodayFB } from '@/lib/timeUtils'
export const useFetchActions = (user: any | null, authLoading: boolean) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loadingActions, setLoadingActions] = useState(false);
  const [actionError, setActionError] = useState<Error | null>(null); // 오류 처리도 추가


  useEffect(() => {
    if (authLoading) {
      return;
    }

    setLoadingActions(true);
    setActionError(null);

    const today = getTodayFB();
    const fetchActions = async () => {
      if (!user) {
        setActions([]);
        setLoadingActions(false);
        return;
      }

      try {
        const q = query(
          collection(db, "Actions"),
          where("userId", "==", user.email)
          ,where('date', "==", today)
        );

        const querySnapshot = await getDocs(q);
        
        const actionsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Action, 'id'>
        }));
        

        setActions(actionsList);
        console.log(actions)

      } catch (e) {
        console.error("액션 조회 중 오류 발생:", e);
        setActionError(e as Error); // 오류 상태 저장
        setActions([]);
      } finally {
        setLoadingActions(false);
      }
    };

    fetchActions();
  }, [user, authLoading]);

  // 필요한 상태와 값을 반환
  return { actions, loadingActions, actionError }; 
};