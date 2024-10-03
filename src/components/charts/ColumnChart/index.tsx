import Chart from "react-google-charts";

import style from './style.module.scss';
import { useEffect, useState } from "react";
import { useCategory } from "../../../hooks/useCategories";
function ColumnChart({ expenses }: any) {
  const { categoriesByAmount, categories } = useCategory();

  const [chartData, setChartData] = useState<any[]>([]);

  const totalByCategory = categories.map((categoria: any) => {
    const total = expenses
      .filter((produto: any) => produto.category === categoria.categoryId)
      .reduce((acc: any, produto: any) => acc + produto.amount, 0);
    
    return { categoria: categoria.name, total, color: categoria.color };
  });

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