"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // Flag to ensure the redirect happens only once
  const [redirectTriggered, setRedirectTriggered] = useState(false);

  useEffect(() => {
    if (redirectTriggered) return; // Do nothing if redirect already triggered

    if (status === "unauthenticated") {
      setRedirectTriggered(true);
      // Redirect to the login page
      router.push("/login");
    } else if (status === "authenticated" && session) {
      setRedirectTriggered(true);
      // Extract user's name and email safely
      const nameStr = session.user?.name ?? "";
      const nameParts = nameStr.split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";
      const case_email = session.user?.email ?? "";

      // Call the API to create the user record.
      createUserInApi({ firstname, lastname, case_email }).then((isNewUser) => {
        if (isNewUser) {
          router.push("/survey");
        } else {
          router.push("/match");
        }
      });
    }
  }, [status, session, router, redirectTriggered]);

  return <div>Loading...</div>;
}

async function createUserInApi(userData: {
  firstname: string;
  lastname: string;
  case_email: string;
}): Promise<boolean> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    console.log("User creation result:", result);
    // Return true if the API indicates this is a new user.
    return result.newUser === true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}
