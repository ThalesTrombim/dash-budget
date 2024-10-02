import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any>([]);

  async function getExpenses() {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    const data:any = [];
  
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });
  
    return data;
  }
  
  useEffect(() => {
    async function getExpensesFirestore() {
      const data = await getExpenses();
      setExpenses(data);
    }
    getExpensesFirestore();
    
  }, [])

  return {
    expenses
  }
}