"use client";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCards.js";
import { Button } from "react-bootstrap";



const HomePage = () => {
    const router = useRouter();

    return (
      <>
      <h1>Premium Clothes</h1>
      <Button onClick={() => router.push("/admin/login")}>Login</Button>
        <ProductCard />
      </>
    );
}

export default HomePage