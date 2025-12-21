// src/hooks/useFetchProjects.ts

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { Project, Action } from '@/types';
import { getToday, getTodayFB } from '@/lib/timeUtils';

export const useFetchProjects = (user: any | null, authLoading: boolean, refreshTrigger: any) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectError, setProjectError] = useState<Error | null>(null); // 오류 처리도 추가
  const today = getTodayFB();
  
  useEffect(() => {
    if (authLoading) {
      return;
    }

    setLoadingProjects(true);
    setProjectError(null);

    const fetchProjects = async () => {
      if (!user) {
        setProjects([]);
        setLoadingProjects(false);
        return;
      }

      try {
        const q = query(
          collection(db, "Projects"),
          where("user", "==", user.email),
          where("isCompleted", "==", false),
          where("date", "==", today)
          
        );

        const querySnapshot = await getDocs(q);
        
        const projectsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Project, 'id'>
        }));

        setProjects(projectsList);

      } catch (e) {
        console.error("Failed to load Project data", e);
        setProjectError(e as Error); 
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [user, authLoading, refreshTrigger]);

  return { projects, loadingProjects, projectError }; 
};