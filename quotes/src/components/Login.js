import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful! 🚀");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg text-center" style={{ width: "400px" }}>
        <h4>Login</h4>
        <Form onSubmit={handleLogin}>
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
            Login
          </Button>
        </Form>
        <p className="mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
