'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("Something went wrong. Please try again.");

  useEffect(() => {
    const error = searchParams.get('error');
    console.log("Query param:", error);

    if (error === 'InvalidDomain') {
      setMessage("You must sign in with your @case.edu email address.");
    }
  }, [searchParams]);

  const handleRetry = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Sign-in Error</h1>
      <p className="text-lg text-gray-700 mb-6">{message}</p>
      <button
        onClick={handleRetry}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading error details...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
