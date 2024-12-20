import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import AddExpense from '../components/AddExpense';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import Home from '../pages/home';
import AddCategory from '../components/AddCategory';
import Login from '../pages/Login';

async function getCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const data:any = [];

  querySnapshot.forEach((doc) => {
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
      <Route path='/' element={<Home />} />
      <Route path='/add-expense' element={<AddExpense data={categories}/>} />
      <Route path='/add-category' element={<AddCategory />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router;