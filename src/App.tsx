import './App.css';
// import AddExpense from './components/AddExpense';
// import ExpenseCategory from './components/ExpenseCategory';
import Expenses from './pages/Expenses';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase.config';
import { useEffect, useState } from 'react';


async function getCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const data:any = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('doc', doc.data())
    data.push({...doc.data()});
  });

  return data;
}

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategoriesFirestore() {
      const data = await getCategories();
      setCategories(data);
    }
    getCategoriesFirestore();

  }, [])

  return (
    <>
      {categories.length === 0 ? <p>Loading...</p> : <Expenses categories={categories} />}
      {/* {<Expenses categories={categories} />} */}
    </>
  )
}

export default App
