
// import React, { createContext, useState, useEffect, useMemo, ReactNode, FC } from 'react';
// import { getAuth, onAuthStateChanged, User, Auth, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/firebase/firebase'; // 가정: Firebase 설정 파일 경로
// // import {  } from '@/firebase/auth/signIn'

// export interface UserInt {
//     uid : string;
//     email : string;
//     nickName : string;
// }
// export interface AuthContextType {
//   user: User | null;
//   setUser: (user: User | null) => void; // 사용자 정보를 설정하는 함수
//   isAuthenticated: boolean; // 로그인 상태 여부
//   loading: boolean;

//   signIn: (email: string, password: string) => Promise<void>;
//   // ... 기타 인증 관련 함수
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// const [user, setUser] = useState<UserInt | null>(null);
//   const isAuthenticated = !!user; // user 객체가 null이 아니면 true

//   const contextValue = {
//     user,
//     setUser,
//     isAuthenticated
//   };

//   return (
//     // <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };