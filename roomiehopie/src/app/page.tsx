"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession(); // Get session data from NextAuth
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session loading to complete

    if (session?.user?.userID) {
      // If the session has a userID, check if the user has completed the survey
      checkIfUserCompletedSurvey(session.user.userID);
    } else {
      // If the session or userID is missing, redirect to login
      router.push("/login");
    }
  }, [session, status, router]);

  const checkIfUserCompletedSurvey = async (userID: string) => {
    const res = await fetch(`/api/survey/completed?userID=${userID}`);
    const data = await res.json();

    if (data.completed) {
      router.push("/match");
    } else {
      router.push("/survey");
    }
  };

  return <div>Loading...</div>;
}
