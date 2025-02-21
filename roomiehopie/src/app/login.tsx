import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400">
      {/* Glassmorphic Container */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-10 shadow-lg flex flex-col items-center">
        {/* Neon Login Text */}
        <h1 className="text-4xl font-bold text-pink-500 mb-6 drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
          Login
        </h1>
        
        {/* Google Sign-in Button */}
        <button onClick={handleGoogleSignIn} className="flex items-center bg-white rounded-full shadow-md px-6 py-3 hover:shadow-lg transition-all">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google logo"
            className="w-6 h-6 mr-3"
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}