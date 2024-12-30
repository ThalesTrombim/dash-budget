import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router';
import { SuccessModalProvider } from './contexts/SuccessModalContext';
import { AuthContextProvider } from './contexts/AuthContext';

import SideMenu from './components/SideMenu';

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
      <SuccessModalProvider>
        <div className='flex w-full h-dvh bg-[#f7f7f7]'>
          <SideMenu />
          <Router />
        </div>
      </SuccessModalProvider>
    </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
