import { StringToBoolean } from 'class-variance-authority/dist/types';
import React from 'react';
import { Project, Action } from '@/types'



interface ActionCardProps {
  action: Action; // 개별 프로젝트 객체
  openActionModal: (actionId: number | string) => void; // 모달을 여는 함수 (id를 전달하도록 수정)
}
export const ActionCard = ({ action, openActionModal }: ActionCardProps) => {
  const handleDetailClick = () => {
    openActionModal(action.id);
  };

  return(
    <div className="w-auto p-2 flex flex-wrap gap-6 justify-center border rounded-xl shadow-md items-center">

      <h3 className="text-l font-bold mb-3 text-gray-800 items-center">{action.id}</h3>
    
   {/* {action.type === 'text' ? (
    // 'text' 일 때: <input> 렌더링
    <input
      type="text"
      placeholder="텍스트 입력"
      className="w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
    />
  ) : action.type === 'checkbox' ? (
    // 'checkbox' 일 때: <input type="checkbox"> 렌더링
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`check-${action.name}`}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <label htmlFor={`check-${action.name}`} className="ml-2 text-gray-700">
        작업 완료
      </label>
    </div>
  )} */}

      <button 
        onClick={handleDetailClick} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"          >
        저장
    </button>
    </div>
  );
}