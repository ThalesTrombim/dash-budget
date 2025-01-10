import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function useFirebaseMethods() {
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

  return {
    getCollectionData,
    updateFirebaseDoc,
    deleteFirebaseDoc,
  }
}

export { useFirebaseMethods };