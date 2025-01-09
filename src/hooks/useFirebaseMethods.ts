import { collection, getDocs } from "firebase/firestore";
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

  return {
    getCollectionData
  }
}

export { useFirebaseMethods };