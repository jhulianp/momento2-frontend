import { useState } from 'react'
import './Page.css'

const ALL_NOTIFS = [
  { id: 1, type: 'like',    user: 'Laura Gómez',    initials: 'LG', color: '#3D6B5C', text: 'le dio me gusta a tu foto',                   time: 'hace 4 min',  read: false },
  { id: 2, type: 'comment', user: 'Carlos Pérez',   initials: 'CP', color: '#6B3D3D', text: 'comentó en tu publicación: "jajaja exacto"',   time: 'hace 18 min', read: false },
  { id: 3, type: 'follow',  user: 'Andrés Torres',  initials: 'AT', color: '#3D3D6B', text: 'empezó a seguirte',                             time: 'hace 1 hora', read: false },
  { id: 4, type: 'like',    user: 'Sofía Martínez', initials: 'SM', color: '#6B5C3D', text: 'le dio me gusta a tu comentario',               time: 'hace 2 horas',read: false },
  { id: 5, type: 'mention', user: 'Daniel Ríos',    initials: 'DR', color: '#5C3D6B', text: 'te mencionó en una publicación',                time: 'hace 3 horas',read: true  },
  { id: 6, type: 'follow',  user: 'Valentina Cruz', initials: 'VC', color: '#6B3D5C', text: 'empezó a seguirte',                             time: 'ayer',        read: true  },
  { id: 7, type: 'like',    user: 'Miguel Vargas',  initials: 'MV', color: '#3D6B3D', text: 'le dio me gusta a tu foto de perfil',           time: 'ayer',        read: true  },
  { id: 8, type: 'comment', user: 'Camila Ruiz',    initials: 'CR', color: '#6B4D3D', text: 'comentó en tu publicación: "q envidia jaja"',   time: 'ayer',        read: true  },
]

const TYPE_ICONS = { like: '♥', comment: '💬', follow: '+', mention: '@' }

export default function Notificaciones() {
  const [notifs, setNotifs] = useState(ALL_NOTIFS)
  const [filter, setFilter] = useState('todas')

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead    = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const unread   = notifs.filter(n => !n.read).length
  const filtered = filter === 'todas' ? notifs : notifs.filter(n => !n.read)

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">
          Notificaciones
          {unread > 0 && <span className="page__badge">{unread}</span>}
        </h1>
        {unread > 0 && (
          <button className="btn-ghost" onClick={markAllRead}>marcar todas como leídas</button>
        )}
      </div>

      <div className="filter-tabs">
        <button className={`filter-tab ${filter === 'todas'     ? 'filter-tab--active' : ''}`} onClick={() => setFilter('todas')}>Todas</button>
        <button className={`filter-tab ${filter === 'no-leidas' ? 'filter-tab--active' : ''}`} onClick={() => setFilter('no-leidas')}>
          No leídas {unread > 0 && `(${unread})`}
        </button>
      </div>

      <div className="notif-list">
        {filtered.map(n => (
          <div
            key={n.id}
            className={`notif-item ${!n.read ? 'notif-item--unread' : ''}`}
            onClick={() => markRead(n.id)}
          >
            <div className="notif-item__left">
              <div className="notif-avatar" style={{ background: n.color }}>{n.initials}</div>
              <span className="notif-type-icon">{TYPE_ICONS[n.type]}</span>
            </div>
            <div className="notif-item__content">
              <p><strong>{n.user}</strong> {n.text}</p>
              <span className="notif-item__time">{n.time}</span>
            </div>
            {!n.read && <div className="notif-dot" />}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <span>·</span>
            <p>nada por aquí</p>
          </div>
        )}
      </div>
    </div>
  )
}