import { createContext, useContext, useState } from 'react'

export const UserContext = createContext(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null) // null = no autenticado

  const login = (userData) => {
    setUser({
      name:      userData.name     || 'Usuario',
      username:  userData.username || 'usuario',
      initials:  userData.name
        ? userData.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        : 'US',
      color:     '#3D6B5C',
      bio:       userData.bio      || '',
      followers: 0,
      following: 0,
      posts:     0,
    })
  }

  const logout = () => setUser(null)

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}