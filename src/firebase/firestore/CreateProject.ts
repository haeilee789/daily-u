import firebase_app from "../config";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function CreateProject(
  formData: any,
) {
  let result = null;
  let error = null;

  try {
    console.log("저장 시작");
    

    const projectsCollectionRef = collection(db, "Projects");

    const newDocref = await addDoc(projectsCollectionRef, {
      userEmail: formData.userEmail,
      name: formData.projectName,
      goal: formData.goal,
      startDate: formData.startDate,
      isCompleted: false, 
      type: formData.type,

    });
    console.log("await 완료, alert 직전")

    result = { 
      message: `프로젝트 ID "${newDocref.id}"가 성공적으로 생성되었습니다.`,
      docId: newDocref.id,
      updatedFields: newDocref
    };

  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}