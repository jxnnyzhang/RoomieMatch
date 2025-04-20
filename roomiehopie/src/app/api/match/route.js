// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server'

const MATCHES_API = "https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/get_matches?user=9" 

export async function POST(request) {
  const { email, password } = await request.json()
  const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return NextResponse.json({ token })
}

export async function GET(request) {
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
    return NextResponse.json(matches)
  } catch (err) {
    console.error('GET /api/match error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
