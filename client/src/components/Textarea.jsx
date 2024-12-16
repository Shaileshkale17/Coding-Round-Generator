import React, { useState } from "react";

const Textarea = ({
  setInput,
  type,
  name,
  id,
  inputValue,
  label,
  style,
  placeholder,
  cols,
  rows,
}) => {
  const [Eye, setEye] = useState(false);
  const [TypeValue, setTypeValue] = useState(type);
  return (
    <div className={`flex flex-col gap-2 ${style} relative`}>
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="lg:w-[47rem] md:w-[45rem] lg:h-28 h-28 w-72 p-2 border border-solid border-black rounded-lg"
        type={TypeValue}
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={(e) => setInput(e.target.value)}
        value={inputValue}
        cols={cols}
        rows={rows}
      />
    </div>
  );
};

export default Textarea;
