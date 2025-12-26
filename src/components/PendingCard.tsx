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
}

export const PendingCard = ({ action }: ActionCardProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [ input, setInput ] = useState('');
  const [ isChecked, setIsChecked] = useState(false);
  const today = getToday();

  const [ formData, setFormData ] = useState({
    isCompleted: false,
    id : action.id,
  })
  

  const handleForm = async (e:React.FormEvent) => {
    e.preventDefault() //기본폼 제출방지
    
    formData.isCompleted = true;
    const { result, error } = await UpdateAction(action.id, formData);

    if(error){
      console.error(`Failed to save the action:: ${error}`);
      alert(`저장 실패: ${error}`);

    } else{
      alert("Pending Action successfully cleared!!");
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
          isCompleted: checked, 
      }));
  };

  if (!isVisible) {
    return null
  }
  return(
   
  <div className="flex w-full max-w-md flex-col gap-6 justify-flex items-center">
    <form onSubmit={handleForm} >
      <Item variant="outline">
        <ItemContent>
          <ItemHeader>{action.name} </ItemHeader>
          <ItemDescription>{action.goal}</ItemDescription>
          <ItemDescription>{action.date}</ItemDescription>

        </ItemContent>

        <ItemActions>
              <div>
                <Input name="reason" placeholder="Reason" onChange={handleTextChange} />
              </div>

        </ItemActions>
          <Button type="submit" size="sm">Save</Button>

      </Item>
    </form>
    
  </div>

    );
  }