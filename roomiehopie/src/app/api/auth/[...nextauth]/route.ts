import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extending NextAuth Session type to include userID
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userID?: string | null;  // Extend session.user to include userID
    };
  }

  interface User {
    id: string; // You can define the type of userID as string or number
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT signing

  pages: {
    error: '/RoomieMatch/api/auth/error',
  },

  callbacks: {
    // The signIn callback to allow users with a specific domain
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email || "";
        console.log("Google login attempt by:", email);

        if (email.endsWith("@case.edu")) {
          return true; // allow sign-in
        } else {
          // redirect to custom error page if email doesn't end with @case.edu
          return '/auth/error?error=InvalidDomain';
        }
      }
      return true; // allow other providers if added later
    },

    // This callback is triggered when NextAuth is generating the JWT
    async jwt({ token, user }) {
      if (user) {
        // On first login, store the userID in the JWT token
        // You can use the user’s email to fetch the userID from your database, or just assign an ID
        const userID = user.email as string; // You can replace this with a real userID from your database
        token.userID = userID;  // Store userID in the token for later use
        token.email = user.email as string;  // Optionally, store the email in the token as well
      }
      return token;  // Return the updated token
    },

    // This callback is triggered when creating the session
    async session({ session, token }) {
      // Add userID from the token to the session object
      session.user.userID = token.userID as string;  // Add userID from JWT token to the session object
      return session;  // Return the session with user data
    },
  },
});

export { handler as GET, handler as POST };
