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
import ButtonAbout from "@/components/ui/About/ButtonAbout";
import NewProjectButton from "@/components/NewProjectButton";

function Page() {
  const today = getToday();
  const { user, loading } = useAuthContext();  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { projects, loadingProjects, projectError } = useFetchProjects(user, loading, refreshTrigger);
  const { actions, loadingActions, actionError } = useFetchActions(user, loading, refreshTrigger);
  const { pendings, loadingPendings, pendingError } = useFetchPendings(user, loading, refreshTrigger);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);
  
  const handleProjectRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1); 
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
           
      <div className="flex justify-between items-start space-x-3 gap-2">
        <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-md text-center bg-white">
          <p className="text-sm md:text-base lg:text-lg font-semibold mb-3 text-[#434242]">Pending Tasks</p>
          <PendingList
            loading = { loading }
            loadingPendings = {loadingPendings}
            pendings = { pendings }
          ></PendingList>
      </div>
          
      <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-md text-center bg-white gap-2">
        <p className="text-sm md:text-base lg:text-lg font-semibold mb-3 text-[#434242]">TODAY : {today}</p>
          <ActionList loading={loading} loadingActions={loadingActions} actions={actions}></ActionList>
      <div>
        <NewProjectButton loading={loading} loadingProjects={loadingProjects} projects={projects} openProjectModal={openProjectModal}></NewProjectButton>
      </div>

      </div>  

      <div className="w-1/3 p-4 border border-gray-200 rounded-xl shadow-md text-center bg-white flex flex-col items-center gap-4">
        <p className="text-sm md:text-base lg:text-lg font-semibold mb-3 text-[#434242] tracking-tight">Settings</p>
        <ButtonAbout/>
        <SignOutButton/>
        <ButtonProjectSettings projects={projects}/>
      </div>

          {isProjectModalOpen && (
            <CreateProjectModal 
                isOpen={isProjectModalOpen} 
                onClose={closeProjectModal} 
                onCreated={handleProjectCreationSuccess}
            />
        )}
      </div>
    </div>
  );
}

export default Page;
