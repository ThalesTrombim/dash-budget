import { useState } from "react";
import style from "./style.module.scss";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";

import { CurrencyInput } from 'react-currency-mask';

function AddExpense({ data }: {data: any}) {
  // const [newExpense, setNewExpense] = useState<any>();

  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number | string>(0);
  const [expenseCategory, setExpenseCategory] = useState<number | null>();
  const [expenseDateToday, setExpenseDateToday] = useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<Date | null>();

  const expenseDateFormated = (date?: Date) => {
    if(expenseDateToday) return new Date().getTime();
    if(date) return date.getTime();
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
    setExpenseCategory(null);
    setExpenseDateToday(false);
    setExpenseDate(null);
  }

  function handleSubmit(e:any) {
    e.preventDefault();

    console.log(expenseName);
    console.log(expenseAmount);
    console.log(expenseCategory);
    console.log(expenseDateToday);
    console.log(expenseDate);

    handleAddItem();
  }

  return (
    <div className={style.addExpenseContainer}>
      <div className={style.addExpenseFormArea}>
        <h3>Adicionar compra</h3>

        <form onSubmit={handleSubmit} className={style.addExpenseInputs}>
          <div className={style.addExpenseInput}>
            <label htmlFor="item_name">Nome</label>
            <input 
              type="text" 
              name="item_name" 
              id="item_name" 
              value={expenseName} 
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </div>

          <div className={style.addExpenseInput}>
            <label htmlFor="item_amount">Valor</label>
            <CurrencyInput
              onChangeValue={(_, originalValue) => {
                setExpenseAmount(originalValue);
              }}
              value={expenseAmount}
            />
          </div>

          <div className={style.addExpenseInput}>
            <label htmlFor="item_category">Categoria</label>
            <select onChange={(e) => setExpenseCategory(parseFloat(e.target.value))} name="item_category" id="item_category">
              {data.map((category: any) => (
                <option value={category.categoryId}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className={style.addExpenseInput}>
            <label htmlFor="item_date">Data</label>
            <input 
              type="date"
              name="item_date" 
              id="item_date"
              onChange={(e) => setExpenseDate(new Date(e.target.value))}
            />
          </div>

          <div className={style.addExpenseCheckbox}>
            <input 
              type="checkbox"
              name="item_date_today" 
              id="item_date_today" 
              checked={expenseDateToday} 
              onChange={(e) => setExpenseDateToday(e.target.checked)}
            />
            <label htmlFor="item_date_today">Data de Hoje?</label>
          </div>

          <button type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  )
}

export default AddExpense