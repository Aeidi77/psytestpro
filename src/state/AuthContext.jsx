import { createContext, useContext, useEffect, useState } from 'react'
import { load, save } from '../utils/storage.jsx'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(load('__auth_user__', null))

  useEffect(() => {
    save('__auth_user__', user)
  }, [user])

  const login = (username, password) => {
    const users = load('users', [])
    const found = users.find(u => u.username === username && u.password === password)
    if (!found) return { ok: false, message: 'Username atau password salah' }
    setUser(found)
    return { ok: true }
  }

  const register = (payload) => {
    const users = load('users', [])
    if (users.some(u => u.username === payload.username)) {
      return { ok: false, message: 'Username sudah digunakan' }
    }
    users.push(payload)
    save('users', users)
    return { ok: true }
  }

  const logout = () => setUser(null)

  return <AuthCtx.Provider value={{ user, setUser, login, register, logout }}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
