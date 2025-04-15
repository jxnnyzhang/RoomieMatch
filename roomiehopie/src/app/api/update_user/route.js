import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ message: 'This route only supports POST for updates.' }, { status: 405 });
}

export async function POST(request) {
  try {
    const reqData = await request.json();
    console.log('Incoming data:', reqData);

    const externalResponse = await fetch(
      'https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/create_user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
      }
    );

    //console.log('External API response status:', externalResponse.status);

    // If the external API returns an error, capture and return that error
    if (!externalResponse.ok) {
      const errorData = await externalResponse.text(); // Using text here to handle non-JSON responses
      console.error('External API error:', errorData);
      return NextResponse.json({ error: errorData }, { status: externalResponse.status });
    }

    // Parse the JSON response from the external API
    const data = await externalResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in update_user API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
