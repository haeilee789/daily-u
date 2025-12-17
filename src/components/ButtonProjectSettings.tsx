import React from 'react';
import { useAuthContext } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation'; // Next.js 환경이라면

const ButtonProjectSettings = () => {
  const { user, signOut } = useAuthContext(); 
  const router = useRouter(); 

  const handleClick = async () => {
    try {
      
    } catch (error) {
    }
  };

  if (!user) {
    return null;
  }

  return (
    <button 
        onClick={handleClick} >
        Project Settings
    </button>
  );
};

export default ButtonProjectSettings;



