import { Link, useLocation } from 'react-router-dom'
import ItemMenu from './ItemMenu'
import LogoutButton from './LogoutButton'

function MenuItems({ items, onItemClick }) {
  const location = useLocation()

  return (
    <nav id="menu" className="flex-1 flex flex-col gap-1" aria-label="Menu principal">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="group"
          onClick={onItemClick}
        >
          <ItemMenu
            title={item.title}
            icon={item.icon}
            active={location.pathname === item.path}
          />
        </Link>
      ))}

      <LogoutButton onClick={onItemClick} />
    </nav>
  )
}

export default MenuItems
