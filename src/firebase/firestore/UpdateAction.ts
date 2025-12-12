import firebase_app from "../config";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

// Firestore 인스턴스 가져오기
const db = getFirestore(firebase_app);

/**
 * Firestore에서 특정 필드 값으로 문서를 검색(GET)한 후 수정(UPDATE)합니다.
 * @param fieldName - 필터링할 필드 이름 (예: 'status')
 * @param fieldValue - 필터링할 필드의 값 (예: 'pending')
 * @param newData - 수정할 데이터 객체 ({ key: value })
 */
export default async function UpdateAction(
  conditionValue: any,
  conditionDate: any,
  newData: any,
) {
  let result = null;
  let error = null;

  try {
    // 1. 쿼리 생성: collectionName에서 fieldName이 fieldValue와 일치하는 문서를 찾습니다.
    const q = query(
      collection(db, "Actions"), 
      where("projectId", "==", conditionValue),
      where("date", "==", conditionDate) 
    );

    // 2. GET (검색): 쿼리 실행
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {

      throw new Error(`❌ 조건 [ projectId: ${conditionValue}]에 일치하는 문서가 없습니다.`);
    }

    if (querySnapshot.size > 1) {
      // 3-2. 조건 검사: 여러 문서가 일치할 때 (잠재적 문제)
      // 이 예시에서는 여러 문서가 발견되면 안전을 위해 작업을 중단합니다.
      throw new Error(`⚠️ 조건에 일치하는 문서가 ${querySnapshot.size}개 발견되었습니다. (단일 수정 작업 중단)`);
    }

    // 4. POST/UPDATE (수정): 첫 번째(유일한) 문서를 가져와 수정합니다.
    const targetDoc = querySnapshot.docs[0];
    const docRef = doc(db, 'Actions', targetDoc.id);
    
    // updateDoc을 사용하여 데이터를 수정합니다.
    await updateDoc(docRef, {
      ...newData,
      updatedAt: new Date().toISOString() // 수정 시각 기록
    });

    result = { 
      message: `문서 ID "${targetDoc.id}"가 성공적으로 수정되었습니다.`,
      docId: targetDoc.id,
      updatedFields: newData
    };

  } catch (e) {
    error = e;
  }

  return { result, error };
}