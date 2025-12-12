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
import UpdateAction from '@/firebase/firestore/updateAction';
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

  const handleForm = () => {
    UpdateAction(project.id, formData, today)
 
  
}
 const handleChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    
    // 체크박스인 경우 checked 값을 사용하고, 아니면 value를 사용
    const finalValue = name === 'checkbox' ? checked : value;

    if( name === '' ) {
      formData.isCompleted = false
    } else {
      formData.isCompleted = true
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: finalValue, // [name] : 동적 키(Dynamic Key) 사용
    }));
  };

  return(
    // <div className="w-auto p-2 flex flex-wrap gap-6 justify-center border rounded-xl shadow-md items-center">
      //  <h3 className="text-l font-bold mb-3 text-gray-800 items-center">project Name : {project.name}</h3>
      // <h3 className="text-l font-bold mb-3 text-gray-800 items-center">project Goal : {project.goal}</h3> 

        // <button 
        // onClick={handleDetailClick} 
        // className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"          >
        // 저장
    //  </button> 
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
              <Input name="content" placeholder="Content" onChange={handleChange} />
            </div>
          
          ): (
            <div> 
              <Checkbox
                id="checkbox"
                name="isCompleted"
                onCheckedChange={handleChange}
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