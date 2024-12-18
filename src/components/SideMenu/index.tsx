import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';
import DynamicIcon from '../DynamicIcon';
import { useAuth } from '../../hooks/useAuth';

function SideMenu() {
  const [menuList, setMenuList] = useState<any>();
  const location = useLocation();

  const { user } = useAuth();
  
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

  useEffect(() => {
    setMenuList(updateMenuList(location.pathname))
  }, [location.pathname]);

  return (
    <div className='
      bg-[#ededf0]
      max-w-[264px]
      flex flex-col p-4
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
          <div className='flex items-center gap-2  p-2 rounded-md cursor-pointer hover:bg-white'>
            <img src={user?.avatar!} alt="User Avatar" className='rounded-full w-10 h-10'/>
            <p>{user?.name}</p>
          </div>
        )
      }
    </div>
  )
}

export default SideMenu;