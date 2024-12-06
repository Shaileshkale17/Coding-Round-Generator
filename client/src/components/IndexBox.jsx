import React, { useState } from "react";
import EyeOpen from "../assets/clarity_eye-line.svg";
import Eyeclose from "../assets/mdi-light_eye-off.svg";
const IndexBox = ({ setInput, type, name, id, inputValue, label, style }) => {
  const [Eye, setEye] = useState(false);
  const [TypeValue, setTypeValue] = useState(type);
  return (
    <div className={`flex flex-col gap-2 ${style} relative`}>
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        className="md:w-80 w-60 p-2 border border-solid border-black rounded-lg"
        type={TypeValue}
        name={name}
        id={id}
        onChange={(e) => setInput(e.target.value)}
        value={inputValue}
      />
      {type === "password" ? (
        <img
          src={Eye ? Eyeclose : EyeOpen}
          alt="Toggle visibility"
          className="w-[25px] absolute top-10 right-2 cursor-pointer"
          onClick={() => {
            setEye(!Eye);
            setTypeValue(Eye ? "password" : "text");
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default IndexBox;
