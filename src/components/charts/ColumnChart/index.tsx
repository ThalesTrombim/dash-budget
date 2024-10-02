import Chart from "react-google-charts";

import style from './style.module.scss';
import { useEffect, useState } from "react";
function ColumnChart({ expenses, categories }: any) {
  const [chartData, setChartData] = useState<any>();

  console.log('categories', categories);
  console.log('expenses', expenses);

  const totalByCategory = categories.map((categoria: any) => {
    const total = expenses
      .filter((produto: any) => produto.category === categoria.categoryId)
      .reduce((acc: any, produto: any) => acc + produto.amount, 0);
    
    return { categoria: categoria.name, total, color: categoria.color };
  });

  const insideData = async () => {
    const data: any = [];
    data.push(["Element", "Gasto", { role: "style" }]);
    
    totalByCategory.map((category: any) => {
      data.push([category.categoria, category.total, category.color])
    })

    console.log('data', data)

    return data;
  }

  useEffect(() => {
    // async () => {
      const data: any = [];
      data.push(["Element", "Gasto", { role: "style" }]);
      
      totalByCategory.map((category: any) => {
        data.push([category.categoria, category.total, category.color])
      })
  
      setChartData(data);
      console.log('data', data)
  
      // return data;
    // }

  }, [categories])

  return (
    <div className={style.columnChartContainer}>
      <Chart 
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={chartData}
      />
    </div>
  )
}

export default ColumnChart;