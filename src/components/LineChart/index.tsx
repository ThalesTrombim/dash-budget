import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCategory } from '../../hooks/useCategories';
import { useExpenses } from '../../hooks/useExpenses';

function LineChartComponent() {

  const { groupAndSumByMonthAndYear } = useCategory();
  const { expenses } = useExpenses();

  const chartData = Object.values(groupAndSumByMonthAndYear(expenses));

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{ color: 'blue'}}>
         <h3>Testing</h3>
      </div>
    <div style={{ flexGrow: 1}} > 

    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart
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
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip labelFormatter={(label) => `Data: ${label}`} labelStyle={{color: "#000"}}  formatter={(value) => [value, "Valor gasto"]} />

        <Legend iconSize={0} payload={[{value: 'Gastos', type: 'diamond', color: "#82ca9d" }]} />
        <Line type="monotone" dataKey="totalAmount" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </div>
    </div>
  );
}

export default LineChartComponent;