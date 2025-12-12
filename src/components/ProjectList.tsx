import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { Project, Action } from '@/types'


interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | string | null>(null);

  const openActionModal = (projectId: number | string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
    // 상세 모달 로직...
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center">
      {Array.isArray(projects) && projects.map(project => (
        <ProjectCard 
          key={project.id}
          project={project}
          openActionModal={openActionModal}
        />
      ))}
      
      {isModalOpen && (
        <div className="modal-placeholder">
          선택된 프로젝트 ID: {selectedProjectId}
        </div>
      )}
    </div>
  );
};

export default ProjectList;