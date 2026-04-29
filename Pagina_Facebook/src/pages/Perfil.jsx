import { useUser } from '../context/UserContext'
import './Page.css'

const USER_POSTS = [
  { id: 1, text: 'les recomiendo este trabajo https://open.spotify.com/intl-es/artist/432R46LaYsJZV2Gmc4jUV5', likes: 38, comments: 6 },
  { id: 2, text: 'playlist de dream pop https://open.spotify.com/playlist/6McF0ptRrv9XNitt8Jb3ma?si=-nBXA4osSqiZYNGtcu3F7A', likes: 14, comments: 2 },
  { id: 3, text: 'odio backend :,c', likes: 91, comments: 23 },
]

export default function Perfil() {
  const user = useUser()

  return (
    <div className="page">
      <div className="profile">
        <div className="profile__cover" />

        <div className="profile__info">
          <div className="profile__avatar" style={{ background: user.color }}>
            {user.initials}
          </div>
          <div className="profile__details">
            <h1 className="profile__name">{user.name}</h1>
            <p className="profile__handle">{user.username}</p>
            <p className="profile__bio">{user.bio}</p>
            <div className="profile__stats">
              <div className="profile__stat">
                <span className="profile__stat-num">{user.posts}</span>
                <span className="profile__stat-label">publicaciones</span>
              </div>
              <div className="profile__stat">
                <span className="profile__stat-num">{user.followers.toLocaleString()}</span>
                <span className="profile__stat-label">seguidores</span>
              </div>
              <div className="profile__stat">
                <span className="profile__stat-num">{user.following}</span>
                <span className="profile__stat-label">siguiendo</span>
              </div>
            </div>
            <button className="btn-primary">editar perfil</button>
          </div>
        </div>

        <div className="profile__posts-title">publicaciones</div>
        <div className="profile__posts">
          {USER_POSTS.map(p => (
            <div key={p.id} className="profile__post-card">
              <p>{p.text}</p>
              <div className="profile__post-stats">
                <span>♥ {p.likes}</span>
                <span>💬 {p.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}