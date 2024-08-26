import style from './style.module.scss';

function SideMenu() {

  const menuItems = [
    {
      name: 'Dashboard',
      icon: 'BiSolidCabinet',
      active: false
    },
    {
      name: 'Add Expense',
      icon: 'BiSolidCabinet',
      active: false
    },
    {
      name: 'Add Category',
      icon: 'BiSolidCabinet',
      active: false
    },
    {
      name: 'Graphs',
      icon: 'BiSolidCabinet',
      active: false
    }
  ]

  return (
    <div className={style.sideMenuContainer}>
      <div className={style.sideMenuItemsList}>
        {menuItems.map(item => (
          <span>{item.name}</span>
        ))}
      </div>
    </div>
  )
}

export default SideMenu;