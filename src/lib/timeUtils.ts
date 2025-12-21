import { Timestamp } from 'firebase/firestore';
import { DailyBounds } from '../types';

export const createDailyBounds = (): DailyBounds => {
  //  (00:00:00)
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); 

  //  (23:59:59.999)
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return {
    start: Timestamp.fromDate(startOfToday),
    end: Timestamp.fromDate(endOfToday),
  };
};

export const getToday = () : string => {
  const today = new Date();
  const dateText = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\./g, '').replace(/ /g, '. ').trim();
  
  return dateText
}


export const getTodayFB = () : string => {
const today = new Date();
  
  const year = today.getFullYear();
  
  const month = String(today.getMonth() + 1).padStart(2, '0');
  
  const day = String(today.getDate()).padStart(2, '0');
  
  // YYYY-MM-DD 형식으로 문자열을 조합하여 반환합니다
  return `${year}-${month}-${day}`;
}