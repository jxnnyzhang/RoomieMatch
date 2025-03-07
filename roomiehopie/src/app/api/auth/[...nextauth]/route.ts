//import { NextResponse } from "next/server";

//export function GET(_req) {
  //const casLoginUrl = "https://login.case.edu/cas/login?service=http://localhost:3000/api/auth/callback";

  //console.log("🚀 Forcing Redirect to CAS Login:", casLoginUrl);
  //return NextResponse.redirect(casLoginUrl);
//}

//export function POST(_req) {
  //return GET(_req);
//}
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
