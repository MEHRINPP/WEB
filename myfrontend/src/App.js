import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup'; // Correct path to Signup.js
import Login from './components/Login'; // Correct path to Login.js
import Home from './components/Home'; // Correct path to Home.js

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogout = () => {
    setToken(''); // Clear token state
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Routes for login and signup */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          
         
          
          <Route path="/home" element={token ? <Home onLogout={handleLogout} /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
