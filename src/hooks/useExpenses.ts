import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any>([]);
  const [lastExpenses, setLastExpenses] = useState<any>([]);

  async function getExpenses() {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    const data:any = [];
  
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });
  
    return data;
  }

  function parseDate(dateString: string) {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function getLastFiveExpenses(expenses: any) {
    const lastFiveExpenses = expenses
      .sort((a: any, b: any) => parseDate(b.date).getTime() - parseDate(a.date).getTime()) // Ordena do mais recente para o mais antigo
      .slice(0, 5);

    setLastExpenses(lastFiveExpenses);
  }
  
  useEffect(() => {
    async function getExpensesFirestore() {
      const data = await getExpenses();

      getLastFiveExpenses(data);
      setExpenses(data);
    }
    getExpensesFirestore();
  }, [])

  return {
    expenses,
    lastExpenses
  }
}