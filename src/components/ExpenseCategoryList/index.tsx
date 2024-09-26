import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import ExpenseCategory from '../ExpenseCategory';

import style from './style.module.scss';
import { Link } from 'react-router-dom';

function ExpenseCategoryList() {
  const [categories, setCategories] = useState([]);

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
    
    async function getCategoriesFirestore() {
      const data = await getCategories();
      setCategories(data);
    }
    getCategoriesFirestore();

  }, [])

  return (
    <div className={style.expenseCategoryListContainer}>

      <div className={style.expenseCategoryListItems}>

        {categories.map((item: any) => (
          <div className='' key={item.name}>
            <ExpenseCategory name={item.name} color={item.color} icon={item.icon} />
          </div>
        ))}
      </div>
      <div>

        <Link className={style.expenseCategoryListLink} to={'/add-category'}>
          Ver tudo
        </Link>
      </div>
    </div>
  )
}

export default ExpenseCategoryList;