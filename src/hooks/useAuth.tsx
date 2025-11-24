// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase'; // 이전에 정의한 auth 인스턴스

interface AuthState {
  user: User | null; // 🔑 user는 Firebase User 객체이거나 null이어야 함
  loading: boolean;
}

function useAuth() {
const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged는 인증 상태(로그인/로그아웃)가 변경될 때마다 실행됩니다.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // 사용자 객체를 상태에 저장 (로그아웃 시 null)
      setLoading(false);    // 로딩 완료
    });

    // 컴포넌트가 언마운트될 때 리스너 구독을 해제합니다. (메모리 누수 방지)
    return () => unsubscribe();
  }, []);

  // 현재 사용자 정보와 로딩 상태를 반환합니다.
  return { user, loading };
}

export default useAuth;