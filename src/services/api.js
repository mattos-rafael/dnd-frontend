import axios from "axios";

axios.defaults.withCredentials = true
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
})

// 1. get the cookie with js
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const cookie = getCookie('accessToken')

const header = {authorization: `Bearer ${cookie}`}
console.log(header)

// 2. add a header for each request with te bearer token
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
const createUserCharacter = (payload) => request(() => api.post('/api/user/', payload), {headers: header})

export {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  createCharacter,
  createUserCharacter
}