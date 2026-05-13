import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()

  const handleCreateCharacter = () => {
    navigate('/create-character')
  }

  return (
    <>
      <button type="button" onClick={() => handleCreateCharacter()}>Create character</button>
    </>
  )
}

export default Dashboard