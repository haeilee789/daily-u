'use client'

import Image from 'next/image'
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';


export default function Home() {
  const router = useRouter();
  const { signIn, loading, user } = useAuth(); 

  const DemoSignIn = async () => {
    try {
      await signIn('daily.u.demo@gmail.com', 'dailyudemo1!');
      router.push("/admin");

    } catch (error) {
      console.error('로그인 실패:', error);
    }
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-around p-5 bg-[#FCF8F8] gap-2">

      <div className="flex flex-col items-center justify-around">
        <h1 className="text-[#F5AFAF] 
        text-5xl sm:text-7xl lg:text-8xl      /* 반응형 크기: 5xl -> 7xl -> 8xl */
        font-extrabold                        /* 굵기: 800 (아주 굵게) */
        leading-none                          /* 행간: 좁게 (가장 좁게) */
        tracking-tight mb-2  drop-shadow-md">           
              
      DAILY-U        </h1>

     
      </div>

      <div>
        <h1 className="
          text-l sm:text-xl lg:text-2xl      /* 반응형 크기: 5xl -> 7xl -> 8xl */
          leading-none                          /* 행간: 좁게 (가장 좁게) */
          text-[#7D7373] text-center mb-6 drop-shadow-md
      
        ">A Personalized Daily Challenge Tracker</h1>
        <p className="text-center "> built with with SPF principles <br />for successful habit building, <br /> Made by Haeilee</p>
        {/* <p className="text-center"> </p> */}

      </div>
      <div className="justify-center items-center">

        <p className="text-center"
        ><b><strong>S</strong>implicity</b> : An action a day to repeat every day</p>
        <p className="text-center"
        ><b><strong>P</strong>riority</b> : Maximum 3 Projects at once </p>
        <p className="text-center"
        ><b><strong>F</strong>inal </b>: Today's Action: Today Only</p>
        <p></p>
      </div>
        
      <div className="z-10 w-full max-w-5xl items-center justify-around font-mono text-sm lg:flex">

        <Button onClick={DemoSignIn} size="lg" className={"bg-[#F9DFDF] hover:bg-[#F5AFAF] transition-colors duration-150"}>
          <p className="text-[#4B4444]">DEMO</p>
        </Button>
{/* 
        <Button asChild variant="outline" size="lg">
          <Link href="/signin">Sign In</Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/signup">Sign Up</Link>
        </Button> */}

        
      </div>

      

      
    </main>
  )
}
