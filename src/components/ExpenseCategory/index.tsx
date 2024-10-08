import { CiImageOff } from "react-icons/ci";
import { BiSolidCabinet } from "react-icons/bi";
import { GiBrickWall, GiPorcelainVase, GiSofa, GiWindow } from "react-icons/gi";
import { MdOutlineSensorDoor, MdBlender, MdOutlineFormatPaint, MdTableBar, MdOutlineKitchen, MdOutlineCountertops } from "react-icons/md";
import { FaFaucet, FaSink } from "react-icons/fa";
import { TbPlant } from "react-icons/tb";
import { LuLampCeiling } from "react-icons/lu";
import { FiTv } from "react-icons/fi"
import { PiDesktopTowerLight, PiPottedPlantBold } from "react-icons/pi"

import style from "./style.module.scss";

interface IProps {
  name: string
  color: string
  icon?: string
}

const iconsList: any = {
  MdOutlineKitchen,
  PiPottedPlantBold,
  BiSolidCabinet,
  MdOutlineFormatPaint,
  LuLampCeiling,
  GiBrickWall,
  GiPorcelainVase,
  GiSofa,
  GiWindow,
  MdOutlineSensorDoor,
  MdBlender,
  MdTableBar,
  FaFaucet,
  FaSink,
  TbPlant,
  FiTv,
  PiDesktopTowerLight,
  MdOutlineCountertops
}

function DynamicComponent({icon}: {icon: string}) {

  const componentSelected = (name: string) => {
    const ComponentIcon =  iconsList[name];

    if(ComponentIcon) return <ComponentIcon size={24} color="#FFF" />

    return <CiImageOff size={24} color="#FFF"/>
  }

  return (
    <>
      {componentSelected(icon)}
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