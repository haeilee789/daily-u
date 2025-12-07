// // src/hooks/useAuth.js

// import { useState, useEffect } from 'react';
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth } from '@/firebase/firebase'; // 이전에 정의한 auth 인스턴스

// interface AuthState {
//   user: User | null; // 🔑 user는 Firebase User 객체이거나 null이어야 함
//   loading: boolean;
// }

// function useAuth() {
// const [user, setUser] = useState<User | null>(null); 
// const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // onAuthStateChanged는 인증 상태(로그인/로그아웃)가 변경될 때마다 실행됩니다.
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); 
//       setLoading(false);    
//     });

//     // 컴포넌트가 언마운트될 때 리스너 구독을 해제합니다. (메모리 누수 방지)
//     return () => unsubscribe();
//   }, []);

//   return { user, loading };
// }

// export default useAuth;

import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext'; 

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Provider로 감싸지 않은 곳에서 Context를 사용하는 경우 에러를 발생시킴
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  
  return context;
};