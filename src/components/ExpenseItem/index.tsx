import { convertNumberToBRL } from "../../utils/monetary";
import style from "./style.module.scss";

interface IProps {
  name: string
  amount: number
  date: string //timestamp
}


function ExpenseItem({ name, amount, date }: IProps) {
  return (
    <div className={style.expenseItemContainer}>
      <div className={style.expenseItemNameDate}>
        <span>{name}</span>
        <span className={style.expenseItemDateText}>{date}</span>
      </div>
      <span>{convertNumberToBRL(amount)}</span>
    </div>
  )
}

export default ExpenseItem