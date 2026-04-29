import FacebookPost from '../components/FacebookPost'
import './Page.css'

const STORIES = [
  { id: 1, name: 'laura',    initials: 'LG', color: '#3D6B5C' },
  { id: 2, name: 'carlos',   initials: 'CP', color: '#6B3D3D' },
  { id: 3, name: 'andrés',   initials: 'AT', color: '#3D3D6B' },
  { id: 4, name: 'sofía',    initials: 'SM', color: '#6B5C3D' },
  { id: 5, name: 'daniel',   initials: 'DR', color: '#5C3D6B' },
]

export default function Inicio() {
  return (
    <div className="page">
      <div className="stories">
        {STORIES.map(s => (
          <div key={s.id} className="story">
            <div className="story__avatar" style={{ background: s.color }}>{s.initials}</div>
            <span className="story__name">{s.name}</span>
          </div>
        ))}
      </div>

      <div className="feed">
        <FacebookPost />
        <FacebookPost />
      </div>
    </div>
  )
}