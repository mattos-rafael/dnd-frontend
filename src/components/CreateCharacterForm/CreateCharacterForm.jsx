import axios from "axios"
import { useEffect, useState } from "react"
import ButtonForm from "../ButtonForm/ButtonForm"
import CheckboxForm from "../CheckboxForm/CheckboxForm"

function CreateCharacterForm() {
  const [url, setUrl] = useState('https://www.dnd5eapi.co/api/races')
  const [formState, setFormState] = useState(1)
  const [race, setRace] = useState('')
  const [raceInfo, setRaceInfo] = useState({})
  const [raceList, setRaceList] = useState([])
  const [subRace, setSubRace] = useState('')
  const [subRaceInfo, setSubRaceInfo] = useState({})
  const [subRaceList, setSubRaceList] = useState([])
  const [abilityBonus, setAbilityBonus] = useState([])
  const [traits, setTraits] = useState([])
  const [lenguages, setLenguages] = useState([])
  const [answers, setAnswers]= useState([])


  //state to save the bonus abilities

  //pass the function to save the abilities in the higher state
const changeAbilityBonus=(e) =>{//{name,bonus}
  //check action
  //e.target.checked if answers.length>= ability_bonus_options.choose return 
  //else // setAnswers([...answers,bonusObject])
  //uncheck action
  if(answers.length < raceInfo?.ability_bonus_options?.choose) {
    console.log(raceInfo?.ability_bonus_options?.from.options)
    if (e.target.checked) {
      console.log(e.target.value)
      setAnswers((prev) => [...prev, ...raceInfo?.ability_bonus_options?.from?.options.filter((option) => option.ability_score.name == e.target.value)])
    }
    else {
      setAnswers((prev) => {
        const updatedAnswer = [...prev]
        const index = updatedAnswer.findIndex(() => e.target.value)
        console.log(index)
        updatedAnswer.splice(index, 1)
        return updatedAnswer
      })
    }
  }
  else {
    if (e.target.checked) {
      e.target.checked = false
      return
    }

    if (!e.target.checked) {
      setAnswers((prev) => {
        const updatedAnswer = [...prev]
        const index = updatedAnswer.findIndex((value) => value == e.target.value)
        console.log(index)
        updatedAnswer.splice(index, 1)
        return updatedAnswer
      })
    }
  
  }
  

}
  //this handler must limit the number of checked options

  // name bonus, number of options and max number of choices

  


  
// API call
  useEffect(() => {
    const getFromAPI = async () => {
      const res = await axios.get(url)
      
      if (formState == 1) {
        setRaceList(res?.data?.results)
      }
      if (formState == 2) {
        setRaceInfo(res?.data)
        setSubRaceList(res?.data?.subraces)
      }
      if (formState == 3) {
        setSubRaceInfo(res.data)
      }
    }
    getFromAPI()
  }, [url])

  
 
  useEffect(() => {
    if (subRaceList?.length == 0 && race) {
      setFormState((prev) => prev+1)
    }
  }, [subRaceList])


  // Form state
  useEffect(() => {
    console.log(formState)

    if (formState == 1) {
      setUrl(`https://www.dnd5eapi.co/api/races`)
    }
    if (formState == 2) {
      console.log(raceInfo)
    }
    if (formState == 3) {
      setAbilityBonus(raceInfo.ability_bonuses)
    }

    if (formState == 4) {
      if (answers.length > 0) {
        setAbilityBonus((prev) => {
          return [...prev, ...answers]
        })
      }
    }
    
  }, [formState])

  // Race info
  useEffect(() => {

    setTraits(() => {
      const raceTraits = raceInfo?.traits?.map((e) => e.name)
      return raceTraits
    })

    setAbilityBonus(raceInfo.ability_bonuses)

    setLenguages(() => {
      const raceLenguages = raceInfo?.languages?.map((lenguages) => lenguages.name)
      return raceLenguages
    })
  }, [raceInfo])

  // SubRace info
  useEffect(() => {

    if (traits.length > 0) {
      setTraits((prev) => {
        const raceTraits = subRaceInfo?.racial_traits?.map((traits) => traits.name)
        return [...prev, ...raceTraits]
      })
    }
    
    if (abilityBonus.length > 0) {
      setAbilityBonus((prev) => [...prev, ...subRaceInfo.ability_bonuses])
    }

    setLenguages(() => {
      const raceLenguages = raceInfo?.languages?.map((e) => e.name)
      return raceLenguages
    })
  }, [subRaceInfo])

  useEffect(() => {
    console.log(abilityBonus)
  }, [abilityBonus])
  // useEffect(() => {
  //   console.log(traits)
  // }, [traits])
  // useEffect(() => {
  //   console.log(lenguages)
  // }, [lenguages])
  // useEffect(() => {
  //   console.log(subRaceInfo)
  // }, [subRaceInfo])
  useEffect(() => {
    console.log(answers)
  }, [answers])
    


  const chooseRace = (race) => {
    setRace(race?.name)
    setSubRace('')

    setFormState((prev) => prev+1)
    setUrl(`https://www.dnd5eapi.co${race?.url}`)
  }

  const chooseSubRace = (subRace) => {
    setSubRace(subRace?.name)

    setFormState((prev) => prev+1)
    setUrl(`https://www.dnd5eapi.co${subRace?.url}`)
  }

  

  return(
    <>
      <form>
        <input type="text"
        value={race}
        />
        <input type="text"
        value={subRace}
        />
        {abilityBonus?.map((ability, id) => <input key={id} type="text" value={`${ability.ability_score.name} ${ability.bonus}`}/>)}
        {lenguages ? <input type="text" value={lenguages}/> : null}
        {raceInfo?.ability_bonus_options ? <CheckboxForm name='ability_score' options={raceInfo?.ability_bonus_options} onChange={(e) => changeAbilityBonus(e)}/> : null}
        {traits ? <input type="text" value={traits}/> : null}
      </form>

      
      {formState == 1 ? raceList?.map((race) => <ButtonForm key={race.name} text={race.name} onClick={() => chooseRace(race)}/>) : null}
      {formState == 2 ? subRaceList?.map((subRaces) => <ButtonForm key={subRaces.name} text={subRaces?.name} onClick={() => chooseSubRace(subRaces)}></ButtonForm>) : null}
      

      {formState > 1 ? <button type="button" onClick={() => setFormState((prev) => prev-1)}>Back</button> : null}
      {formState > 1 ? <button type="button" onClick={() => setFormState((prev) => prev+1)}>Next</button> : null}
    </>
  )
}

export default CreateCharacterForm