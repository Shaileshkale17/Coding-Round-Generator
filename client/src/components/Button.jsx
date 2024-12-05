import React from "react";

const Button = ({ label, style, type }) => {
  return (
    <button
      className={`px-5 py-2 rounded-lg hover:bg-white  bg-black hover:text-black text-white  border border-solid border-black hover:border-black ${style}`}
      type={type}>
      {label}
    </button>
  );
};

export default Button;
