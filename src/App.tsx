import './App.css';
// import AddExpense from './components/AddExpense';
// import ExpenseCategory from './components/ExpenseCategory';
import Expenses from './pages/Expenses';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase.config';
import { useEffect, useState } from 'react';
import AddExpense from './components/AddExpense';
import { SuccessModalProvider } from './contexts/SuccessModalContext';

import Router from './Router';

import Home from './pages/home';
import SideMenu from './components/SideMenu';

import './App.css'
import { BrowserRouter } from 'react-router-dom';

async function getCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const data:any = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
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
    <div className='app-container' >
      <SuccessModalProvider>
        {/* {categories.length === 0 ? <p>Loading...</p> : <Expenses categories={categories} />} */}
        {/* <AddExpense data={categories} />
        <Home /> */}

        <BrowserRouter>
          <SideMenu />
          <Router />
        </BrowserRouter>
      </SuccessModalProvider>
    </div>
  )
}

export default App
