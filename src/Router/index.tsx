import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import AddExpense from '../components/AddExpense';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

async function getCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const data:any = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({...doc.data()});
  });

  return data;
}

function Router() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategoriesFirestore() {
      const data = await getCategories();
      setCategories(data);
    }
    getCategoriesFirestore();

  }, [])
  
  return (
    <Routes>
      <Route path='/add-expense' element={<AddExpense data={categories}/>} />
    </Routes>
  )
}

export default Router;