import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Sidebar.css'

const NAV_MAIN = [
  { to: '/inicio',                label: 'Inicio',         icon: '⌂' },
  { to: '/inicio/perfil',         label: 'Perfil',         icon: '◉' },
  { to: '/inicio/mensajes',       label: 'Mensajes',       icon: '✉', dot: true },
  { to: '/inicio/notificaciones', label: 'Notificaciones', icon: '◎', dot: true },
]
const NAV_ACCOUNT = [
  { to: '/inicio/configuracion',  label: 'Configuración',  icon: '⚙' },
]

export default function Sidebar() {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">F</span>
        <span className="sidebar__brand-name">Facebook</span>
      </div>

      <div className="sidebar__section">Principal</div>
      <nav className="sidebar__nav">
        {NAV_MAIN.map(({ to, label, icon, dot }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/inicio'}
            className={({ isActive }) =>
              'sidebar__link' + (isActive ? ' sidebar__link--active' : '')
            }
          >
            <span className="sidebar__icon">{icon}</span>
            <span className="sidebar__label">{label}</span>
            {dot && <span className="sidebar__badge" />}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__section">Cuenta</div>
      <nav className="sidebar__nav">
        {NAV_ACCOUNT.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              'sidebar__link' + (isActive ? ' sidebar__link--active' : '')
            }
          >
            <span className="sidebar__icon">{icon}</span>
            <span className="sidebar__label">{label}</span>
          </NavLink>
        ))}
        <button className="sidebar__link sidebar__link--logout" onClick={handleLogout}>
          <span className="sidebar__icon">↩</span>
          <span className="sidebar__label">Cerrar sesión</span>
        </button>
      </nav>

      <div className="sidebar__user">
        <div className="sidebar__avatar" style={{ background: user?.color }}>
          {user?.initials}
        </div>
        <div className="sidebar__user-info">
          <span className="sidebar__user-name">{user?.name}</span>
          <span className="sidebar__user-handle">@{user?.username}</span>
        </div>
      </div>
    </aside>
  )
}