// import firebase_app from "../config";
// import { signInWithEmailAndPassword, getAuth } from "firebase/auth";


// const auth = getAuth(firebase_app);

// export default async function signIn(email: string, password: string) {
//   let result = null,
//     error = null; 

//   try {
//     result = await signInWithEmailAndPassword(auth, email, password); 
//   } catch (e) {
//     error = e; 
//   }

//   return { result, error }; 
// }

import { useAuthContext } from "@/context/AuthContext";

const MyComponent = () => {
  const { user } = useAuthContext();
  
  if (user) {
    console.log("사용자 ID:", user.uid); 
    console.log("사용자 이름:", user.displayName);
  }
  
  // ...  
};