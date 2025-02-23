"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600 mb-6">Log in with your school account</p>
        <button
          onClick={() => signIn("credentials", { callbackUrl: "/dashboard" })}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Sign in with CAS
        </button>
      </div>
    </div>
  );
}
