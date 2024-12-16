// Register.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  // Importation de Link pour la navigation

// Formulaire similaire à celui de Login.js mais avec un champ email en plus
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f3ef;
  margin: 0;
`;

const Header = styled.header`
  width: 100%;
  background-color: #0474c4;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 80px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  margin-left: 20px;
`;

const Nav = styled.nav`
  margin-left: auto;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  padding: 0 15px;
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  background-color: #fffdf7;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background-color: #fffdf7;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #0474c4;
    box-shadow: 0 0 8px rgba(212, 163, 115, 0.3);
  }
`;

const Button = styled.button`
  background-color: #0474c4;
  color: #fff;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #045bb5;
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(184, 133, 92, 0.3);
  }
`;

const Error = styled.p`
  color: #d9534f;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const Footer = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #555;
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
    } else {
      setErrorMessage('');
      // Ici vous pouvez ajouter votre logique d'inscription
    }
  };

  return (
    <Container>
      <Header>
        <Title>DocFlow Platform</Title>
        <Nav>
          <NavLink to="/home">Home</NavLink>
        </Nav>
      </Header>

      <FormContainer>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </InputGroup>
          <Button type="submit">Register</Button>
          {errorMessage && <Error>{errorMessage}</Error>}
        </form>
        <Footer>
          Already have an account? <Link to="/login">Login</Link>
        </Footer>
      </FormContainer>
    </Container>
  );
};

export default Register;
