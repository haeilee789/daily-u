import React, { useState } from 'react';
import { PendingCard } from './PendingCard';
import { Project, Action } from '@/types'
import { ProjectCard } from './ProjectCard';
import NoProjectAlert from "@/components/NoProjectAlert"


interface ActionListProps {
  loading : Boolean,
  loadingPendings: Boolean,
  pendings: Action[];
}

const PendingList = ({ loading, loadingPendings, pendings }: ActionListProps) => {
 
  return <>
    { loading || loadingPendings? (

    <p className="text-lg text-gray-500">Loading...</p>
      ) : (
      <div className="flex flex-wrap gap-6">
      {pendings.length === 0 ? (
        <NoProjectAlert/>
      ) : (             

      <div className="flex flex-wrap gap-6 justify-center">
        
        {Array.isArray(pendings) && pendings.map(action => (
          <PendingCard 
            key={action.id}
            action={action}
          />
        ))}
      </div>
      )
    }
    </div>
    )}
  </>




    // <div className="flex flex-wrap gap-6 justify-center">
      
    //   {Array.isArray(actions) && actions.map(action => (
    //     <PendingCard 
    //       key={action.id}
    //       action={action}
    //     />
    //   ))}
    // </div>
  
};

export default PendingList;