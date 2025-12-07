import React, {useContext} from 'react';
import { useEffect, useState } from "react";
import { AuthContext } from '@/context/AuthContext';
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '@/firebase/firebase.js'; // 위에서 생성한 db 인스턴스
import { useAuth }from '@/hooks/useAuth'; // <--- 🔑 커스텀 훅 불러오기

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Project {
    id: string;
    name: string;
    userId: string;
    goal: string;
    startDate: string; //Timestamp.now() from fb
    is_completed: boolean;
    type: string;
  }

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; 
  children: React.ReactNode;
}

const CreateProject = ({ isOpen, onClose }:ModalProps) => {
  const authContext = useContext(AuthContext);

  const { user, loading } = useContext(AuthContext);
  const [projectName, setProjectName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // 오늘 날짜로 초기화x
  const [type, setType] = useState("text");
  const [cbLabel, setCbLabel] = useState("");
  // const [isCheckbox, setCheckbox] = useState(false);

  // const handleSave = async (e: React.FormEvent) => {
  //   console.log("handling the save");
  //   e.preventDefault();

  //   if (!projectName) { 
  //     alert("프로젝트 이름을 입력하세요.");
  //     return; 
  //   }
  // }

  if (loading) {
    return <p>로딩 중...</p>;
  }
  
  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }
  const userEmail = user.email


  const handleTypeChange = (value : string) => {
    setType(value);
    // if (value =='checkbox') setCheckbox(true)
    //   else setCheckbox(false)
  }

  const handleSave = async(e : any) => {
    e.preventDefault()
    console.log("handling the save");
      if (!projectName) { 
      alert("프로젝트 이름을 입력하세요.");
      return; 
    } 

      try {
      console.log("저장 시작");
      
      const projectsCollectionRef = collection(db, "Projects");

      await addDoc(projectsCollectionRef, {
        user: userEmail, 
        name: projectName,
        goal:goal,
        startDate: startDate,
        isCompleted:false,
        type:type

      });
      console.log("await 완료, alert 직전")
      alert("프로젝트가 성공적으로 추가되었습니다!");
      onClose(); 

      
    } catch (error) {
      
      console.error("문서 작성 중 오류 발생:", error);
      alert("데이터베이스 저장에 실패했습니다.");
    } 

  }
  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative z-10">
      <h2 className="text-2xl font-bold mb-4">프로젝트 생성</h2>
        
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              프로젝트 이름
            </label>
            <input 
                type="text" 
                id="name" 
                className="shadow border rounded w-full py-2 px-3" 
                placeholder="프로젝트 이름을 입력하쇼" 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              프로젝트 목표
            </label>
            <input 
                type="text" 
                id="name" 
                className="shadow border rounded w-full py-2 px-3" 
                placeholder="프로젝트 목표를 입력하쇼" 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              프로젝트 시작일 :  {new Date().toISOString().split('T')[0]}
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              태스크 타입
            </label>
            <RadioGroup defaultValue="text"
            value={type}
            onValueChange={handleTypeChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text Input</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="checkbox" id="checkbox" />
                <Label htmlFor="checkbox">Checkbox</Label>
              </div>
              
            </RadioGroup>
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

export default CreateProject;