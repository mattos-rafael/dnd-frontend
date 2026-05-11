import axios from "axios"
import { useState } from "react"

function Login() {
  const [formData, setFormData] = useState({email: '', password: ''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://dnd-backend-3a9o.onrender.com/api/auth/login', formData)
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
    </>
  )
}

export default Login