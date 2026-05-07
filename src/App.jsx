import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LayoutDefault from './template/LayoutDefault/LayoutDefault'
import CreateCharacterForm from './components/CreateCharacterForm/CreateCharacterForm'


function App() {

  return (
    <LayoutDefault>
      <main>
        <Routes>
          <Route path='/' element={<CreateCharacterForm />} />
   
        </Routes>
      </main>
    </LayoutDefault>
  )
}

export default App
