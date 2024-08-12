import { collection, getDocs } from "firebase/firestore";
import CategoryIcon from "../../components/CategoryIcon"
import { convertNumberToBRL } from "../../utils/monetary";

import style from './style.module.scss';
import { db } from "../../firebase.config";

function Home() {

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
      categoryId: 1,
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

  return (
    <div>
      <div className={style.expenseCategoryContainer}>
        <h4>
          Gastos
        </h4>

        <div>
          {expensesCategory.map((item: any) => (
            <div className={style.expenseCategoryList}>
              <div className={style.expenseCategoryIcon} style={{backgroundColor: item.color}}>
                <CategoryIcon icon={item.icon} />
              </div>

              <div className={style.expenseCategoryData}>
                <span>{item.name}</span>
                <span>{convertNumberToBRL(item.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home