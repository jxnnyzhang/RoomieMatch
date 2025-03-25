'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Something went wrong. Please try again.");

  useEffect(() => {
    const error = searchParams.get('error');
    console.log("Query param:", error);

    if (error === 'InvalidDomain') {
      setMessage("You must sign in with your @case.edu email address.");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Sign-in Error</h1>
      <p className="text-lg text-gray-700 mb-6">{message}</p>
      <a
        href="/api/auth/signin"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Try Again
      </a>
    </div>
  );
}
