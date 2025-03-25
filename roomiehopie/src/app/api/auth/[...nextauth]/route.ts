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
  pages: {
    error: '/RoomieMatch/api/auth/error',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email || "";
        console.log("Google login attempt by:", email);

        if (email.endsWith("@case.edu")) {
          return true; // allow sign-in
        } else {
          // redirect to custom error page
          return '/auth/error?error=InvalidDomain';
        }
      }

      return true; // allow other providers if added later
    },
  },
});

export { handler as GET, handler as POST };
