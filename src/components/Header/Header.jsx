import { useEffect } from 'react'
import useAuth from '../../context/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const navigate = useNavigate()
  const {user, refreshSession, logout} = useAuth()
  
  useEffect(() => {
    refreshSession()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      throw new Error(err)
    }
  }

  // Get user initial for avatar
  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  
  return(
    <header className={styles["header"]}>
      <div className={styles["headerContent"]}>
        {user ? <h1 className={styles['header-title']}><Link to={'/dashboard'}>The Tavern</Link></h1> : <h1 className={styles['header-title']}>The Tavern</h1>}
        {user ? (
          <div className={styles["userInfo"]}>
            <div className={styles["userAvatar"]}>{getUserInitial()}</div>
            <Link to={'/user'} className={styles["userEmail"]}>{user.email}</Link>
            <button 
              type="button" 
              className={styles["logoutBtn"]} 
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header