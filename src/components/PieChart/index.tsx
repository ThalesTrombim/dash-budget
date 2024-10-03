import Chart from "react-google-charts";

import style from './style.module.scss';
import { useCategory } from "../../hooks/useCategories";

function PieChart() {
  const { categoriesByAmount } = useCategory();

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];
  
  const options = {
    title: "Expenses by category",
    pieHole: 0.4,
    is3D: false,

    // allowHtml: true,
    // backgroundColor: 'blue'
  };

  return (
    <div className={style.pieChartContainer}>
      <Chart
        className={style.chart}
        chartType="PieChart"
        width={"100%"}
        height={"100%"}
        data={categoriesByAmount}
        options={options}
      />
    </div>
  )
}

export default PieChart;