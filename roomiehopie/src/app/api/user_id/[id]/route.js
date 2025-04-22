// File: src/app/api/user/route.js
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  // pull `?userId=…` off the URL
  const userId = params.id
  //console.log(userId.user_id)
  //console.log(`https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/user?user=${userId}`)
  try {
    const res = await fetch(`https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/user?case_email=${userId}`, 
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
    
    console.log(res)
    if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: err }, { status: res.status })
      }
  
      const user = await res.json()
      return NextResponse.json(user)
  }
  catch (err) {console.error('GET /api/match error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

}
