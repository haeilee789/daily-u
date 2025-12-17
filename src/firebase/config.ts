import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; // 🔑 인증 서비스 인스턴스
import { getFirestore } from "firebase/firestore"; // 🗃️ Firestore DB 인스턴스

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXOPUrXvRKOB8gifiRaJv6-sLkThl-jpo",
  authDomain: "idyllic-ethos-480508-h0.firebaseapp.com",
  projectId: "idyllic-ethos-480508-h0",
  storageBucket: "idyllic-ethos-480508-h0.firebasestorage.app",
  messagingSenderId: "737345754894",
  appId: "1:737345754894:web:ae3ed354bbbd596eb7a95f",
  measurementId: "G-WC4PZ633RS"
};

// 1. Firebase 앱 인스턴스 초기화 (중복 방지)
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 2. 서비스 인스턴스 정의
let db;
let auth;

// 3. 서비스 인스턴스를 클라이언트 환경에서만 가져옵니다 (SSR 오류 방지)
if (typeof window !== "undefined") {
    // 🗃️ Firestore 인스턴스 가져오기
    db = getFirestore(firebase_app);
    
    // 🔑 인증 인스턴스 가져오기
    auth = getAuth(firebase_app); 
    
    // 💡 디버깅을 위해 DB 인스턴스 로그 출력
    console.log("Firestore DB 인스턴스 초기화 완료:", db); 
}

// 초기화된 서비스 인스턴스를 내보냅니다.
export { db, auth };
export default firebase_app;