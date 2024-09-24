import { MdOutlineKitchen } from "react-icons/md";
import { PiPottedPlantBold } from "react-icons/pi";
import { BiSolidCabinet } from "react-icons/bi";
import { MdOutlineFormatPaint } from "react-icons/md";
import { LuLampCeiling } from "react-icons/lu";
import { GiBrickWall } from "react-icons/gi";

import style from "./style.module.scss";
import ExpenseItem from "../ExpenseItem";

interface IProps {
  name: string
  color: string
  icon?: string
}

function DynamicComponent({icon}: {icon: string}) {
  return (
    <>
      {
        icon === 'PiPottedPlantBold' &&
        <PiPottedPlantBold size={24} color="#fff"/>
      }
      {
        icon === 'BiSolidCabinet' &&
        <BiSolidCabinet size={24} color="#fff"/>
      }
      {
        icon === 'MdOutlineKitchen' &&
        <MdOutlineKitchen size={24} color="#fff"/>
      }
      {
        icon === 'MdOutlineFormatPaint' &&
        <MdOutlineFormatPaint size={24} color="#fff"/>
      }
      {
        icon === 'LuLampCeiling' &&
        <LuLampCeiling size={24} color="#fff"/>
      }
      {
        icon === 'GiBrickWall' &&
        <GiBrickWall size={24} color="#fff"/>
      }
    </>
  )
}

function ExpenseCategory({ name, color, icon = 'PiPottedPlantBold'}: IProps) {
  
  return (
    <div className={style.expenseCategoryContainer}>
      <div className={style.expenseCategoryTitle}>
        <div className={style.expenseCategoryIcon} style={{backgroundColor: color}}>
          <DynamicComponent icon={icon} />
        </div>

        <h3>{name}</h3>
      </div>
    </div>
  )
}

export default ExpenseCategory