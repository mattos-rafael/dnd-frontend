import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
})

const request = async (callback) => {
  try {
    const res = await callback()
    return res.data
  } catch (err) {
    const message = err.response?.data?.message || "An error has occurred with the API"
    throw new Error(message, {cause: err})
  }
}

const registerUser = (payload) => request(() => api.post('/api/auth/register', payload))
const loginUser = (payload) => request(() => api.post('/api/auth/login', payload))
const logoutUser = () => request(() => api.post('/api/auth/logout'))
const getMe = () => request(() => api.get('/api/auth/me'))

const createCharacter = (payload) => request(() => api.post('/api/character/', payload))

export {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  createCharacter
}