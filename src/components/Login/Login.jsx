import axios from "axios"
import { useState } from "react"
import { loginUser } from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import useAuth from '../../context/useAuth.js'

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
    <>
      <form action="">
        <input type="email" 
        name="email" 
        id="email" 
        value={formData.email}
        onChange={(e) => setFormData((prev) => {return {...prev, email: e.target.value}})}/>
        <input type="password" 
        name="password" 
        id="password" 
        value={formData.password}
        onChange={(e) => setFormData((prev) => { return {...prev, password: e.target.value}})}/>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
      </form>

      <Link to='/register'>Register</Link>

      {error ? <div className="feedback error">{error}</div> : null}
    </>
  )
}

export default Login