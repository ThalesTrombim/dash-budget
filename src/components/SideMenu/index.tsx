import { Link } from 'react-router-dom';
import style from './style.module.scss';

function SideMenu() {

  const menuItems = [
    {
      name: 'Dashboard',
      icon: 'BiSolidCabinet',
      path: '/',
      active: false
    },
    {
      name: 'Add Expense',
      icon: 'BiSolidCabinet',
      path: '/add-expense',
      active: false
    },
    {
      name: 'Add Category',
      icon: 'BiSolidCabinet',
      path: '/add-category',
      active: false
    },
    {
      name: 'Graphs',
      icon: 'BiSolidCabinet',
      path: '/graphs',
      active: false
    }
  ]

  return (
    <div className={style.sideMenuContainer}>
      <div className={style.sideMenuContent}>
        <div className={style.sideMenuItemsList}>
          {menuItems.map(item => (
            <div key={item.name}>
              <Link to={item.path}>
                {/* {item.name} */}
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideMenu;