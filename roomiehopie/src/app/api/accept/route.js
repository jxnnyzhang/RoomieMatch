// File: src/app/api/accept/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { room_id } = await request.json();
  const { user } = await request.json();
  

  if (!room_id) {
    return NextResponse.json(
      { error: 'Missing user_id' },
      { status: 400 }
    );
  }

  console.log(`https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/accept?user=${Number(user)}&roommate=${room_id}`)
  try {
    const res = await fetch(`https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/accept?user=${Number(user)}&roommate=${room_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        })
    
    
    if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: err }, { status: res.status })
    }
    console.log(`Accepting user ${room_id}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in /api/accept:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
