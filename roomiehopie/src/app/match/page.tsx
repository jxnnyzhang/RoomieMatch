"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "../context/ProfileContext";

interface Match {
  score: number;
  room_id: string;
}

export interface UserInfo {
  against_drinker: string;
  against_pet: string;
  against_smoker: string;
  bio: string;
  case_email: string;
  clean: string;
  cook: string;
  drink: string;
  firstname: string;
  gender: string;
  gender_preference: string;
  greeklife: string;
  guests: string;
  hobbies: number[];
  housing: string;
  language: string;
  lastname: string;
  major: string;
  major_preference: string;
  noise: string;
  pets: string;
  politics: string;
  politics_preference: string;
  profile_pic: string;
  religion: string;
  religion_preference: string;
  sleep: string;
  smoke: string;
  submission_timestamp: string;
  top_1: string;
  top_2: string;
  top_3: string;
  userID: number;
  year: string;
}


export default function MatchPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { profileImage } = useProfile();
  const [mounted, setMounted] = useState(false);
  const [matchUser, setMatchUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    setMounted(true);

    async function loadMatches() {
      try {
        const userId = sessionStorage.getItem("userId");

        console.log(userId)
        if (!userId) {
          throw new Error('No userId found in sessionStorage');
        }

        const res = await fetch(`/api/match?userId=${encodeURIComponent(userId)}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
            },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw: { user_id: string; score: number }[] = await res.json();

        // Map each { user_id, score } → { room_id, score }
        const data: Match[] = raw.map(({ user_id, score }) => ({room_id: user_id,score,}));
        setMatches(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadMatches();
  }, []);

  useEffect(() => {
    if (!matches.length) return;
  
    const {room_id } = matches[currentIndex];
    console.log(room_id)
    const case_email = sessionStorage.getItem("caseEmail");
    if (!case_email) {
      throw new Error('No userId found in sessionStorage');
    }
    fetch(`/api/user_id/${room_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((info: UserInfo) => {
        console.log("fetched user info:", info);
        setMatchUser(info);
      })
      .catch(console.error);
  }, [currentIndex, matches]);
  
 
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? matches.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === matches.length - 1 ? 0 : prev + 1));
  };

  async function postDecision(room_id: string, decision: 'accept' | 'reject') {
    try {
      const userId = sessionStorage.getItem("userId");
      console.log(userId)
      const { room_id } = matches[currentIndex];
      const res = await fetch(`/api/${decision}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id: room_id, user: userId })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      return await res.json();
    } catch (err) {
      console.error(`Failed to ${decision} ${room_id}:`, err);
      throw err;
    }
  }

  const handleReject = async () => {
    const { room_id } = matches[currentIndex];
    try {
      await postDecision(room_id, 'reject');
      // move on to next match
      setCurrentIndex((i) => (i === matches.length - 1 ? 0 : i + 1));
    } catch {
      alert('Could not reject right now.');
    }
  };

  const handleAccept = async () => {
    const { room_id } = matches[currentIndex];
    try {
      await postDecision(room_id, 'accept');
      setCurrentIndex((i) => (i === matches.length - 1 ? 0 : i + 1));
    } catch {
      alert('Could not accept right now.');
    }
  };

  // don't render until we have at least one match and we're on the client
  if (!mounted || matches.length === 0 ) {
    return null;
  }

  const { score, room_id } = matches[currentIndex];
  console.log(matches[currentIndex]);
  return (
    <div className="relative min-h-screen bg-orange-200 flex flex-col items-center justify-center p-4">
      {/* Profile icon linking to the Profile page */}
      <Link href="/profile">
        <div className="absolute top-4 right-4 bg-white p-2 sm:p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition">
          {profileImage ? (
            <img
              suppressHydrationWarning={true}
              src={profileImage}
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
          {/* Image or placeholder */}

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-base sm:text-lg">
              [ Image Placeholder ]
            </span>
          </div>

          {/* Overlay for name and match percentage */}
          <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/40 to-transparent text-white">
            <h2 className="font-bold text-lg sm:text-xl">
              {matchUser.firstname}, {score}% match
            </h2>
          </div>
        </div>

        {/* Left arrow button */}
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

        {/* Right arrow button */}
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

      {/* Bottom controls: Reject, Star, Accept */}
      <div className="flex items-center space-x-4 mt-6">
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

      {/* Bottom navigation bar */}
      <div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 
                      w-2/3 shadow-md bg-white 
                      flex justify-around items-center 
                      rounded-t-full rounded-b-none
                      py-3 z-10"
      >
        <Link href="/match" className="flex flex-col items-center space-y-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m2.85-5.65
                 a8 8 0 11-16 0 8 8 0 0116 0z"
            />
          </svg>
          <span className="text-xs font-medium text-gray-800">Match</span>
        </Link>

        <Link href="/matched" className="flex flex-col items-center space-y-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 
                 016.364 0L12 7.657l1.318-1.339
                 a4.5 4.5 0 116.364 6.364l-7.07 7.07
                 a.997.997 0 01-1.414 0l-7.07-7.07
                 a4.5 4.5 0 010-6.364z"
            />
          </svg>
          <span className="text-xs font-medium text-gray-800">Matched</span>
        </Link>
      </div>
    </div>
  );
}
