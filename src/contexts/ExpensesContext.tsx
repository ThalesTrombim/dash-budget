import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useFeedbackModal } from "../hooks/useFeedbackModal";
import { useFirebaseMethods } from "../hooks/useFirebaseMethods";
import { Expense, ExpenseFirebase, NewExpense } from "../types/expenses";

interface ExpenseContext {
  expenses: ExpenseFirebase[];
  lastExpenses: Expense[];
  updateLastExpenses: (value: Expense[]) => void;
  updateExpense: (expenseId: string, updatedExpense: Expense, callback: () => void) => void;
  addNewExpense: (newExpense: NewExpense, categoryId: string, callback: () => void) => void;
  deleteExpense: (id: any) => Promise<void>;
}

export const ExpensesContext = createContext({} as ExpenseContext);

export const ExpensesContextProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<ExpenseFirebase []>([]);
  const [lastExpenses, setLastExpenses] = useState<Expense []>([]);

  const { setActive, setIsErrorFeedback } = useFeedbackModal();

  const { getCollectionData, updateFirebaseDoc, deleteFirebaseDoc } = useFirebaseMethods();

  function updateLastExpenses(value: Expense []) {
    setLastExpenses(value);
  }

  async function updateLastCategorysExpense(categoryId: string, name: string, date: string) {
    try {
      const updatedDoc = {
        lastExpense: {
          name,date
        }
      };

      await updateFirebaseDoc('categories', categoryId, updatedDoc);
    } catch (error) {
      console.log('error updateLastCategorysExpense', error);
    }
  }

  async function addNewExpense(newExpense: NewExpense, categoryId: string, callback: () => void) {
    try {
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

      handleFeedbackModal();

      callback();
    } catch (error) {
      setActive(true);
      handleFeedbackModal(true);
      
      callback();
      console.error("Error adding document: ", error);
    }
  }

  async function updateExpense(expenseId: string, updatedExpense: Expense, callback: () => void) {
    try {
      const { name, amount, date, category, paymentMethod } = updatedExpense;

      const formattedAmount = parseFloat(amount.replace('R$', '').trim().replace(/\./g, "").replace(",", "."));

      const newItem = {
        name,
        amount: formattedAmount,
        category,
        date,
        paymentMethod,
      }

      await updateFirebaseDoc("expenses", expenseId, newItem);
      setExpenses(expenses)

      const updatedExpenses = expenses.map((expense: any) => expense.id === expenseId ? { ...newItem, id: expenseId } : expense)

      setExpenses(updatedExpenses);
      handleFeedbackModal();

      callback();
    } catch (error) {
      handleFeedbackModal(true);
      
      callback();
      console.log('Error', error);
    }
  }

  function handleFeedbackModal(isError: boolean = false) {
    if(isError) setIsErrorFeedback(true);
    setActive(true);
  }

  async function deleteExpense(id: string) {
    try {
      const expensesUpdated = expenses.filter((expense: any) => expense.id !== id);
      setExpenses(expensesUpdated);

      await deleteFirebaseDoc('expenses', id);
    } catch (error) {
      console.error("Erro ao deletar o documento:", error);
    }
  }

  useEffect(() => {
    async function getExpensesFirestore() {
      const data = await getCollectionData('expenses');

      setExpenses(data);
    }
    if(!expenses.length) getExpensesFirestore();
  }, [])

  return (
    <ExpensesContext.Provider value={{
      expenses,
      lastExpenses,
      addNewExpense,
      deleteExpense,
      updateExpense,
      updateLastExpenses
    }}>
      { children }
    </ExpensesContext.Provider>
  )
}
