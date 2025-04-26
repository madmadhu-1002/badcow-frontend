import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db.js';
import User from '@/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Login user
export async function POST(req) {
  await connectDB();
  
console.log("1");
  try {
    
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
