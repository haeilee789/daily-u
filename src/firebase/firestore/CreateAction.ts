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
      isCompleted: false, 
      reason: "",
      date: formData.startDate,
      userId: formData.userId

    });

    result = { 
      message: `Action ID "${newDocref.id}" was successfully created`,
      docId: newDocref.id,
      updatedFields: newDocref
    };

  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}