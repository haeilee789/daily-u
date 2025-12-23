import ProjectList from '@/components/ProjectList';
import { useContext } from 'react';
import { Project, Action } from '@/types'


import NoProjectAlert from "@/components/NoProjectAlert";


interface ProjectListProps {
  projects: Project[];
}

  
export const ModalProjectSettings = ( { toggleModal, list } ) => {

    return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={toggleModal} 
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} 
          >

            <div className="p-6">
              {list.length === 0 ? (
                <p>Coming Soon!!!</p>
              ) : (                  
                <ProjectList projects={list}/>

              )
            }


              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}