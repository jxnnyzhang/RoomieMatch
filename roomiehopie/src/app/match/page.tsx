// File: src/app/match/[userId]/page.tsx
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "../context/ProfileContext";
import { useParams } from "next/navigation";

interface Match {
  id: number;
  name: string;
  matchPercent: number;
  imageUrl?: string;
}

interface User {
  id: number;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export default function MatchPage() {
  const { userId } = useParams() as { userId: string };
  const [user,     setUser]    = useState<User | null>(null);
  const [matches,  setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { profileImage } = useProfile();
  const [mounted,  setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1️⃣ fetch the user by ID
    fetch(`/api/user/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<User>;
      })
      .then(setUser)
      .catch(err => console.error(err));

    // 2️⃣ fetch matches as before
    fetch("/api/match")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Match[]>;
      })
      .then(setMatches)
      .catch(err => console.error(err));
  }, [userId]);

  const handlePrevious = () =>
    setCurrentIndex(prev => prev === 0 ? matches.length - 1 : prev - 1);
  const handleNext = () =>
    setCurrentIndex(prev => prev === matches.length - 1 ? 0 : prev + 1);

  const handleReject = () => { alert(`You rejected ${matches[currentIndex].name}.`); handleNext(); };
  const handleStar   = () => { alert(`You starred ${matches[currentIndex].name}!`); handleNext(); };
  const handleAccept = () => { alert(`You accepted ${matches[currentIndex].name}!`); handleNext(); };

  if (!mounted || !user || matches.length === 0) return null;

  const { name, matchPercent, imageUrl } = matches[currentIndex];

  return (
    <div className="relative min-h-screen bg-orange-200 flex flex-col items-center justify-center p-4">
      {/* Profile icon */}
      <Link href="/profile">
        <div className="absolute top-4 right-4 bg-white p-2 sm:p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition">
          <img
            suppressHydrationWarning
            src={user.avatarUrl || profileImage || '/default-avatar.png'}
            alt={user.name}
            className="w-10 h-10 sm:w-10 sm:h-10 rounded-full object-cover"
          />
        </div>
      </Link>

      {/* Greet them */}
      <div className="mb-4 text-xl text-white">
        Hello, <span className="font-bold">{user.name}</span>!
      </div>

      {/* Container for card and side arrows */}
      <div className="relative w-full max-w-[800px]">
        {/* Main image card */}
        <div className="relative w-full h-0 pb-[68.75%] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col justify-end">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-lg">[ Image Placeholder ]</span>
            </div>
          )}
          <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/40 to-transparent text-white">
            <h2 className="font-bold text-lg sm:text-xl">
              {name}, {matchPercent}% match
            </h2>
          </div>
        </div>

        {/* Left arrow */}
        <button onClick={handlePrevious} aria-label="Previous Match"
          className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full shadow hover:bg-pink-600 transition">
          {/* …SVG… */}
        </button>

        {/* Right arrow */}
        <button onClick={handleNext} aria-label="Next Match"
          className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full shadow hover:bg-pink-600 transition">
          {/* …SVG… */}
        </button>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center space-x-4 mt-6">
        <button onClick={handleReject} aria-label="Reject"
          className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition">
          {/* …SVG… */}
        </button>
        <button onClick={handleStar} aria-label="Star"
          className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition">
          ⭐
        </button>
        <button onClick={handleAccept} aria-label="Accept"
          className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition">
          {/* …SVG… */}
        </button>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-2/3 shadow-md bg-white flex justify-around items-center rounded-t-full py-3 z-10">
        <Link href="/match" className="flex flex-col items-center space-y-1">
          {/* …SVG + “Match”… */}
        </Link>
        <Link href="/matched" className="flex flex-col items-center space-y-1">
          {/* …SVG + “Matched”… */}
        </Link>
      </div>
    </div>
  );
}
