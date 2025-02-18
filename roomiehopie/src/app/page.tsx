"use client"; 

import React, { useState } from "react";
import MultiSelectCheckbox from "./MultiSelectCheckbox";


interface FormData {
  gender: string;
  year: string;
  cleanliness: string;
  noiseLevel: string;
  politics: string;
  smoking: string;
  fraternity: string;
  pets: string[];
  agree: boolean;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    year: "",
    cleanliness: "",
    noiseLevel: "",
    politics: "",
    smoking: "",
    fraternity: "",
    pets: [],
    agree: false,
  });
  
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const hobbies = ["Sports", "Music", "Gaming", "Cooking", "Reading", "Traveling"];

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
  
    // Ensure checkboxes are handled correctly
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement; // Cast `e.target` to `HTMLInputElement`
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked
          ? [...(prev[name as keyof FormData] as string[]), value]
          : (prev[name as keyof FormData] as string[]).filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-orange-200 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">Welcome, XXX!</h2>
        <p className="mb-8 text-gray-600 text-center">
          Here is a brief survey for you to answer so we can find you your best match!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
          {/* Gender */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Gender</label>
            <select name="gender" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Select your gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Gender Preference</label>
            <select name="genderPreference" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Select your Gender preference</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>

          {/* Year */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Year</label>
            <select name="year" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Select your year</option>
              <option value="Freshman">Incoming Freshman</option>
              <option value="Sophomore">Incoming Sophomore</option>
              <option value="Junior">Incoming Junior</option>
              <option value="Senior">Incoming Senior</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Sleep Time</label>
            <select name="sleepTime" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Sleep Time preference</option>
              <option value="Before 10PM">Before 10PM</option>
              <option value="11PM - 12AM">11PM - 12AM</option>
              <option value="12 - 2AM">12 - 2AM</option>
              <option value="After 2AM">After 2AM</option>
            </select>
          </div>

          {/* Cleanliness */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Cleanliness</label>
            <select name="cleanliness" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Room cleanliness preference</option>
              <option value="Very Messy">Very Messy</option>
              <option value="Somewhat Messy">Somewhat Messy</option>
              <option value="Somewhat Clean">Somewhat Clean</option>
              <option value="Very Clean">Very Clean</option>
            </select>
          </div>

          {/* Noise Level */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Noise Level</label>
            <select name="noiseLevel" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Room noise level preference</option>
              <option value="Very Loud">Very Loud</option>
              <option value="Somewhat Loud">Somewhat Loud</option>
              <option value="Somewhat Quiet">Somewhat Quiet</option>
              <option value="Very Quiet">Very Quiet</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Religion</label>
            <select name="religion" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">What religion do you identify as?</option>
              <option value="Christian">Christian</option>
              <option value="Muslim">Muslim</option>
              <option value="Judaism">Judaism</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Atheism/Agnostic">Atheism/Agnostic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Religious Preference</label>
            <select name="religionPreferences" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you prefer to room with somebody the same religion as you?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Preferred Langauge</label>
            <select name="languagePreferences" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you prefer a certain language?</option>
              <option value="English">English</option>
              <option value="Chinese">Chinese</option>
              <option value="Spanish">Spanish</option>
              <option value="Hindi">Hindi</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Smoking</label>
            <select name="smoking" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you smoke?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Smoking Preference</label>
            <select name="smokingPreference" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Would you live with a smoker?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Drinking</label>
            <select name="drinking" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you drink?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Drinking Preference</label>
            <select name="drinkingPreference" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Would you live with a drinker?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Cooking</label>
            <select name="cooking" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">How often do you cook?</option>
              <option value="Never">Never</option>
              <option value="1-2 times/week">1-2 times/week</option>
              <option value="3-4 times/week">3-4 times/week</option>
              <option value="Everyday">Everyday</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Greek Life</label>
            <select name="greekLife" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you plan on joining Greek life or are you already a part of it?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Politics</label>
            <select name="politics" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">What political ideology do you identify with?</option>
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Liberal">Liberal</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Roommates Politics</label>
            <select name="politics" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you have a preference for your roommates politics?</option>
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Liberal">Liberal</option>
              <option value="Other">Other</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Pets</label>
            <select name="pets" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you have any pets?</option>
              <option value="Dog">Dog</option>
              <option value="Moderate">Cat</option>
              <option value="Liberal">Other</option>
              <option value="Other">None</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6"> {/*maybe make a multiselect*/}
            <label className="block font-semibold mb-2 text-gray-600">Pet Preference</label>
            <select name="petPreference" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you have a preference on your roommates pet?</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
              <option value="None">None</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Guests</label>
            <select name="guests" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">How often do you plan on having guests over?</option>
              <option value="Never">Never</option>
              <option value="1-2 times/week">1-2 times/week</option>
              <option value="3-4 times/week">3-4 times/week</option>
              <option value="Everyday">Everyday</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Major Area</label>
            <select name="major" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">What area is your major in?</option>
              <option value="Engineering">Engineering</option>
              <option value="Humanities">Humanities</option>
              <option value="Arts & Sciences">Arts & Sciences</option>
              <option value="Business/Finance">Business/Finance</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Prefered Roommate Major</label>
            <select name="roommageMajor" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">What major area would you prefer for your roommate to have?</option>
              <option value="Engineering">Engineering</option>
              <option value="Humanities">Humanities</option>
              <option value="Arts & Sciences">Arts & Sciences</option>
              <option value="Business/Finance">Business/Finance</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">Hobbies</label>
              <MultiSelectCheckbox
                options={hobbies}
                selectedOptions={selectedHobbies}
                onChange={setSelectedHobbies}
                placeholder="Select your hobbies"
              />
            <p className="mt-4 text-gray-700">
              Selected: <strong>{selectedHobbies.join(", ") || "None"}</strong>
            </p>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <label className="block font-semibold mb-2 text-gray-600">On/Off Campus</label>
            <select name="campus" onChange={handleChange} className="w-full border rounded p-2 text-gray-600">
              <option value="">Do you plan on living off or on campus?</option>
              <option value="On-campus">On-campus</option>
              <option value="Off-campus">Off-campus</option>
             
            </select>
          </div>

          {/* Agreement Checkbox */}
          <div className="w-full px-4 flex items-center">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Do you agree to let us share your answers to provide the best matches for you?
            </label>
          </div>
      
          {/* Submit Button */}
          <div className="w-full text-center px-4 mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
