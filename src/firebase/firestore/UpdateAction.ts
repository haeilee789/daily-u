import firebase_app from "../config";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

/**
 * Firestore에서 특정 필드 값으로 문서를 검색(GET)한 후 수정(UPDATE)합니다.
 * @param fieldName - 필터링할 필드 이름 (예: 'status')
 * @param fieldValue - 필터링할 필드의 값 (예: 'pending')
 * @param newData - 수정할 데이터 객체 ({ key: value })
 */
export default async function UpdateAction(
  conditionValue: any,
  newData: any,
) {
  let result = null;
  let error = null;

  try {
    const q = query(
      collection(db, "Actions"), 
      where("id", "==", conditionValue),
    );

    const docRef = doc(db, 'Actions', newData.id);
    
    await updateDoc(docRef, {
      ...newData,
      updatedAt: new Date().toISOString() 
    });

    result = { 
      message: `액션 ID "${newData.id}"가 성공적으로 수정되었습니다.`,
      docId: newData.id,
      updatedFields: newData
    };

  } catch (e) {
    error = e;
  }

  return { result, error };
}