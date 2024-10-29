import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useCategory } from '../../hooks/useCategories';
import { useExpenses } from '../../hooks/useExpenses';
import { convertNumberToBRL } from '../../utils/monetary';

function LineChartComponent() {
  const { groupAndSumByMonthAndYear } = useCategory();
  const { expenses } = useExpenses();

  const chartData = Object.values(groupAndSumByMonthAndYear(expenses));

  return (
    <div className='bg-white p-4 rounded-lg'>
      <div className='py-2 text-start text-xl font-bold'>
        <h3>Gastos por mesês</h3>
      </div>
      <div style={{ height: '400px'}} > 
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 40,
              left: 10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip labelFormatter={(label) => `Data: ${label}`} labelStyle={{color: "#000"}}  formatter={(value) => [convertNumberToBRL(value as number), "Valor gasto"]} />

            <Area 
              type="monotone" 
              dataKey="totalAmount" 
              stroke="#6369e0" 
              fill="url(#colorValue)" 
              activeDot={{ r: 8, fill: '#8884d8', stroke: '#f7f7ff', strokeWidth: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartComponent;