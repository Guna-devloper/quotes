import React, { useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully! 🎉");
      navigate("/reminder");
    } catch (error) {
      toast.error("Error signing up ❌");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow-lg text-center">
        <h4 className="mb-4 fw-bold">📝 Sign Up</h4>
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Sign Up</Button>
        </Form>
        <p className="mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card>
      <Toaster position="top-center" />
    </Container>
  );
};

export default Signup;
