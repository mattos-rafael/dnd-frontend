import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserCharacters } from "../../services/api"
import styles from './Dashboard.module.css'

function Dashboard() {
  const navigate = useNavigate()
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  const handleCreateCharacter = () => {
    navigate('/create-character')
  }

  useState(() => {
    const getCharList = async () => {
      try {
        const res = await getUserCharacters()
        setCharacters(res)
      } catch (error) {
        console.error("Error fetching characters:", error)
      } finally {
        setLoading(false)
      }
    }
    getCharList()
  }, [])

  const charInfo = (character) => {
    navigate('/character-info', { state: { character: character } })
  }

  const charCard = (character) => {
    return (
      <article key={character.id} className={styles.characterCard}>
        <h3 className={styles.characterName}>{character.name}</h3>
        <p className={styles.characterClass}>{character.class}</p>
        {character.race && (
          <p className={styles.characterRace}>{character.race}</p>
        )}
        {character.level && (
          <span className={styles.characterLevel}>Level {character.level}</span>
        )}
        <div className={styles.cardFooter}>
          <button 
            type="button" 
            className={styles.infoBtn} 
            onClick={() => charInfo(character)}
          >
            View Info
          </button>
        </div>
      </article>
    )
  }
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Characters</h1>
          <button 
            type="button" 
            className={styles.createBtn} 
            onClick={() => handleCreateCharacter()}
          >
            + Create Character
          </button>
        </div>
        
        {loading ? (
          <div className={styles.loadingState}>
            <div>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loadingText}>Loading characters...</p>
            </div>
          </div>
        ) : characters.length > 0 ? (
          <div className={styles.charactersGrid}>
            {characters.map((character) => charCard(character))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎮</div>
            <h3 className={styles.emptyTitle}>No Characters Yet</h3>
            <p className={styles.emptyText}>Create your first character to begin your adventure!</p>
            <button 
              type="button" 
              className={styles.emptyBtn} 
              onClick={() => handleCreateCharacter()}
            >
              Create Character
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard