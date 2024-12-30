import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';
import DynamicIcon from '../DynamicIcon';
import { useAuth } from '../../hooks/useAuth';

function SideMenu() {
  const [menuList, setMenuList] = useState<any>();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();
  const { user, handleLogout } = useAuth();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: 'MdSpaceDashboard',
      path: '/',
      active: true
    },
    {
      name: 'Adicionar gasto',
      icon: 'MdAddchart',
      path: '/add-expense',
      active: false
    },
    {
      name: 'Adicionar categoria',
      icon: 'MdFormatListBulletedAdd',
      path: '/add-category',
      active: false
    },
    // {
    //   name: 'Gráficos',
    //   icon: 'FaChartArea',
    //   path: '/graphs',
    //   active: false
    // }
  ]

  function updateMenuList(currentPath: string) {
    return menuItems.map(item => {
      if (item.path === currentPath) {
        return { ...item, active: true };
      }
      return { ...item, active: false };
    });
  }

  function navigateTo(path: string) {
    if(isSideMenuOpen) {
      navigate(path);
      setIsSideMenuOpen(false);
    }
  }

  useEffect(() => {
    setMenuList(updateMenuList(location.pathname))
  }, [location.pathname]);

  return (
    <>
      <div className='md:hidden fixed bg-[#ededf0] h-full flex flex-col justify-between' onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
        <div>
          <p>Logo</p>

          {
            menuList && (
              <div className='flex flex-col justify-start text-start gap-1 text-[#252C32]'>
                {menuList.map((item: any) => (
                  <div key={item.name} onClick={() => navigateTo(item.path)} className={`${item.active ? 'bg-white text-[#656CE1]' : ''} ${isSideMenuOpen && 'w-60'} p-3 rounded-lg flex gap-2 duration-200 hover:bg-white cursor-pointer`}>
                    <DynamicIcon icon={item.icon} color={`${item.active ? '#656CE1' : '#6B7280' } `} />
                    {
                      isSideMenuOpen && <span className='transition duration-300 ease-in-out'>{item.name}</span>
                    }
                  </div>
                ))}
              </div>
            )
          }
        </div>

        {
          user && (
            <div className='flex items-center gap-2  p-2 rounded-md cursor-pointer hover:bg-white'>
              <img src={user?.avatar!} alt="User Avatar" className='rounded-full w-10 h-10'/>
              { isSideMenuOpen && <p>{user?.name}</p>}
            </div>
          )
        }

      </div>
      
      <div className='
        bg-[#ededf0]
        max-w-[264px]
        hidden md:flex flex-col p-4
        justify-between
      '>
        <div>
          <div className='mb-12'>
            <Link to={'/'}>
              <img src={logo} alt="Controle Financeiro" className='w-32' />
            </Link>
          </div>

          {
            menuList && (
              <div className='flex flex-col justify-start text-start gap-1 text-[#252C32]'>
                {menuList.map((item: any) => (
                  <Link key={item.name} to={item.path} className={`${item.active ? 'bg-white text-[#656CE1]' : ''} p-3 rounded-lg w-60 flex gap-2 duration-200 hover:bg-white`}>
                    <DynamicIcon icon={item.icon} color={`${item.active ? '#656CE1' : '#6B7280' } `} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )
          }
        </div>
        {
          user && (
            <div className='relative select-none'>
              <div onClick={() => setOpenMenu(!openMenu)} className='flex items-center gap-2  p-2 rounded-md cursor-pointer hover:bg-white'>
                <img src={user?.avatar!} alt="User Avatar" className='rounded-full w-10 h-10'/>
                <p>{user?.name}</p>
              </div>

              {
                openMenu && (
                  <div className="absolute bottom-full right-0 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul className='cursor-pointer'>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Perfil</li>
                      {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"></li> */}
                      <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sair</li>
                    </ul>
                  </div>
                )
              }

            </div>
          )
        }
      </div>
    </>
  )
}

export default SideMenu;