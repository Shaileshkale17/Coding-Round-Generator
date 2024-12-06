const SelectBox = ({ label, optionMap, setInput, inputValue }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <select
        className="md:w-80 w-72 border rounded p-2   border-solid border-black "
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}>
        <option value="" disabled>
          Select {label}
        </option>
        {optionMap.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
