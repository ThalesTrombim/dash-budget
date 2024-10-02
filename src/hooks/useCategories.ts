import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";

export const useCategory = () => {
  const [categories, setCategories] = useState<any>([]);

  async function getCategories() {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const data:any = [];
  
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({...doc.data()});
    });
  
    return data;
  }

  useEffect(() => {
    async function getCategoriesFirestore() {
      const data = await getCategories();
      
      setCategories(data);
    }

    getCategoriesFirestore();
  }, [])



  return {
    categories,
  }

}