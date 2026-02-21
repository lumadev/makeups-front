import { Link, useLocation } from 'react-router-dom'

import ItemMenu from './ItemMenu'
import LogoutButton from './LogoutButton'
import ThemeButton from './ThemeButton'

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

      <div className="mt-auto flex flex-col gap-1">
        {/* Botão de alternar entre tema claro e escuro */}
        <ThemeButton />
        
        {/* Logout fixo no fim */}
        <LogoutButton
          className="mt-auto pt-4"
          onClick={onItemClick}
        />
      </div>
    </nav>
  )
}

export default MenuItems