import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

async function adminMiddleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1]; // Extract token from headers

  if (!token) {
    return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Access denied. Admins only." }, { status: 403 });
    }

    return decoded; // ✅ Return user data if admin
  } catch (error) {
    return NextResponse.json({ message: "Invalid token." }, { status: 401 });
  }
}

export default adminMiddleware;