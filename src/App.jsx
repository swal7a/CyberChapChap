// src/App.jsx
import React, { useState } from 'react';
// FIX: Import Link to resolve "ReferenceError: Link is not defined"
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Import the UserProvider
import { UserProvider } from './context/UserContext';

// Import all your page components
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; 
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DetailedReportView from './pages/DetailedReportView';
import TermsPage from './pages/TermsPage';         
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'; 

// Protected Pages
import Dashboard from './pages/Dashboard';
import NewScan from './pages/NewScan';
import Reports from './pages/Reports';
import Recommendations from './pages/Recommendations';
import Settings from './pages/Settings';

// Component for 404 Not Found
const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <h1 className="text-6xl font-extrabold text-[#004AAD]">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <p className="mt-2 text-lg">The path you requested does not exist.</p>
        {/* The Link component now works */}
        <Link to="/dashboard" className="mt-6 text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md">
            Go to Dashboard
        </Link>
    </div>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes with a shared Layout */}
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Login and Signup Pages (standalone) */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
             <Route path="/terms" element={<TermsPage />} /> 
        <Route path="/privacy" element={<PrivacyPolicyPage />} /> 

          {/* Protected Dashboard Routes nested within DashboardLayout */}
          <Route path="/dashboard" element={isLoggedIn ? <DashboardLayout onLogout={handleLogout} /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard />} /> 
            
            {/* The final working path is /dashboard/scan */}
            <Route path="scan" element={<NewScan />} /> 
            
            <Route path="reports" element={<Reports />} />
             <Route path="reports/:reportId" element={<DetailedReportView />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}