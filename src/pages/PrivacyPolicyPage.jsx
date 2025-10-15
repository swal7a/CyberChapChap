// src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto p-8 max-w-4xl min-h-screen bg-white shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
            <p className="text-gray-500 mb-4">Effective Date: October 7, 2025</p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">1. Information We Collect</h2>
            <p className="mb-4 text-gray-600">
                We collect information you provide directly to us, such as your full name, business name, and email address upon registration. 
                We also collect technical data related to your security scans, but **we do not store your passwords or financial credentials**.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">2. How We Use Information</h2>
            <p className="mb-4 text-gray-600">
                We use the information we collect to operate, maintain, and provide you with the features and functionality of the Service, 
                to analyze how the Service is used, and to diagnose service or technical problems.
            </p>

            <p className="mt-8 text-center">
                <Link to="/login" className="text-lg font-medium text-[#004AAD] hover:text-[#00C2A0] underline">
                    ← Back to Login
                </Link>
            </p>
        </div>
    );
}