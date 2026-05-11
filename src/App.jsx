import { Routes, Route } from 'react-router-dom'
import './App.css'
import LayoutDefault from './template/LayoutDefault/LayoutDefault'
import CreateCharacterForm from './components/CreateCharacterForm/CreateCharacterForm'
import Login from './components/Login/Login'


function App() {

  return (
    <LayoutDefault>
      <main>
        <Routes>
          <Route path='/create-character' element={<CreateCharacterForm />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </LayoutDefault>
  )
}

export default App
