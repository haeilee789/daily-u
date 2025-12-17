import React from 'react';
import { useAuthContext } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation'; // Next.js 환경이라면

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

  // 사용자가 로그인 상태일 때만 버튼을 보여줍니다.
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
{/* <Button onClick={DemoSignIn} size="lg" className={"bg-[#F9DFDF] hover:bg-[#F5AFAF] transition-colors duration-150"}>
          <p className="text-[#4B4444]">DEMO</p>
        </Button> */}
export default SignOutButton;



