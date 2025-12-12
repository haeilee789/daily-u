import Image from 'next/image'
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-56">
      {/* <h1> hello world!</h1>
       */}

        <h1 className="text-gray-900 
             text-5xl sm:text-7xl lg:text-8xl      /* 반응형 크기: 5xl -> 7xl -> 8xl */
             font-extrabold                        /* 굵기: 800 (아주 굵게) */
             leading-none                          /* 행간: 좁게 (가장 좁게) */
             tracking-tight mb-4">                 
          DAILY-U
          {/* <span class="text-indigo-600">최고의 경험</span> */}
        </h1>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

        <Button asChild variant="destructive" size="lg">
          <Link href="/signin">Demo</Link>
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
