import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { createContext, ReactNode, useEffect, useState } from "react";
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
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function getLastFiveExpenses(expenses: any) {
    const lastFiveExpenses = expenses
      .sort((a: any, b: any) => parseDate(b.date).getTime() - parseDate(a.date).getTime()) // Ordena do mais recente para o mais antigo
      .slice(0, 5);

    setLastExpenses(lastFiveExpenses);
  }

  async function updateLastCategorysExpense(categoryId: any, name: any, date: any) {
    try {
      await updateDoc(doc(db, "categories", categoryId), {
        lastExpense: {
          name,date
        }
      });
    } catch (error) {
      console.log('error updateLastCategorysExpense', error);
    }
  }

  async function addNewExpense(newExpense: any, categoryId: any, callback: () => void) {
    try {
      console.log('categoryId', categoryId);

      const { name, amount, date, category, paymentMethod } = newExpense;
      const expenseCollection = collection(db, 'expenses');
    
      const formatedAmount = parseFloat(amount.replace('R$', '').trim().replace(/\./g, "").replace(",", "."));

      const newItem = {
        name,
        amount: formatedAmount,
        category,
        date,
        paymentMethod,
        categoryId,
        id: ''
      }

      const docRef = await addDoc(expenseCollection, newItem)

      await updateDoc(doc(db, "expenses", docRef.id), {
        id: docRef.id,
      });

      newItem.id = docRef.id;

      setExpenses((prevExpenses: any) => [...prevExpenses, newItem])

      await updateLastCategorysExpense(categoryId, name, date);

      setActive(true);

      callback();
    } catch (error) {
      setActive(true);
      setIsErrorFeedback(true);
      
      callback();
      console.error("Error adding document: ", error);

    }
  }

  async function updateExpense(expenseId: string, updatedExpense: any, callback: () => void) {
    console.log('expenseId', expenseId);
    console.log('updatedExpense', updatedExpense);
    try {
      const { name, amount, date, category, paymentMethod } = updatedExpense;

      console.log('amount', amount);
      const formattedAmount = parseFloat(amount.replace('R$', '').trim().replace(/\./g, "").replace(",", "."));

      const newItem = {
        name,
        amount: formattedAmount,
        category,
        date,
        paymentMethod,
      }

      await updateDoc(doc(db, "expenses", expenseId), newItem);
      setExpenses(expenses)

      const updatedExpenses = expenses.map((expense: any) => expense.id === expenseId ? { ...newItem, id: expenseId } : expense)

      setExpenses(updatedExpenses);
      setActive(true);

      callback();
    } catch (error) {
      setActive(true);
      setIsErrorFeedback(true);
      
      callback();
      console.log('Error', error);
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
      deleteExpense,
      updateExpense
    }}>
      { children }
    </ExpensesContext.Provider>
  )
}

