import React from 'react';
import { useAuthContext } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation'; 

const SignOutButton = () => {
  const { user, signOut } = useAuthContext(); 
  const router = useRouter(); 

  const handleSignOut = async () => {
    try {
      await signOut();
      
      alert('로그아웃되었습니다.');
      router.push('/'); 
      
    } catch (error) {
      alert('로그아웃에 실패했습니다: ' + (error as Error).message ); //isErrorWithMessages suggested
    }
  };

  if (!user) {
    return null;
  }

  return (
    <button 
        onClick={handleSignOut} 
        className="bg-[#F9DFDF] hover:bg-[#F5AFAF] text-[#7D7373] font-bold py-2 px-4 rounded transition duration-150"          >
        Sign Out
    </button>
  );
};

export default SignOutButton;



