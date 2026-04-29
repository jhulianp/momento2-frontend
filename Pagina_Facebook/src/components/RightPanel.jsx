import './RightPanel.css'

const SUGGESTIONS = [
  { id: 1, name: 'Laura Gómez',    initials: 'LG', bg: '#3D6B5C', fg: '#D4E8E1', sub: '3 amigos en común' },
  { id: 2, name: 'Daniel Ríos',    initials: 'DR', bg: '#5C3D6B', fg: '#E1D4E8', sub: '1 amigo en común'  },
  { id: 3, name: 'Valentina Cruz', initials: 'VC', bg: '#6B5C3D', fg: '#E8E1D4', sub: 'nueva en nexus'     },
]

const TRENDS = [
  { tag: '#findesemana',  name: 'Fin de semana',  count: '4.1k publicaciones' },
  { tag: '#colombia',     name: 'Colombia',        count: '12k publicaciones'  },
  { tag: '#musica',       name: 'Música',          count: '3.8k publicaciones' },
  { tag: '#medellin',     name: 'Medellín',        count: '6.2k publicaciones' },
]

export default function RightPanel() {
  return (
    <aside className="rp">
      <div className="rp__search">
        <input placeholder="buscar en nexus..." />
      </div>

      <div className="rp__block">
        <h3 className="rp__title">sugerencias para ti</h3>
        {SUGGESTIONS.map(s => (
          <div key={s.id} className="rp__suggest">
            <div className="rp__av" style={{ background: s.bg, color: s.fg }}>{s.initials}</div>
            <div className="rp__info">
              <div className="rp__name">{s.name}</div>
              <div className="rp__sub">{s.sub}</div>
            </div>
            <button className="rp__follow">seguir</button>
          </div>
        ))}
      </div>

      <div className="rp__block">
        <h3 className="rp__title">tendencias</h3>
        {TRENDS.map(t => (
          <div key={t.tag} className="rp__trend">
            <div className="rp__trend-tag">{t.tag}</div>
            <div className="rp__trend-name">{t.name}</div>
            <div className="rp__trend-count">{t.count}</div>
          </div>
        ))}
      </div>

      <p className="rp__footer">nexus · 2025</p>
    </aside>
  )
}