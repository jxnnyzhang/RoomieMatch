import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("API request received:", req.method); // ✅ Logs the request
    return NextResponse.json({ success: true }, { status: 200 });
  }