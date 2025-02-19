import React from "react";
import { Navbar, Container, Button, Dropdown } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Use Link for navigation
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const { darkMode, toggleTheme } = useTheme();
const navigate = useNavigate();
const handleLogout = () => {
  signOut(auth);
  navigate("/login");
};
  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} fixed="top">
      <Container>
        {/* ✅ Wrap Navbar.Brand inside Link */}
        <Navbar.Brand as={Link} to="/" className="text-decoration-none">
          Quotes Generator
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          {/* Quotes Dropdown Button */}
          <Dropdown className="me-3">
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              <FaQuoteLeft className="me-2" /> Quotes
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/quotelist">Quotes by Category</Dropdown.Item>
              <Dropdown.Item as={Link} to="/favorites">Favorite Quotes ❤️</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Dark Mode Toggle */}
          <Button variant="outline-secondary" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </Button>
          <Button variant="danger" onClick={handleLogout} >Logout</Button>

        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
