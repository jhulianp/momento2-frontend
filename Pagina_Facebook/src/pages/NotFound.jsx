import { Link } from 'react-router-dom'
import './Page.css'

export default function NotFound() {
  return (
    <div className="page page--centered">
      <div className="not-found">
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">Página no encontrada</h1>
        <p className="not-found__desc">
          La ruta que buscas no existe o fue movida.
        </p>
        <Link to="/" className="btn-primary">← Volver al inicio</Link>
      </div>
    </div>
  )
}