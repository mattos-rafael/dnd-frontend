import { useEffect, useState } from 'react'
import { getMe, loginUser, logoutUser, registerUser } from '../services/api.js'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  // Comprueba si hay un usuario logado
  const refreshSession = async () => {
    try {
      const data = await getMe()
      setError('')
      setUser(data.user)
    } catch {
      setError('')
      setUser(null)
    } 
  }

  useEffect(() => {
    const refresh = async () => {
      await refreshSession()
    }

    refresh()
  }, [])

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials)
      setError('')
      setUser(data.user)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const register = async (payload) => {
    try {
      const data = await registerUser(payload)
      setError('')
      return data
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      setError('')
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setError,
        login,
        register,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}