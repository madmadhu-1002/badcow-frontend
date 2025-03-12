"use client";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/ProductCard.js";
import { Button } from "react-bootstrap";



export default function Home() {
  const router = useRouter();

  return (
    <>
    <h1>Premium Clothes</h1>
    <Button onClick={() => router.push("/admin/login")}>Login</Button>
      <ProductCard />
    </>
  );
}
