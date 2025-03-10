"use client";

import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [token, setToken] = useState("");

  // Get token from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setMessage({ type: "danger", text: "Unauthorized: Please log in." });
    }
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!token) {
      setMessage({ type: "danger", text: "You must be logged in to add products." });
      return;
    }

    // Check if fields are empty
    if (!formData.title || !formData.price || !formData.description || !formData.imageUrl) {
      setMessage({ type: "danger", text: "All fields are required." });
      return;
    }

    try {
      const response = await fetch("../../api/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use token from localStorage
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      setMessage({ type: "success", text: "Product added successfully!" });

      // Clear form fields after submission
      setFormData({ title: "", price: "", description: "", imageUrl: "" });

      // Redirect to products page after 1.5 sec
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
        console.log(error);
      setMessage({ type: "danger", text: error.message });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {message.text && (
        <Alert variant={message.type} className="mb-3">
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-full mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}
