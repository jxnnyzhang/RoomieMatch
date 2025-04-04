"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "../context/ProfileContext";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  // Pull global profile data and update function from context.
  const { name, bio, email, profileImage, setProfile } = useProfile();

  // Local state to hold the editable values.
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email || "");
  const [tempBio, setTempBio] = useState(bio);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle profile image upload.
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        alert("File size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Update the global profile and also save it to the API.
  const handleUpdate = async () => {
    const updatedProfile = {
      name: tempName,
      email: tempEmail,
      bio: tempBio,
      profileImage: profileImage, // include if needed
    };
  
    setIsLoading(true);
    try {
      // Ensure this URL and method match your backend configuration
      const res = await fetch("http://104.45.197.195:8000/update_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      const result = await res.json();
      if (result.success) {
        // Update the context with the new data
        setProfile(updatedProfile);
        // Immediately reload or re-render the component
        window.location.reload();
      } else {
        alert("Error updating profile: " + result.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
      setIsLoading(false);
    }
  };
  

  // Sign out the user and redirect to login.
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  // Delete profile: call the API to delete the user record then sign out.
  const handleDeleteProfile = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (confirmed) {
      try {
        const res = await fetch("http://104.45.197.195:8000/delete_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: tempEmail || email }),
        });
        const result = await res.json();
        if (result.success) {
          console.log("deleting profile");
          setProfile({ name: "", email: "", bio: "", profileImage: "" });
          signOut({ callbackUrl: "/login" });
        } else {
          alert("Error deleting profile: " + result.error);
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert("Error deleting profile. Please try again.");
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-orange-200 flex flex-col items-center justify-center p-6">
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center p-4 z-50">
          <svg className="animate-spin h-6 w-6 text-pink-500" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}

      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-6 flex flex-col md:flex-row">
        {/* Left Column: Profile Photo and Sign Out */}
        <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0 md:mr-6">
          <h1 className="text-pink-500 text-xl font-bold self-start mb-4">Profile</h1>
          <p className="text-sm text-gray-600 mb-2">File size must not exceed 5MB.</p>
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500">No Photo</span>
            )}
          </div>
          <label
            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
            aria-label="Upload Photo"
          >
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
          <div className = "flex flex-col space-y-2 mt-[60px]">
            <button
              onClick={handleSignOut}
              className="mt-4 w-full max-w-xs bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Out
            </button>
            <button
                onClick={handleDeleteProfile}
                className="w-full max-w-xs bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Profile
              </button>
            </div>
        </div>

        {/* Right Column: Profile Info Fields and Row of Buttons */}
        <div className="md:w-2/3 flex flex-col">
          <div className="mb-4">
            <label className="block text-pink-500 font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 rounded border border-gray-300 text-gray-900"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              aria-label="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-pink-500 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded border border-gray-300 text-gray-900"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              aria-label="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-pink-500 font-semibold mb-1">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              rows={6}
              className="w-full p-2 rounded border border-gray-300 text-gray-900"
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              aria-label="Bio"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleUpdate}
              className="w-full max-w-xs bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Update
            </button>
            <Link
              href="/match"
              className="w-full flex justify-center max-w-xs bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back to Match
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
