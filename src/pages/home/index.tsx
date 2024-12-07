import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import ExpenseCategoryList from "../../components/ExpenseCategoryList";
import ColumnChart from "../../components/charts/ColumnChart";
import LineChartComponent from "../../components/LineChart";
import TotalCard from "../../components/TotalCard";
import TotalsArea from "../../components/TotalsArea";
import LastExpensesList from "../../components/LastExpensesList";

function Home() {
const [ expenses, setExpenses] = useState([]);

async function getExpenses() {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  const data:any = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({...doc.data()});
  });

  return data;
}

  useEffect(() => {
    async function getExpensesFirestore() {
      const data = await getExpenses();
      setExpenses(data);
    }
    getExpensesFirestore();
    
  }, [])


  return (
    // <div className={style.dashboardContainer}>
    //   <div className={style.dashboardContent}>
    //     <div className={style.area1}><LineChartComponent /></div>
    //     <div className={style.area2}><PieChart /></div>
    //     <div className={style.area3}> <ColumnChart /> </div>
    //     <div className={style.area5}> <ExpenseCategoryList /></div>
    //   </div>
    // </div>

    <div className="p-6 flex w-full gap-4">
      <div>
        <TotalsArea />
        <div className="mt-8">
          <LineChartComponent />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <PieChart />

        <LastExpensesList />
      </div>
    </div>
  )
}

export default Home