"use client";

import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function ProductCards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://badcow.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging line
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.length > 0 ? (
        products.map((product) => (
          <Card key={product._id} className="shadow-lg rounded-2xl overflow-hidden">
            <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <Button variant="primary">Buy Now</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading products or no products available...</p>
      )}
    </div>
  );
}
