import Chart from "react-google-charts";

import style from './style.module.scss';

function ColumnChart({ data, categories }: any) {

  const totalPorCategoria = categories.map((categoria: any) => {
    const total = data
      .filter((produto: any) => produto.category === categoria.categoryId)
      .reduce((acc: any, produto: any) => acc + produto.amount, 0);
    
    return { categoria: categoria.name, total, color: categoria.color };
  });

  const insideData = () => {
    const data: any = [];
    data.push(["Element", "Gasto", { role: "style" }]);
    
    totalPorCategoria.map((category: any) => {
      data.push([category.categoria, category.total, category.color])
    })

    return data;
  }

  return (
    <div className={style.columnChartContainer}>
      <Chart 
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={insideData()}
      />
    </div>
  )
}

export default ColumnChart;