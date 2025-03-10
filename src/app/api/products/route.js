import { NextResponse } from "next/server";

export async function GET() {
    
  try {
    
    const response = await fetch("https://badcow.onrender.com/products");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
