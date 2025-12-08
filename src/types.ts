import { Timestamp } from 'firebase/firestore';

export interface Project {
    id: string;
    name: string;
    userId: string;
    goal: string;
    type: string;
    startDate: string; //Timestamp.now() from fb
    finishDate: string; //Timestamp.now() from fb
    isCompleted: boolean;
    }

export interface Action {
    id: string; 
	  type: string;
    content: string;
    projectId: string;
    isCompleted: boolean; //cb일때 체크박스 상태용으로도 표시
	  reason: string;
	  date: string; //Timestamp.now() from fb
    userId:string;

}
export interface DailyBounds {
  start: Timestamp;
  end: Timestamp;
}