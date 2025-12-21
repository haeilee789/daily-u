import { useAuthContext } from "@/context/AuthContext";

const MyComponent = () => {
  const { user } = useAuthContext();
  
  if (user) {
    // console.log("사용자 ID:", user.uid); 
    // console.log("사용자 이름:", user.displayName);
  }
  
};