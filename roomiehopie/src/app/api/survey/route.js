import { NextResponse } from "next/server";
/*
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Helper: open your SQLite database
async function openDB() {
  return open({
    filename: "./mydb.sqlite", // adjust path as needed
    driver: sqlite3.Database,
  });
}
*/
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
    // Log the received data to the terminal for testing purposes
    // When you're ready to actually insert into your database,
    // uncomment the following block:

    /*
    const db = await openDB();
    await db.run(
      `INSERT INTO responses (
        firstName, lastName, email, gender, genderPreference, year, sleepTime, 
        cleanliness, noiseLevel, religion, religionPreferences, languagePreferences,
        smoking, smokingPreference, drinking, drinkingPreference, cooking, greekLife,
        politics, roommatePolitics, pets, petPreference, guests, major, roommateMajor,
        campus, agree, hobbies
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.gender,
        data.genderPreference,
        data.year,
        data.sleepTime,
        data.cleanliness,
        data.noiseLevel,
        data.religion,
        data.religionPreferences,
        data.languagePreferences,
        data.smoking,
        data.smokingPreference,
        data.drinking,
        data.drinkingPreference,
        data.cooking,
        data.greekLife,
        data.politics,
        data.roommatePolitics,
        data.pets,
        data.petPreference,
        data.guests,
        data.major,
        data.roommateMajor,
        data.campus,
        data.agree ? 1 : 0, // store boolean as integer (1 or 0)
        data.hobbies.join(", "), // join hobbies into a string (or store as JSON)
      ]
    );
    */
    
    // Return a successful JSON response
    //return NextResponse.json({ success: true, data });
  //} 
 

