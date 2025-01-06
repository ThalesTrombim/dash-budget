import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import LineChartComponent from "../../components/LineChart";
import TotalsArea from "../../components/TotalsArea";
import LastExpensesList from "../../components/LastExpensesList";

function Home() {
const [ expenses, setExpenses ] = useState([]);

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
    <div className="p-6 flex flex-col md:flex-row w-full gap-4 h-full ml-12 md:mt-0">
      <div className="flex flex-col gap-4">
        <TotalsArea />
        <LineChartComponent />
      </div>
      <div className="w-full flex flex-col gap-4">
        <PieChart />
        <LastExpensesList />
      </div>
    </div>
  )
}

export default Home