import React, {useContext} from 'react';
import { useEffect, useState } from "react";
import { AuthContext } from '@/context/AuthContext';
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '@/firebase/firebase.js'; 

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


interface ModalProps {
  isOpen: boolean;
  onClose: () => void; 
  onCreated: () => void;  
}

const CreateProject = ({ isOpen, onClose, onCreated }:ModalProps) => {
  const authContext = useContext(AuthContext);

  const { user, loading } = useContext(AuthContext);
  const [projectName, setProjectName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // 오늘 날짜로 초기화x
  const [type, setType] = useState("text");

  if (loading) {
    return <p>로딩 중...</p>;
  }
  
  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }
  const userEmail = user.email

  const handleTypeChange = (value : string) => {
    setType(value);
  }

  const handleSave = async(e : any) => {
    e.preventDefault()
      if (!projectName) { 
      alert("Enter your project name.");
      return; 
    } 

      try {
      
      const collectionRef = collection(db, "Projects");

      const newProject = {
        user: userEmail, 
        name: projectName,
        goal: goal,
        startDate: startDate,
        isCompleted:false,
        type:type
      }

      const newProjectRef = await addDoc(collectionRef, newProject);


      const actionData = {
        type: newProject.type,
        content: "",
        name: newProject.name,
        goal: newProject.goal,
        projectId: newProjectRef.id,
        isCompleted: false, 
        reason: "",
        date: startDate
      }


      const connectionRefAction = collection(db, "Actions");
      const newActionRef = await addDoc(connectionRefAction, {
        type: actionData.type,
        content: actionData.content,
        name: actionData.name,
        goal: actionData.goal,
        projectId: actionData.projectId,
        isCompleted: false, 
        reason: "",
        date: newProject.startDate,
        userId: userEmail
      });

    
      alert("Project is successfully created!");
      onCreated();
      onClose(); 

      
    } catch (error) {
      
      console.error("문서 작성 중 오류 발생:", error);
      alert("Failed to create the project."+ error);
    } 

    

  }
  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative z-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
        
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Project Name
            </label>
            <input 
                type="text" 
                id="projectName" 
                className="shadow border rounded w-full py-2 px-3" 
                placeholder="Input Project Name" 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="goal" className="block text-gray-700 text-sm font-bold mb-2">
              Project Goal
            </label>
            <input 
                type="text" 
                id="goal" 
                className="shadow border rounded w-full py-2 px-3" 
                placeholder="Input Project Goal" 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
              Start Date :  {new Date().toISOString().split('T')[0]}
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
              Action Type
            </label>
            <RadioGroup defaultValue="text"
            value={type}
            onValueChange={handleTypeChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text"> Text Input</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="checkbox" id="checkbox" />
                <Label htmlFor="checkbox">Check box</Label>
              </div>
              
            </RadioGroup>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
            >
              Save
            </button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
}

export default CreateProject;