"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { CSSProperties, useState } from "react";

interface Styles {
  container: CSSProperties;
  card: CSSProperties;
  title: CSSProperties;
  text: CSSProperties;
  avatar: CSSProperties;
  button: CSSProperties;
  continueButton: CSSProperties;
  errorText: CSSProperties;
}

const styles: Styles = {
  container: {
    backgroundColor: "#fff",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  text: {
    color: "#555",
    marginBottom: "10px",
  },
  avatar: {
    borderRadius: "50%",
    marginBottom: "10px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    padding: "10px 40px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "gray",
    color: "#fff",
    cursor: "pointer",
    width: "fit-content",
    alignSelf: "center",
  },
  continueButton: {
    padding: "10px 40px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0070f3", 
    color: "#fff",
    cursor: "pointer",
    width: "fit-content",
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px"
  }
};

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle Continue button logic
  const handleContinue = async () => {
    setLoading(true);
    setError(null);
    
    if (session?.user?.email) {
      try {
        console.log(`Fetching user data for email: ${session.user.email}`);
        
        // Use "case_email" parameter as expected by the API
        const response = await fetch(`/api/user?case_email=${session.user.email}`);
        
        // Check if the status is in the successful range (200-299)
        if (response.ok) {
          try {
            const responseText = await response.text();
            
            // If we got a response with content
            if (responseText && responseText.trim()) {
              const userData = JSON.parse(responseText);
              console.log("User data received:", userData);
              
              // Check if matches exist
              if (userData.surveyCompleted) {
                router.push("/match");
              } else {
                router.push("/survey");
              }
            } else {
              // Empty response - go to survey
              console.log("Empty response, directing to survey");
              router.push("/survey");
            }
          } catch (parseError) {
            // JSON parsing error - go to survey
            console.error("JSON parsing error, directing to survey:", parseError);
            router.push("/survey");
          }
        } else {
          // HTTP error - go to survey
          console.error("HTTP error, directing to survey:", response.status);
          router.push("/survey");
        }
      } catch (error) {
        // Network or other error - go to survey
        console.error("Error fetching user data, directing to survey:", error);
        router.push("/survey");
      }
    } else {
      setError("Session data is missing. Please try signing in again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login Page</h1>
        {session ? (
          <div>
            <p style={styles.text}>Welcome, {session.user?.name}!</p>
            {session.user?.image && (
              <img
                style={styles.avatar}
                src={session.user.image}
                alt="Profile"
                width={100}
                height={100}
              />
            )}
            <p style={styles.text}>Email: {session.user?.email}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
              <button style={styles.continueButton} onClick={handleContinue} disabled={loading}>
                {loading ? "Loading..." : "Continue"}
              </button>
              <button style={styles.button} onClick={() => signOut()}>
                Sign Out
              </button>
              {error && <p style={styles.errorText}>{error}</p>}
            </div>
          </div>
        ) : (
          <button style={styles.button} onClick={() => signIn("google")}>
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}