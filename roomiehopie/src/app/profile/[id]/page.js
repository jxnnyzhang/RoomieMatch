"use client";

import { useParams } from "next/navigation";

const sampleProfiles = {
  "jane-doe": {
    name: "Jane Doe",
    bio: "Loves hiking, cooking, and spontaneous road trips.",
    responses: {
      gender: "Female",
      year: "Junior",
      sleepTime: "Before 10PM",
      cleanliness: "Very Clean",
      hobbies: ["Hiking", "Cooking", "Traveling"],
    },
  },
  "john-smith": {
    name: "John Smith",
    bio: "Avid reader, coffee enthusiast, and tech geek.",
    responses: {
      gender: "Male",
      year: "Senior",
      sleepTime: "12AM - 2AM",
      cleanliness: "Somewhat Messy",
      hobbies: ["Reading", "Gaming", "Tech"],
    },
  },
  "emily-johnson": {
    name: "Emily Johnson",
    bio: "Passionate about art, music, and outdoor adventures.",
    responses: {
      gender: "Female",
      year: "Sophomore",
      sleepTime: "After 2AM",
      cleanliness: "Somewhat Clean",
      hobbies: ["Art", "Music", "Outdoor Adventures"],
    },
  },
};

export default function ProfilePage() {
  const { id } = useParams();
  const profile = sampleProfiles[id];

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{profile.name}</h1>
        <p className="text-gray-600 mb-4">{profile.bio}</p>
        <h2 className="text-lg font-semibold mb-2">Survey Responses:</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Gender:</strong> {profile.responses.gender}</li>
          <li><strong>Year:</strong> {profile.responses.year}</li>
          <li><strong>Sleep Time:</strong> {profile.responses.sleepTime}</li>
          <li><strong>Cleanliness:</strong> {profile.responses.cleanliness}</li>
          <li><strong>Hobbies:</strong> {profile.responses.hobbies.join(", ")}</li>
        </ul>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
}
