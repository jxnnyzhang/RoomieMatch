import React, { useState } from "react";

interface BioTextBoxProps {
  maxLength?: number;
}

const BioTextBox: React.FC<BioTextBoxProps> = ({ maxLength = 200 }) => {
  const [bio, setBio] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setBio(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <label className="block font-semibold mb-2">Bio</label>
      <textarea
        value={bio}
        onChange={handleChange}
        placeholder="Write something about yourself..."
        className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
      ></textarea>
      <p className="text-right text-gray-500 text-sm mt-1">
        {bio.length}/{maxLength} characters
      </p>
    </div>
  );
};

export default BioTextBox;
