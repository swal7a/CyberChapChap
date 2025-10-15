// src/pages/SignupPage.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { Label } from "../components/ui/label";
import { Shield, ArrowLeft } from 'lucide-react'; 
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';
// Import DEFAULT_USER_DATA from context to ensure all keys are present
import { DEFAULT_USER_DATA } from '../context/UserContext';


// --- INITIAL DATA STRUCTURE FOR A CLEAN START (Local copy for quick creation) ---
// By spreading DEFAULT_USER_DATA, we ensure all new settings fields (2FA, notifications) are included.
const INITIAL_USER_DATA_SIGNUP = {
    ...DEFAULT_USER_DATA, // Pull in all default keys including the new settings
    name: 'User',
    email: '', 
    lastScanDate: 'N/A', // Set explicitly for dashboard display
};


// --- MOCK USER DATABASE (Shared with Login) ---
// The MOCK_USERS array stores a 'data' object which is the user's isolated state.
export const MOCK_USERS = [
    { email: 'user@example.com', password: 'Password123!', 
      // FIX: Ensure existing users also use the expanded data structure
      data: {...INITIAL_USER_DATA_SIGNUP, name: 'ExampleUser', email: 'user@example.com', securityScore: 85} }, 
    { email: 'test@company.com', password: 'SecureP@ss2025', 
      // FIX: Example with some persisted settings (e.g., 2FA enabled, different language)
      data: {...INITIAL_USER_DATA_SIGNUP, 
        name: 'TestCoUser', 
        email: 'test@company.com',
        twoFaEnabled: true, 
        language: 'Kiswahili', 
        securityScore: 72 // Example score
      } 
    },
];

// FIX: Export a function to allow other parts of the app (like Settings) 
// to update the mock database with new preferences and settings.
export const saveUserDataToMockDB = (email, newData) => {
    const userIndex = MOCK_USERS.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        // Overwrite the user's data object with the new data (this includes all settings)
        MOCK_USERS[userIndex].data = newData;
        console.log(`Mock DB updated for user: ${email}. Security Score: ${newData.securityScore || 'N/A'}, Language: ${newData.language}`);
    } else {
        console.error(`User with email ${email} not found in MOCK_USERS for saving.`);
    }
};

// --- FIX: ADDED FUNCTION TO RESOLVE THE MISSING EXPORT ERROR (REQUIRED BY Settings.jsx) ---
/**
 * Removes a user entry from the MOCK_USERS array.
 * @param {string} emailToRemove The email of the user to remove.
 */
export const removeUserFromMockDB = (emailToRemove) => {
    const initialLength = MOCK_USERS.length;
    // Find the index of the user to remove
    const userIndex = MOCK_USERS.findIndex(u => u.email === emailToRemove);

    if (userIndex !== -1) {
        // Remove the user from the array
        MOCK_USERS.splice(userIndex, 1);
        console.log(`User ${emailToRemove} successfully removed from MOCK_USERS. New count: ${MOCK_USERS.length}`);
        return true;
    } else {
        console.warn(`User ${emailToRemove} not found in MOCK_USERS for removal.`);
        return false;
    }
};
// -----------------------------------------------------------------------------------------


// --- PASSWORD STRENGTH HELPER (Shared with Login) ---
const checkPasswordStrength = (password) => {
  let score = 0;
// ... (rest of checkPasswordStrength function is unchanged)
  const checks = {
    length: password.length >= 10,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  if (checks.length) score += 1;
  if (checks.lowercase) score += 1;
  if (checks.uppercase) score += 1;
  if (checks.number) score += 1;
  if (checks.special) score += 1;

  if (score === 5) return { status: 'Strong 💪', color: 'text-green-600', scoreValue: 5 };
  if (score >= 3) return { status: 'Moderate', color: 'text-yellow-600', scoreValue: score };
  if (password.length > 0) return { status: 'Weak', color: 'text-red-600', scoreValue: score };
  return { status: '', color: 'text-gray-500', scoreValue: 0 };
};


export default function SignupPage({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ status: '', color: 'text-gray-500', scoreValue: 0 });
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Basic Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (name.trim().length < 2) {
      alert('Please enter a valid name.');
      return;
    }

    if (strength.scoreValue < 3) {
      alert('Password is too weak. Please use a longer password with a mix of characters (10+ characters, upper/lower/number/special).');
      return;
    }

    // 2. Duplication Check (Prevents signing up existing users)
    const isExistingUser = MOCK_USERS.some(u => u.email === email);

    if (isExistingUser) {
      alert('An account with this email already exists. Please log in.');
      return;
    }

    console.log('Registering new user:', name);

    // 3. Simulate API call
    setTimeout(() => {
      // FIX: Create the new user's complete data object, inheriting all settings defaults
      const newUserData = { 
          ...INITIAL_USER_DATA_SIGNUP,
          name: name,
          email: email,
      };

      // FIX: Store the new user's credentials and their full data object in the mock DB
      MOCK_USERS.push({ email, password, data: newUserData }); 
      
      onLogin(); // Set app's global auth state
      
      // FIX: Load the complete initial data for the new user into context
      updateUserData(newUserData); 
      
      alert('Registration successful! Redirecting to Dashboard.');
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        
        {/* Back to Home Button */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <Link to="/" className="font-medium text-gray-500 hover:text-gray-700 flex items-center space-x-1">
            <ArrowLeft size={16} /> <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-8 mt-8">
          <img src={logo} alt="CyberChapChap Logo" className="h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-600 mt-2">
            Sign up to start assessing your security posture today.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <Label htmlFor="name" className="text-gray-700">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              placeholder="Enter your email"
            />
            <p className="text-xs text-gray-500 mt-1">This email will be used for your profile.</p>
            </div>
          
          {/* Password Input */}
          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              placeholder="Create a password"
            />
            {/* Password Strength Indicator */}
            <div className="mt-1 text-sm">
                {password.length > 0 && (
                    <span className={strength.color}>
                        Password Strength: **{strength.status}**
                    </span>
                )}
            </div>
          </div>
          
          <Button type="submit" className="w-full py-3 rounded-md font-semibold text-white transition-colors bg-[#004AAD] hover:bg-[#003a8c]">
            Sign Up
          </Button>

          {/* Security Promise Box */}
          <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
            <Shield size={20} className="mt-0.5 mr-2 text-green-600 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold">Security Promise:</span> We never store your cleartext password. All data is encrypted.
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#004AAD] hover:text-[#00C2A0]">
            Log In.
          </Link>
        </p>
      </div>
      
    </div>
  );
}