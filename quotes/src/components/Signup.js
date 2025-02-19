import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful! 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg text-center" style={{ width: "400px" }}>
        <h4>Create Account</h4>
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Sign Up
          </Button>
        </Form>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Signup;
