// File: src/app/api/reject/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { room_id, user } = await request.json();

  if (!room_id || !user) {
    return NextResponse.json(
      { error: 'Missing room_id or user' },
      { status: 400 }
    );
  }

  const url = new URL(
    'https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/accept'
  );
  url.searchParams.set('user', String(user));
  url.searchParams.set('roommate', String(room_id));

  console.log('Proxying POST to:', url.toString());

  try {
    const res = await fetch(url.toString(), {
      method: 'POST',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Remote /accept error:', errorText);
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error proxying /accept:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
