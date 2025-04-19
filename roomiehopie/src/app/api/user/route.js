// /pages/api/user.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('user');

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    const userData = await fetchUserData(userEmail);

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function fetchUserData(email) {
  // Replace this with your actual API endpoint to fetch user data
  const response = await fetch(`https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/user?user=${email}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const userData = await response.json();
  return userData;
}
