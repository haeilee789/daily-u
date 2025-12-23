import React, { useState } from 'react';
import { ModalProjectSettings } from './ModalProjectSettings'
import { Project, Action } from '@/types'

interface ProjectListProps {
  projects: Project[];
}

const ButtonProjectSettings = ( { projects } : ProjectListProps ) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
          onClick={toggleModal}  >
          Project Settings
      </button>

      {isOpen && (
        <ModalProjectSettings toggleModal={toggleModal} list={projects}/>)}
      
    </>
  );
};

export default ButtonProjectSettings;



