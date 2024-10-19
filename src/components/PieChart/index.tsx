import Chart from "react-google-charts";

import style from './style.module.scss';
import { useCategory } from "../../hooks/useCategories";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function PieChartComponent() {
  const { colorsOnly, categoriesByAmount, expensesByCategory} = useCategory();


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

  const data02 = [
    { name: "Group A", value: 2400, color: "#0000ff"},
    { name: "Group B", value: 4567, color: "#0000ff"},
    { name: "Group C", value: 1398, color: "#0000ff"},
    { name: "Group D", value: 9800, color: "#0000ff"},
    { name: "Group E", value: 3908, color: "#0000ff"},
    { name: "Group F", value: 4800, color: "#0000ff"}
  ];


  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        { percent * 100 >= 5 && `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    // <div className={style.pieChartContainer}>
    //   <Chart
    //     className={style.chart}
    //     chartType="PieChart"
    //     width={"100%"}
    //     height={"100%"}
    //     data={categoriesByAmount}
    //     options={options}
    //   />
    // </div>
    <ResponsiveContainer >
      <PieChart>
        <Pie
          dataKey="totalAmount"
          data={expensesByCategory}
          labelLine={false}
          label={renderCustomizedLabel}
          // cx={500}
          // cy={200}
          innerRadius={40}
          outerRadius={130}
          // fill="#82ca9d"
        >
          {expensesByCategory.map((_: any, index: any) => (
            <Cell key={`cell-${index}`} fill={expensesByCategory[index].fill} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent;