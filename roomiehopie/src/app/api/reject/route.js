// File: src/app/api/reject/route.js
import { NextResponse } from 'next/server';
import { useUser } from '../../context/UserContext';


export async function POST(request) {
  const { room_id } = await request.json();
  const { user } = await request.json();

  if (!room_id || !user) {
    return NextResponse.json(
      { error: 'Missing user_id' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/reject?user=${user}&roommate=${room_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        })
    
    
    if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: err }, { status: res.status })
    }
    console.log(`Rejecting user ${room_id}`);


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in /api/reject:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
