import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { userID } = await request.json();

    if (!userID) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    // Create JWT token on the server side
    const secret = process.env.JWT_SECRET || 'your-secret-key';  // Make sure to store the secret in .env
    const token = jwt.sign({ userID }, secret, { expiresIn: '1d' });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error('Error creating JWT:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
