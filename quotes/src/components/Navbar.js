import React from "react";
import { Navbar, Container, Button, Dropdown } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <Navbar
      className="shadow-sm"
      bg={darkMode ? "black" : "white"} // 🌙 Dark = Black | ☀ Light = White
      variant={darkMode ? "dark" : "light"}
      fixed="top"
    >
      <Container>
        {/* ✅ Navbar Title with Theme Styling */}
        <Navbar.Brand as={Link} to="/" className={`fw-bold ${darkMode ? "text-light" : "text-dark"}`}>
          Quotes Generator
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          {/* 🔽 Quotes Dropdown */}
          <Dropdown className="me-3">
            <Dropdown.Toggle variant={darkMode ? "outline-light" : "outline-dark"}>
              <FaQuoteLeft className="me-2" /> Quotes
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/quotelist">Quotes by Category</Dropdown.Item>
              <Dropdown.Item as={Link} to="/favorites">Favorite Quotes ❤️</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* 🌗 Dark Mode Toggle */}
          <Button variant={darkMode ? "outline-warning" : "outline-secondary"} onClick={toggleTheme} className="me-2">
            {darkMode ? <FaSun /> : <FaMoon />}
          </Button>

          {/* 🚪 Logout Button */}
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
