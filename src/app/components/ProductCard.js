"use client";

import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { MdOutlineCurrencyRupee } from "react-icons/md";

export default function ProductCards() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch("api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <Card key={product._id} className="shadow-lg rounded-2xl overflow-hidden">
            <Card.Img variant="top" src={product.imageUrl || "/placeholder.jpg"} alt={product.title} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <div className="flex justify-between items-center">
                 <span className="text-lg font-bold flex items-center"><MdOutlineCurrencyRupee />{product.price}</span>
                <Button variant="primary">Buy Now</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
