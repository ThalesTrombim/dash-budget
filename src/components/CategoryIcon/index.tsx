import { MdOutlineKitchen } from "react-icons/md";
import { PiPottedPlantBold } from "react-icons/pi";
import { BiSolidCabinet } from "react-icons/bi";
import { MdOutlineFormatPaint } from "react-icons/md";
import { LuLampCeiling } from "react-icons/lu";
import { GiBrickWall } from "react-icons/gi";

const iconsList: any = [
  <MdOutlineKitchen />,
  <PiPottedPlantBold />,
  // BiSolidCabinet,
  // MdOutlineFormatPaint,
  // LuLampCeiling,
  // GiBrickWall
]


function CategoryIcon({icon}: {icon: string}) {
  console.log('Component')
  const componentSelected = (name: string) => {
    const ComponentIcon =  iconsList[name];

    return (
      <ComponentIcon />
    )
  }


  return (
    <div>
      {iconsList[icon]}
    </div>
  )

  // return (
  //   <>
  //     {
  //       icon === 'PiPottedPlantBold' &&
  //       <PiPottedPlantBold size={24} color="#fff"/>
  //     }
  //     {
  //       icon === 'BiSolidCabinet' &&
  //       <BiSolidCabinet size={24} color="#fff"/>
  //     }
  //     {
  //       icon === 'MdOutlineKitchen' &&
  //       <MdOutlineKitchen size={24} color="#fff"/>
  //     }
  //     {
  //       icon === 'MdOutlineFormatPaint' &&
  //       <MdOutlineFormatPaint size={24} color="#fff"/>
  //     }
  //     {
  //       icon === 'LuLampCeiling' &&
  //       <LuLampCeiling size={24} color="#fff"/>
  //     }
  //     {
  //       icon === 'GiBrickWall' &&
  //       <GiBrickWall size={24} color="#fff"/>
  //     }
  //   </>
  // )
}

export default CategoryIcon;