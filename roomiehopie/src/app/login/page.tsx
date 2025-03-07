"use client";

//export default function Login() {
  //return (
   // <div className="flex h-screen items-center justify-center bg-gray-100">
     // <div className="bg-white p-8 shadow-lg rounded-lg">
      //  <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      //  <p className="text-gray-600 mb-6">Log in with your school account</p>
       // <button
       //   onClick={() => signIn("credentials")} // Removed callbackUrl
       //   className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
       // >
       //   Sign in with CAS
       // </button>
     // </div>
    //</div>
  //);
//}

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login Page</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <img src={session.user?.image ?? ""} alt="Profile" width={50} height={50} />
          <p>Email: {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </div>
  );
}

