// src/hooks/useFetchProjects.ts

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.js'; 
import { Project, Action } from '@/types';

// 가정: 현재 인증된 사용자 정보와 인증 상태 로딩 여부를 인수로 받음
export const useFetchProjects = (user: any | null, authLoading: boolean) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [error, setError] = useState<Error | null>(null); // 오류 처리도 추가

  useEffect(() => {
    if (authLoading) {
      return;
    }

    setLoadingProjects(true);
    setError(null);

    const fetchProjects = async () => {
      if (!user) {
        setProjects([]);
        setLoadingProjects(false);
        return;
      }

      try {
        const q = query(
          collection(db, "Projects"),
          where("user", "==", user.email)
        );

        const querySnapshot = await getDocs(q);
        
        const projectsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Project, 'id'>
        }));

        setProjects(projectsList);

      } catch (e) {
        console.error("프로젝트 조회 중 오류 발생:", e);
        setError(e as Error); // 오류 상태 저장
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [user, authLoading]);

  // 필요한 상태와 값을 반환
  return { projects, loadingProjects, error }; 
};