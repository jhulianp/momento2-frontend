import { NavLink } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Sidebar.css'

const NAV_MAIN = [
  { to: '/',               label: 'Inicio',         icon: '⌂' },
  { to: '/perfil',         label: 'Perfil',         icon: '◉' },
  { to: '/mensajes',       label: 'Mensajes',       icon: '✉', dot: true },
  { to: '/notificaciones', label: 'Notificaciones', icon: '◎', dot: true },
]
const NAV_ACCOUNT = [
  { to: '/configuracion',  label: 'Configuración',  icon: '⚙' },
]

export default function Sidebar() {
  const user = useUser()

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">F</span>
        <span className="sidebar__brand-name">Facebookgit </span>
      </div>

      <div className="sidebar__section">Principal</div>
      <nav className="sidebar__nav">
        {NAV_MAIN.map(({ to, label, icon, dot }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
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
      </nav>

      <div className="sidebar__user">
        <div className="sidebar__avatar" style={{ background: user.color }}>
          {user.initials}
        </div>
        <div className="sidebar__user-info">
          <span className="sidebar__user-name">{user.name}</span>
          <span className="sidebar__user-handle">{user.username}</span>
        </div>
      </div>
    </aside>
  )
}