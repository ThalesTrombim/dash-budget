import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";

import { CurrencyInput } from 'react-currency-mask';

import { format, isValid, parseISO } from 'date-fns';

function AddExpense({ data }: {data: any}) {
  // const [newExpense, setNewExpense] = useState<any>();

  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number | string>(0);
  const [expenseCategory, setExpenseCategory] = useState<string>('');
  const [expenseDateToday, setExpenseDateToday] = useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<any | null>();

  const expenseDateFormated = (date?: any) => {
    const validDate = isValid(date);

    if(validDate) return format(parseISO(date), "dd-MM-yyyy");
  };

  const today = new Date();

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

  function handleSubmit(e:any) {
    e.preventDefault();

    handleAddItem();
  }

  return (
    <div className="flex w-full p-4">
      <div className="flex bg-white w-full p-4 rounded-lg shadow-md">
        <div className="flex flex-col p-12">
          <h3 className="self-start mb-8">Adicionar compra</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start min-w-[350px]">
              <label htmlFor="item_name" className="text-sm text-[#6B7280]">Nome</label>
              <input 
                type="text" 
                name="item_name" 
                id="item_name" 
                value={expenseName} 
                onChange={(e) => setExpenseName(e.target.value)}
                className="bg-white w-full p-2 rounded-md border border-[#dfe1e8]"
              />
            </div>

            <div className="flex flex-col gap-2 items-start min-w-[350px]">
              <label htmlFor="item_amount" className="text-sm text-[#6B7280]">Valor</label>
              <CurrencyInput
                onChangeValue={(_, originalValue) => {
                  setExpenseAmount(originalValue);
                }}
                value={expenseAmount}
                //@ts-ignore
                className={"bg-white w-full p-2 rounded-md border border-[#dfe1e8] !important"}
              />
            </div>

            <div className="flex flex-col gap-2 items-start min-w-[350px]">
              <label htmlFor="item_category" className="text-sm text-[#6B7280]">Categoria</label>
              <select onChange={(e) => setExpenseCategory(e.target.value)} name="item_category" id="item_category"
                className="bg-white w-full p-2 rounded-md border border-[#dfe1e8]"
              >
                {data.map((category: any) => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 items-start min-w-[350px]">
              <label htmlFor="item_date" className="text-sm text-[#6B7280]">Data</label>
              <input 
                type="date"
                max={today.toString()}
                name="item_date" 
                id="item_date"
                className="bg-white w-full p-2 rounded-md border border-[#dfe1e8]"
                onChange={(e) => setExpenseDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <input 
                type="checkbox"
                name="item_date_today"
                id="item_date_today"
                checked={expenseDateToday}
                className="bg-white"
                onChange={(e) => setExpenseDateToday(e.target.checked)}
              />
              <label htmlFor="item_date_today" className="select-none cursor-pointer text-sm">Data de hoje</label>
            </div>

            <button className="bg-[#144bff] rounded-md p-2 text-white" type="submit">Adicionar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExpense