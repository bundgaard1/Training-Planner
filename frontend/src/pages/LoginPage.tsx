import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getUser } from "../api/userAPI";
import { LoginDetails } from "../types/User";

export function LoginPage() {
  const [inputUsername, setInputUsername] = useState("test");
  const [inputPassword, setInputPassword] = useState("test");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const login: LoginDetails = {
        username: inputUsername,
        password: inputPassword,
      };
      const responseData = await loginUser(login);
      console.log(responseData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <div className="flex flex-col space-y-2">
        <label className="text-lg">Username</label>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-2 mt-2">
        <label className="text-lg">Password</label>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4 flex flex-col ">
        <button
          onClick={handleLogin}
          className="px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <a
          href="/register"
          className="px-4 py-2 mt-4 text-lg text-black bg-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
