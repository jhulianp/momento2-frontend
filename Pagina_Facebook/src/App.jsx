import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Perfil from './pages/Perfil'
import Mensajes from './pages/Mensajes'
import Notificaciones from './pages/Notificaciones'
import Configuracion from './pages/Configuracion'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'

// Solo accesible sin sesión (si ya hay sesión, redirige al inicio)
function PublicRoute({ children }) {
  const { user } = useUser()
  return user ? <Navigate to="/inicio" replace /> : children
}

// Solo accesible con sesión (si no hay sesión, redirige al login)
function PrivateRoute({ children }) {
  const { user } = useUser()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Raíz → siempre va al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Públicas */}
      <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Privadas (todas bajo /inicio) */}
      <Route path="/inicio" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index                   element={<Inicio />} />
        <Route path="perfil"           element={<Perfil />} />
        <Route path="mensajes"         element={<Mensajes />} />
        <Route path="notificaciones"   element={<Notificaciones />} />
        <Route path="configuracion"    element={<Configuracion />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}