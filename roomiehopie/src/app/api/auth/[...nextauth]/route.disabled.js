import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "CAS",
      credentials: {},
      async authorize(credentials, req) {
        const { searchParams } = new URL(req.url);
        const ticket = searchParams.get("ticket");

        if (!ticket) {
          // No ticket means user is NOT authenticated yet → Redirect to CAS login
          const casLoginUrl = `https://login.case.edu/cas/login?service=${encodeURIComponent(
            "http://localhost:3000/api/auth/callback"
          )}`;
          throw new Response(null, {
            status: 302,
            headers: { Location: casLoginUrl },
          });
        }

        // If we have a ticket, validate it
        const validateUrl = `https://login.case.edu/cas/serviceValidate?ticket=${ticket}&service=${encodeURIComponent(
          "http://localhost:3000/api/auth/callback"
        )}`;

        try {
          const response = await fetch(validateUrl);
          const text = await response.text();

          // Extract the username from the CAS response (basic parsing)
          const match = text.match(/<cas:user>(.*?)<\/cas:user>/);
          const username = match ? match[1] : null;

          if (!username) throw new Error("CAS Authentication Failed");

          // Return user session object
          return { id: username, name: username };
        } catch (error) {
          throw new Error("CAS Validation Failed");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
