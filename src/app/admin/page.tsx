'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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
import PendingList from "@/components/PendingList";
import { useFetchPendings } from "@/hooks/useFetchPendings";
import ButtonProjectSettings from "@/components/ButtonProjectSettings";
import ButtonAbout from "@/components/ButtonAbout";

function Page() {
  const today = getToday();
  const { user, loading } = useAuthContext();  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { projects, loadingProjects, projectError } = useFetchProjects(user, loading, refreshTrigger);
  const { actions, loadingActions, actionError } = useFetchActions(user, loading, refreshTrigger);
  const { pendings, loadingPendings, pendingError } = useFetchPendings(user, loading, refreshTrigger);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const openActionModal = () => setIsActionModalOpen(true);
  const closeActionModal = () => setIsActionModalOpen(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);
  
  const handleProjectRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1); // 
    console.log("프로젝트 목록 새로고침 신호 발생!");
  }, []);

  const handleProjectCreationSuccess = () => {
      closeProjectModal();        
      handleProjectRefresh();    
  };

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user, router]); 
  
  return (
    <div className="container mx-auto bg-[#FCF8F8] items-start">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-[#F5AFAF] 
          text-5xl sm:text-7xl lg:text-8xl      /* 반응형 크기: 5xl -> 7xl -> 8xl */
          font-semibold                        /* 굵기: 800 (아주 굵게) */
          leading-none                          /* 행간: 좁게 (가장 좁게) */
          tracking-tight mb-4 ">                 
          DAILY-U
        </h1> 
      </div>
           
      <div className="flex justify-between items-start space-x-6 gap-2">
        <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white">
          <p className="text-xl font-semibold text-[#434242]">Pending Tasks</p>
          <p className="font-light text-gray-500"> Add logs for missed actions</p>
          {loading || loadingProjects || loadingPendings? (

          <p className="text-lg text-gray-500">Loading...</p>
            ) : (
            <div className="flex flex-wrap gap-6">
            {pendings.length === 0 ? (
              <NoProjectAlert/>
            ) : (                  
              <PendingList actions={pendings}/>

            )
          }
          </div>
          )}

      </div>
          
      <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white gap-4">
        <p className="text-xl font-semibold mb-3 text-[#434242]">TODAY : {today}</p>
            
            
        {/* {loading || loadingProjects ? ( */}
        {loading || loadingProjects || loadingActions? (

        <p className="text-lg text-gray-500">Loading...</p>
          ) : (
          <div className="flex items-center justify-center ">
          {actions.length === 0 ? (
            <NoProjectAlert/>
          ) : (                  
            // <ProjectList projects={projects}/>
            <ActionList actions={actions}/>

          )
        }
        </div>
        )}
      
      
      <div>
        {projects.length === 3? (
          <p></p>
        ): (
        <button className="mt-3"
          onClick={openProjectModal} >
          New Project
        </button>        
      )}
      </div>
      {/* <button className="mt-3"
        onClick={openProjectModal} >
        New Project
      </button> */}

      </div>  

      <div className="w-1/3 p-6 border border-gray-200 rounded-xl shadow-md text-center bg-white flex flex-col items-center gap-4">
        <p className="text-xl font-semibold mb-3 text-[#434242] tracking-tight">Settings</p>
        <ButtonAbout/>
        <SignOutButton/>
        <ButtonProjectSettings/>
      </div>

          {/* {isActionModalOpen && <EditAction onClose={closeActionModal} />} */}
          {/* {isProjectModalOpen && <CreateProject onClose={closeProjectModal} />} */}

          {isProjectModalOpen && (
            <CreateProjectModal 
                isOpen={isProjectModalOpen} 
                onClose={closeProjectModal} 
                onCreated={handleProjectCreationSuccess} // ✅ 새로고침 로직이 포함된 함수 전달
            />
        )}
      </div>
    </div>
  );
}

export default Page;
