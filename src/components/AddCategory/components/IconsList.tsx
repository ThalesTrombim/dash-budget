import { GiBrickWall, GiPorcelainVase, GiSofa, GiWindow } from "react-icons/gi";
import { MdOutlineSensorDoor, MdBlender, MdOutlineFormatPaint, MdTableBar } from "react-icons/md";
import { FaFaucet, FaSink } from "react-icons/fa";
import { TbPlant } from "react-icons/tb";
import { LuLampCeiling } from "react-icons/lu";
import { FiTv } from "react-icons/fi"
import { PiDesktopTowerLight } from "react-icons/pi"

import style from "./IconListStyle.module.scss";

const iconsList = [
  {
    name: GiBrickWall,
    component: <GiBrickWall size={24} color="#fff"/>,
    color: "#fff"
  },
  {
    name: GiPorcelainVase,
    component: <GiPorcelainVase size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: GiSofa,
    component: <GiSofa size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: GiWindow,
    component: <GiWindow size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: MdOutlineSensorDoor,
    component: <MdOutlineSensorDoor size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: MdBlender,
    component: <MdBlender size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: MdOutlineFormatPaint,
    component: <MdOutlineFormatPaint size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: MdTableBar,
    component: <MdTableBar size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: FaFaucet,
    component: <FaFaucet size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: FaSink,
    component: <FaSink size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: TbPlant,
    component: <TbPlant size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: LuLampCeiling,
    component: <LuLampCeiling size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: FiTv,
    component: <FiTv size={24} color="#fff" />,
    color: "#fff"
  },
  {
    name: PiDesktopTowerLight,
    component: <PiDesktopTowerLight size={24} color="#fff" />,
    color: "#fff"
  },
]


function IconsList() {
  return (
    <div className={style.iconListContainer}>
      {
        iconsList.map((IconItem: any) => (
          <div className={style.iconBoxContainer}>
            {IconItem.component}
          </div>
        ))
      }
    </div>
  )
}

export default IconsList;