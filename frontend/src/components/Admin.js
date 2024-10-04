// AuthForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Dummy authentication check
        if (credentials.email === 'diwakarlewis@gmail.com' && credentials.password === 'diwakar123') {
            navigate('/admin-dashboard');
        } else {
            navigate('/products');
        }
    };

    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
            <form
                onSubmit={handleLogin}
                className="bg-white rounded-2xl shadow-lg p-10 space-y-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105"
            >
                <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            placeholder="Email"
                            required
                            className="border border-blue-300 rounded-lg p-4 w-full focus:outline-none text-black  focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="Password"
                            required
                            className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none  text-black focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-gray-400"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg w-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 transform hover:scale-105"
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
                {/* <p className="text-gray-600 text-sm text-center">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        className="text-blue-500 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate(isLogin ? '/register' : '/login')}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </p> */}
            </form>
        </div>
    );
};

export default AuthForm;
