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
export async function POST(request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();

    // Log the received data to the terminal for testing purposes
    console.log("Received survey data:", data);

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
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error processing survey data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
