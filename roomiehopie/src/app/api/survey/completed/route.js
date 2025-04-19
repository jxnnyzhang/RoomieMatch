// src/app/api/survey/completed/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // TODO: replace this with your real DB/API check
    const isCompleted = await checkSurveyCompletion(userID);

    return NextResponse.json({ completed: isCompleted });
  } catch (error) {
    console.error("Error checking survey completion:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function checkSurveyCompletion(userID) {
  // Replace with your logic (e.g. fetch from Flask or your DB)
  return userID === "someUserID";
}
