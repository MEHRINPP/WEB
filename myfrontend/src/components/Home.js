import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Import your CSS

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');  // State to store the username

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('username');
    
    if (storedUsername) {
      setUsername(storedUsername);  // If username is found, set it to state
    } else {
      // If no username is found, redirect to the login page
      navigate('/login');
    }
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('username');  // Clear username from localStorage
    localStorage.removeItem('token');  // Optional: Clear the token
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="container">
      <div className="home-container">
        {username ? (
          // Personalized greeting
          <h2 className="home-title">Welcome back, {username}!</h2>
        ) : (
          <h2 className="home-title">Welcome to your Home Page!</h2>
        )}
        <p className="home-content">
          This is your dashboard. You can now access your data and manage your account settings.
        </p>
        <button className="home-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
