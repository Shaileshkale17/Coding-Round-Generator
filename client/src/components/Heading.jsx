import React from "react";

const Heading = ({ heading_type, heading, style }) => {
  switch (heading_type) {
    case "h1":
      return <h1 className={style}>{heading}</h1>;

    case "h2":
      return <h2 className={style}>{heading}</h2>;
    case "h3":
      return <h3 className={style}>{heading}</h3>;
    case "h4":
      return <h4 className={style}>{heading}</h4>;
    case "h5":
      return <h5 className={style}>{heading}</h5>;
    case "h6":
      return <h6 className={style}>{heading}</h6>;
    default:
      return <p>not found tag only h1 to h6</p>;
      break;
  }
};

export default Heading;
