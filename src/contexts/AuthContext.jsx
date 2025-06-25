// src/contexts/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../lib/supabase'    // <-- default import now

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // on mount, get session
    const session = supabase.auth.session()
    setUser(session?.user ?? null)

    // listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )
    return () => listener.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
