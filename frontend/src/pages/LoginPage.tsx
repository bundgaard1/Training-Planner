import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userAPI";
import { LoginDetails } from "../types/User";

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const login: LoginDetails = { username: "test", password: "test" }; 
      const responseData = await loginUser(login);
      console.log(responseData);
      navigate("/"); 
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>Click the button to login</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
