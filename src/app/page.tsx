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
    <main className="flex min-h-screen w-full flex-col items-center justify-around p-5 bg-[#FCF8F8]">
      <h1 className="text-[#F5AFAF] 
             text-5xl sm:text-7xl lg:text-8xl      /* 반응형 크기: 5xl -> 7xl -> 8xl */
             font-extrabold                        /* 굵기: 800 (아주 굵게) */
             leading-none                          /* 행간: 좁게 (가장 좁게) */
             tracking-tight mb-4">                 
          DAILY-U        </h1>
      <div className="z-10 w-full max-w-5xl items-center justify-around font-mono text-sm lg:flex">

        <Button onClick={DemoSignIn} size="lg" className={"bg-[#F9DFDF] hover:bg-[#F5AFAF] transition-colors duration-150"}>
          <p className="text-[#4B4444]">DEMO</p>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/signin">Sign In</Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/signup">Sign Up</Link>
        </Button>

        
      </div>

      

      
    </main>
  )
}
