"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "../context/ProfileContext";

const sampleMatches = [
  {
    name: "Jane Doe",
    matchPercent: 92,
    bio: "Loves hiking, cooking, and spontaneous road trips.",
  },
  {
    name: "John Smith",
    matchPercent: 85,
    bio: "Avid reader, coffee enthusiast, and tech geek.",
  },
  {
    name: "Emily Johnson",
    matchPercent: 78,
    bio: "Passionate about art, music, and outdoor adventures.",
  },
];

export default function MatchPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { profileImage } = useProfile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sampleMatches.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === sampleMatches.length - 1 ? 0 : prev + 1
    );
  };

  const handleReject = () => {
    alert(`You rejected ${sampleMatches[currentIndex].name}.`);
    handleNext();
  };

  const handleStar = () => {
    alert(`You starred ${sampleMatches[currentIndex].name}!`);
    handleNext();
  };

  const handleAccept = () => {
    alert(`You accepted ${sampleMatches[currentIndex].name}!`);
    handleNext();
  };

  const { name, matchPercent, bio } = sampleMatches[currentIndex];

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-orange-200 flex flex-col items-center justify-center p-4">
      {/* Profile icon linking to the Profile page */}
      <Link href="/profile">
        <div className="absolute top-4 right-4 bg-white p-2 sm:p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition">
          {profileImage ? (
            <img suppressHydrationWarning={true} src={profileImage}
              alt="Profile"
              className="w-10 h-10 sm:w-10 sm:h-10 rounded-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 sm:w-8 sm:h-8 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A12.07 12.07 0 0112 15c2.787 0 
                   5.343.95 7.121 2.804M15 10a3 3 0 
                   11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
      </Link>

      {/* Container for card and side arrows */}
      <div className="relative w-full max-w-[800px]">
        {/* Main image card with responsive aspect ratio */}
        <div className="relative w-full h-0 pb-[68.75%] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col justify-end">
          {/* Image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-base sm:text-lg">
              [ Image Placeholder ]
            </span>
          </div>

          {/* Overlay for name and match percentage */}
          <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/40 to-transparent text-white">
            <h2 className="font-bold text-lg sm:text-xl">
              {name}, {matchPercent}% match
            </h2>
          </div>

          {/* Bio area */}
          <div className="bg-gradient-to-t from-white via-white to-transparent p-4">
            <p className="text-gray-700 text-sm sm:text-base">{bio}</p>
          </div>
        </div>

        {/* Left arrow button (circular, fixed size) */}
        <button
          onClick={handlePrevious}
          aria-label="Previous Match"
          className="absolute -left-8 sm:-left-12 top-1/2 transform -translate-y-1/2
                     flex items-center justify-center
                     w-12 h-12 sm:w-16 sm:h-16
                     bg-pink-500 rounded-full shadow hover:bg-pink-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right arrow button (circular, fixed size) */}
        <button
          onClick={handleNext}
          aria-label="Next Match"
          className="absolute -right-8 sm:-right-12 top-1/2 transform -translate-y-1/2
                     flex items-center justify-center
                     w-12 h-12 sm:w-16 sm:h-16
                     bg-pink-500 rounded-full shadow hover:bg-pink-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Bottom controls: Reject (red X), Star (blue), Accept (green check) */}
      <div className="flex items-center space-x-4 mt-6">
        {/* Reject button (circular) */}
        <button
          onClick={handleReject}
          aria-label="Reject"
          className="flex items-center justify-center
                     w-12 h-12 sm:w-16 sm:h-16
                     bg-red-500 text-white rounded-full shadow
                     hover:bg-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Star button (circular) */}
        <button
          onClick={handleStar}
          aria-label="Star"
          className="flex items-center justify-center
                     w-12 h-12 sm:w-16 sm:h-16
                     bg-blue-500 text-white rounded-full shadow
                     hover:bg-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 
                     0 00.95.69h4.162c.969 0 1.371 1.24.588 
                     1.81l-3.37 2.448a1 1 0 00-.364 
                     1.118l1.285 3.957c.3.922-.755 
                     1.688-1.54 1.118L10 14.348l-3.948 
                     2.88c-.784.57-1.84-.196-1.54-1.118l1.285-3.957a1 
                     1 0 00-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 
                     1 0 00.95-.69l1.286-3.958z" />
          </svg>
        </button>

        {/* Accept button (circular) */}
        <button
          onClick={handleAccept}
          aria-label="Accept"
          className="flex items-center justify-center
                     w-12 h-12 sm:w-16 sm:h-16
                     bg-green-500 text-white rounded-full shadow
                     hover:bg-green-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
