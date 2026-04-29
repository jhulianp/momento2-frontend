import { useState } from 'react'
import { useUser } from '../context/UserContext'
import './Page.css'

export default function Configuracion() {
  const user = useUser()

  const [form, setForm] = useState({
    name:     user.name,
    username: user.username,
    bio:      user.bio,
    email:    'jhulianpulgarin@gmail.com',
  })

  const [toggles, setToggles] = useState({
    emailNotifs:    true,
    pushNotifs:     true,
    privateAccount: false,
    twoFactor:      false,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleToggle = key => setToggles(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Configuración</h1>
        {saved && <span className="save-toast">✓ Guardado</span>}
      </div>

      <div className="settings-section">
        <h2 className="settings-section__title">Información del perfil</h2>
        <div className="settings-form">
          <div className="form-row">
            <label>Nombre completo</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Usuario</label>
            <input name="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Biografía</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />
          </div>
          <div className="form-row">
            <label>Correo electrónico</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section__title">Notificaciones</h2>
        <div className="settings-toggles">
          {[
            { key: 'emailNotifs', label: 'Notificaciones por correo', desc: 'Recibe novedades en tu email' },
            { key: 'pushNotifs',  label: 'Notificaciones push',       desc: 'Alertas en tiempo real' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="toggle-row">
              <div>
                <div className="toggle-row__label">{label}</div>
                <div className="toggle-row__desc">{desc}</div>
              </div>
              <button
                className={`toggle ${toggles[key] ? 'toggle--on' : ''}`}
                onClick={() => handleToggle(key)}
              >
                <span className="toggle__thumb" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section__title">Privacidad y seguridad</h2>
        <div className="settings-toggles">
          {[
            { key: 'privateAccount', label: 'Cuenta privada',             desc: 'Solo seguidores aprobados ven tu perfil' },
            { key: 'twoFactor',      label: 'Verificación en dos pasos',  desc: 'Mayor seguridad en tu cuenta' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="toggle-row">
              <div>
                <div className="toggle-row__label">{label}</div>
                <div className="toggle-row__desc">{desc}</div>
              </div>
              <button
                className={`toggle ${toggles[key] ? 'toggle--on' : ''}`}
                onClick={() => handleToggle(key)}
              >
                <span className="toggle__thumb" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary btn-save" onClick={handleSave}>Guardar cambios</button>
    </div>
  )
}