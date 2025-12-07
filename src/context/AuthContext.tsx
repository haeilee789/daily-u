'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import firebase_app from '@/firebase/config';

export type AuthContextType = {
  user: User | null;
  loading: boolean; // loading 상태도 노출하는 것이 좋습니다.
  signIn: (email: string, password: string) => Promise<UserCredential>; // login 함수 타입 추가
  signOut: () => Promise<void>;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const auth = getAuth(firebase_app);

export const AuthContext = createContext<AuthContextType>({
  user: null, 
  loading: true, 
  signIn: () => { //placeholder
    throw new Error('signIn must be used within an AuthContextProvider');// 경고나 에러를 던져서 개발자가 Provider 없이 Context를 사용하는 실수를 방지합니다.
  },
  signOut: () => { //placeholder, 초기값 없이는 사용하면 안되는 함수라서
    throw new Error('AuthContext functions must be used within an AuthContextProvider');
  }
});

export const useAuthContext = () => useContext(AuthContext); //custom hook

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const signOutUser = async () => {
    try {
      await signOut(auth);
      // signOut이 성공하면 onAuthStateChanged 리스너가 user를 null로 업데이트해줍니다.
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
  
  const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    return result; 
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }

  
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe();
  }, []);

  //  이름충돌을 피하기 위해 signOut만 props : functionName으로 명시
  return (
    <AuthContext.Provider value={{ user,loading, signIn, signOut : signOutUser }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
