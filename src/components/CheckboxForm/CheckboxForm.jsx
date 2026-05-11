function CheckboxForm({ options, title ,onChange}) {
  console.log(options)
  return (
    <fieldset>
      {options.from.options.map((option) => {
        if (option.ability_score) {
          return (
            <>
              <label>{option.ability_score.name}</label>
              <input type="checkbox" 
              onChange={onChange}
              value={option.ability_score.name}/>
            </>
          )
        }
        if (option.item) {
          const op = option.item.name.split(":")[1]
          return (
            <>
              <label>{op}</label>
              <input type="checkbox" 
              onChange={onChange}
              value={op}/>
            </>
          )
        }
        

        
      })}
    </fieldset>
  );
}

export default CheckboxForm;
