import axios from "axios"
import { useEffect, useState } from "react"
import ButtonForm from "../ButtonForm/ButtonForm"

function CreateCharacterForm() {
  const [url, setUrl] = useState('https://www.dnd5eapi.co/api/races')
  const [formState, setFormState] = useState(1)
  const [race, setRace] = useState('')
  const [raceInfo, setRaceInfo] = useState('')
  const [raceList, setRaceList] = useState([])
  const [subRace, setSubRace] = useState({})
  const [subRaceList, setSubRaceList] = useState([])
  const [abilityBonus, setAbilityBonus] = useState([])
  const [traits, setTraits] = useState([])
  const [lenguages, setLenguages] = useState([])
  

  useEffect(() => {
    const getFromAPI = async () => {
      const res = await axios.get(url)
      
      if(formState == 1) {
        setRaceList(res?.data?.results)
      }
      if (formState == 2) {
        setRaceInfo(res?.data)
        setSubRaceList(res?.data?.subraces)
      }
    }
    getFromAPI()
  }, [url, formState])

  
  
  useEffect(() => {
    if (subRaceList?.length == 0 && race) {
      setFormState((prev) => prev+1)
    }
  }, [subRaceList])


  useEffect(() => {
    console.log(formState)

    if (formState == 1) {
      setUrl(`https://www.dnd5eapi.co/api/races`)
    }
    if (formState == 2) {
      console.log(raceInfo)
    }
    
  }, [formState])

  useEffect(() => {

    setTraits(() => {
      const raceTraits = raceInfo?.traits?.map((e) => e.name)
      return raceTraits
    })

    setAbilityBonus(raceInfo.ability_bonuses)

    setLenguages(() => {
      const raceLenguages = raceInfo?.languages?.map((e) => e.name)
      return raceLenguages
    })
  }, [raceInfo])

  // useEffect(() => {
  //   console.log(abilityBonus)
  // }, [abilityBonus])
  // useEffect(() => {
  //   console.log(traits)
  // }, [traits])
  // useEffect(() => {
  //   console.log(lenguages)
  // }, [lenguages])

    


  const chooseRace = (race) => {
    setRace(race?.name)

    setFormState((prev) => prev+1)
    setUrl(`https://www.dnd5eapi.co${race?.url}`)
  }

  return(
    <>
      <form>
        <input type="text"
        value={race}
        />
        {abilityBonus?.map((ability, id) => <input key={id} type="text" value={`${ability.ability_score.name} ${ability.bonus}`}/>)}
        {lenguages ? <input type="text" value={lenguages}/> : null}
      </form>

      
      {formState == 1 ? raceList?.map((race) => <ButtonForm key={race.name} text={race.name} onClick={() => chooseRace(race)}/>) : null}
      {formState == 2 ? subRaceList?.map((subRaces) => <ButtonForm key={subRaces.name} text={subRaces?.name}></ButtonForm>) : null}
      

      {formState > 1 ? <button type="button" onClick={() => setFormState((prev) => prev-1)}>Back</button> : null}
      {formState > 1 ? <button type="button" onClick={() => setFormState((prev) => prev+1)}>Next</button> : null}
    </>
  )
}

export default CreateCharacterForm