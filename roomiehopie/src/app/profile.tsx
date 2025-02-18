"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    alert(`Profile Updated! \nName: ${name} \nBio: ${bio}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 to-yellow-400">
      <div className="bg-gray-200 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-purple-600 text-center mb-4">
          Profile
        </h2>
        
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <label className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500">No Photo</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <button className="mt-2 px-3 py-1 bg-black text-white rounded" onClick={() => document.querySelector("input[type=file]").click()}>
            Upload Photo
          </button>
        </div>

        {/* Name and Bio Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Bio"
            className="w-full p-2 rounded border mt-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Update Button */}
        <button
          className="w-full bg-black text-white py-2 mt-4 rounded"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
}
