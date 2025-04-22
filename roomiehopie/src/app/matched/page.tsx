// File: src/app/matched/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "../context/ProfileContext";
import { userInfo } from "os";

interface Match {
  score: number;
  user_id: string;
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

// 1) Hard‑coded demo images in public/images
const demoImageUrls: string[] = [
  "public/images/kashika.jpg",
  "public/images/jackie.jpg",
  "public/images/jenny.jpg",
  "public/images/sarina.jpg",
];

const sampleMatches = [
  {
    name: "Jane Doe",
    matchPercent: 92,
    bio: "Loves hiking, cooking, and spontaneous road trips.",
    contact: "jane@example.com",
    surveyPreview: "I enjoy creative projects and outdoor activities.",
  },
  {
    name: "John Smith",
    matchPercent: 85,
    bio: "Avid reader, coffee enthusiast, and tech geek.",
    contact: "john@example.com",
    surveyPreview: "Passionate about tech and reading science fiction.",
  },
  {
    name: "Emily Johnson",
    matchPercent: 78,
    bio: "Passionate about art, music, and outdoor adventures.",
    contact: "emily@example.com",
    surveyPreview: "Loves art, music festivals, and weekend hikes.",
  },
];

export default function MatchPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { profileImage } = useProfile();
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [matchUser, setMatchUser] = useState<UserInfo | null>(null);

  // 2) Compute which demo image to show
  const imgSrc = demoImageUrls[
    currentIndex % demoImageUrls.length
  ];

  useEffect(() => {
    setMounted(true);
    async function loadMatches() {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) throw new Error('No userId found');

        const res = await fetch(
          `/api/mutual_matches?userId=${encodeURIComponent(userId)}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const raw: { user_id: string; score: number }[] =
          await res.json();

        const data: Match[] = raw.map(({ user_id, score }) => ({
          user_id: user_id,
          score,
        }));
        setMatches(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadMatches();
  }, []);

  useEffect(() => {
    if (!matches.length) return;

    const { user_id } = matches[currentIndex];
    fetch(`/api/user_id/${user_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
    setCurrentIndex((prev) =>
      prev === 0 ? matches.length - 1 : prev - 1
    );
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === matches.length - 1 ? 0 : prev + 1
    );
    setIsFlipped(false);
  };

  if (!mounted || !matchUser) return null;

  return (
    <div className="relative min-h-screen bg-orange-200 flex flex-col items-center justify-center p-4">
      {/* Profile icon */}
      <Link href="/profile">
        <div className="absolute top-4 right-4 bg-white p-2 sm:p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition">
          {profileImage ? (
            <img
              suppressHydrationWarning
              src={profileImage}
              alt="Your Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <svg /* fallback icon */ />
          )}
        </div>
      </Link>

      {/* Flip‑card container */}
      <div className="relative w-full max-w-[800px]">
        <div className="relative [perspective:1000px]">
          <div
            className={`relative w-full h-0 pb-[68.75%] rounded-xl shadow-xl transition-transform duration-500 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* Front side */}
            <div className="absolute inset-0 bg-white rounded-xl overflow-hidden [backface-visibility:hidden]">
              {/* 3) HERE: show the hard‑coded image */}
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsFlipped(true)}
              >
                <img
                  src={imgSrc}
                  alt={`Profile of ${matchUser.firstname}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & match % */}
              <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/40 to-transparent text-white">
                <h2 className="font-bold text-lg sm:text-xl">
                  {matchUser.firstname},{" "}
                  {matches[currentIndex].score}% match
                </h2>
              </div>

              {/* Bio */}
              <div className="bg-gradient-to-t from-white via-white to-transparent p-4">
                <p className="text-gray-700 text-sm sm:text-base">
                  {matchUser.bio}
                </p>
              </div>
            </div>

            {/* Back side */}
            <div
              className="absolute inset-0 bg-white rounded-xl overflow-hidden cursor-pointer [backface-visibility:hidden] [transform:rotateY(180deg)]"
              onClick={() => setIsFlipped(false)}
            >
              <div className="absolute top-12 left-0 right-0 p-14 text-center">
                <h2 className="text-2xl text-gray-700 font-bold">
                  {matchUser.firstname}
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center h-full p-4 text-center">
                <h3 className="text-xl text-gray-700 font-bold mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-700 mb-4">
                  {matchUser.case_email}
                </p>
                <h3 className="text-xl text-gray-700 font-bold mb-2">
                  Bio
                </h3>
                <p className="text-gray-700">
                  {matchUser.bio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={handlePrevious} /* … */>
          <svg /* … */ />
        </button>
        <button onClick={handleNext} /* … */>
          <svg /* … */ />
        </button>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 bg-white shadow-md flex justify-around items-center rounded-t-full py-3 z-10">
        <Link href="/match" /*…*/>{/*…*/}</Link>
        <Link href="/matched" /*…*/>{/*…*/}</Link>
      </div>
    </div>
  );
}
