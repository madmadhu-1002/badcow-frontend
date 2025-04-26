"use client";

import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if fields are empty
    if (!formData.email || !formData.password) {
      setMessage({ type: "danger", text: "All fields are required." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log(data.token);
      // Store token in localStorage
      localStorage.setItem("token", data.token);

      setMessage({ type: "success", text: "Login successful! Redirecting..." });

      // Redirect after login (e.g., to dashboard)
      setTimeout(() => {
        router.push("/admin/add-product");
      }, 1500);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {message.text && (
        <Alert variant={message.type} className="mb-3">
          {message.text}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="me-5">Email </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="me-2">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-full mt-3">
        {loading?<p>Logging In</p>:<>Login</>}
        </Button>
      </Form>
    </div>
  );
}
