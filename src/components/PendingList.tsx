import React, { useState } from 'react';
import { PendingCard } from './PendingCard';
import { Project, Action } from '@/types'
import { ProjectCard } from './ProjectCard';


interface ActionListProps {
  actions: Action[];
}

const PendingList = ({ actions }: ActionListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState<number | string | null>(null);

  const openActionModal = (actionId: number | string) => {
    setSelectedActionId(actionId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {/* <p>Action List</p> */}
      {Array.isArray(actions) && actions.map(action => (
        <PendingCard 
          key={action.id}
          action={action}
          openActionModal={openActionModal}
        />
      ))}
      
      {isModalOpen && (
        <div className="modal-placeholder">
          선택된 액션 ID: {selectedActionId}
        </div>
      )}
    </div>
  );
};

export default PendingList;