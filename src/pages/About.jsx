import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target, // for Our Mission
  Eye, // for Our Vision
  Heart, // for Our Values
  Zap, // for Built for Africa
  Users, // for Community-Driven
  DollarSign, // for Affordable Excellence
} from 'lucide-react';

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004AAD] to-[#00C2A0] text-white">
      {/* Section 1: About CyberChapChap Hero */}
      <section className="py-20 px-6 text-center pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            About <span className="text-[#00D084]">CyberChapChap</span>
          </h1>
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            We're on a mission to democratize cybersecurity for African Small and Medium
            Enterprises, making world-class protection accessible and affordable for every business.
          </p>
        </div>
      </section>

      

      {/* Section 2: Our Mission, Vision, Values */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Our Mission Card */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-white border-opacity-20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00D084] to-[#00C2A0] rounded-full flex items-center justify-center mb-6 shadow-xl">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-gray-200">
                To empower African SMEs with comprehensive, easy-to-use cybersecurity tools that protect their digital assets and build trust with their customers.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-white border-opacity-20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#004AAD] to-[#0092D8] rounded-full flex items-center justify-center mb-6 shadow-xl">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
              <p className="text-gray-200">
                A secure digital Africa where every business, regardless of size, has access to enterprise-grade cybersecurity protection.
              </p>
            </div>

            {/* Our Values Card */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-white border-opacity-20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00D084] to-[#00C2A0] rounded-full flex items-center justify-center mb-6 shadow-xl">
                <Heart size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Values</h2>
              <p className="text-gray-200">
                Simplicity, accessibility, and innovation. We believe cybersecurity should be straightforward and available to all African entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Section 3: Why CyberChapChap? (Updated Icons) */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Features List */}
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
                Why <span className="text-[#00D084]">CyberChapChap</span>?
              </h2>
              <div className="space-y-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#00D084] rounded-full flex items-center justify-center mr-4 shadow-md">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Built for Africa</h3>
                    <p className="text-gray-200">
                      Understanding the unique challenges and constraints faced by African SMEs, our solutions are tailored for the local context.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#00D084] rounded-full flex items-center justify-center mr-4 shadow-md">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
                    <p className="text-gray-200">
                      We work closely with local businesses to understand their needs and continuously improve our platform based on real feedback.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#00D084] rounded-full flex items-center justify-center mr-4 shadow-md">
                    <DollarSign size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Affordable Excellence</h3>
                    <p className="text-gray-200">
                      Enterprise-grade security at prices that make sense for growing African businesses, with flexible payment options.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Enhanced Stats Card */}
            <div className="flex justify-center items-center">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-10 shadow-lg border border-white border-opacity-20 w-full max-w-sm">
                <div className="flex justify-center items-center mb-6">
                  {/* New Security Check Icon */}
                  <svg className="w-16 h-16 text-[#00D084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="grid grid-cols-1 gap-8 text-center">
                  <div>
                    <p className="text-6xl font-bold text-white mb-2">1000+</p>
                    <p className="text-xl text-gray-200">Threats Blocked</p>
                  </div>
                  <div>
                    <p className="text-6xl font-bold text-white mb-2">24/7</p>
                    <p className="text-xl text-gray-200">Monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}