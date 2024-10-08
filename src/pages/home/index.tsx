import { collection, getDocs } from "firebase/firestore";

import style from './style.module.scss';
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import ExpenseCategoryList from "../../components/ExpenseCategoryList";
import ColumnChart from "../../components/charts/ColumnChart";

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
    <div className={style.dashboardContainer}>
      <div className={style.dashboardContent}>
        <div className={style.area1}><LineChart /></div>
        <div className={style.area2}><PieChart /></div>
        <div className={style.area3}> <ColumnChart /> </div>
        <div className={style.area5}> <ExpenseCategoryList /></div>
      </div>
    </div>
  )
}

export default Home