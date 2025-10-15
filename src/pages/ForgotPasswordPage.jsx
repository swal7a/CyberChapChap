// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { Label } from "../components/ui/label";
import { ArrowLeft } from 'lucide-react'; // Import ArrowLeft icon
import logo from '../assets/logo.png';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Simulate password reset logic (good practice to use a generic message)
    setMessage('If an account with that email exists, a password reset link has been sent.');
    setEmail('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 border border-gray-200 relative">
        
        {/* New: Back to Home Button */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <Link to="/" className="font-medium text-gray-500 hover:text-gray-700 flex items-center space-x-1">
            <ArrowLeft size={16} /> <span>Back to Home</span>
          </Link>
        </div>

        {/* Logo Replacement */}
        <div className="flex flex-col items-center mb-8 mt-8">
          <img src={logo} alt="Company Logo" className="h-12 w-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Forgot Password?</h1>
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Button type="submit" className="w-full bg-[#004AAD] hover:bg-[#003a8c] text-white font-semibold py-3 rounded-md transition-colors">
              Send Reset Link
            </Button>
          </div>
        </form>

        {message && (
          <p className={`mt-6 text-center text-sm ${message.includes('valid email') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-[#004AAD] hover:text-[#00C2A0]">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}