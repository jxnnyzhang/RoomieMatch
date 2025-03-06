import { NextResponse } from "next/server";

export function GET(_req) {
  const casLoginUrl = "https://login.case.edu/cas/login?service=http://localhost:3000/api/auth/callback";

  console.log("🚀 Forcing Redirect to CAS Login:", casLoginUrl);
  return NextResponse.redirect(casLoginUrl);
}

export function POST(_req) {
  return GET(_req);
}
