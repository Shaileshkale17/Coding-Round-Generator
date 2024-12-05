import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";
import user from "../assets/freepik__candid-image-photography-natural-textures-highly-r__40109.jpeg";
const Navber = () => {
  const [Tocken, setTocken] = useState("sdffdsfdsfd");

  useEffect(() => {
    // setTocken(localStorage.getItem("tocken"));
  }, []);

  const HaederLogout = () => {
    console.log("HaederLogout");
  };

  return (
    <div className="flex flex-row justify-between py-2 px-6 bg-black text-white">
      <Link to="/" className="flex flex-row items-center gap-3">
        <img
          src={logoImage}
          alt="logo"
          className="w-10 h-10 rounded-full bg-white"
        />
        <h1>Coding Round Generator</h1>
      </Link>

      <div className="flex flex-row gap-6">
        {Tocken ? (
          <div className="flex items-center gap-5">
            <ul className="flex flex-row gap-5">
              <li onClick={HaederLogout} className="cursor-pointer">
                <Link to="/test-from-page">Home</Link>
              </li>
              <li onClick={HaederLogout} className="cursor-pointer">
                <Link to="/profile-page">Profile</Link>
              </li>
              <li onClick={HaederLogout} className="cursor-pointer">
                Logout
              </li>
            </ul>
            <img
              src={user}
              alt="user"
              className="w-10 h-10 rounded-full bg-cover "
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navber;
