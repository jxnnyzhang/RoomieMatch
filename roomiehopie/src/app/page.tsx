"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuthentication();
  }, [router]);

  const checkUserAuthentication = async () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('user_token='));

    if (token) {
      const userID = decodeJWT(token.split('=')[1]);

      if (userID) {
        checkIfUserCompletedSurvey(userID);
      }
    } else {
      router.push("/login"); // Redirect to login if no token
    }
  };

  const decodeJWT = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userID; // Assuming the JWT contains userID
  };

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
