import React, { useState } from "react";
import Heading from "../components/Heading";
import IndexBox from "../components/IndexBox";
import Button from "../components/Button";
import googleIcon from "../assets/devicon_google.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const Navigate = useNavigate();
  const headerLogin = (e) => {
    e.preventDefault();
    Navigate("/test-from-page");
  };
  const headerGoogleAuth = () => {
    console.log("Google Auth");
  };
  return (
    <div className="h-[83.9vh] flex justify-center items-center">
      <div className="md:h-4/6 md:w-2/6 w-[88.333333%] h-[74.666667%]  bg-transparent  border  border-solid border-black rounded-lg flex items-center justify-center flex-col gap-2">
        <Heading heading="Login" heading_type="h1" style="font-bold text-xl" />
        <form
          className="flex items-center justify-center flex-col gap-7"
          onSubmit={headerLogin}>
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
        <Link to="/signup">
          <p className="text-sm cursor-pointer mt-5">create your Account</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
