import axios from "axios"
import { useEffect, useState } from "react"
import ButtonForm from "../ButtonForm/ButtonForm"

function CreateCharacterForm() {
  const [url, setUrl] = useState('https://www.dnd5eapi.co/api/races')
  const [formState, setFormState] = useState(1)
  const [race, setRace] = useState('')
  const [raceList, setRaceList] = useState([])
  const [subRace, setSubRace] = useState({})
  const [subRaceList, setSubRaceList] = useState([])
  

  useEffect(() => {
    const getFromAPI = async () => {
      const res = await axios.get(url)
      
      if(formState == 1) {
        setRaceList(res?.data?.results)
      }
      if (formState == 2) {
        setSubRaceList(res?.data?.subraces)
      }
      
    }
    getFromAPI()
  }, [url])

  useEffect(() => {
    console.log(subRaceList)
  }, [subRaceList])


    


  const chooseRace = (race) => {
    setRace(race?.name)

    setFormState((prev) => prev+1)
    setUrl(`https://www.dnd5eapi.co${race?.url}`)
    
  }

  useEffect(() => {
    if (formState == 1) {
      setUrl(`https://www.dnd5eapi.co/api/races`)
    }
    if (formState == 2) {
      setUrl(`https://www.dnd5eapi.co${race?.url}`)
    }
    
  }, [formState])

  return(
    <>
      <form>
        <input type="text"
        value={race}
        />
      </form>

      
      {formState == 1 ? raceList.map((race) => <ButtonForm text={race.name} onClick={() => chooseRace(race)}/>) : null}
      {formState == 2 ? subRaceList.map((subRaces) => <ButtonForm text={subRaces?.name}></ButtonForm>) : null}

      {formState > 1 ? <button type="button" onClick={() => setFormState((prev) => prev-1)}>Back</button> : null}
    </>
  )
}

export default CreateCharacterForm