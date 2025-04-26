import { NextResponse } from "next/server";
import connectDB from '@/lib/db.js';;
import Product from "@/models/product";

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB
    const products = await Product.find({}); // Fetch products

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message }
    );
  }
}
