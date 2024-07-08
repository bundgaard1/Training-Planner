import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userAPI";
import { LoginDetails } from "../types/User";


export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const register: LoginDetails = {
                username: username,
                password: password,
            };
            const responseData = await registerUser(register);
            console.log(responseData);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Register Page</h1>
            <div className="flex flex-col space-y-2">
                <label className="text-lg">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col space-y-2 mt-2">
                <label className="text-lg">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                onClick={handleRegister}
                className="px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Register
            </button>
        </div>
    );
    }
