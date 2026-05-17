import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './CharacterInfo.module.css'

function CharacterInfo () {
  const location = useLocation()
  const navigate = useNavigate()
  const character = location.state.character

  useEffect(() => {
    console.log(location.state.character)
  }, [])

  const getAtributes = (atr) => {
    const res = character?.atributes.map(atribute => {
      if (atribute.name == atr) {
        return atribute.val
      }
    });
    return res
  }

  const handleGoBack = () => {
    navigate('/dashboard')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.backButton} onClick={handleGoBack}>
          ← Back to Dashboard
        </button>
        
        <div className={styles.characterCard}>
          <div className={styles.header}>
            <h1 className={styles.characterName}>{character.name}</h1>
            <div className={styles.characterMeta}>
              <span className={styles.metaBadge}>Level {character.level}</span>
              <span className={styles.metaBadge}>{character.class}</span>
            </div>
          </div>
          
          <div className={styles.body}>
            {/* Race Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Race</h2>
              <p className={styles.textContent}>{character.race}</p>
              {character.sub_race && (
                <>
                  <h2 className={styles.sectionTitle} style={{ marginTop: '16px' }}>Sub Race</h2>
                  <p className={styles.textContent}>{character.sub_race}</p>
                </>
              )}
            </div>

            {/* Health Stats */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Health</h2>
              <div className={styles.healthStats}>
                <div className={styles.healthCard}>
                  <div className={styles.healthLabel}>Life Points</div>
                  <div className={styles.healthValue}>{character.life}</div>
                </div>
                <div className={styles.healthCard}>
                  <div className={styles.healthLabel}>Hit Die</div>
                  <div className={styles.healthValue}>1d{character.hit_die}</div>
                </div>
              </div>
            </div>

            {/* Attributes Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Attributes</h2>
              <div className={styles.attributesGrid}>
                <div className={styles.attributeItem}>
                  <span className={styles.attributeLabel}>Strength</span>
                  <span className={styles.attributeValue}>{getAtributes('STR')}</span>
                </div>
                <div className={styles.attributeItem}>
                  <span className={styles.attributeLabel}>Constitution</span>
                  <span className={styles.attributeValue}>{getAtributes('CON')}</span>
                </div>
                <div className={styles.attributeItem}>
                  <span className={styles.attributeLabel}>Dexterity</span>
                  <span className={styles.attributeValue}>{getAtributes('DEX')}</span>
                </div>
                <div className={styles.attributeItem}>
                  <span className={styles.attributeLabel}>Intelligence</span>
                  <span className={styles.attributeValue}>{getAtributes('INT')}</span>
                </div>
                <div className={styles.attributeItem}>
                  <span className={styles.attributeLabel}>Wisdom</span>
                  <span className={styles.attributeValue}>{getAtributes('WIS')}</span>
                </div>
                <div className={styles.attributeItem}>
                  <span className={styles.attributeLabel}>Charisma</span>
                  <span className={styles.attributeValue}>{getAtributes('CHA')}</span>
                </div>
              </div>
            </div>

            {/* Combat Stats */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Combat</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Proficiency Bonus</span>
                  <span className={styles.statValue}>+{character.proficency}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Class</span>
                  <span className={styles.statValue}>{character.class}</span>
                </div>
              </div>
            </div>

            {/* Proficiencies Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Proficiencies</h2>
              <div className={styles.listContainer}>
                {character ? character.proficiencies.map((proficiency, index) => (
                  <span key={index} className={styles.listItem}>{proficiency}</span>
                )) : null}
              </div>
            </div>

            {/* Traits Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Traits</h2>
              <div className={styles.listContainer}>
                {character ? character.traits.map((trait, index) => (
                  <span key={index} className={styles.listItem}>{trait}</span>
                )) : null}
              </div>
            </div>

            {/* Equipment Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Equipment</h2>
              <p className={styles.textContent}>{character.equipment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterInfo