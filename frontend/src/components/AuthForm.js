import React, { useState } from "react";
import { registerUser, loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password };
        console.log('userdata', userData);

        try {
            if (isLogin) {
                const data = await loginUser(userData);
                alert('Login successful');
                localStorage.setItem('token', data.token);
                navigate('/products');
            } else {
                await registerUser(userData);
                alert('Registration successful');
                navigate('/admin-dashboard');
            }
        } catch (error) {
            console.log('Error occurred');
            if (error.response) {
                console.log('Server Error:', error.response.data);
            } else if (error.request) {
                console.log('No response from server:', error.request);
            } else {
                console.log('Error setting up the request:', error.message);
            }
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white rounded-md shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{isLogin ? "Login" : "Register"}</h2>
            <label className="text-gray-700">UserName</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md p-2  w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
                minLength="5"
            />
            <label className="text-gray-700">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-lg w-96  hover:bg-blue-700 transition duration-300"
            >
                {isLogin ? "Login" : "Register"}
            </button>
        </form>
    );
}

export default AuthForm;
