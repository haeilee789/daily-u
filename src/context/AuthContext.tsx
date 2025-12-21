'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import firebase_app from '@/firebase/config';

export type AuthContextType = {
  user: User | null;
  loading: boolean; 
  signIn: (email: string, password: string) => Promise<UserCredential>; 
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
    throw new Error('signIn must be used within an AuthContextProvider');
  },
  signOut: () => { //placeholder
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

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user,loading, signIn, signOut : signOutUser }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
