import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Conteneur global pour la page Home
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f3ef;
  margin: 0;
  font-family: 'Open Sans', sans-serif;
`;

// Style du Header
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

// Titre du Header
const Title = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  margin-left: 20px;
  font-family: 'Roboto', sans-serif;
`;

// Style du Nav (pour les liens)
const Nav = styled.nav`
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;

// Message de bienvenue
const WelcomeMessage = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-top: 2rem;
  font-family: 'Roboto', sans-serif;
`;

// Paragraphe d'explication
const Paragraph = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin-top: 1.5rem;
  font-family: 'Open Sans', sans-serif;
`;

// Composant Home
const Home = () => {
  return (
    <Container>
      {/* Header avec le menu */}
      <Header>
        <Title>DocFlow Platform</Title>
        <Nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/employee">Employee</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/manager">Manager</NavLink>
        </Nav>
      </Header>

      {/* Message de bienvenue */}
      <WelcomeMessage>Welcome to DocFlow Platform!</WelcomeMessage>

      {/* Paragraphe d'explication */}
      <Paragraph>
        The DocFlow Platform is designed to streamline the way businesses and individuals manage their documents.
        With advanced AI-powered tools, our goal is to simplify workflows, optimize document classification, and enhance productivity.
        Whether you are a small business owner or a large enterprise, DocFlow will help you automate your document handling processes efficiently and securely.
      </Paragraph>
      <Paragraph>
        Our platform offers seamless integrations, real-time collaboration, and smart analytics that can transform how you interact with your digital paperwork.
        Join us today and take control of your document flow!
      </Paragraph>
    </Container>
  );
};

export default Home;
