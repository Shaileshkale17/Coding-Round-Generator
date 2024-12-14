import React, { useState } from "react";
import Heading from "../components/Heading";
import IndexBox from "../components/IndexBox";
import Button from "../components/Button";
import googleIcon from "../assets/devicon_google.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const Navigate = useNavigate();
  const headerLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const response = await axios.post(
        `https://coding-round-generator-zr9x.vercel.app/api/auth/login`,
        { email, password }
      );

      // Extract token from the response
      const token = response.data?.data?.token;

      if (token) {
        // Save the token to localStorage
        localStorage.setItem("token", token);
        // toast.success("Login successful!");
        // console.log("Token:", token);

        // Navigate to the desired page
        Navigate("/test-from-page");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle errors from the server
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  const headerGoogleAuth = async () => {
    try {
      const response = await axios.get(
        `https://coding-round-generator-zr9x.vercel.app/api/auth/google`,
        {
          withCredentials: true,
        }
      );
      console.log("Google Auth response:", response);
    } catch (error) {
      // const errorMessage =
      //   error.response?.data?.message || "An unexpected error occurred";
      // toast.error(`Login failed: ${errorMessage}`);
      toast.info(
        "I am currently occupied with work, which may prevent you from logging in. Thank you for your patience and understanding."
      );
    }
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
          className="w-7 h-7 mt-3 cursor-pointer"
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
