import CategoryIcon from "../../components/CategoryIcon"

import style from './style.module.scss';

function Home() {

  const expensesCategory = [
    {
      categoryId: 1,
      color: "#ED820E",
      icon: "BiSolidCabinet",
      name: "Marcenaria",
      total: 280
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
    <div>
      <div>
        {expensesCategory.map((item: any) => (
          <div className={style.expenseCategoryContainer}>
            <div className={style.expenseCategoryIcon} style={{backgroundColor: item.color}}>
              <CategoryIcon icon={item.icon} />
            </div>

            <div className={style.expenseCategoryData}>
              <span>{item.name}</span>
              <span>{item.total}</span>
            </div>            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home