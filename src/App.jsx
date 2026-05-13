import { Routes, Route } from 'react-router-dom'
import './App.css'
import LayoutDefault from './template/LayoutDefault/LayoutDefault'
import CreateCharacterForm from './components/CreateCharacterForm/CreateCharacterForm'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'


function App() {

  return (
    <LayoutDefault>
      <main>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/create-character' element={<CreateCharacterForm />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </main>
    </LayoutDefault>
  )
}

export default App
