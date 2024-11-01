import { useCategory } from "../../hooks/useCategories";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
    <div className="flex flex-col w-full max-h-[300px] h-full p-4 bg-white rounded-lg shadow-md">
      <div>
        <div className='text-start text-lg font-bold'>
          <h4>Porcentagem por categorias</h4>
        </div>
      </div>
      
      <ResponsiveContainer width={"100%"}>
        <PieChart
          margin={{
            top: 16
          }}
          title='Porcentagem por categorias'
        >
          <Pie
            dataKey="totalAmount"
            data={expensesByCategory}
            labelLine={false}
            label={renderCustomizedLabel}
            cy={"30%"}
            innerRadius={20}
            >
            {expensesByCategory.map((_: any, index: any) => (
              <Cell key={`cell-${index}`} fill={expensesByCategory[index].fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponent;