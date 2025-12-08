'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '@/firebase/firebase.js'; 
import { useAuth }from '@/hooks/useAuth'; // <--- 🔑 커스텀 훅 불러오기
import { useAuthContext } from "@/context/AuthContext";
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { useFetchActions } from "@/hooks/useFetchActions";
import { getToday } from '@/lib/timeUtils'

import CreateProjectModal from "@/components/CreateProjectModal";
import NoProjectAlert from "@/components/NoProjectAlert";
import ProjectList from "@/components/ProjectList";
import SignOutButton from "@/components/signOut";
import ActionList from "@/components/ActionList";


function Page() {
  const today = getToday();
  const { user, loading } = useAuthContext();  const router = useRouter();
  const { projects, loadingProjects, error } = useFetchProjects(user, loading);
  const { actions, loadingActions, actionError } = useFetchActions(user, loading);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const openActionModal = () => setIsActionModalOpen(true);
  const closeActionModal = () => setIsActionModalOpen(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

  
  
  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
    // }, [ user ] );
  }, [user, router]); 
  
  return (
    <div className="container mx-auto ">
      <div className="flex justify-center items-center">
        <h1 className="text-gray-900 
          text-5xl sm:text-7xl lg:text-8xl      /* 반응형 크기: 5xl -> 7xl -> 8xl */
          font-semibold                        /* 굵기: 800 (아주 굵게) */
          leading-none                          /* 행간: 좁게 (가장 좁게) */
          tracking-tight mb-4">                 
          DAILY-U
        </h1> 
      </div>
           
      <div className="flex justify-between items-center space-x-6">
      {/* 덩어리 1 */}
        <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white">
          <p className="text-xl font-semibold mb-3">YESTERDAY</p>
          <p className="text-sm text-gray-500 mb-4">Cherry space</p>
      </div>
          
      <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white">
        <p className="text-xl font-semibold mb-3">TODAY {today}</p>
            
            
        {loading || loadingProjects ? (
        <p className="text-lg text-gray-500">데이터를 불러오는 중입니다...</p>
          ) : (
          <div className="flex flex-wrap gap-6">
          {projects.length === 0 ? (
            <NoProjectAlert/>
          ) : (                  
            <ProjectList projects={projects}/>
          )
        }
        </div>
        )}

        {loading || loadingProjects ? (
        <p className="text-lg text-gray-500">데이터를 불러오는 중입니다...</p>
          ) : (
          <div className="flex flex-wrap gap-6">
          {projects.length === 0 ? (
            <NoProjectAlert/>
          ) : (                  
            <ActionList actions={actions}/>
          )
        }
        </div>
        )} 
      
        <button 
          onClick={openProjectModal} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"          >
          프로젝트 추가
        </button>
      </div>

      <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white">
        <p className="text-xl font-semibold mb-3">Setting Space</p>
        <SignOutButton/>
      </div>

          {isActionModalOpen && <EditAction onClose={closeActionModal} />}
          {/* {isProjectModalOpen && <CreateProject onClose={closeProjectModal} />} */}
          {isProjectModalOpen && <CreateProjectModal isOpen={isProjectModalOpen} onClose={closeProjectModal} />}

      </div>
    </div>
  );
}

export default Page;
