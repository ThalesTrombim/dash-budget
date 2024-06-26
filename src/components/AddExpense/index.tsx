import { useState } from "react";
import style from "./style.module.scss";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";

function AddExpense() {
  // const [newExpense, setNewExpense] = useState<any>();
  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseCategory, setExpenseCategory] = useState<string>('TESTES');
  const [expenseDateToday, setExpenseDateToday] = useState<boolean>(false);
  const [expenseDate, setExpenseDate] = useState<Date>();

  

  const newExpense = {
    name: expenseName,
    amount: expenseAmount,
    category: expenseCategory,
    date: "FUNCAO PARA FORMATAR A DATA",
  }

  const expenseDateFormated = (date?: Date) => {
    if(expenseDateToday) return new Date().getTime();
    if(date) return date.getTime();
  };

  async function handleAddItem() {
    const { name, amount, date } = newExpense;
    const expenseCollection = collection(db, 'expenses');
  
    await addDoc(expenseCollection, {
      name,
      amount, 
      date
    })
  }

  function handleSubmit(e:any) {
    e.preventDefault();

    console.log('timestamp date', expenseDateFormated(expenseDate))
    console.log(expenseName);
    console.log(expenseAmount);
    console.log(expenseCategory);
    console.log(expenseDateToday);
    console.log(expenseDate);

    handleAddItem();
  }

  return (
    <div className={style.addExpenseContainer}>
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
          <input 
            type="number" 
            name="item_amount" 
            id="item_amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
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

        <div className={style.addExpenseInput}>
          <label htmlFor="item_date">Data</label>
          <input 
            type="date" 
            name="item_date" 
            id="item_date" 
            // value={expenseDate} 
            onChange={(e) => setExpenseDate(new Date(e.target.value))}
          />
        </div>

        <button type="submit">Adicionar</button>
      </form>
    </div>
  )
}

export default AddExpense