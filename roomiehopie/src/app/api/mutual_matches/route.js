// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server'

 

export async function POST(request) {
  const { email, password } = await request.json()
  const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return NextResponse.json({ token })
}

export async function GET(request) {
    
    const userId = request.nextUrl.searchParams.get('user');
    console.log(userId)

    if (!userId) {
        return NextResponse.json(
          { error: 'Missing user_id' },
          { status: 400 }
        );
      }

    const MATCHES_API = `https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/get_mutuals?user=${userId}`
    console.log(MATCHES_API)
  try {
    const res = await fetch(MATCHES_API, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })


    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ error: err }, { status: res.status })
    }

    const matches = await res.json()
    console.log(matches)
    return NextResponse.json(matches)
  } catch (err) {
    console.error('GET /api/match error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
