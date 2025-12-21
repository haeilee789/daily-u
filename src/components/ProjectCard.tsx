import { StringToBoolean } from 'class-variance-authority/dist/types';
import { useEffect, useState } from "react";
import { Project, Action } from '@/types'
import { getToday } from '@/lib/timeUtils';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import UpdateAction from '@/firebase/firestore/UpdateAction';
import { get } from 'http';



interface ProjectCardProps {
  project: Project; // 개별 프로젝트 객체
  openActionModal: (projectId: number | string) => void; // 모달을 여는 함수 (id를 전달하도록 수정)

  
}

// export default async function updateAction(
//   collection: string,
//   id: string,
//   data: any
// )



export const ProjectCard = ({ project, openActionModal }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [ input, setInput ] = useState('');
  const [ isChecked, setIsChecked] = useState(false);
  const today = getToday();


  const [ formData, setFormData ] = useState({
    isCompleted: false,
    projectId : project.id
  })
  
  const handleDetailClick = () => {
    openActionModal(project.id);
  };

  const handleForm = async (e:React.FormEvent) => {
    e.preventDefault() //기본폼 제출방지
    const { result, error } = await UpdateAction(project.id, formData);

    if(error){
      console.error("액션 업데이트 실패:", error);
      alert(`Failed to save the action : ${error}`);
    } else{
      alert("성공적으로 저장되었습니다!");
      setIsVisible(false);
    }

    
}
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
        ...prevData,
        [name]: value,
    }));
  };

  const handleCheckChange = (checked: boolean) => {
      setFormData(prevData => ({
          ...prevData,
          isCompleted: checked, // checked 값을 isCompleted에 직접 할당
      }));
  };

  if (!isVisible) {
    return <div className="p-4 text-green-600">등록/수정 완료!</div>;
  }
  
  return(
  <div className="flex w-full max-w-md flex-col gap-6 justify-flex items-center">
    <form onSubmit={handleForm} >
      <Item variant="outline">
        <ItemContent>
          <ItemHeader>{project.name} </ItemHeader>
          <ItemDescription>{project.goal}</ItemDescription>
        </ItemContent>

        <ItemActions>
          {
            project.type == "text" ? (
              <div>
                <Input name="content" placeholder="Content" onChange={handleTextChange} />
              </div>
            
            ): (
              <div> 
                <Checkbox
                  id="checkbox"
                  name="isCompleted"
                  onCheckedChange={handleCheckChange}
                  checked={formData.isCompleted}
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
              </div>
            )
          }

        </ItemActions>
          <Button type="submit">Save</Button>

      </Item>
    </form>
    
  </div>

    );
  }