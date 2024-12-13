import React, { useState } from "react";
import Heading from "../components/Heading";
import IndexBox from "../components/IndexBox";
import Button from "../components/Button";
import googleIcon from "../assets/devicon_google.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Singup = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const navigate = useNavigate();

  const headerSingupAuth = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://coding-round-generator-zr9x.vercel.app/api/auth/register",
      {
        email,
        password,
        name,
      }
    );

    console.log(response);
  };

  const headerGoogleAuth = () => {
    console.log("Google Auth");
  };
  return (
    <div className="min-h-[83.9vh]  flex justify-center items-center">
      <div className="h-4/6 w-2/6   bg-transparent  border  border-solid border-black rounded-lg flex items-center justify-center flex-col gap-2">
        <Heading
          heading="Sing up"
          heading_type="h1"
          style="font-bold text-xl mt-5"
        />
        <form
          className="flex  items-center justify-center flex-col gap-3"
          onSubmit={headerSingupAuth}>
          <IndexBox
            label="Full Name"
            name="name"
            id="name"
            type="text"
            inputValue={name}
            setInput={SetName}
          />
          <IndexBox
            label="Email ID"
            name="email"
            id="email"
            type="email"
            inputValue={email}
            setInput={SetEmail}
          />
          <IndexBox
            label="Password"
            name="password"
            id="password"
            type="password"
            inputValue={password}
            setInput={SetPassword}
          />
          <Button type="submit" label="Login" />
        </form>
        <img
          src={googleIcon}
          alt="google"
          className="w-7 h-7 mt-3"
          onClick={headerGoogleAuth}
        />
        <Link to="/">
          <p className="text-sm cursor-pointer mt-5 mb-5">Login your Account</p>
        </Link>
      </div>
    </div>
  );
};

export default Singup;
