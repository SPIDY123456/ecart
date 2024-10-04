import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500'>
      <h1 className="text-5xl font-extrabold text-white mb-12 drop-shadow-lg">Select Your Role:</h1>
      <div className='flex flex-col gap-6'>
        <button
          onClick={() => navigate('/login')}
          className='bg-white text-blue-600 hover:bg-blue-200 transition duration-300 ease-in-out py-3 px-6 rounded-lg shadow-xl transform hover:scale-105'
        >
          User
        </button>
        <button
          onClick={() => navigate('/admin')}
          className='bg-white text-green-600 hover:bg-green-200 transition duration-300 ease-in-out py-3 px-6 rounded-lg shadow-xl transform hover:scale-105'
        >
          Admin
        </button>
      </div>
    </div>
  )
}

export default RoleSelection;
