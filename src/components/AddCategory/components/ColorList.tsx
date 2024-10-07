import { useState } from 'react';
import style from './colorListStyle.module.scss';

import { FaCheck } from "react-icons/fa";

function ColorList() {
  const [selectedColor, setSelectedColor] = useState<string>('');

  function handleSelectIcon(color: string) {
    setSelectedColor(color);
  }

  const colorList = [
    {
      hex: "#3F88C5",
      colorName: "steel blue"
    },
    {
      hex: "#140F2D",
      colorName: "dark purple"
    },
    {
      hex: "#364652",
      colorName: "charcoal"
    },
    {
      hex: "#C7DBE6",
      colorName: "columbia blue"
    },
    {
      hex: "#5D737E",
      colorName: "payne's gray"
    },
    {
      hex: "#6B6054",
      colorName: "walnut brown"
    },
    {
      hex: "#ED217C",
      colorName: "rose"
    },
    {
      hex: "#1B998B",
      colorName: "persian green"
    },
    {
      hex: "#FFFD82",
      colorName: "Icterine"
    },
    {
      hex: "#632B30",
      colorName: "wine"
    },
    {
      hex: "#AA767C",
      colorName: "old rose"
    },
    {
      hex: "#FEC196",
      colorName: "peach"
    },
    {
      hex: "#ACC12F",
      colorName: "apple green"
    },
    {
      hex: "#805D93",
      colorName: "pomp and power"
    },
  ]

  return (
    <div className={style.colorListContainer}>
      {
        colorList.map((colorItem: any) => (
          <div key={colorItem.hex} style={{backgroundColor: colorItem.hex }} onClick={() => handleSelectIcon(colorItem.hex)} className={`${style.colorBoxContainer}`}>
            {
              selectedColor === colorItem.hex &&
              <FaCheck size={16} color="#fff" />
            }
          </div>
        ))
      }
    </div>
  )
}

export default ColorList;