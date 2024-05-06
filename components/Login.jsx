import React, { useState } from "react";
import { motion } from "framer-motion";
import "../css/RegisterLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const logoutMessage = localStorage.getItem("logoutMessage");
    if (logoutMessage) {
      toast.success(logoutMessage, {
        style: {
          borderRadius: "50px",
          background: "#121212",
          color: "#fff",
        },
      });
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  const history = useNavigate();
  const [login, setLogin] = useState("");
  const [pass, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sharpleaf.biz.ua/movie.heaven.api/api-login.php",
        {
          login,
          pass,
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        console.log(decoded);

        if (decoded && decoded.name && decoded.pass) {
          document.cookie = `token=${token}; max-age=${
            60 * 60 * 24 * 10
          }; path=/`;

          history("/cabinet");
        } else {
          console.error("Invalid token format:", decoded);
        }
      } else {
        console.error("Login failed. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div>
      <Toaster />
      <motion.div
        className="login-container"
        initial={{
          scale: 0.3,
        }}
        animate={{
          scale: 0.9,
        }}
        transition={{
          delay: 0.2,
        }}
      >
        <form
          className=" p-12 rounded-lg shadow-lg text-white w-full mt-28 login-css-form"
          onSubmit={handleLogin}
        >
          <h2 className="text-4xl font-bold mb-8">Sign In</h2>
          <div className="mb-6">
            <label htmlFor="username" className="block mb-4">
              Login
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your login"
              className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block mb-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-6 py-3 rounded-lg bg-zinc-700 text-white"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg mb-4"
          >
            Sign In
          </button>
          <Link to="/register" className="redir-link">
            Registration
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
