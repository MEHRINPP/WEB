import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Container that centers the form
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fc;
  padding: 0 20px;
`;

// Form styles with responsive adjustments using media queries
const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  @media screen and (max-width: 600px) {
    padding: 20px;
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    padding: 30px;
  }

  @media screen and (min-width: 901px) {
    padding: 40px;
  }
`;

// Title of the form
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    font-size: 22px;
  }

  @media screen and (min-width: 901px) {
    font-size: 24px;
  }
`;

// Input fields
const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  @media screen and (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    padding: 10px;
  }
`;

// Button
const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  @media screen and (max-width: 600px) {
    padding: 12px;
  }
`;

// Error/success message
const Message = styled.p`
  color: red;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    font-size: 14px;
  }
`;

// Signup Component
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/users/signup/', {
        username,
        email,
        password,
      });
      setMessage('User created successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      setMessage('Error creating user');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Signup</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Signup</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
};

export default Signup;
