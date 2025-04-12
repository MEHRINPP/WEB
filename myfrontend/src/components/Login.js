import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Import your CSS

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle the login logic
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
        username,
        password,
      });

      // Assuming the backend returns a user object and token
      const { access } = response.data;
      const user = response.data.user;  // Assuming the backend returns user info as well

      // Store user data and token in localStorage
      localStorage.setItem('username', user.username);  // Store username in localStorage
      localStorage.setItem('token', access);  // Store token in localStorage

      // Update the token state in the App component
      setToken(access);

      // Redirect to Home page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
