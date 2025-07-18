import { NextResponse } from 'next/server';
import User from '@/lib/models/User.js';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/DBConnection/conn.js';
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    await connectDB(); 

    const { email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Success
    var token = jwt.sign({ fullName: user.fullName, email: user.email, }, 'jwyhshssa');
    return NextResponse.json({
      success: true,
     token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}