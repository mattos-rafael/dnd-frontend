import { useState } from "react"
import useAuth from "../../context/useAuth"
import styles from './User.module.css'

function User () {
  const {error, user, changePassword} = useAuth()
  const [formData, setFormData] = useState({oldPassword: '',  password:  '', password2: ''})
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  const handleChangePassword = async (e) => {
    e.preventDefault()
    try {
      const data = await changePassword(formData)
      setMessage(data.message)
      setMessageType('success')
      setFormData({oldPassword: '',  password:  '', password2: ''})
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 3000)
    } catch (err) {
      setMessage(err.message || 'Failed to change password')
      setMessageType('error')
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 3000)
    }
  }

  // Get user initial for avatar
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase()
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.userCard}>
          <div className={styles.header}>
            <div className={styles.userIcon}>
              {getUserInitial()}
            </div>
            <h1 className={styles.userName}>{user?.name || 'User'}</h1>
            <p className={styles.userEmail}>{user?.email}</p>
          </div>
          
          <div className={styles.body}>
            <form className={styles.form} onSubmit={handleChangePassword}>
              {/* User Info Section */}
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Account Information</span>
                <p className={styles.infoValue}>Email: {user?.email}</p>
                <p className={styles.infoValue}>Name: {user?.name}</p>
              </div>

              <div className={styles.divider}>
                <span>Change Password</span>
              </div>
              
              {/* Old Password */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Password</label>
                <input 
                  type="password" 
                  className={styles.input}
                  placeholder="Enter your current password"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData((prev) => {return {...prev, oldPassword: e.target.value}})}
                  required
                />
              </div>
              
              {/* New Password */}
              <div className={styles.formGroup}>
                <label className={styles.label}>New Password</label>
                <input 
                  type="password" 
                  className={styles.input}
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => {return {...prev, password: e.target.value}})}
                  required
                />
              </div>
              
              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input 
                  type="password" 
                  className={styles.input}
                  placeholder="Confirm your new password"
                  value={formData.password2}
                  onChange={(e) => setFormData((prev) => {return {...prev, password2: e.target.value}})}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn}
              >
                Change Password
              </button>
            </form>
            
            {message && (
              <div className={`${styles.message} ${messageType === 'success' ? styles.messageSuccess : styles.messageError}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default User