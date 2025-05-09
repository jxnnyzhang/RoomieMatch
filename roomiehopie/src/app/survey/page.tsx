"use client";

import React, { useState } from "react";
import MultiSelectCheckbox from "../MultiSelectCheckbox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  top_1: any;
  top_2: any;
  top_3: any;
  profile_pic: "jpg",
  bio: string,
  firstname: string;
  lastname: string;
  case_email: string;
  gender: string;
  gender_preference: string;
  year: string;
  sleep: string;
  clean: string;
  noise: string;
  religion: string;
  religion_preference: string;
  language: string;
  smoke: string;
  against_smoker: string;
  drink: string;
  against_drinker: string;
  cook: string;
  greeklife: string;
  politics: string;
  politics_preference: string;
  pets: string;
  against_pet: string;
  guests: string;
  major: string;
  major_preference: string;
  hobbies: string[];
  housing: string;
  //agree: boolean;
}

// Helper component to render a label with a red asterisk.
const RequiredLabel: React.FC<{ text: string }> = ({ text }) => (
  <label className="block font-semibold mb-2 text-gray-600">
    {text} <span className="text-red-500">*</span>
  </label>
);

const Survey: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    case_email: "",
    gender: "",
    gender_preference: "",
    year: "",
    sleep: "",
    clean: "",
    noise: "",
    religion: "",
    religion_preference: "",
    language: "",
    smoke: "",
    against_smoker: "",
    drink: "",
    against_drinker: "",
    cook: "",
    greeklife: "",
    politics: "",
    politics_preference: "",
    pets: "",
    against_pet: "",
    guests: "",
    major: "",
    major_preference: "",
    hobbies: [],
    top_1: "",
    top_2: "",
    top_3: "",
    housing: "",
    profile_pic: "jpg",
    bio: "bleh"
    //agree: false,
  });

  // This state holds error messages for each field.
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hobbiesOptions = [
    "Sports",
    "Music",
    "Gaming",
    "Cooking",
    "Reading",
    "Traveling",
  ];

  // Options for important factors
  const importanceOptions = [
    "clean",
    "noise",
    "sleep",
    "cook",
    "major preference",
    "religion preference",
    "politics preference",
    "greeklife",
    "hobbies",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      // Cast to HTMLInputElement to safely access "checked"
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleHobbiesChange = (selected: string[]) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: selected,
    }));
    if (errors["hobbies"]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors["hobbies"];
        return newErrors;
      });
    }
  };

    // Grab the user's name from the session. If you need to split it,
  // you can do so. Here, we'll simply display the full name.
  const userName = session?.user?.name || "[Guest]";

  // Validate all fields and return an errors object.
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstname.trim())
      newErrors.firstName = "Please fill this out";
    if (!formData.lastname.trim())
      newErrors.lastName = "Please fill this out";
    if (!formData.case_email.trim()) {
      newErrors.email = "Please fill this out";
    } else if (
      !formData.case_email.trim().toLowerCase().endsWith("@case.edu")
    ) {
      newErrors.email = "Email must end in @case.edu";
    }
    if (!formData.gender.trim()) newErrors.gender = "Please fill this out";
    if (!formData.gender_preference.trim())
      newErrors.genderPreference = "Please fill this out";
    if (!formData.year.trim()) newErrors.year = "Please fill this out";
    if (!formData.sleep.trim())
      newErrors.sleepTime = "Please fill this out";
    if (!formData.clean.trim())
      newErrors.cleanliness = "Please fill this out";
    if (!formData.noise.trim())
      newErrors.noiseLevel = "Please fill this out";
    if (!formData.religion.trim())
      newErrors.religion = "Please fill this out";
    if (!formData.religion_preference.trim())
      newErrors.religionPreferences = "Please fill this out";
    if (!formData.language.trim())
      newErrors.languagePreferences = "Please fill this out";
    if (!formData.smoke.trim())
      newErrors.smoking = "Please fill this out";
    if (!formData.against_smoker.trim())
      newErrors.smokingPreference = "Please fill this out";
    if (!formData.drink.trim())
      newErrors.drinking = "Please fill this out";
    if (!formData.against_drinker.trim())
      newErrors.drinkingPreference = "Please fill this out";
    if (!formData.cook.trim())
      newErrors.cooking = "Please fill this out";
    if (!formData.greeklife.trim())
      newErrors.greekLife = "Please fill this out";
    if (!formData.politics.trim())
      newErrors.politics = "Please fill this out";
    if (!formData.politics_preference.trim())
      newErrors.roommatePolitics = "Please fill this out";
    if (!formData.pets.trim())
      newErrors.pets = "Please fill this out";
    if (!formData.against_pet.trim())
      newErrors.petPreference = "Please fill this out";
    if (!formData.guests.trim())
      newErrors.guests = "Please fill this out";
    if (!formData.major.trim())
      newErrors.major = "Please fill this out";
    if (!formData.major_preference.trim())
      newErrors.roommateMajor = "Please fill this out";
    if (formData.hobbies.length === 0)
      newErrors.hobbies = "Please select at least one";
    if (!formData.housing.trim())
      newErrors.campus = "Please fill this out";
    //if (!formData.agree) newErrors.agree = "Please agree to the terms";

    // Validate factor rankings
    if (!formData.top_1) newErrors.ranking1 = "Please select the first priority";
    if (!formData.top_2) newErrors.ranking2 = "Please select the second priority";
    if (!formData.top_3) newErrors.ranking3 = "Please select the third priority";

    // Check for duplicate selections
    const selectedRankings = new Set([
      formData.top_1,
      formData.top_2,
      formData.top_3,
    ]);

    return newErrors;
  };

  // handleSubmit:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } 
     // 1️⃣ Build a payload, omitting userId if it's null/undefined
   const payload: any = { ...formData };
    
  
    
      try {
        // 1) POST the form data to our new route
        const res = await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          
        });
        const result = await res.json();
        console.log(result)
        console.log("User ID:", result.user)  
        if (result.user) {
          sessionStorage.setItem("userId", result.user.toString());
          sessionStorage.setItem("caseEmail", formData.case_email)
        }      
        router.push("/match");
      } catch (error) {
        console.error("Error submitting survey:", error);
        // Show an error message to the user if you like
      }
    
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-orange-200 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">
          Welcome, {userName}!
        </h2>
        <p className="mb-8 text-gray-600 text-center">
          Here is a brief survey for you to answer so we can find you your best
          match!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
          {/* First Name */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="First Name" />
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Last Name" />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>

          {/* Email */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Email" />
            <input
              type="text"
              name="case_email"
              value={formData.case_email}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Gender */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Gender" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Select your gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>

          {/* Gender Preference */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Gender Preference" />
            <select
              name="gender_preference"
              value={formData.gender_preference}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Select your gender preference</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="No Preference">No Preference</option>
            </select>
            {errors.genderPreference && (
              <span className="text-red-500 text-sm">
                {errors.genderPreference}
              </span>
            )}
          </div>

          {/* Year */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Year" />
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Select your year</option>
              <option value="Incoming Freshman">Incoming Freshman</option>
              <option value="Incoming Sophomore">Incoming Sophomore</option>
              <option value="Incoming Upperclassman">Incoming Upperclassman</option>
            </select>
            {errors.year && (
              <span className="text-red-500 text-sm">{errors.year}</span>
            )}
          </div>

          {/* Major Area */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Major Area" />
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">What area is your major in?</option>
              <option value="Engineering">Engineering</option>
              <option value="Humanities">Humanities</option>
              <option value="Arts & Sciences">Arts & Sciences</option>
              <option value="Business/Finance">Business/Finance</option>
            </select>
            {errors.major && (
              <span className="text-red-500 text-sm">{errors.major}</span>
            )}
          </div>

          {/* Preferred Roommate Major */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Preferred Roommate Major" />
            <select
              name="major_preference"
              value={formData.major_preference}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">
                What major area would you prefer your roommate to have?
              </option>
              <option value="Engineering">Engineering</option>
              <option value="Humanities">Humanities</option>
              <option value="Arts & Sciences">Arts & Sciences</option>
              <option value="Business/Finance">Business/Finance</option>
              <option value="No Preference">No Preference</option>
            </select>
            {errors.roommateMajor && (
              <span className="text-red-500 text-sm">
                {errors.roommateMajor}
              </span>
            )}
          </div>

          {/* Sleep Time */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Sleep Time" />
            <select
              name="sleep"
              value={formData.sleep}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Select your sleep time preference</option>
              <option value="Before 10PM">Before 10PM</option>
              <option value="11PM - 12AM">11PM - 12AM</option>
              <option value="12AM - 2AM">12AM - 2AM</option>
              <option value= "2AM or Later">2AM or Later</option>
            </select>
            {errors.sleepTime && (
              <span className="text-red-500 text-sm">{errors.sleepTime}</span>
            )}
          </div>

          {/* Cleanliness */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Cleanliness" />
            <select
              name="clean"
              value={formData.clean}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Room cleanliness preference</option>
              <option value="Very Messy">Very Messy</option>
              <option value="Somewhat Messy">Somewhat Messy</option>
              <option value="Somewhat Clean">Somewhat Clean</option>
              <option value="Very Clean">Very Clean</option>
            </select>
            {errors.cleanliness && (
              <span className="text-red-500 text-sm">{errors.cleanliness}</span>
            )}
          </div>

          {/* Noise Level */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Noise Level" />
            <select
              name="noise"
              value={formData.noise}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Room noise level preference</option>
              <option value="Very Loud">Very Loud</option>
              <option value="Somewhat Loud">Somewhat Loud</option>
              <option value="Somewhat Quiet">Somewhat Quiet</option>
              <option value="Very Quiet">Very Quiet</option>
            </select>
            {errors.noiseLevel && (
              <span className="text-red-500 text-sm">{errors.noiseLevel}</span>
            )}
          </div>

          {/* Religion */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Religion" />
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">What religion do you identify as?</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Judaism">Judaism</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Atheism/Agnosticism">Atheism/Agnosticism</option>
              <option value="Other">Other</option>
            </select>
            {errors.religion && (
              <span className="text-red-500 text-sm">{errors.religion}</span>
            )}
          </div>

          {/* Religious Preference */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Religious Preference" />
            <select
              name="religion_preference"
              value={formData.religion_preference}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">
                Do you have a preference for what your roommate's religion should be?
              </option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Judaism">Judaism</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Atheism/Agnostic">Atheism/Agnosticism</option>
              <option value="Other">Other</option>
              <option value="None">No Preference</option>
            </select>
            {errors.religionPreferences && (
              <span className="text-red-500 text-sm">
                {errors.religionPreferences}
              </span>
            )}
          </div>

          {/* Language Preference */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Preferred Language" />
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Select your language preference</option>
              <option value="English">English</option>
              <option value="Chinese">Chinese</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Hindi">Hindi</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Italian">Italian</option>
              <option value="Other">Other</option>
            </select>
            {errors.languagePreferences && (
              <span className="text-red-500 text-sm">
                {errors.languagePreferences}
              </span>
            )}
          </div>

          {/* Smoking */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Smoking" />
            <select
              name="smoke"
              value={formData.smoke}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Do you smoke?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.smoking && (
              <span className="text-red-500 text-sm">{errors.smoking}</span>
            )}
          </div>

          {/* Smoking Preference */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Smoking Preference" />
            <select
              name="against_smoker"
              value={formData.against_smoker}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Would you live with a smoker?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.smokingPreference && (
              <span className="text-red-500 text-sm">
                {errors.smokingPreference}
              </span>
            )}
          </div>

          {/* Drinking */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Drinking" />
            <select
              name="drink"
              value={formData.drink}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Do you drink?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.drinking && (
              <span className="text-red-500 text-sm">{errors.drinking}</span>
            )}
          </div>

          {/* Drinking Preference */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Drinking Preference" />
            <select
              name="against_drinker"
              value={formData.against_drinker}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Would you live with a drinker?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.drinkingPreference && (
              <span className="text-red-500 text-sm">
                {errors.drinkingPreference}
              </span>
            )}
          </div>

          {/* Cooking */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Cooking" />
            <select
              name="cook"
              value={formData.cook}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">How often do you cook?</option>
              <option value="Never">Never</option>
              <option value = "1-2 times/week">1-2 times/week</option>
              <option value="3-4 times/week">3-4 times/week</option>
              <option value="Everyday">Everyday</option>
            </select>
            {errors.cooking && (
              <span className="text-red-500 text-sm">{errors.cooking}</span>
            )}
          </div>
          
          
          {/* Greek Life */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Greek Life" />
            <select
              name="greeklife"
              value={formData.greeklife}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">
                Are you part of or planning to join Greek life?
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.greekLife && (
              <span className="text-red-500 text-sm">{errors.greekLife}</span>
            )}
          </div>

          {/* Politics */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Politics" />
            <select
              name="politics"
              value={formData.politics}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">What political ideology do you identify with?</option>
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Liberal">Liberal</option>
              <option value="Other">Other</option>
            </select>
            {errors.politics && (
              <span className="text-red-500 text-sm">{errors.politics}</span>
            )}
          </div>

          {/* Roommate Politics */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Roommate Politics" />
            <select
              name="politics_preference"
              value={formData.politics_preference}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">
                Do you have a preference for your roommate's politics?
              </option>
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Liberal">Liberal</option>
              <option value="Other">Other</option>
              <option value="No Preference">No Preference</option>
            </select>
            {errors.roommatePolitics && (
              <span className="text-red-500 text-sm">
                {errors.roommatePolitics}
              </span>
            )}
          </div>

          {/* Pets */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Pets" />
            <select
              name="pets"
              value={formData.pets}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Do you have any pets?</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
              <option value="None">None</option>
            </select>
            {errors.pets && (
              <span className="text-red-500 text-sm">{errors.pets}</span>
            )}
          </div>

          {/* Pet Preference */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Pet Preference" />
            <select
              name="against_pet"
              value={formData.against_pet}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Are you okay with having a pet in the dorm?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.petPreference && (
              <span className="text-red-500 text-sm">
                {errors.petPreference}
              </span>
            )}
          </div>

          {/* Guests */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Guests" />
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">How often do you plan on having guests over?</option>
              <option value="Never">Never</option>
              <option value="1-2 times/week">1-2 times/week</option>
              <option value="3-4 times/week">3-4 times/week</option>
              <option value="Everyday">Everyday</option>
            </select>
            {errors.guests && (
              <span className="text-red-500 text-sm">{errors.guests}</span>
            )}
          </div>

          {/* Campus */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="On/Off Campus" />
            <select
              name="housing"
              value={formData.housing}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-600"
            >
              <option value="">Do you plan on living off or on campus?</option>
              <option value="On-Campus">On-Campus</option>
              <option value="Off-Campus">Off-Campus</option>
            </select>
            {errors.campus && (
              <span className="text-red-500 text-sm">{errors.campus}</span>
            )}
          </div>

          {/* Hobbies */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <RequiredLabel text="Hobbies" />
            <MultiSelectCheckbox
              options={hobbiesOptions}
              selectedOptions={formData.hobbies}
              onChange={handleHobbiesChange}
              placeholder="Select your hobbies"
            />
            {errors.hobbies && (
              <span className="text-red-500 text-sm">{errors.hobbies}</span>
            )}
            <p className="mt-4 text-gray-700">
              Selected: <strong>{formData.hobbies.join(", ") || "None"}</strong>
            </p>
          </div>

          {/* Most Important Factors */}
          <div className="w-full md:w-1/2 px-4 mb-6 text-gray-700">
            <RequiredLabel text="Which factors are most important to you?" />
            {["top_1", "top_2", "top_3"].map((rank, i) => (
              <div key={rank} className="mb-4">
                <label className="block text-gray-600 mb-1">
                Top {i + 1} 
                </label>
                <select
                  name={rank}
                  value={formData[rank as keyof FormData]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select factor</option>
                  {importanceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors[rank] && (
                  <span className="text-red-500">{errors[rank]}</span>
                )}
              </div>
            ))}
          </div>

          {/* Agreement Checkbox */}
          { /* <div className="w-full px-4 flex items-center mb-6">}
           // </div><input
             // type="checkbox"
             // name="agree"
              //checked={formData.agree}
              //onChange={handleChange}
              //className="mr-2"
           // />
            //<label className="text-sm text-gray-700">
           //   I agree to share my contact information and answers to help find the best match{" "}
           //   <span className="text-red-500">*</span>
           // </label>
           // {errors.agree && (
           //   <span className="text-red-500 text-sm ml-2">
            //    {errors.agree}
            //  </span>
            //)}
         // </div>

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

export default Survey;