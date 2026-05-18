import styles from './ButtonForm.module.css'

function ButtonForm({text, onClick}) {
  return(
    <button type="button" className={styles.button} onClick={onClick}>
      {text}
    </button>
  )
}

export default ButtonForm