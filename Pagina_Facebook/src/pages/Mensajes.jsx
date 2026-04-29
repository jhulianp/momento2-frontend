import { useState } from 'react'
import './Page.css'

const CHATS = [
  { id: 1, name: 'Laura Gómez',    initials: 'LG', color: '#3D6B5C', last: 'jajaja sí man',           time: '10:47', unread: 2 },
  { id: 2, name: 'Carlos Pérez',   initials: 'CP', color: '#6B3D3D', last: 'listo yo llevo algo',      time: '09:31', unread: 1 },
  { id: 3, name: 'Andrés Torres',  initials: 'AT', color: '#3D3D6B', last: 'dale, luego hablamos',     time: 'ayer',  unread: 0 },
]

const MESSAGES_MAP = {
  1: [
    { id: 1, from: 'them', text: 'oye vas a ir el sábado?',              time: '10:30' },
    { id: 2, from: 'me',   text: 'sí creo, a qué hora es?',             time: '10:32' },
    { id: 3, from: 'them', text: 'como a las 7 dijeron',                 time: '10:33' },
    { id: 4, from: 'me',   text: 'ah ok igual depende cómo me quede el viernes lol', time: '10:40' },
    { id: 5, from: 'them', text: 'jajaja sí man',                        time: '10:47' },
  ],
  2: [
    { id: 1, from: 'them', text: 'oe hacemos algo esta noche?',          time: '09:10' },
    { id: 2, from: 'me',   text: 'puede ser, a dónde?',                  time: '09:15' },
    { id: 3, from: 'them', text: 'no sé, algo tranquilo',                time: '09:20' },
    { id: 4, from: 'me',   text: 'vamos donde siempre entonces',         time: '09:25' },
    { id: 5, from: 'them', text: 'listo yo llevo algo',                  time: '09:31' },
  ],
  3: [
    { id: 1, from: 'me',   text: 'llegaste bien?',                       time: 'ayer' },
    { id: 2, from: 'them', text: 'sí gracias, fue largo el viaje jaja',  time: 'ayer' },
    { id: 3, from: 'me',   text: 'imagínate, eso es muy lejos',          time: 'ayer' },
    { id: 4, from: 'them', text: 'dale, luego hablamos',                 time: 'ayer' },
  ],
}

export default function Mensajes() {
  const [activeChat, setActiveChat] = useState(CHATS[0])
  const [input, setInput]           = useState('')
  const [messages, setMessages]     = useState(MESSAGES_MAP)

  const sendMessage = () => {
    if (!input.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: input.trim(), time: 'ahora' }
    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }))
    setInput('')
  }

  return (
    <div className="page page--fullheight">
      <div className="messages">
        <div className="messages__list">
          <div className="messages__search">
            <input placeholder="Buscar..." />
          </div>
          {CHATS.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat.id === chat.id ? 'chat-item--active' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="chat-item__avatar" style={{ background: chat.color }}>{chat.initials}</div>
              <div className="chat-item__info">
                <div className="chat-item__top">
                  <span className="chat-item__name">{chat.name}</span>
                  <span className="chat-item__time">{chat.time}</span>
                </div>
                <div className="chat-item__bottom">
                  <span className="chat-item__last">{chat.last}</span>
                  {chat.unread > 0 && <span className="chat-item__badge">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="messages__window">
          <div className="messages__header">
            <div className="chat-item__avatar chat-item__avatar--sm" style={{ background: activeChat.color }}>
              {activeChat.initials}
            </div>
            <div>
              <div className="messages__header-name">{activeChat.name}</div>
              <div className="messages__header-status">activo hace 5 min</div>
            </div>
          </div>

          <div className="messages__body">
            {(messages[activeChat.id] || []).map(m => (
              <div key={m.id} className={`msg ${m.from === 'me' ? 'msg--me' : 'msg--them'}`}>
                <div className="msg__bubble">{m.text}</div>
                <span className="msg__time">{m.time}</span>
              </div>
            ))}
          </div>

          <div className="messages__input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={sendMessage} disabled={!input.trim()}>➤</button>
          </div>
        </div>
      </div>
    </div>
  )
}