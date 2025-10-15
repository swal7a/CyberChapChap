// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import padlockLogo from '../assets/logo.png';

// Now, the Navbar receives the props from Layout
const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0A192F]/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <img src={padlockLogo} alt="CyberChapChap Padlock Logo" className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold">CyberChapChap</span>
              <span className="text-white/80 text-xs font-light tracking-wide">Securing African SMEs, one business at a time</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/90 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-white/90 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors">Contact</Link>
            
            {/* Conditional Rendering based on login status */}
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-white/90 hover:text-white transition-colors">Dashboard</Link>
                <Button 
                  onClick={onLogout} 
                  className="border border-white/30 text-white hover:bg-white/10 bg-transparent rounded-full px-6 py-2"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="border border-white/30 text-white hover:bg-white/10 bg-transparent rounded-full px-6 py-2">
                  Get Started
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;