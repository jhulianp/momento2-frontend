import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Completa todos los campos.')
      return
    }
    setLoading(true)
    // simulación de petición — reemplaza con tu llamada real al backend
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    login({ name: 'Usuario', username: form.email.split('@')[0] })
    navigate('/inicio')
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
      </div>

      <div className="auth-card">
        {/* logo */}
        <div className="auth-brand">
          <div className="auth-brand__logo">F</div>
          <span className="auth-brand__name">Facebook</span>
        </div>

        <h1 className="auth-title">Bienvenido de nuevo</h1>
        <p className="auth-subtitle">inicia sesión para continuar</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <div className="auth-field__label-row">
              <label htmlFor="password">Contraseña</label>
              <button type="button" className="auth-link auth-link--sm">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="auth-field__pw-wrap">
              <input
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
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
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className={`auth-submit ${loading ? 'auth-submit--loading' : ''}`}
            disabled={loading}
          >
            {loading ? <span className="auth-spinner" /> : 'Iniciar sesión'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="auth-link">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}