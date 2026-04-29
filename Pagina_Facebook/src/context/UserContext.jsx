import { createContext, useContext, useState } from 'react'

export const UserContext = createContext(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user] = useState({
    name: 'Jhulian Pulgarin Gonzalez',
    username: 'jhulian',
    initials: 'JP',
    color: '#3D6B5C',
    bio: 'medellin, amante a los albums',
    followers: 847,
    following: 213,
    posts: 34,
  })

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}