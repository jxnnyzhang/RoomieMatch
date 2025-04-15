import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const reqData = await request.json();
    console.log("Incoming data:", reqData);

    const externalResponse = await fetch(
      "https://roomiematch-h4grfpd8d7cwbufb.eastus2-01.azurewebsites.net/create_user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      }
    );

    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      console.error("External API error:", errorText);
      return NextResponse.json({ error: errorText }, { status: externalResponse.status });
    }

    const data = await externalResponse.json();
    console.log("Received from external API:", data);

    // Return the data (e.g., { user_id: "123" }) directly
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error in /api/survey POST:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  return NextResponse.json({ message: "This route only supports POST for updates." }, { status: 405 });
}
