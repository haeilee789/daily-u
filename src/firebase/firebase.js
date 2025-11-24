import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- Auth 모듈 추가

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID", // 사용자님의 프로젝트 ID
  // ... 기타 설정
  
};

// 1. 앱 인스턴스 변수
let firebaseApp; 

// 2. 조건부 초기화 실행
if (!getApps().length) {
  // 초기화된 앱이 없으면 새로 생성
  firebaseApp = initializeApp(firebaseConfig);
} else {
  // 이미 초기화된 앱이 있으면 가져옴
  firebaseApp = getApp();
}

// 3. 서비스 인스턴스 내보내기 (여기서 오류가 발생해서는 안 됨)
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);