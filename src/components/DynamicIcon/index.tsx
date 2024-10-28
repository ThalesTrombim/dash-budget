import { CiImageOff } from "react-icons/ci";
import { BiSolidCabinet } from "react-icons/bi";
import { GiPayMoney, GiBrickWall, GiPorcelainVase, GiSofa, GiWindow } from "react-icons/gi";
import { MdToday, MdCalendarMonth, MdFormatListBulletedAdd, MdAddchart, MdOutlineSensorDoor, MdBlender, MdOutlineFormatPaint, MdTableBar, MdOutlineKitchen, MdOutlineCountertops, MdSpaceDashboard } from "react-icons/md";
import { FaChartArea, FaFaucet, FaSink } from "react-icons/fa";
import { TbPlant } from "react-icons/tb";
import { LuLampCeiling } from "react-icons/lu";
import { FiTv } from "react-icons/fi"
import { PiDesktopTowerLight, PiPottedPlantBold } from "react-icons/pi"

const iconsList: any = {
  MdOutlineKitchen,
  PiPottedPlantBold,
  BiSolidCabinet,
  FaChartArea,
  MdCalendarMonth,
  MdToday,
  MdFormatListBulletedAdd,
  MdAddchart,
  MdOutlineFormatPaint,
  MdSpaceDashboard,
  LuLampCeiling,
  GiBrickWall,
  GiPorcelainVase,
  GiSofa,
  GiWindow,
  GiPayMoney,
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

function DynamicIcon({ icon, color = "#FFF", size = 24 }: { icon: string, color?: string, size?: number }) {

  const componentSelected = (name: string) => {
    const ComponentIcon =  iconsList[name];

    if(ComponentIcon) return <ComponentIcon size={size} color={color} />

    return <CiImageOff size={24} color="#FFF"/>
  }

  return (
    <>
      {componentSelected(icon)}
    </>
  )
}

export default DynamicIcon;