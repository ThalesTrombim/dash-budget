import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";

import { format, isValid, parseISO } from 'date-fns';
import { AddExpenseModal } from "../newComponents/AddExpenseModal/AddExpenseModal";

import { GoPlus } from "react-icons/go";
import { useExpenses } from "../../hooks/useExpenses";
import ExpenseListItem from "../newComponents/ExpenseListItem";
import ExpenseListItemMobile from "../newComponents/ExpenseListItemMobile";

function AddExpense() {
  const { expenses, deleteExpense } = useExpenses();

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState<boolean>(false);
  
  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number | string>(0);
  const [expenseCategory, setExpenseCategory] = useState<string>('');
  const [expenseDateToday, setExpenseDateToday] = useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<any | null>();
  

  const expenseDateFormated = (date?: any) => {
    const validDate = isValid(date);

    if(validDate) return format(parseISO(date), "dd-MM-yyyy");
  };

  const newExpense = {
    name: expenseName,
    amount: expenseAmount,
    category: expenseCategory,
    date: expenseDate ? expenseDateFormated(expenseDate) : '',
  }

  async function handleAddItem() {
    const { name, amount, date, category } = newExpense;
    const expenseCollection = collection(db, 'expenses');
  
    await addDoc(expenseCollection, {
      name,
      amount,
      category,
      date
    })

    resetStates();
  }

  function resetStates() {
    setExpenseName('');
    setExpenseAmount(0);
    setExpenseCategory('');
    setExpenseDateToday(false);
    setExpenseDate(null);
  }

  return (
    <>
      {
        isAddExpenseModalOpen && <AddExpenseModal onClose={() => setIsAddExpenseModalOpen(false)} />
      }

      <div className="flex w-full h-full bg-[#f7f7f7]">

        <div className="flex flex-col w-full rounded-md border bg-white p-2 md:p-4 shadow-md">

          {/* HEADER */}
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-bold text-start mb-6">Gastos</h2>
            <div className="flex justify-between w-full">
              <div className="flex w-full justify-end items-end">

                <button className="bg-[#144bff] hover:bg-[#123ee5] text-white py-2 px-4 rounded-md flex gap-2" onClick={() => setIsAddExpenseModalOpen(true)}>
                  <GoPlus className="h-6 w-6 text-white" />
                  <span>Adicionar Gasto</span>
                </button>
              </div>
            </div>
          </div>


          {/* BODY */}
          <div className="mt-8">

            <ul className="flex-col text-start gap-2 hidden md:flex">
              {
                expenses.map((expense: any) => (
                  <ExpenseListItem
                    key={expense.id} 
                    name={expense.name} 
                    date={expense.date} 
                    amount={expense.amount} 
                    category={expense.category} 
                    paymentMethod={expense.paymentMethod}
                    handleDeleteExpense={() => deleteExpense(expense.id)}
                  />
                ))
              }
            </ul>

            <ul className="flex-col text-start gap-2 flex md:hidden">
              {
                expenses.map((expense: any) => (
                  <ExpenseListItemMobile
                    key={expense.id} 
                    name={expense.name} 
                    date={expense.date} 
                    amount={expense.amount}
                    paymentMethod={expense.paymentMethod}
                    handleDeleteExpense={() => deleteExpense(expense.id)}
                  />
                ))
              }
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}

export default AddExpense