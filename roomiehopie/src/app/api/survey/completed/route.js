// /pages/api/survey/completed.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get('userID');

    if (!userID) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Implement the actual logic to check if the user has completed the survey
    const isCompleted = await checkSurveyCompletion(userID);

    return NextResponse.json({ completed: isCompleted });
  } catch (error) {
    console.error("Error checking survey completion:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function checkSurveyCompletion(userID) {
  // Replace this with your actual logic to check if the user has completed the survey
  return userID === "someUserID" ? true : false; // Example logic
}
