import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'; // Added import for sign function

const USER_API = "https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/user?case_email=";

export async function POST(request) {
  const { email, password } = await request.json();
  
  // Here you can validate the password if necessary (optional)
  const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return NextResponse.json({ token });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("case_email");

  if (!email) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    const userData = await fetchUserData(email);
    
    if (!userData || !userData.userID) {
      return NextResponse.json({ error: "User ID not found for user: " + email }, { status: 404 });
    }
    
    // Check if the survey is completed
    const surveyCompleted = await checkSurveyCompletion(userData.userID);

    return NextResponse.json({ 
      userID: userData.userID, 
      surveyCompleted: surveyCompleted 
    });
  } catch (err) {
    console.error("GET /api/user error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function fetchUserData(email) {
  try {
    console.log(`Fetching user data from: ${USER_API}${email}`);
    const response = await fetch(`${USER_API}${email}`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API response data:", data);
    
    if (data && data.userID) {
      return data; // Return user data if found
    }
    return null; // Return null if the user is not found
  } catch (error) {
    console.error("Error in fetchUserData:", error);
    throw error;
  }
}

async function checkSurveyCompletion(userID) {
  try {
    const matchesUrl = `https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/get_matches?user=${userID}`;
    console.log(`Checking survey completion at: ${matchesUrl}`);
    
    const response = await fetch(matchesUrl);
    
    if (!response.ok) {
      console.error(`Matches API error: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    console.log("Matches data:", data);
    
    return data && data.length > 0; // Check if there are matches (survey complete)
  } catch (error) {
    console.error("Error in checkSurveyCompletion:", error);
    return false; // Default to false on error
  }
}