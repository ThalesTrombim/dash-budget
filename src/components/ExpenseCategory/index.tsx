import ExpenseItem from '../ExpenseItem'
import { MdOutlineKitchen } from "react-icons/md";

import style from "./style.module.scss";

function ExpenseCategory() {
  return (
    <div className={style.expenseCategoryContainer}>
      <div className={style.expenseCategoryTitle}>
        <div className={style.expenseCategoryIcon}>
          <MdOutlineKitchen size={24}/>
        </div>

        <h3>Category name</h3>
      </div>


      <div className={style.expenseCategoryItemList}>
        <ExpenseItem
          name='Tomada'
          amount={200}
          date='06/06/2024'
        />
        <ExpenseItem
          name='Tomada'
          amount={200}
          date='06/06/2024'
        />
      </div>
    </div>
  )
}

export default ExpenseCategory