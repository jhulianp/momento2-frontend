import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Perfil from './pages/Perfil'
import Mensajes from './pages/Mensajes'
import Notificaciones from './pages/Notificaciones'
import Configuracion from './pages/Configuracion'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index                   element={<Inicio />} />
          <Route path="perfil"           element={<Perfil />} />
          <Route path="mensajes"         element={<Mensajes />} />
          <Route path="notificaciones"   element={<Notificaciones />} />
          <Route path="configuracion"    element={<Configuracion />} />
          <Route path="*"                element={<NotFound />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}