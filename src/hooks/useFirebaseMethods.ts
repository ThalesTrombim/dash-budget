import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useFeedbackModal } from "./useFeedbackModal";

function useFirebaseMethods() {
  const { setActive } = useFeedbackModal();

  async function getCollectionData(dbName: string) {
    const querySnapshot = await getDocs(collection(db, dbName));
    const data:any = [];
  
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });
  
    return data;
  }

  async function updateFirebaseDoc(dbName: string, docRefId: string, updatedDoc: Record<string, any>, callback?: () => void) {
    try {
      await updateDoc(doc(db, dbName, docRefId), updatedDoc);
      if(callback) callback();
    } catch (error) {
      throw error;
    }
  }

  async function deleteFirebaseDoc(dbName: string, docRefId: string) {
    try {
      await deleteDoc(doc(db, dbName, docRefId));
    } catch (error) {
      throw error;
    }
  }
  
  async function AddFirebaseDoc(dbName: string, newDoc: Record<string, any>,) {
    try {
      const res = await addDoc(collection(db, dbName), newDoc);

      setActive(true);
      return res;
    } catch (error) {
      throw error;
    }
  }

  return {
    getCollectionData,
    updateFirebaseDoc,
    deleteFirebaseDoc,
    AddFirebaseDoc
  }
}

export { useFirebaseMethods };