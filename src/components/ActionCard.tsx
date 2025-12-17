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



interface ActionCardProps {
  action: Action; 
  openActionModal: (projectId: number | string) => void; 
}

export const ActionCard = ({ action, openActionModal }: ActionCardProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [ input, setInput ] = useState('');
  const [ isChecked, setIsChecked] = useState(false);
  const today = getToday();


  const [ formData, setFormData ] = useState({
    isCompleted: false,
    id : action.id
  })
  
  const handleDetailClick = () => {
    openActionModal(action.projectId);
  };

  const handleForm = async (e:React.FormEvent) => {
    e.preventDefault() //기본폼 제출방지
    
    formData.isCompleted = true;
    const { result, error } = await UpdateAction(action.id, formData);

    if(error){
      console.error("Failed to save the action:", error);
      alert(`저장 실패: ${error}`);

    } else{
      console.log("액션 업데이트 성공:", result);
      alert("Action content successfully saved!!");
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
    return <div className="p-4 text-green-600"> {action.name} Completed for today! </div>;
  }
  return(
   
    <form onSubmit={handleForm} className='justify-between' >
      <Item variant="outline">
        <ItemContent>
          <ItemHeader>{action.name} </ItemHeader>
          <ItemDescription className="text-left">{action.goal}</ItemDescription>
        </ItemContent>

        <ItemActions>
          {
            action.type == "text" ? (
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
                  className="data-[state=checked]:border-[#F9DFDF] data-[state=checked]:bg-[#F2B2B2] data-[state=checked]:text-white dark:data-[state=checked]:border-[#7D7373] dark:data-[state=checked]:bg-[#7D7373]"
                />
              </div>
            )
          }

        </ItemActions>
          <Button className='bg-[#7D7373]' type="submit">Save</Button>

      </Item>
    </form>
    

    );
  }