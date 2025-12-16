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

  // 사용자가 로그인 상태일 때만 버튼을 보여줍니다.
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



