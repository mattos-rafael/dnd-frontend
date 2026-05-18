import { Routes, Route } from 'react-router-dom'
import './App.css'
import LayoutDefault from './template/LayoutDefault/LayoutDefault'
import CreateCharacterForm from './components/CreateCharacterForm/CreateCharacterForm'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import CharacterInfo from './components/CharacterInfo/CharacterInfo'
import User from './components/User/User'


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
          <Route path='/character-info' element={<CharacterInfo />}/>
          <Route path='/user' element={<User />}/>
        </Routes>
      </main>
    </LayoutDefault>
  )
}

export default App
