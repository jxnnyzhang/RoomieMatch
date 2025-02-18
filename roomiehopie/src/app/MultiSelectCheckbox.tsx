"use client";

import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option: string) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option) // Remove if already selected
      : [...selectedOptions, option]; // Add new selection

    onChange(updatedSelection);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Toggle (styled like a select element) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border rounded-lg p-2 bg-white flex justify-between items-center text-gray-700 focus:ring-2 focus:ring-gray-300"
      >
        <span className={selectedOptions.length > 0 ? "text-black" : "text-gray-400"}>
          {selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-full bg-white border rounded-lg shadow-md mt-1 z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
