import { Route, Routes } from 'react-router-dom';
import AddExpense from '../components/AddExpense';
import Home from '../pages/home';
import AddCategory from '../components/AddCategory';
import Login from '../pages/Login';

function Router() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add-expense' element={<AddExpense />} />
      <Route path='/add-category' element={<AddCategory />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router;