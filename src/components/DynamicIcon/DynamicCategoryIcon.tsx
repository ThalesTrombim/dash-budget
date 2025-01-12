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
  'Eletrodomésticos': MdOutlineKitchen,
  'Decoração': PiPottedPlantBold,
  'Marcenaria': BiSolidCabinet,
  FaChartArea,
  MdCalendarMonth,
  MdToday,
  MdFormatListBulletedAdd,
  MdAddchart,
  'Pintura': MdOutlineFormatPaint,
  MdSpaceDashboard,
  'Iluminação': LuLampCeiling,
  'Revestimento': GiBrickWall,
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
  'Marmoraria': MdOutlineCountertops
}

function DynamicCategoryIcon({ icon, color = "#6b7280", size = 24, className, ...props }: { icon: string, color?: string, size?: number, className?: string }) {

  const componentSelected = (name: string) => {
    const ComponentIcon =  iconsList[name];

    if(ComponentIcon) return <ComponentIcon className={className} size={size} color={color} />

    return <CiImageOff size={24} color={color} />
  }

  return (
    <>
      {componentSelected(icon)}
    </>
  )
}

export default DynamicCategoryIcon;