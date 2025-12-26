import React, { useState } from 'react';
import { ActionCard } from './ActionCard';
import { Project, Action } from '@/types'
import NoProjectAlert from "@/components/NoProjectAlert";


interface ActionListProps {
  loading: boolean,
  loadingActions:boolean,
  actions: Action[];
}

const ActionList = ({ loading, loadingActions, actions }: ActionListProps) => {

  return <>
    {loading || loadingActions? (
      <p className="text-lg text-gray-500">Loading...</p>
        ) : (
        <div className="flex items-center justify-center ">
        {actions.length === 0 ? (
          <NoProjectAlert/>
        ) : (                  
        <div id="actionListWrapper">
          {Array.isArray(actions) && actions.map(action => (
            <ActionCard 
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

  // <div id="actionListWrapper">
  //   {Array.isArray(actions) && actions.map(action => (
  //     <ActionCard 
  //       key={action.id}
  //       action={action}
  //     />
  //   ))}
  // </div>

};

export default ActionList;