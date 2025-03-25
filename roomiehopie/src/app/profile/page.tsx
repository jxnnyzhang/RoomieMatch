"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "../context/ProfileContext";

export default function ProfilePage() {
  // Pull global profile data and update function from context.
  const { name, bio, email, profileImage, setProfile } = useProfile();

  // Local state to hold the editable values.
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email || "");
  const [tempBio, setTempBio] = useState(bio);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const _fileInputRef = useRef<HTMLInputElement>(null);

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

  // Update the global profile and simulate a loading state before refreshing.
  const handleUpdate = () => {
    setProfile((prev) => ({
      ...prev,
      name: tempName,
      email: tempEmail,
      bio: tempBio,
    }));
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const _defaultImgSrc =
    "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-orange-200 flex flex-col items-center justify-center p-6">
      {/* Loading spinner overlay */}
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
        {/* Left Column: Profile Photo */}
        <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0 md:mr-6">
          <h1 className="text-pink-500 text-xl font-bold self-start mb-4">
            Profile
          </h1>
          {/* New message */}
          <p className="text-sm text-gray-600 mb-2">
            File size must not exceed 5MB.
          </p>
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
        </div>

        {/* Right Column: Name, Email & Bio */}
        <div className="md:w-2/3 flex flex-col">
          <div className="mb-4">
            <label className="block text-pink-500 font-semibold mb-1">
              Name
            </label>
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
            <label className="block text-pink-500 font-semibold mb-1">
              Email
            </label>
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
            <label className="block text-pink-500 font-semibold mb-1">
              Bio
            </label>
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
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Update
            </button>
            <Link
              href="/match"
              className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back to Match
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}