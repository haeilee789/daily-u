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
    
    //  try {
    //       const projectsCollectionRef = collection(db, "Projects");
    
    //       await addDoc(projectsCollectionRef, {
    //         user: userEmail, 
    //         name: projectName,
    //         goal:goal,
    //         startDate: startDate,
    //         isCompleted:false,
    //         type:type
    
    //       });
    //       console.log("await 완료, alert 직전")
    //       alert("프로젝트가 성공적으로 추가되었습니다!");
    //       onClose(); 
    
          
    //     } catch (error) {
          
    //       console.error("문서 작성 중 오류 발생:", error);
    //       alert("데이터베이스 저장에 실패했습니다.");
    //     } 


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
      message: `문서 ID "${newDocref.id}"가 성공적으로 생성되었습니다.`,
      docId: newDocref.id,
      updatedFields: newDocref
    };

  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}