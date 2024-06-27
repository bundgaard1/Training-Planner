import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userAPI";
import { LoginDetails } from "../types/User";

export function LoginPage() {
  const [inputUsername, setInputUsername] = useState("test");
  const [inputPassword, setInputPassword] = useState("test");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const login: LoginDetails = { 
        username: inputUsername, 
        password: inputPassword
      }; 
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
      <label>Username</label>
      <input
        type="text"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      /> 
      <br />
      <label>Password</label>
      <input
        type="password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <br />
      
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
