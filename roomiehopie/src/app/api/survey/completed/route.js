import { NextResponse } from "next/server";

// Main GET handler for the /completed endpoint
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID"); // Get userID from the query parameters

    if (!userID) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch if the user has completed the survey
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

// Function to check if the user has completed the survey
async function checkSurveyCompletion(userID) {
  // Fetch user data using the provided userID (like how the match route does it)
  const response = await fetch(
    `https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/user?user=${userID}`,
    { method: "GET" }
  );
  
  if (!response.ok) {
    // If the request failed, log the error and return false
    console.error(`Failed to fetch user data: ${response.statusText}`);
    return false;
  }

  const userData = await response.json();

  // Handle the structure: Object { score: 0, user_id: 13 }
  const userIdFromResponse = userData?.user_id;

  if (userIdFromResponse) {
    // Check if the user has completed the survey based on userData
    return userData.surveyCompleted === true;
  } else {
    console.error("User ID not found in the response:", userData);
    return false;
  }
}
