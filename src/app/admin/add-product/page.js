"use client";

import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  // Handle file upload (Cloudinary)
  const handleUpload = async (file) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "product-images");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duedc4ug8/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
        setImagePreview(data.secure_url);
      }

      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      console.error("Image upload failed:", error);
      setMessage({ type: "danger", text: "Image upload failed!" });
    }
  };

  // Dropzone for file selection
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: 2 * 1024 * 1024, // 2MB max
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleUpload(acceptedFiles[0]);
      }
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage({ type: "danger", text: "You must be logged in to add products." });
      return;
    }

    if (!formData.title || !formData.price || !formData.description || !formData.imageUrl) {
      setMessage({ type: "danger", text: "All fields are required." });
      return;
    }

    try {
      const response = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create product");

      setMessage({ type: "success", text: "Product added successfully!" });

      setFormData({ title: "", price: "", description: "", imageUrl: "" });
      setImagePreview(null);

      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
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
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter product title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" />
        </Form.Group>

        {/* Image Upload Section */}
        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one.</p>
          </div>

          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Product Preview" className="w-full h-48 object-cover rounded-md" />
            </div>
          )}

          {isUploading && <p className="text-blue-500 mt-2">Uploading...</p>}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-full mt-3" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
}
