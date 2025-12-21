import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { Action } from '@/types';
import { getTodayFB } from '@/lib/timeUtils';

export const useFetchPendings = (user: any | null, authLoading: boolean, refreshTrigger: any) => {
  const [pendings, setPendings] = useState<Action[]>([]);
  const [loadingPendings, setLoadingPendings] = useState(false);
  const [pendingError, setPendingError] = useState<Error | null>(null); 
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
        console.error("An error occured loading the Pending Action ::", e);
        setPendingError(e as Error); 
        setPendings([]);
      } finally {
        setLoadingPendings(false);
      }
    };

    fetchActions();
  }, [user, authLoading, refreshTrigger]);

  return { pendings, loadingPendings, pendingError }; 
};