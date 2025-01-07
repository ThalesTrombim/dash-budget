import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { createContext, ReactNode, useEffect, useState } from "react";
import { formatDateToPTBR } from "../utils/date";
import { useFeedbackModal } from "../hooks/useFeedbackModal";

export const ExpensesContext = createContext<any>({} as any);

export const ExpensesContextProvider = ({ children }: { children: ReactNode }) => {

  const [expenses, setExpenses] = useState<any>([]);
  const [lastExpenses, setLastExpenses] = useState<any>([]);
  const { setActive, setIsErrorFeedback } = useFeedbackModal();

  async function getExpenses() {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    const data:any = [];
  
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });
  
    return data;
  }

  function parseDate(dateString: string) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  function getLastFiveExpenses(expenses: any) {
    const lastFiveExpenses = expenses
      .sort((a: any, b: any) => parseDate(b.date).getTime() - parseDate(a.date).getTime()) // Ordena do mais recente para o mais antigo
      .slice(0, 5);

    setLastExpenses(lastFiveExpenses);
  }

  async function addNewExpense(newExpense: any, callback: () => void) {
    try {
      const { name, amount, date, category, paymentMethod } = newExpense;
      const expenseCollection = collection(db, 'expenses');
    
      const formatedAmount = parseFloat(amount.replace('R$', '').trim().replace(/\./g, "").replace(",", "."));
      const formattedDate = formatDateToPTBR(date);

      const newItem = {
        name,
        amount: formatedAmount,
        category,
        date: formattedDate,
        paymentMethod,
        id: '',
      }

      const docRef = await addDoc(expenseCollection, newItem)

      await updateDoc(doc(db, "expenses", docRef.id), {
        id: docRef.id,
      });

      newItem.id = docRef.id;

      setExpenses((prevExpenses: any) => [...prevExpenses, newItem])
      setActive(true);

      callback();

    } catch (error) {
      setActive(true);
      setIsErrorFeedback(true);
      
      callback();
      console.error("Error adding document: ", error);

    }
  }

  async function deleteExpense(id: string) {
    try {
      const docRef = doc(db, 'expenses', id);
  
      // Deleta o documento
      const expensesUpdated = expenses.filter((expense: any) => expense.id !== id);
      
      setExpenses(expensesUpdated);

      await deleteDoc(docRef);
  
      console.log(`Documento com ID ${id} foi deletado com sucesso.`);
    } catch (error) {
      console.error("Erro ao deletar o documento:", error);
    }
  }

  useEffect(() => {
    async function getExpensesFirestore() {
      const data = await getExpenses();

      getLastFiveExpenses(data);
      setExpenses(data);
    }
    getExpensesFirestore();
  }, [])

  return (
    <ExpensesContext.Provider value={{
      expenses,
      lastExpenses,
      addNewExpense,
      deleteExpense
    }}>
      { children }
    </ExpensesContext.Provider>
  )

  // return {
  //   expenses,
  //   lastExpenses,
  //   addNewExpense,
  //   deleteExpense
  // }
}