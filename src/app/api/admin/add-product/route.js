import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";
import verifyToken from "@/middlewares/auth";
import adminMiddleware from "@/middlewares/admin";

export async function POST(req) {
    await connectDB();
    console.log(req);
    const user = await verifyToken(req);
    console.log(user);
    if (!user || !adminMiddleware(req)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    console.log("3");
  
    try {
      console.log("4");
      const { title, price, description, imageUrl } = await req.json();
      const newProduct = new Product({ title, price, description, imageUrl });
      const savedProduct = await newProduct.save();
      return NextResponse.json(savedProduct, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: "Error creating product", error }, { status: 500 });
    }
  }