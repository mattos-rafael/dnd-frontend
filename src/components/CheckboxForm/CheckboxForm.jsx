import styles from './CheckboxForm.module.css'

function CheckboxForm({ options, title, onChange }) {
  return (
    <fieldset className={styles["checkbox-fieldset"]}>
      {title && <legend className={styles["checkbox-legend"]}>{title}</legend>}
      <div className="checkbox-grid">
        {options.from.options.map((option, index) => {
          if (option.ability_score) {
            return (
              <label key={index} className={styles["checkbox-option"]}>
                <span className="checkbox-label">{option.ability_score.name}</span>
                <input 
                  type="checkbox" 
                className={styles["checkbox-input"]}
                  onChange={onChange}
                  value={option.ability_score.name}
                />
                <span className="checkbox-custom"></span>
              </label>
            )
          }
          if (option.item) {
            const op = option.item.name.split(":")[1]
            return (
              <label key={index} className={styles["checkbox-option"]}>
                <span className="checkbox-label">{op}</span>
                <input 
                  type="checkbox" 
                className={styles["checkbox-input"]}
                  onChange={onChange}
                  value={op}
                />
                <span className={styles["checkbox-custom"]}></span>
              </label>
            )
          }
          return null
        })}
      </div>
    </fieldset>
  );
}

export default CheckboxForm;