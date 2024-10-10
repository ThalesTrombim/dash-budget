import Chart from "react-google-charts";

import style from './style.module.scss';
import { useCategory } from "../../hooks/useCategories";

function PieChart() {
  const { colorsOnly, categoriesByAmount } = useCategory();

  const options = {
    title: "Gastos por categoria",
    pieHole: 0.3,
    is3D: false,
    colors: colorsOnly,
    titleTextStyle: {
      fontSize: 20
    },
    legend: {
      position: 'bottom'
    },
    scrollArrows: false,
    maxLines: 5,
    chartArea:{
      left: 16,
      right: 16,
    }
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