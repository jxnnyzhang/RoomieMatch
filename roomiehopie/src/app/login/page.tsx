"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { CSSProperties } from "react";

interface Styles {
  container: CSSProperties;
  card: CSSProperties;
  title: CSSProperties;
  text: CSSProperties;
  avatar: CSSProperties;
  button: CSSProperties;
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
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
    width: "fit-content", // Button will only be as wide as its content.
    alignSelf: "center",
  },
};

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login Page</h1>
        {session ? (
          <div>
            <p style={styles.text}>Welcome, {session.user?.name}!</p>
            <img
              style={styles.avatar}
              src={session.user?.image ?? ""}
              alt="Profile"
              width={100}
              height={100}
            />
            <p style={styles.text}>Email: {session.user?.email}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
              <button style={styles.button} onClick={() => signOut()}>
                Sign Out
              </button>
              <button style={styles.button} onClick={() => router.push("/")}>
                Continue
              </button>
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
