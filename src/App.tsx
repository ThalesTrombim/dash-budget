import './App.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase.config';
import { useEffect, useState } from 'react';
import { SuccessModalProvider } from './contexts/SuccessModalContext';

import Router from './Router';

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
    <BrowserRouter>
      <SuccessModalProvider>
        <div className='flex w-full h-dvh bg-[#f7f7f7]' >
          <SideMenu />
          <Router />
        </div>
      </SuccessModalProvider>
    </BrowserRouter>
  )
}

export default App
