'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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


interface EditProjectModalProps {
  onClose: () => void; // 모달을 닫는 함수 (필수)
  // title?: string;    // 만약 optional한 string 타입의 title을 추가하고 싶다면 이렇게 정의합니다.
}


function EditAction({ onClose }: { onClose: () => void }) {
  // 모달 내의 상태 관리 (예: 입력 필드 값)는 여기에 추가됩니다.
  const [projectName, setProjectName] = useState(''); 
  
  return (
    // 전체 컨테이너: 화면 전체에 고정(fixed), 중앙 정렬
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 오버레이 (배경 흐림 효과) */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose} // 배경 클릭 시 닫기
      ></div>

      {/* 모달 내용 (Content) */}
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative z-10">
        
        <h2 className="text-2xl font-bold mb-4">액션 정보 수정</h2>
        
        {/* 수정 폼 필드 예시 */}
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              액션 이름
            </label>
            <input 
                type="text" 
                id="name" 
                className="shadow border rounded w-full py-2 px-3" 
                placeholder="액션 내용을 입력하세요" 
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              취소
            </button>
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              저장
            </button>
          </div>
          
        </form>
        
      </div>
    </div>
  );  
}
