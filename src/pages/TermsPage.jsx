// src/pages/TermsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
    return (
        <div className="container mx-auto p-8 max-w-4xl min-h-screen bg-white shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms & Conditions of Service</h1>
            <p className="text-gray-500 mb-4">Last updated: October 7, 2025</p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-4 text-gray-600">
                By accessing and using CyberChapChap ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">2. Service Provided</h2>
            <p className="mb-4 text-gray-600">
                CyberChapChap provides cybersecurity posture assessments and recommendations for small and medium-sized businesses in Africa. 
                Our service is an assessment tool only and does not guarantee complete security against all cyber threats.
            </p>

            <p className="mt-8 text-center">
                <Link to="/login" className="text-lg font-medium text-[#004AAD] hover:text-[#00C2A0] underline">
                    ← Back to Login
                </Link>
            </p>
        </div>
    );
}