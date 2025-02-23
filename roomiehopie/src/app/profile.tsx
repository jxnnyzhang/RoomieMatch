"use client";
import { useState, useRef, useEffect } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        alert("File size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    alert(`Profile Updated!\nName: ${name}\nBio: ${bio}`);
  };

  const defaultImgSrc = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 to-yellow-400">
      <div className="bg-gray-200 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-purple-600 text-center mb-4">
          Profile
        </h2>

        <div className="flex flex-col items-center">
          <label
            htmlFor="profile-image"
            className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden cursor-pointer"
            aria-label="Upload profile image"
          >
            {isMounted ? (
              <img
                src={image || defaultImgSrc}
                alt="Profile Preview"
                className="w-full h-full object-cover"
                suppressHydrationWarning={true}
              />
            ) : (
              <span className="text-gray-500">Loading...</span>
            )}
          </label>
          <input
            id="profile-image"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            aria-hidden="true"
          />
          <button
            className="mt-2 px-3 py-1 bg-black text-white rounded"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 rounded border text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Name"
          />
          <textarea
            placeholder="Bio"
            className="w-full p-2 rounded border mt-2 text-gray-900"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            aria-label="Bio"
          />
        </div>

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
