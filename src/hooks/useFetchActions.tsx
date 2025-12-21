// src/hooks/useFetchProjects.ts

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { Project, Action } from '@/types';
import { getToday, getTodayFB } from '@/lib/timeUtils';

export const useFetchActions = (user: any | null, authLoading: boolean, refreshTrigger: any) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loadingActions, setLoadingActions] = useState(false);
  const [actionError, setActionError] = useState<Error | null>(null); 
  const today = getTodayFB();

  useEffect(() => {
    if (authLoading) {
      return;
    }
    setLoadingActions(true);
    setActionError(null);

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
        setActionError(e as Error);
        setActions([]);
      } finally {
        setLoadingActions(false);
      }
    };

    fetchActions();
  }, [user, authLoading, refreshTrigger]);

  return { actions, loadingActions, actionError }; 
};