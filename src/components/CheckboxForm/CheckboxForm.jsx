function CheckboxForm({ options, title ,onChange}) {
  return (
    <fieldset>
      {options.from.options.map((option) => {
        return (
          <>
            <label>{option.ability_score.name}</label>
            <input type="checkbox" 
            onChange={onChange}
            value={option.ability_score.name}/>
          </>
        );
      })}
    </fieldset>
  );
}

export default CheckboxForm;
