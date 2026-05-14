import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserCharacters } from "../../services/api"

function Dashboard() {
  const navigate = useNavigate()
  const [characters, setCharacters] = useState([])

  const handleCreateCharacter = () => {
    navigate('/create-character')
  }

  useState(() => {
    const getCharList = async () => {
      const res = await getUserCharacters()
      
      setCharacters(res)
    }
    getCharList()
  }, [])
  
  return (
    <>
      <button type="button" onClick={() => handleCreateCharacter()}>Create character</button>
      <div>
        {characters.map((character) => <p>{character?.name}</p>)}
      </div>
    </>
  )
}

export default Dashboard