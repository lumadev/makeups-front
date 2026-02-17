import { Link, useLocation } from 'react-router-dom'

import ItemMenu from './ItemMenu'
import LogoutButton from './LogoutButton'

function MenuItems({ items, onItemClick }) {
  const location = useLocation()

  return (
    <nav
      id="menu"
      className="flex flex-col flex-1"
      aria-label="Menu principal"
    >
      {/* Itens */}
      <div className="flex flex-col gap-1">
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
      </div>

      {/* Logout fixo no fim */}
      <LogoutButton
        className="mt-auto pt-4"
        onClick={onItemClick}
      />
    </nav>
  )
}

export default MenuItems