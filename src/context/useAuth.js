import { useContext } from 'react'
import { AuthContext } from './authContext.js'

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export default useAuth