"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useProfile } from "../context/ProfileContext";

const sampleMatches = [
  {
    id: "jane-doe",
    name: "Jane Doe",
    matchPercent: 92,
    bio: "Loves hiking, cooking, and spontaneous road trips.",
  },
  {
    id: "john-smith",
    name: "John Smith",
    matchPercent: 85,
    bio: "Avid reader, coffee enthusiast, and tech geek.",
  },
  {
    id: "emily-johnson",
    name: "Emily Johnson",
    matchPercent: 78,
    bio: "Passionate about art, music, and outdoor adventures.",
  },
];


export default function MatchPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { profileImage } = useProfile();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === sampleMatches.length - 1 ? 0 : prev + 1));
  };

  const { id, name, matchPercent, bio } = sampleMatches[currentIndex];

  return (
    <div className="relative min-h-screen bg-orange-200 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-[800px]">
        {/* Clickable profile link */}
        <Link href={`/profile/${id}`}>
          <div className="relative w-full h-0 pb-[68.75%] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col justify-end cursor-pointer hover:opacity-90 transition">
            {/* Image placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-base sm:text-lg">[ Image Placeholder ]</span>
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
        </Link>

        {/* Next match button */}
        <button onClick={handleNext} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Next Match
        </button>
      </div>
    </div>
  );
}