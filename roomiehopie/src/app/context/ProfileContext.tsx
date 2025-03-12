"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  profileImage: string;
}

interface ProfileContextType extends ProfileData {
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("profile");
      return stored ? JSON.parse(stored) : { name: "", bio: "", profileImage: "" };
    }
    return { name: "", bio: "", profileImage: "" };
  });

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
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