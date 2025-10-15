// src/context/UserContext.jsx

import React, { createContext, useState, useEffect, useMemo } from 'react';

// Define the standard empty state for a new user, including all settings fields
export const DEFAULT_USER_DATA = { // Exporting this for potential use elsewhere (like in SignupPage)
    name: '',
    email: '',
    businessName: '', 
    securityScore: 0,
    scansCompleted: 0,
    lastScanDate: null,
    activeRecommendations: 0,
    progressTrend: 'Not yet assessed',
    websiteStatus: null,
    socialMediaStatus: null,
    posWifiStatus: null,
    scanHistory: [],
    language: 'English',
    // --- NEW SETTINGS FIELDS ADDED ---
    twoFaEnabled: false,      // Default security setting
    emailAlerts: true,        // Default notification setting
    weeklySummary: true,      // Default notification setting
};


// Create the context
export const UserContext = createContext({
    userData: DEFAULT_USER_DATA,
    updateUserData: () => {},
    clearUserData: () => {}, 
    setLanguage: () => {},
});


// Create a provider component
export const UserProvider = ({ children }) => {

    // Initialize state from localStorage or use the default empty state
    const [userData, setUserData] = useState(() => {
        try {
            const storedData = localStorage.getItem('currentUserData');
            
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                // Ensure loaded data is merged with defaults to avoid missing new keys
                return { ...DEFAULT_USER_DATA, ...parsedData }; 
            }
            
            return DEFAULT_USER_DATA;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return DEFAULT_USER_DATA;
        }
    });

    // A function to update the user data (this merge logic supports both partial and full state updates)
    const updateUserData = (newData) => {
        setUserData(prevData => ({
            ...prevData,
            ...newData
        }));
    };
    
    // A function to explicitly clear all user data and reset to default (used for explicit logout)
    const clearUserData = () => {
        setUserData(DEFAULT_USER_DATA);
        // The useEffect below handles the localStorage removal
    };


    // A new function to update the user's language preference
    const setLanguage = (newLanguage) => {
        updateUserData({ language: newLanguage });
    };

    // Effect to persist data to localStorage whenever userData changes
    useEffect(() => {
        // We use a simple check: if the user has a name, we assume they are logged in or signed up.
        const isUserLoggedIn = userData.name && userData.name.trim() !== '';

        if (isUserLoggedIn) {
            localStorage.setItem('currentUserData', JSON.stringify(userData));
        } else {
            // If not logged in (e.g., after clearUserData or initial load), ensure storage is empty
            localStorage.removeItem('currentUserData');
        }
    }, [userData]);

    const contextValue = useMemo(() => ({
        userData, 
        updateUserData, 
        setLanguage, 
        clearUserData
    }), [userData]);


    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};