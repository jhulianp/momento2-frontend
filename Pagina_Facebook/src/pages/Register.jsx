import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [form, setForm] = useState({
    name: '', username: '', email: '', password: '', confirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    if (!form.name || !form.username || !form.email || !form.password || !form.confirm)
      return 'Completa todos los campos.'
    if (form.password.length < 6)
      return 'La contraseña debe tener al menos 6 caracteres.'
    if (form.password !== form.confirm)
      return 'Las contraseñas no coinciden.'
    if (!/\S+@\S+\.\S+/.test(form.email))
      return 'Ingresa un correo válido.'
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    // simulación de petición — reemplaza con tu llamada real al backend
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    login({ name: form.name, username: form.username })
    navigate('/inicio')
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 6) s++
    if (p.length >= 10) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()

  const strengthLabel = ['', 'Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'][strength]
  const strengthClass = ['', 'pw-weak', 'pw-weak', 'pw-medium', 'pw-strong', 'pw-strong'][strength]

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
      </div>

      <div className="auth-card auth-card--wide">
        {/* logo */}
        <div className="auth-brand">
          <div className="auth-brand__logo">F</div>
          <span className="auth-brand__name">Facebook</span>
        </div>

        <h1 className="auth-title">Crea tu cuenta</h1>
        <p className="auth-subtitle">únete a la comunidad</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__grid">
            <div className="auth-field">
              <label htmlFor="name">Nombre completo</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="username">Usuario</label>
              <div className="auth-field__prefix-wrap">
                <span className="auth-field__prefix">@</span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="tunombre"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className="has-prefix"
                />
              </div>
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="reg-email">Correo electrónico</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="reg-password">Contraseña</label>
            <div className="auth-field__pw-wrap">
              <input
                id="reg-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-field__pw-toggle"
                onClick={() => setShowPass(p => !p)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {form.password && (
              <div className="pw-strength">
                <div className="pw-strength__bars">
                  {[1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className={`pw-strength__bar ${i <= strength ? strengthClass : ''}`}
                    />
                  ))}
                </div>
                <span className={`pw-strength__label ${strengthClass}`}>{strengthLabel}</span>
              </div>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="confirm">Confirmar contraseña</label>
            <input
              id="confirm"
              name="confirm"
              type={showPass ? 'text' : 'password'}
              placeholder="Repite tu contraseña"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
              className={form.confirm && form.confirm !== form.password ? 'input-error' : ''}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className={`auth-submit ${loading ? 'auth-submit--loading' : ''}`}
            disabled={loading}
          >
            {loading ? <span className="auth-spinner" /> : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="auth-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}