import ProductCard from "@/components/ProductCard.js";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {

  return (
    <>
    <h1>BaadCow Products</h1>
      <ProductCard />
    </>
  );
}
