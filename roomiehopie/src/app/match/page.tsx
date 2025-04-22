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

// 1) Hard‑coded demo images in public/images:
const demoImageUrls: string[] = [
  "public/images/misaki.jpg",
  "public/images/ian.jpg",
  "public/images/kashika.jpg",
  "public/images/jenny.jpg"
  // …add more as needed
];

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

  if (!mounted || matches.length === 0 ) return null;

  const { score } = matches[currentIndex];
  // 2) Safely wrap around demoImageUrls if matches > images:
  const imgSrc =
    demoImageUrls[currentIndex % demoImageUrls.length];

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
            /* fallback icon… */
            <svg /* … */ />
          )}
        </div>
      </Link>

      {/* Card + arrows */}
      <div className="relative w-full max-w-[800px]">
        <div className="relative w-full h-0 pb-[68.75%] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col justify-end">
          
          {/* 3) Render your demo image */}
          <div className="absolute inset-0">
            <img
              src={imgSrc}
              alt={`Profile of ${matchUser.firstname}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & score overlay */}
          <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/40 to-transparent text-white">
            <h2 className="font-bold text-lg sm:text-xl">
              {matchUser.firstname}, {score}% match
            </h2>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={handlePrevious}
          aria-label="Previous Match"
          className="absolute -left-8 sm:-left-12 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full shadow hover:bg-pink-600 transition"
        >
          {/* left arrow SVG */}
          <svg /*…*/ />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Match"
          className="absolute -right-8 sm:-right-12 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full shadow hover:bg-pink-600 transition"
        >
          {/* right arrow SVG */}
          <svg /*…*/ />
        </button>
      </div>

      {/* Reject / Accept */}
      <div className="flex items-center space-x-4 mt-6">
        <button onClick={handleReject} /*…*/>
          {/* X icon */}
          <svg /*…*/ />
        </button>
        <button onClick={handleAccept} /*…*/>
          {/* Check icon */}
          <svg /*…*/ />
        </button>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 shadow-md bg-white flex justify-around items-center rounded-t-full py-3 z-10">
        <Link href="/match" /*…*/>{/*…*/}</Link>
        <Link href="/matched" /*…*/>{/*…*/}</Link>
      </div>
    </div>
  );
}
