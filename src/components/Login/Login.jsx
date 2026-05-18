import axios from "axios"
import { useState } from "react"
import { loginUser } from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import useAuth from '../../context/useAuth.js'
import styles from'./Login.module.css'

function Login() {
  const navigate = useNavigate()
  const {error, login, setError} = useAuth()
  const [formData, setFormData] = useState({email: '', password: ''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(formData)
      navigate('/dashboard')
      console.log(res)
    } catch (err) {
      throw err
    }
  }
  
  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <div className={styles["login-title"]}>
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>
        
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => { return {...prev, password: e.target.value}})}
              required
            />
          </div>
          
          <button type="submit" className={styles["login-btn"]} onClick={(e) => handleSubmit(e)}>
            Login
          </button>
        </form>
        
        <div className={styles["register-link"]}>
          <span>Don't have an account?</span>
          <Link to='/register'>Register</Link>
        </div>
        
        {error ? <div className={styles["feedback error"]}>{error}</div> : null}
      </div>
    </div>
  )
}

export default Login