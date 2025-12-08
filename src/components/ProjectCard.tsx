import { StringToBoolean } from 'class-variance-authority/dist/types';
import React from 'react';
import { Project, Action } from '@/types'


interface ProjectCardProps {
  project: Project; // 개별 프로젝트 객체
  openActionModal: (projectId: number | string) => void; // 모달을 여는 함수 (id를 전달하도록 수정)
}
export const ProjectCard = ({ project, openActionModal }: ProjectCardProps) => {
  const handleDetailClick = () => {
    openActionModal(project.id);
  };

  return(
    <div className="w-auto p-2 flex flex-wrap gap-6 justify-center border rounded-xl shadow-md items-center">

      <h3 className="text-l font-bold mb-3 text-gray-800 items-center">{project.name}</h3>
      <h3 className="text-l font-bold mb-3 text-gray-800 items-center">{project.goal}</h3>


      <button 
        onClick={handleDetailClick} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"          >
        저장
    </button>
    </div>
  );
}