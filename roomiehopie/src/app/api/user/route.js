import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    // Validate CWRU email
    const cleanEmail = email.toLowerCase();
    if (!cleanEmail.endsWith('@case.edu')) {
      return NextResponse.json({ error: "A CWRU Email Address is required" }, { status: 400 });
    }
    
    console.log(`Attempting to register user with email: ${cleanEmail}`);
    
    // Call the backend API to register the user
    const response = await fetch(
      `https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/user`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      }
    );
    
    console.log(`Registration response status: ${response.status}`);
    
    // Try to parse as JSON first
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = { text: await response.text() };
    }
    
    if (!response.ok) {
      console.error(`Failed to register user:`, responseData);
      return NextResponse.json({ 
        error: "Failed to register user", 
        details: responseData 
      }, { status: response.status });
    }
    
    return NextResponse.json(responseData);
  } catch (err) {
    console.error('POST /api/user/ error:', err);
    return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
  }
}