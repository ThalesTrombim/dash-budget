import PieChart from "../../components/PieChart";
import LineChartComponent from "../../components/LineChart";
import TotalsArea from "../../components/TotalsArea";
import LastExpensesList from "../../components/LastExpensesList";
import ColumnChart from "../../components/charts/ColumnChart";

function Home() {

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 h-full ml-12 md:mt-0">
      <div className="flex flex-col gap-4">
        <TotalsArea />
        <LineChartComponent />
        <ColumnChart />
      </div>
      <div className="w-full flex flex-col gap-4">
        <PieChart />
        <LastExpensesList />
      </div>
    </div>
  )
}

export default Home