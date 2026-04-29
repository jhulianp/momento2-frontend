import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import './FacebookPost.css'

const INITIAL_COMMENTS = [
  { id: 1, author: 'Carlos Pérez',  initials: 'CP', color: '#6B3D3D', text: 'Lovless - my bloody valentine', time: 'hace 1 hora',  likes: 4, liked: false },
  { id: 2, author: 'Laura Gómez',   initials: 'LG', color: '#3D6B5C', text: 'the stone roses, de lo mejor del mandchester', time: 'hace 45 min',  likes: 2, liked: false },
  { id: 3, author: 'Andrés Torres', initials: 'AT', color: '#3D3D6B', text: 'ni idea',                           time: 'hace 20 min',  likes: 7, liked: false },
]

const POSTS = [
  {
    name: 'Carlos Pérez',
    initials: 'CP',
    color: '#6B3D3D',
    time: 'hace 1 hora',
    text: 'alguien me recomienda un album que les gustara?',
    emoji: '🎵',
  },
]

let postIndex = 0

export default function FacebookPost() {
  const post = POSTS[postIndex++ % POSTS.length]

  const [liked, setLiked]           = useState(false)
  const [likeCount, setLikeCount]   = useState(Math.floor(Math.random() * 40) + 8)
  const [comments, setComments]     = useState([])
  const [inputText, setInputText]   = useState('')
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 8) + 1)
  const [shareOpen, setShareOpen]   = useState(false)

  const currentUser = useUser()

  useEffect(() => {
    document.title = `${likeCount} me gusta — Nexus`
  }, [likeCount])

  useEffect(() => {
    const timer = setTimeout(() => setComments(INITIAL_COMMENTS), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleLike = () => {
    setLiked(prev => !prev)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleComment = () => {
    if (!inputText.trim()) return
    const newComment = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      author: currentUser.name,
      initials: currentUser.initials,
      color: currentUser.color,
      text: inputText.trim(),
      time: 'ahora',
      likes: 0,
      liked: false,
    }
    setComments(prev => [...prev, newComment])
    setInputText('')
  }

  const handleLikeComment = (id) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c
      )
    )
  }

  const handleShare = (method) => {
    setShareCount(prev => prev + 1)
    setShareOpen(false)
    alert(`compartido: ${method}`)
  }

  return (
    <div className="fb-post">
      <div className="fb-post__header">
        <div className="fb-avatar fb-avatar--blue" style={{ background: post.color }}>{post.initials}</div>
        <div className="fb-post__meta">
          <span className="fb-post__name">{post.name}</span>
          <span className="fb-post__time">{post.time} · público</span>
        </div>
      </div>

      <p className="fb-post__text">{post.text}</p>

      <div className="fb-post__image">{post.emoji}</div>

      <div className="fb-reactions">
        <span>♥ {likeCount}</span>
        <span>{comments.length} comentarios · {shareCount} compartidos</span>
      </div>

      <div className="fb-actions">
        <button className={`fb-btn ${liked ? 'fb-btn--liked' : ''}`} onClick={handleLike}>
          ♥ me gusta
        </button>
        <button className="fb-btn" onClick={() => document.getElementById('comment-input').focus()}>
          💬 comentar
        </button>
        <button className="fb-btn" onClick={() => setShareOpen(o => !o)}>
          ↗ compartir
        </button>
      </div>

      {shareOpen && (
        <div className="fb-share">
          <p>compartir</p>
          {['en tu muro', 'en una historia', 'en un grupo', 'por mensaje'].map(m => (
            <button key={m} className="fb-share__option" onClick={() => handleShare(m)}>{m}</button>
          ))}
        </div>
      )}

      <div className="fb-comments">
        {comments.map(c => (
          <div key={c.id} className="fb-comment">
            <div className="fb-avatar fb-avatar--sm" style={{ background: c.color }}>{c.initials}</div>
            <div>
              <div className="fb-comment__bubble">
                <span className="fb-comment__author">{c.author}</span>
                <p>{c.text}</p>
              </div>
              <div className="fb-comment__actions">
                <button
                  onClick={() => handleLikeComment(c.id)}
                  style={{ color: c.liked ? '#C9A84C' : undefined }}
                >
                  me gusta {c.likes > 0 && `· ${c.likes}`}
                </button>
                <span>{c.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fb-add-comment">
        <div className="fb-avatar fb-avatar--sm" style={{ background: currentUser.color }}>
          {currentUser.initials}
        </div>
        <input
          id="comment-input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleComment()}
          placeholder="escribe un comentario..."
        />
        <button onClick={handleComment} disabled={!inputText.trim()}>enviar</button>
      </div>
    </div>
  )
}