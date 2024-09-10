import { collection, getDocs } from "firebase/firestore";
import CategoryIcon from "../../components/CategoryIcon"
import { convertNumberToBRL } from "../../utils/monetary";

import style from './style.module.scss';
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

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

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];
  
  const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    // <div>
    //   <Chart
    //     chartType="PieChart"
    //     width="100%"
    //     height="400px"
    //     data={data}
    //     options={options}
    //   />

    //   <div className={style.expenseCategoryContainer}>
    //     <h4>
    //       Gastos
    //     </h4>

    //     <div>
    //       {categories.map((item: any) => (
    //         <div className={style.expenseCategoryList}>
    //           <div className={style.expenseCategoryIcon} style={{backgroundColor: item.color}}>
    //             <CategoryIcon icon={item.icon} />
    //           </div>

    //           <div className={style.expenseCategoryData}>
    //             <span>{item.name}</span>
    //             <span>{convertNumberToBRL(totalAmount(item.categoryId))}</span>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className={style.dashboardContainer}>
      <div className={style.area1}>1</div>
      <div className={style.area2}>2</div>
      <div className={style.area3}>3</div>
      <div className={style.area4}>4</div>
      <div className={style.area5}>5</div>
    </div>
  )
}

export default Home