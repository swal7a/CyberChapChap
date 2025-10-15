// src/components/DashboardLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaHome, FaPlus, FaFileAlt, FaChartLine,
  FaCog, FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa';
import padlockLogo from '../assets/logo.png'; 

const DashboardLayout = ({ onLogout }) => {
  const location = useLocation();
  
  // State to control sidebar visibility. Start open on large screens, or controlled by mobile button.
  // We use the 'md:block' class on the sidebar itself to control visibility, but keep the state simple.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // All paths use the correct full absolute paths: /dashboard/path
  const navLinks = [
    { to: "/dashboard", icon: <FaHome />, label: "Home" },
    { to: "/dashboard/scan", icon: <FaPlus />, label: "New Scan" },
    { to: "/dashboard/reports", icon: <FaFileAlt />, label: "Reports" },
    { to: "/dashboard/recommendations", icon: <FaChartLine />, label: "Recommendations" },
    { to: "/dashboard/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F0F2F5] text-gray-800">
      
      {/* Sidebar - Fix: Use 'fixed' or 'sticky' for full height and to position correctly on smaller screens. */}
      {/* md:block ensures it's hidden by default on mobile unless a specific button is clicked, but let's keep it visible on mobile and use a full-screen toggle */}
      <aside
        className={`
          bg-white shadow-lg flex-shrink-0 border-r border-gray-200 transition-all duration-300 ease-in-out z-40 
          h-screen sticky top-0 
          // Dynamic width for both desktop (w-64/w-20) and mobile (full width when open)
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          // Hide sidebar completely on small screen when closed, make it appear fixed when open
          ${isSidebarOpen ? 'fixed md:sticky' : 'hidden md:block'}
        `}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center space-x-2 py-6 px-4 border-b border-gray-200 justify-between">
          
          {/* Logo and App Name (Hidden cleanly when collapsed) */}
          <div className={`flex items-center space-x-2 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 h-0 overflow-hidden'}`}>
            <img src={padlockLogo} alt="CyberChapChap Logo" className="h-10 w-auto" />
            <span className="text-xl font-extrabold text-[#004AAD] whitespace-nowrap">CyberChapChap</span>
          </div>

          {/* FIX: Toggle Button - Always present in the header for smooth collapse/expand */}
          <button
            onClick={toggleSidebar}
            // Use ml-auto to push the button right when open, or mx-auto to center it when collapsed
            className={`p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 
              ${isSidebarOpen ? 'ml-auto' : 'mx-auto'} 
              // Always show on desktop (md:block) and show on mobile (md:hidden) when needed
            `}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-grow">
          <ul className="space-y-2">
            {navLinks.map(({ to, icon, label }) => {
              const active = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center p-3 rounded-md font-medium transition-colors duration-200 
                      ${active
                        ? "bg-[#004AAD] text-white hover:bg-[#003a8c]"
                        : "text-gray-600 hover:bg-[#E6F0FF] hover:text-[#004AAD]"
                      }
                      // Center the icon when collapsed, justify-start when open
                      ${isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'}
                    `}
                  >
                    {/* Icon - always visible */}
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    
                    {/* FIX: Label - use opacity and w-0/h-0 to hide cleanly when collapsed */}
                    <span className={`transition-opacity duration-150 whitespace-nowrap overflow-hidden 
                      ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}
                    `}>
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Logout Button at the bottom */}
        <div className="p-4 mt-auto border-t border-gray-200">
          <button
            onClick={onLogout}
            className={`w-full flex items-center p-3 rounded-md text-left font-medium text-red-600 hover:bg-red-50 transition-colors duration-200
              ${isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'}
            `}
          >
            <FaSignOutAlt className="text-lg flex-shrink-0" />
            {/* FIX: Label - use opacity and w-0/h-0 to hide cleanly when collapsed */}
            <span className={`transition-opacity duration-150 whitespace-nowrap overflow-hidden 
              ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}
            `}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 overflow-y-auto ${!isSidebarOpen && 'md:ml-20'}`}>
        {/* FIX: Removed the separate mobile button. The button in the header handles all toggling. */}
        
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;