import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router';
import { FeedbackModalProvider } from './contexts/FeedbackModalContext';
import { AuthContextProvider } from './contexts/AuthContext';

import SideMenu from './components/SideMenu';
import { ExpensesContextProvider } from './contexts/ExpensesContext';
import { CategoriesContextProvider } from './contexts/CategoriesContext';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <FeedbackModalProvider>
          <ExpensesContextProvider>
            <CategoriesContextProvider>
              <div className='flex w-full bg-[#f7f7f7]'>
                <SideMenu />
                <div className='flex ml-[56px] md:ml-[232px] md:p-6 w-full h-dvh'>
                  <Router />
                </div>
              </div>
            </CategoriesContextProvider>
          </ExpensesContextProvider>
        </FeedbackModalProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
