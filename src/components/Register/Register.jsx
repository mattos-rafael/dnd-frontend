import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../context/useAuth'

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
    <>
      <form action="">
        <input type="email" 
        name="email" 
        id="email" 
        value={formData.email}
        onChange={(e) => setFormData((prev) => {return {...prev, email: e.target.value}})}/>
        <input type="text" 
        name='name'
        id='name'
        value={formData.name}
        onChange={(e) => setFormData((prev) => {return {...prev, name: e.target.value}})}/>
        <input type="password" 
        name="password" 
        id="password" 
        value={formData.password}
        onChange={(e) => setFormData((prev) => { return {...prev, password: e.target.value}})}/>
        <input type="password" 
        name="password2" 
        id="password2" 
        value={formData.password2}
        onChange={(e) => setFormData((prev) => { return {...prev, password2: e.target.value}})}/>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Register</button>
      </form>

      <Link to='/login'>Login</Link>

      {error ? <div className="feedback error">{error}</div> : null}
      {success ? <div className="feedback success">{success}</div> : null}
    </>
  )
}

export default Register
