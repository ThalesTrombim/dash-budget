import { GiBrickWall, GiPorcelainVase, GiSofa, GiWindow } from "react-icons/gi";
import { MdOutlineSensorDoor, MdBlender, MdOutlineFormatPaint, MdTableBar } from "react-icons/md";
import { FaFaucet, FaSink } from "react-icons/fa";
import { TbPlant } from "react-icons/tb";
import { LuLampCeiling } from "react-icons/lu";
import { FiTv } from "react-icons/fi"
import { PiDesktopTowerLight } from "react-icons/pi"

import { useState } from "react";
import { icons } from "../../../data/iconsListData";
import DynamicCategoryIcon from "../../DynamicIcon/DynamicCategoryIcon";

type IProps = {
  sendSelectedIcon: (icon: string) => void;
}
function IconsList({ sendSelectedIcon }: IProps) {
  const [selectedIcon, setSelectedIcon] = useState<any>('');

  function handleSelectIcon(icon: string) {
    setSelectedIcon(icon);
    sendSelectedIcon(icon);
  }

  return (
    <div className="flex flex-wrap gap-1">
      {
        icons.map((icon: any) => (
          // <div key={iconItem.name} onClick={() => handleSelectIcon(iconItem.name)} className={`flex bg-[#CAC4CE] p-2 hover:bg-[#B5AFB8] cursor-pointer`}>
          //   {iconItem.component}
          // </div>
          <div key={icon} onClick={() => handleSelectIcon(icon)}  className={`flex bg-[#CAC4CE] p-2 hover:bg-[#B5AFB8] cursor-pointer rounded ${selectedIcon === icon ? 'bg-[#B5AFB8]' : ''}`}>
            <DynamicCategoryIcon icon={icon} color="#fff" />
          </div>
        ))
      }
    </div>
  )
}

export default IconsList;