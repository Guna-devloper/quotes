import React, { useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful! 🎉");
      navigate("/reminder");
    } catch (error) {
      toast.error("Invalid email or password ❌");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow-lg text-center">
        <h4 className="mb-4 fw-bold">🔑 Login</h4>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
        <p className="mt-3">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </Card>
      <Toaster position="top-center" />
    </Container>
  );
};

export default Login;
