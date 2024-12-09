import { useCategory } from "../../hooks/useCategories";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function PieChartComponent() {
  const { expensesByCategory} = useCategory();

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
    <div className="flex flex-col h-full w-full p-4 bg-white rounded-lg shadow-md">
      <div className='text-start text-lg font-bold'>
        <h4>Porcentagem por categorias</h4>
      </div>

      <div className="h-full">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart
            title='Porcentagem por categorias'
          >
            <Pie
              dataKey="totalAmount"
              data={expensesByCategory}
              labelLine={false}
              label={renderCustomizedLabel}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={80}
              >
              {expensesByCategory.map((_: any, index: any) => (
                <Cell key={`cell-${index}`} fill={expensesByCategory[index].fill} />
              ))}
            </Pie>
            <Tooltip />
            {/* <Legend /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PieChartComponent;