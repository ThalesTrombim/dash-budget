import { collection, getDocs } from "firebase/firestore";
import CategoryIcon from "../../components/CategoryIcon"
import { convertNumberToBRL } from "../../utils/monetary";

import style from './style.module.scss';
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";

function Home() {
  const [ expenses, setExpenses] = useState([]);
  const [ categories, setCategories] = useState([]);

  const expensesCategory = [
    {
      categoryId: 1,
      color: "#ED820E",
      icon: "BiSolidCabinet",
      name: "Marcenaria",
      total: 280.2
    },
    {
      categoryId: 1,
      color: "#ED820E",
      icon: "BiSolidCabinet",
      name: "Iluminacao",
      total: 282
    },
    {
      categoryId: 5,
      color: "#ED820E",
      icon: "BiSolidCabinet",
      name: "Revestimento",
      total: 28
    }
]

async function getExpenses() {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  const data:any = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({...doc.data()});
  });

  return data;
}

  async function getCategories() {
    const querySnapshot = await getDocs(collection(db, "categories"));
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
    
    async function getCategoriesFirestore() {
      const data = await getCategories();
      setCategories(data);
    }
    getCategoriesFirestore();

  }, [])


  const totalAmount = (id: any) => {
    const expenseCategory = expenses.filter((item: any) => item.category === id)
    let amount = 0;
    expenseCategory.forEach((item: any) => {
      amount = amount+item.amount
    })

    return amount;
  }

  

  return (
    <div className={style.dashboardContainer}>
      <div className={style.dashboardContent}>
        <div className={style.area1}><LineChart /></div>
        <div className={style.area2}><PieChart /></div>
        <div className={style.area3}>3</div>
        <div className={style.area4}>4</div>
        <div className={style.area5}>5</div>
      </div>
    </div>
  )
}

export default Home