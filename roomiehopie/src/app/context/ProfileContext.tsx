"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  profileImage: string; // Consider storing a URL here if the image is large.
}

interface ProfileContextType extends ProfileData {
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    bio: "",
    profileImage: ""
  });

  // Load profile data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("profile", JSON.stringify(profile));
      } catch (error: any) {
        if (error.name === "QuotaExceededError") {
          console.error("Local storage quota exceeded. Consider reducing the data size or cleaning up unused items.");
        } else {
          console.error("Error saving to localStorage:", error);
        }
      }
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ ...profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
