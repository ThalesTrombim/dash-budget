import ExpenseItem from '../ExpenseItem'
import { MdOutlineKitchen } from "react-icons/md";

import style from "./style.module.scss";

function ExpenseCategory() {
  return (
    <div className={style.expenseCategoryContainer}>
      <div className={style.expenseCategoryTitle}>
        <div className={style.expenseCategoryIcon}>
          <MdOutlineKitchen />
        </div>

        <h3>Category name</h3>
      </div>

      <ExpenseItem
        name='Tomada'
        amount={200}
        date='06/06/2024'
      />
    </div>
  )
}

export default ExpenseCategory