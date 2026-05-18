import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../context/useAuth'
import styles from './Register.module.css'

function Register() {
  const navigate = useNavigate()
  const {error, register, setError} = useAuth()
  const [formData, setFormData] = useState({email: '', name: '', password: '', password2: ''})
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      await register(formData)
      setSuccess('Usuario creado. Ahora puedes hacer login.')
      setTimeout(() => navigate('/login'), 900)
    } catch {
      return
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-card"]}>
        <div className={styles["register-title"]}>
          <h2>Create Account</h2>
          <p>Sign up to get started</p>
        </div>
        
        <form className={styles["register-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => {return {...prev, email: e.target.value}})}
              required
            />
          </div>
          
          <div className={styles["form-group"]}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => {return {...prev, name: e.target.value}})}
              required
            />
          </div>
          
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => { return {...prev, password: e.target.value}})}
              required
            />
          </div>
          
          <div className={styles["form-group"]}>
            <label htmlFor="password2">Confirm Password</label>
            <input 
              type="password" 
              name="password2" 
              id="password2" 
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={(e) => setFormData((prev) => { return {...prev, password2: e.target.value}})}
              required
            />
          </div>
          
          <button type="submit" className={styles["register-btn"]} onClick={(e) => handleSubmit(e)}>
            Register
          </button>
        </form>
        
        <div className={styles["login-link"]}>
          <span>Already have an account?</span>
          <Link to='/login'>Login</Link>
        </div>
        
        {error ? <div className={styles["feedback error"]}>{error}</div> : null}
        {success ? <div className={styles["feedback success"]}>{success}</div> : null}
      </div>
    </div>
  )
}

export default Register
