import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Server-side library for JWT signing

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is stored in your .env

export async function POST(request) {
  try {
    const reqData = await request.json();
    const { userID, email, name } = reqData; // Get user data from request (you may also get this from session or DB)

    if (!userID || !email) {
      return NextResponse.json({ error: 'User ID and Email are required' }, { status: 400 });
    }

    // Create JWT token using the userID
    const token = jwt.sign({ userID, email, name }, JWT_SECRET, { expiresIn: '1d' });

    // Set the JWT token in an HttpOnly cookie (for security)
    const response = NextResponse.json({ message: 'Logged in successfully' });
    response.cookies.set('user_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
      maxAge: 86400, // 1 day
      path: '/', // Path to which cookie applies
    });

    return response;
  } catch (error) {
    console.error('Error in login API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
