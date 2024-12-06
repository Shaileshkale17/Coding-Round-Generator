import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <p className="bg-black text-white text-center p-5 md:text-base text-sm">
        All Copyright Reserved By{" "}
        <Link to="https://protfolio-shailesh-full-stack-developer.vercel.app/">
          © shailesh kale
        </Link>
      </p>
    </div>
  );
};

export default Footer;
