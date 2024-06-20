import style from "./style.module.scss";

function AddExpense() {
  return (
    <div className={style.addExpenseContainer}>
      <h3>Adicionar compra</h3>

      <div className={style.addExpenseInputs}>
        <div className={style.addExpenseInput}>
          <label htmlFor="item_name">Nome</label>
          <input type="text" name="item_name" id="item_name" />
        </div>

        <div className={style.addExpenseInput}>
          <label htmlFor="item_amount">Valor</label>
          <input type="number" name="item_amount" id="item_amount" />
        </div>

        <div className={style.addExpenseCheckbox}>
          <input type="checkbox" name="item_date_today" id="item_date_today" />
          <label htmlFor="item_date_today">Data de Hoje?</label>
        </div>

        <div className={style.addExpenseInput}>
          <label htmlFor="item_date">Data</label>
          <input type="date" name="item_date" id="item_date" />
        </div>
      </div>
    </div>
  )
}

export default AddExpense