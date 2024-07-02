import ExpenseItem from '../ExpenseItem'
import { MdOutlineKitchen } from "react-icons/md";

import style from "./style.module.scss";

interface IProps {
  name: string
  color: string
  icon: string
}

function ExpenseCategory({ name, color, icon }: IProps) {


  return (
    <div className={style.expenseCategoryContainer}>
      <div className={style.expenseCategoryTitle}>
        <div className={style.expenseCategoryIcon} style={{backgroundColor: color}}>
          <MdOutlineKitchen size={24}/>
        </div>

        <h3>{name}</h3>
      </div>


      <div className={style.expenseCategoryItemList}>
      </div>
    </div>
  )
}

export default ExpenseCategory