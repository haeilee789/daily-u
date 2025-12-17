import firebase_app from "../config";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function CreateAction(
  formData: any,
) {
  let result = null;
  let error = null;

  try {
    
    const collectionRef = collection(db, "Actions");

    const newDocref = await addDoc(collectionRef, {
      type: formData.type,
      content: formData.content,
      name: formData.name,
      goal: formData.goal,
      projectId: formData.projectId,
      isCompleted: false, //cb일때 체크박스 상태용으로도 표시
      reason: "",
      date: formData.startDate,
      userId: formData.userId

    });
    console.log("await 완료, alert 직전")

    result = { 
      message: `액션 ID "${newDocref.id}"가 성공적으로 생성되었습니다.`,
      docId: newDocref.id,
      updatedFields: newDocref
    };

  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}