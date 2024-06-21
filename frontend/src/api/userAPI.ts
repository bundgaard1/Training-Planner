const BASE_URL = "http://localhost:3000/users";
import {LoginDetails} from "../types/User"

export async function registerUser(login: LoginDetails) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("User registered successfully");
    return data;
  } else {
    console.error("Error registering user");
    throw new Error("Error registering user");
  }
}

export async function loginUser(login: LoginDetails) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.token;
    localStorage.setItem("authToken", token);

    console.log("User logged in successfully");
    return data;
  } else {
    console.error("Error logging in user");
    throw new Error("Error logging in user");
  }
}

export async function logoutUser() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    }
  });
  
  localStorage.removeItem("authToken");
  console.log("User logged out successfully");
}
