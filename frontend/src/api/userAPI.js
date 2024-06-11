const BASE_URL = "http://localhost:3000/users";

export async function registerUser(username, password) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
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

export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
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
