// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { Label } from "../components/ui/label";
import { Shield, ArrowLeft } from 'lucide-react'; 
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';
// FIX: Import the MOCK_USERS array from the SignupPage
import { MOCK_USERS } from './SignupPage'; 

// --- PASSWORD STRENGTH HELPER ---
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

  if (score === 5) return { status: 'Strong 💪', color: 'text-green-600' };
  if (score >= 3) return { status: 'Moderate', color: 'text-yellow-600' };
  if (password.length > 0) return { status: 'Weak', color: 'text-red-600' };
  return { status: '', color: 'text-gray-500' };
};

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ status: '', color: 'text-gray-500' });
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Find the user (Uses the shared MOCK_USERS array)
    const user = MOCK_USERS.find(
      // Check for email and password
      (u) => u.email === email && u.password === password
    );
    
    // 2. Real Login Check
    if (!user) {
      alert('Login failed. Please check your email and password.');
      return;
    }

    console.log('Login successful for:', user.email);

    // Simulate API call delay
    setTimeout(() => {
      onLogin();
      // MAJOR FIX: Completely overwrite the UserContext data 
      // with the user's unique data payload (user.data).
      updateUserData(user.data); 
      
      navigate('/dashboard');
    }, 500);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkPasswordStrength(newPassword));
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
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">
            Please enter your details to log in to your account.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              // Ensure email is always stored in lowercase
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePasswordChange} // Use the new handler
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              placeholder="Enter your password"
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
         
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-[#004AAD] hover:text-[#00C2A0]">
                Forgot your password?
              </Link>
            </div>
          </div>
         
          <Button type="submit" className="w-full py-3 rounded-md font-semibold text-white transition-colors bg-[#004AAD] hover:bg-[#003a8c]">
            Log In
          </Button>

          {/* Security Promise Box */}
          <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
            <Shield size={20} className="mt-0.5 mr-2 text-green-600 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold">Security Promise:</span> We never ask for your passwords, we only assess security posture.
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-[#004AAD] hover:text-[#00C2A0]">
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
}