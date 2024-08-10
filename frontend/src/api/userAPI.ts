import { DB_URL } from "../config";
import { LoginDetails } from "../types/User";

const BASE_URL = `${DB_URL}/users`;

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
		},
	});

	localStorage.removeItem("authToken");
	console.log("User logged out successfully");
}

export async function getUser() {
	const response = await fetch(`${BASE_URL}/profile`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("User fetched successfully");
		return data.user;
	} else {
		console.error("Error fetching user");
		throw new Error("Error fetching user");
	}
}
