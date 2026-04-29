import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main">
        <Outlet />
      </main>
      <RightPanel />
    </div>
  )
}