import Chart from "react-google-charts";

import style from './style.module.scss';

function ColumnChart() {

  const data = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
  ];

  return (
    <div className={style.columnChartContainer}>
      <Chart 
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={data}
      />
    </div>
  )
}

export default ColumnChart;