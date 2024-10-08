import Chart from "react-google-charts";

import style from './style.module.scss';
import { useEffect, useState } from "react";
import { useCategory } from "../../../hooks/useCategories";

function ColumnChart() {
  const { categoriesByAmount, categories } = useCategory();

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setChartData(categoriesByAmount);

  }, [categoriesByAmount, categories]);

  return (
    <div className={style.columnChartContainer}>
      {
        !categories ? <p>Loading...</p> :
        <Chart 
          chartType="ColumnChart"
          width="100%"
          height="100%"
          data={chartData}
        />
      }
    </div>
  )
}

export default ColumnChart;