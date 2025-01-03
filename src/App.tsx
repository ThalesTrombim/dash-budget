import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router';
import { SuccessModalProvider } from './contexts/SuccessModalContext';
import { AuthContextProvider } from './contexts/AuthContext';

import SideMenu from './components/SideMenu';
import { ExpensesContextProvider } from './contexts/ExpensesContext';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ExpensesContextProvider>
          <SuccessModalProvider>
            <div className='flex w-full bg-[#f7f7f7]'>
              <SideMenu />
              <div className='flex ml-[56px] md:ml-[264px] md:p-6 w-full'>
                <Router />
              </div>
            </div>
          </SuccessModalProvider>
        </ExpensesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
