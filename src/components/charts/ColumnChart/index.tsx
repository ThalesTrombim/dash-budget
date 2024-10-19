import Chart from "react-google-charts";

import style from './style.module.scss';
import { useEffect, useState } from "react";
import { useCategory } from "../../../hooks/useCategories";
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function ColumnChart() {
  const { categoriesByAmount, categories, expensesByCategory } = useCategory();

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setChartData(expensesByCategory);

  }, [categoriesByAmount, categories]);

  // return (
  //   <div className={style.columnChartContainer}>
  //     {
  //       !categories ? <p>Loading...</p> :
  //       <Chart 
  //         chartType="ColumnChart"
  //         width="100%"
  //         height="100%"
  //         data={chartData}
  //       />
  //     }
  //   </div>
  // )

  console.log('categories amount', chartData)

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{ color: 'black', fontWeight: 500, fontSize: '20px', marginBottom: '1rem'}}>
         <h3>Total por categoria</h3>
      </div>
      <div style={{ flexGrow: 1}} >
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Bar
              dataKey="uv"
              fill="#B3CDAD"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
              /> */}
            <Bar
              dataKey="totalAmount"
              // fill={({ payload }) => payload.color}
              // activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ColumnChart;