import style from "./style.module.scss";

interface IProps {
  name: string
  amount: number
  date: string //timestamp
}

function ExpenseItem({ name, amount, date }: IProps) {
  return (
    <div className={style.expenseItemContainer}>
      <span>{name}</span>
      <span>{amount}</span>
      <span>{date}</span>
    </div>
  )
}

export default ExpenseItem