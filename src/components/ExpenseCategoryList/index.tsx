import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import ExpenseCategory from '../ExpenseCategory';

import style from './style.module.scss';

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
      {categories.map((item: any) => (
        <div key={item.name}>
          <ExpenseCategory name={item.name} color={item.color} icon={item.icon} />
        </div>
      ))}
    </div>
  )
}

export default ExpenseCategoryList;