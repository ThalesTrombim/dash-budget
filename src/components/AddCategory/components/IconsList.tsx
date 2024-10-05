import { GiBrickWall, GiPorcelainVase, GiSofa, GiWindow } from "react-icons/gi";
import { MdOutlineSensorDoor, MdBlender, MdOutlineFormatPaint, MdTableBar } from "react-icons/md";
import { FaFaucet, FaSink } from "react-icons/fa";
import { TbPlant } from "react-icons/tb";
import { LuLampCeiling } from "react-icons/lu";
import { FiTv } from "react-icons/fi"
import { PiDesktopTowerLight } from "react-icons/pi"

import style from "./IconListStyle.module.scss";
import { useState } from "react";

const iconsList = [
  {
    name: 'GiBrickWall',
    component: <GiBrickWall size={24} color="#fff"/>,
    color: "#fff",
    selected: false
  },
  {
    name: 'GiPorcelainVase',
    component: <GiPorcelainVase size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'GiSofa',
    component: <GiSofa size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'GiWindow',
    component: <GiWindow size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'MdOutlineSensorDoor',
    component: <MdOutlineSensorDoor size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'MdBlender',
    component: <MdBlender size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'MdOutlineFormatPaint',
    component: <MdOutlineFormatPaint size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'MdTableBar',
    component: <MdTableBar size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'FaFaucet',
    component: <FaFaucet size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'FaSink',
    component: <FaSink size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'TbPlant',
    component: <TbPlant size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'LuLampCeiling',
    component: <LuLampCeiling size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'FiTv',
    component: <FiTv size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
  {
    name: 'PiDesktopTowerLight',
    component: <PiDesktopTowerLight size={24} color="#fff" />,
    color: "#fff",
    selected: false
  },
]


function IconsList() {
  const [selectedIcon, setSelectedIcon] = useState<any>('');

  function handleSelectIcon(icon: string) {
    // console.log('Icon name', icon)

    setSelectedIcon(icon);
  }

  return (
    <div className={style.iconListContainer}>
      {
        iconsList.map((iconItem: any) => (
          <div key={iconItem.name} onClick={() => handleSelectIcon(iconItem.name)} className={`${style.iconBoxContainer}, ${selectedIcon === iconItem.name ? style.iconActive : style.iconBoxContainer}`}>
            {iconItem.component}
          </div>
        ))
      }
    </div>
  )
}

export default IconsList;