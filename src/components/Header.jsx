import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../assets/logo.png';
// import './Header.css'; // Import your CSS file for additional styling

const Header = () => {
  return (
    <Navbar expand="lg" sticky="top" style={{borderBottom: "1px solid #ccc"}}>
      <Container className="flex justify-center">
        <Navbar.Brand href="#home">
        <img
          src={logo}
          alt="Logo"
          className="inline-block align-top logo"
          style={{ height: "80px" }}
        />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
