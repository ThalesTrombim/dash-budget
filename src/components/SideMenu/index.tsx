import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';
import DynamicIcon from '../DynamicIcon';

function SideMenu() {
  const [menuList, setMenuList] = useState<any>();
  const location = useLocation();

  const menuItems = [
    {
      name: 'Home',
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
    {
      name: 'Gráficos',
      icon: 'FaChartArea',
      path: '/graphs',
      active: false
    }
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

    console.log('LOCATION >', location.pathname);
    setMenuList(updateMenuList(location.pathname));
    console.log('Menu ', updateMenuList)
  }, [location.pathname]);

  return (
    <div className='
      bg-[#F6F6F9]
      flex flex-col p-4
    '>
      <div className='mb-12'>
        <img src={logo} alt="" className='w-32' />
      </div>

      <div className='flex flex-col justify-start text-start gap-1 text-[#252C32]'>
        {menuList.map((item: any) => (
          <Link key={item.name} to={item.path} className={`${item.active ? 'bg-white text-[#656CE1]' : ''} p-3 rounded-lg w-60 flex gap-2 duration-200 hover:bg-white`}>
            <DynamicIcon icon={item.icon} color={`${item.active ? '#656CE1' : '#6B7280' } `} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideMenu;