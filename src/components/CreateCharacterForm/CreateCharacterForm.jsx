import axios from "axios"
import { useEffect, useState } from "react"
import ButtonForm from "../ButtonForm/ButtonForm"
import CheckboxForm from "../CheckboxForm/CheckboxForm"
import { createCharacter, createUserCharacter } from "../../services/api"
import { useNavigate } from "react-router-dom"
import styles from './CreateCharacterForm.module.css'

function CreateCharacterForm() {
  const navigate = useNavigate()
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
  const [languages, setLanguages] = useState([])
  const [answers, setAnswers]= useState([])
  const [classesList, setClassesList] = useState([])
  const [classes, setClasses] = useState('')
  const [classInfo, setClassInfo] = useState({})
  const [hitDie, setHitDie] = useState(0)
  const [savingThrow, setSavingThrow] = useState([])
  const [proficiencies, setProficiencies] = useState([])
  const [equipment, setEquipment] = useState([])
  const [atributes, setAtributes] = useState({})
  const [name, setName] = useState('')
  const [formData, setFormData] = useState({})

  //state to save the bonus abilities

  //pass the function to save the abilities in the higher state
const changeAbilityBonus=(e, source) =>{//{name,bonus}
  //check action
  //e.target.checked if answers.length>= ability_bonus_options.choose return 
  //else // setAnswers([...answers,bonusObject])
  //uncheck action
  if(answers.length < source.choose) {
    if (e.target.checked) {
      setAnswers((prev) => [...prev, ...source.from?.options.filter((option) => {
        if (option.ability_score) {
          return option.ability_score.name == e.target.value
        }
        if (option.item) {
          const op = option.item.name.split(':')[1]
          return op == e.target.value
        }

      })])
    }
    else {
      setAnswers((prev) => {
        const updatedAnswer = [...prev]
        const index = updatedAnswer.findIndex(() => e.target.value)
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
        const index = updatedAnswer.findIndex((value) => {
          if (value.ability_score) {
            return value.ability_score.name == e.target.value
          }
          if (value.item) {
            const op = value.item.name.split(':')[1]
            return op == e.target.value
          }
          
        })
        updatedAnswer.splice(index, 1)
        return updatedAnswer
      })
    }
  
  }
  

}

  
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
        setSubRaceInfo(res?.data)
      }
      if (formState == 5) {
        setClassesList(res?.data?.results)
      }
      if (formState == 6) {
        setClassInfo(res?.data)
      }
    }
    getFromAPI()
  }, [url])

  
 
  useEffect(() => {
    if (subRaceList?.length == 0 && race) {
      setFormState(3)
      if (!raceInfo?.ability_bonus_options) {
        setFormState((prev) => prev+1)
      }
    }
  }, [subRaceList])

  useEffect(() => {
    if (subRace) {
      setFormState((prev) => prev+1)
    }

  }, [subRace])

  // Form state
  useEffect(() => {

    if (formState == 1) {
      setUrl(`https://www.dnd5eapi.co/api/races`)
      setRace('')
      setSubRace('')
      setAbilityBonus([])
      setTraits([])
      setLanguages([])
      setClasses([])
      setHitDie(0)
      setSavingThrow([])
      setProficiencies([])
      setEquipment([])
      setAtributes({})
      setName('')
      setFormData({})

    }
    
    if (formState == 3) {
      setAbilityBonus(raceInfo.ability_bonuses)
      setAnswers([])
    }
    if (formState == 4) {
      setAnswers([])
      if (answers.length > 0) {
        setAbilityBonus((prev) => {
          return [...prev, ...answers]
        })
      }
      setFormState((prev) => prev+1)
    }
    if (formState == 5) {
      setUrl('https://www.dnd5eapi.co/api/classes')
    }
    if (formState == 7) {
      setProficiencies(() => {
        const proficienciesFilter = classInfo?.proficiencies.filter((proficiency) => !proficiency.name.startsWith('Saving Throw'))
        return proficienciesFilter.map((proficiency) => proficiency.name)
      })
      setAnswers([])
    }
    if (formState == 8) {
      setProficiencies((prev) => {
        return [...prev, ...answers.map((pro) => pro.item.name.split(':')[1].trim(''))]
      })

      setAtributes({
        STR: 8,
        CON: 8,
        DEX: 8,
        INT: 8,
        WIS: 8,
        CHA: 8
      })
    }

    if (formState == 10) {
      normilize()
    } 
    
  }, [formState])

  // Race info
  useEffect(() => {

    setTraits(() => {
      const raceTraits = raceInfo?.traits?.map((e) => e.name)
      return raceTraits
    })

    setAbilityBonus(raceInfo.ability_bonuses)

    setLanguages(() => {
      const raceLanguages = raceInfo?.languages?.map((languages) => languages.name)
      return raceLanguages
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

    setLanguages(() => {
      const raceLanguages = raceInfo?.languages?.map((e) => e.name)
      return raceLanguages
    })
  }, [subRaceInfo])


  // Class info
  useEffect(() => {

    if (formState == 6) {
      setHitDie(classInfo?.hit_die)

      setSavingThrow(() => {
        return classInfo?.saving_throws.map((st) => st.name)
      })

      setEquipment(classInfo?.starting_equipment)

      setAnswers([])

      setFormState((prev) => prev+1)
    }
    
  }, [classInfo])



    
  const normilize = () => {

    let listEquipment = []

    equipment.forEach(equipment => {
      listEquipment = [...listEquipment, equipment.equipment.name]
    });

    abilityBonus.forEach((ability) => {
      atributes[ability.ability_score.name] = atributes[ability.ability_score.name]*1 + ability.bonus*1
    })

    let listAtributes = []
    const listAtributesNames = Object.keys(atributes)
    listAtributesNames.forEach(atr => {
      listAtributes = [...listAtributes, {name: atr, val: atributes[atr]}]
    });

    let modCon = 0
    
    if (atributes.CON <= 9) {
      modCon = -1
    } else if (atributes.CON == 10 && atributes.CON <= 11) {
      modCon = 0
    } else if (atributes.CON == 12 && atributes.CON <= 13) {
      modCon = 1
    } else if (atributes.CON == 14 && atributes.CON <= 15) {
      modCon = 2
    } else if (atributes.CON == 16 && atributes.CON <= 17) {
      modCon = 3
    } else if (atributes.CON == 18 && atributes.CON <= 19) {
      modCon = 4
    } else if (atributes.CON == 20 && atributes.CON <= 21) {
      modCon = 5
    } else if (atributes.CON == 22 && atributes.CON <= 23) {
      modCon = 6
    }

    const life = hitDie + modCon
    

    setFormData({
      race: race,
      sub_race: subRace,
      traits: traits,
      languages: languages,
      class: classes,
      hit_die: hitDie,
      proficiencies: proficiencies,
      equipment: listEquipment,
      atributes: listAtributes,
      level: 1,
      name: name,
      life: life,
      saving_throws: savingThrow
    })
  }


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

  const chooseClass = (classes) => {
    setClasses(classes?.name)

    setFormState((prev) => prev+1)
    setUrl(`https://www.dnd5eapi.co${classes?.url}`)
  }

  const atributesTable = () => {
    return (
      <>
      <label>Strength</label>
      <input type="number" min={8} max={20} name="STR" id="" step={1} value={atributes.STR} onChange={(e) => setAtributes({...atributes, STR: e.target.value})}/>
      <label>Constitution</label>
      <input type="number" min={8} max={20} name="CON" id="" step={1} value={atributes.CON} onChange={(e) => setAtributes({...atributes, CON: e.target.value})}/>
      <label>Dexterity</label>
      <input type="number" min={8} max={20} name="DEX" id="" step={1} value={atributes.DEX} onChange={(e) => setAtributes({...atributes, DEX: e.target.value})}/>
      <label>Inteligence</label>
      <input type="number" min={8} max={20} name="INT" id="" step={1} value={atributes.INT} onChange={(e) => setAtributes({...atributes, INT: e.target.value})}/>
      <label>Wisdom</label>
      <input type="number" min={8} max={20} name="WIS" id="" step={1} value={atributes.WIS} onChange={(e) => setAtributes({...atributes, WIS: e.target.value})}/>
      <label>Charisma</label>
      <input type="number" min={8} max={20} name="CHA" id="" step={1} value={atributes.CHA} onChange={(e) => setAtributes({...atributes, CHA: e.target.value})}/>
      </>
    )
  }
  

  

  const  HandleCreateCharacter = async () => {
    try{
      const res = await createCharacter(formData)
      const data = {characterId: res}
      await createUserCharacter(data)

      navigate('/dashboard')
    } catch (err) {
      throw new Error(err)
    }
    
    
  }

  return(
    <div className={styles["app-container"]}>
      <div className={styles["forms-wrapper"]}>
        {/* Left Form - Information Display */}
        <form className={styles["info-form"]}>
          <h3 className={styles["form-title"]}>Character Information</h3>
          
          <div className={styles["form-group"]}>
            <label>Race</label>
            <input type="text" value={race} readOnly />
          </div>

          {subRace && (
            <div className={styles["form-group"]}>
              <label>Sub Race</label>
              <input type="text" value={subRace} readOnly />
            </div>
          )}

          <div className={styles["form-group"]}>
            <label>Ability Score Bonus</label>
            {abilityBonus?.map((ability) => (
              <input 
                key={ability} 
                type="text" 
                value={`${ability.ability_score.name} ${ability.bonus}`}
                readOnly
              />
            ))}
          </div>

          <div className={styles["form-group"]}>
            <label>Languages</label>
            {languages ? <input type="text" value={languages} readOnly /> : null}
          </div>

          <div className={styles["form-group"]}>
            <label>Traits</label>
            {traits ? traits.map((trait) => (
              <input key={trait} type="text" value={trait} readOnly />
            )) : null}
          </div>

          <div className={styles["form-group"]}>
            <label>Proficiencies</label>
            <input type="text" value={classes} readOnly />
          </div>

          <div className={styles["form-group"]}>
            <label>Hit Die</label>
            <input type="number" value={hitDie} readOnly />
          </div>

          <div className={styles["form-group"]}>
            <label>Additional Proficiencies</label>
            {proficiencies ? proficiencies.map((proficiency, idx) => (
              <input key={idx} type="text" value={proficiency} readOnly />
            )) : null}
          </div>

          <div className={styles["form-group"]}>
            <label>Equipment</label>
            {equipment ? equipment.map((item, idx) => (
              <input key={idx} type="text" value={item.equipment.name} readOnly />
            )) : null}
          </div>
        </form>

        {/* Center Form - Interactive Selection */}
        <form className={styles["center-form"]}>
          <h3 className={styles["form-title"]}>Character Creation</h3>
          
          {raceInfo?.ability_bonus_options && formState == 3 && (
            <>
              <div className={styles["form-group"]}>
                <label>{`Choose ${raceInfo?.ability_bonus_options.choose}`}</label>
                <CheckboxForm 
                  name='ability_score' 
                  options={raceInfo?.ability_bonus_options} 
                  onChange={(e) => changeAbilityBonus(e, raceInfo?.ability_bonus_options)}
                />
              </div>
            </>
          )}
          
          {formState == 7 && classInfo?.proficiency_choices[0] && (
            <>
              <div className={styles["form-group"]}>
                <label>{`Choose ${classInfo?.proficiency_choices[0].choose}`}</label>
                <CheckboxForm 
                  name='proficency' 
                  options={classInfo?.proficiency_choices[0]} 
                  onChange={(e) => changeAbilityBonus(e, classInfo?.proficiency_choices[0])}
                />
              </div>
            </>
          )}
          
          {formState == 8 && (
            <div className={styles["attributes-table"]}>
              {/* Your attributes table component */}
              {atributesTable()}
            </div>
          )}
          
          {formState == 9 && (
            <div className={styles["form-group"]}>
              <label>Name your character</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter character name..."
              />
            </div>
          )}

          {/* Buttons Section */}
          <div className={styles["buttons-container"]}>
            {formState == 1 && raceList?.map((race) => (
              <ButtonForm 
                key={race.name} 
                text={race.name} 
                onClick={() => chooseRace(race)}
              />
            ))}
            
            {formState == 2 && subRaceList?.map((subRaces) => (
              <ButtonForm 
                key={subRaces.name} 
                text={subRaces?.name} 
                onClick={() => chooseSubRace(subRaces)}
              />
            ))}
            
            {formState == 5 && classesList?.map((classes) => (
              <ButtonForm 
                key={classes.name} 
                text={classes?.name} 
                onClick={() => chooseClass(classes)}
              />
            ))}
          </div>
        </form>
      </div>

      

      {/* Navigation Buttons */}
      <div className={styles["nav-buttons"]}>
        {formState > 1 && (
          <button 
            type="button" 
            className={`${styles['nav-btn']} ${styles['reset-btn']}`}
            onClick={() => setFormState(1)}
          >
            Reset
          </button>
        )}
        
        {formState > 1 && formState < 10 && (
          <button 
            type="button" 
            className={styles["nav-btn"]}
            onClick={() => setFormState((prev) => prev + 1)}
          >
            Next →
          </button>
        )}
      </div>

      {/* Create Button */}
      {formState == 10 && (
        <button 
          type="button" 
          className={styles["create-btn"]}
          onClick={() => HandleCreateCharacter((prev) => prev + 1)}
        >
          Create Character
        </button>
      )}
    </div>
  )
}

export default CreateCharacterForm