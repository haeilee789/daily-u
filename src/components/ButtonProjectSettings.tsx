import React from 'react';
import { useAuthContext } from '@/context/AuthContext'; 
import { useRouter } from 'next/navigation';
import { Project, Action } from '@/types'

interface BPSProps {
  projects : Project[]
}
const ButtonProjectSettings = ({projects} : BPSProps) => {
  const { user, signOut } = useAuthContext(); 
  const router = useRouter(); 

  const handleClick = async () => {
    alert(" 🚧 🦺 Under Maintenance!!! 🧱⚙️ ")
    try {
    } catch (error) {
    }
  };

  if (!user) {
    return null;
  }

  return (
    <button 
        onClick={handleClick} >
        Project Settings
    </button>
  );
};

export default ButtonProjectSettings;



