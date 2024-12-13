import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import userImage from "../assets/freepik__candid-image-photography-natural-textures-highly-r__40109.jpeg";

const Navbar = () => {
  const [token, setToken] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    } else {
      setToken(storedToken);
    }
  }, [navigate, localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-black text-white md:text-base text-sm">
      <Link
        to={!token ? "/" : "/test-from-page"}
        className="flex items-center gap-3">
        <img
          src={logoImage}
          alt="Company Logo"
          className="w-10 h-10 rounded-full bg-white"
        />
        <h1 className="md:text-lg text-sm font-bold">Coding Round Generator</h1>
      </Link>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }></path>
          </svg>
        </button>
      </div>

      {/* Navbar Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row gap-6 md:gap-8 md:relative absolute top-[4.5rem] right-4 md:top-0 md:right-0 bg-black md:bg-transparent z-50 md:z-auto rounded-md md:rounded-none py-4 md:py-0 px-6 md:px-0 w-[18rem] md:w-auto`}>
        {token ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <ul className="flex flex-col md:flex-row gap-5">
              <li>
                <Link
                  to="/test-from-page"
                  className="hover:underline text-white md:text-inherit">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile-page"
                  className="hover:underline text-white md:text-inherit">
                  Profile
                </Link>
              </li>
              <li
                onClick={handleLogout}
                className="cursor-pointer hover:underline text-white md:text-inherit">
                Logout
              </li>
            </ul>
            <img
              src={userImage}
              alt="User Avatar"
              className="w-10 h-10 rounded-full bg-cover"
            />
          </div>
        ) : (
          <p className="hidden md:block">Not logged in</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
