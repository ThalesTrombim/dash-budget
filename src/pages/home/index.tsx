import CategoryIcon from "../../components/CategoryIcon"
import { convertNumberToBRL } from "../../utils/monetary";

import style from './style.module.scss';

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

  return (
    <div >
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