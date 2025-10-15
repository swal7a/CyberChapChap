import React, { useContext, useState, useCallback } from 'react';
import { UserContext } from '../context/UserContext';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
  User, Shield, LogOut, Mail, Clock, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// =======================================================
// === IN-FILE MOCK DATABASE LOGIC (FIXED Persistence Keys) ===
// =======================================================
const getMockDatabase = () => {
  const mockDB = localStorage.getItem('mockUserDB');
  return mockDB ? JSON.parse(mockDB) : {};
};

const saveUserDataToMockDB = (email, userData) => {
  const db = getMockDatabase();
  db[email] = userData;
  localStorage.setItem('mockUserDB', JSON.stringify(db));
  
  // CRITICAL FIX: Changed from 'userData' to 'currentUserData' to match UserContext.jsx
  localStorage.setItem('currentUserData', JSON.stringify(userData)); 
};

const removeUserFromMockDB = (email) => {
  const db = getMockDatabase();
  if (db && db[email]) {
    delete db[email];
    localStorage.setItem('mockUserDB', JSON.stringify(db));
  }
  // The session keys will be cleared by safeRedirectToLogin/handleLogout
};
// =======================================================

// --- Helper Function ---
// Ensures that every setting change updates both context AND the central mock database.
const persistUserUpdate = (email, currentData, newFields) => {
  const newFullData = { ...currentData, ...newFields };
  if (email) {
    saveUserDataToMockDB(email, newFullData);
  }
};

// --- Profile & Account Section ---
const ProfileSettings = () => {
  const { userData, updateUserData } = useContext(UserContext);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userData?.name || '');
  const [businessName, setBusinessName] = useState(userData?.businessName || '');

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const changedFields = { name: name.trim(), businessName: businessName.trim() };
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Update context
      updateUserData(changedFields);
      // Update mock database and session storage
      persistUserUpdate(userData.email, userData, changedFields);
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to update profile.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  if (!userData) return null;

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile & Account</h2>
      {status && (
        <div className={`p-4 rounded-md mb-4 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <div className="text-sm font-medium">{status.message}</div>
        </div>
      )}
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <p className="text-xs text-gray-500 mt-1">This name will appear on your reports.</p>
        </div>
        <div>
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={userData.email} disabled className="cursor-not-allowed bg-gray-100" />
          {/* NOTE: Removed the redundant saving to 'userData' here as it's now handled by persistUserUpdate. */}
        </div>
        <Button type="submit" className="bg-[hsl(165,71%,60%)] hover:bg-[#003a8c]" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </>
  );
};

// --- Security & Privacy Section ---
const SecuritySettings = ({ onLogout }) => {
  const { userData, updateUserData, clearUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [loadingTwoFa, setLoadingTwoFa] = useState(false);
  const [loadingSession, setLoadingSession] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Centralized function for clean logout and redirect (used by both Log Out All & Delete)
  const safeRedirectToLogin = (callParent = true) => {
    // Clear context
    try { clearUserData && clearUserData(); } catch (err) { console.warn('Context clear failed', err); }
    
    // CRITICAL FIX: Clear the correct session storage key
    try {
      localStorage.removeItem('currentUserData'); // <-- Changed from 'userData'
      localStorage.removeItem('token');
    } catch (err) {
      console.warn('localStorage cleanup issue', err);
    }

    if (callParent && typeof onLogout === 'function') {
      try { onLogout(); } catch (_) { /* ignore */ }
    }

    navigate('/login', { replace: true });
  };

  const handleToggleTwoFa = async (checked) => {
    setLoadingTwoFa(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newFields = { twoFaEnabled: checked };
      updateUserData(newFields);
      persistUserUpdate(userData.email, userData, newFields); // Ensures persistence
      setStatus({ type: 'success', message: `Two-Factor Authentication is now ${checked ? 'on' : 'off'}.` });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to update 2FA settings.' });
    } finally {
      setLoadingTwoFa(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const handleLogOutAllDevices = async () => {
    setLoadingSession(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setStatus({ type: 'success', message: 'Logged out of all devices. Redirecting...' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to log out of all devices remotely. Logging out locally.' });
    } finally {
      setLoadingSession(false);
      setTimeout(() => safeRedirectToLogin(true), 700);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;

    setLoadingDelete(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 1. PERMANENT DATA WIPE (MOCK DB)
      if (userData?.email) {
        removeUserFromMockDB(userData.email); 
      }

      setStatus({ type: 'success', message: 'Account deleted and data wiped. Redirecting to login...' });

      // 2. Clear session and navigate 
      setTimeout(() => safeRedirectToLogin(true), 700);
    } catch (error) {
      console.error('Failed to delete account:', error);
      setStatus({ type: 'error', message: 'Error deleting account. Logging out locally.' });
      setTimeout(() => safeRedirectToLogin(true), 700);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Security & Privacy</h2>
      {status && (
        <div className={`p-4 rounded-md mb-4 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <div className="text-sm font-medium">{status.message}</div>
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-medium">Enable 2FA</h3>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
          </div>
          <Switch checked={userData?.twoFaEnabled || false} onCheckedChange={handleToggleTwoFa} disabled={loadingTwoFa} />
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Session Management</h3>
          <p className="text-sm text-gray-500 mb-4">Log out of all active sessions on other devices.</p>
          <Button variant="outline" onClick={handleLogOutAllDevices} disabled={loadingSession}>
            {loadingSession ? 'Logging out...' : 'Log out of all devices'}
          </Button>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="text-lg font-medium text-red-700 mb-2">Danger Zone</h3>
          <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data.</p>
          <Button variant="destructive" onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600" disabled={loadingDelete}>
            {loadingDelete ? 'Deleting...' : 'Delete Account'}
          </Button>
        </div>
      </div>
    </>
  );
};


// --- Notifications Section ---
const NotificationsSettings = () => {
  const { userData, updateUserData } = useContext(UserContext);
  const [status, setStatus] = useState(null);

  const handleToggle = async (field, checked) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newFields = { [field]: checked };
      updateUserData(newFields);
      // CRITICAL: Ensure persistence after update
      persistUserUpdate(userData.email, userData, newFields); 
      setStatus({ type: 'success', message: `${field} is now ${checked ? 'on' : 'off'}.` });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: `Failed to update ${field}.` });
    } finally {
      setTimeout(() => setStatus(null), 2500);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>
      {status && (
        <div className={`p-4 rounded-md mb-4 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <div className="text-sm font-medium">{status.message}</div>
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-medium">Email alerts on scan completion</h3>
            <p className="text-sm text-gray-500">Receive an email when a security scan has finished.</p>
          </div>
          <Switch checked={userData?.emailAlerts || false} onCheckedChange={(checked) => handleToggle('emailAlerts', checked)} />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-lg font-medium">Weekly summary</h3>
            <p className="text-sm text-gray-500">Get a weekly summary of all your activity.</p>
          </div>
          <Switch checked={userData?.weeklySummary || false} onCheckedChange={(checked) => handleToggle('weeklySummary', checked)} />
        </div>
      </div>
    </>
  );
};


// --- Language Section ---
const LanguageSettings = () => {
  const { userData, updateUserData } = useContext(UserContext);
  const [status, setStatus] = useState(null);

  const handleChange = async (e) => {
    const lang = e.target.value;
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newFields = { language: lang };
      updateUserData(newFields);
      // CRITICAL: Ensure persistence after update
      persistUserUpdate(userData.email, userData, newFields);
      setStatus({ type: 'success', message: `Language changed to ${lang}` });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to change language.' });
    } finally {
      setTimeout(() => setStatus(null), 2000);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Language</h2>
      {status && (
        <div className={`p-4 rounded-md mb-4 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <div className="text-sm font-medium">{status.message}</div>
        </div>
      )}
      <select
        value={userData?.language || 'English'}
        onChange={handleChange}
        className="mt-2 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD] sm:text-sm rounded-md"
      >
        <option>English</option>
        <option>Kiswahili</option>
        <option>Spanish</option>
        <option>French</option>
        <option>German</option>
        <option>Chinese</option>
      </select>
    </>
  );
};


// --- Support Section (No changes) ---
const SupportSection = () => {
  const faqs = [
    { question: "What is the purpose of Cyberchapchap?", answer: "Cyberchapchap is a security tool designed for small businesses to scan their digital assets and provide actionable recommendations to improve their cybersecurity posture." },
    { question: "How often should I run a security scan?", answer: "It is recommended to run a scan at least once a month, or whenever you make a significant change to your IT infrastructure." },
    { question: "Is my data safe with Cyberchapchap?", answer: "We take data privacy and security very seriously. Your scan results are stored in an encrypted format." },
    { question: "What should I do if my score is low?", answer: "Prioritize high-risk items in the report and contact support if needed." },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Support</h2>
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Contact Support</h3>
          <p className="text-sm text-gray-500 mb-2">Need help? We're here for you.</p>
          <p className="text-[#004AAD] font-semibold">cyberchapchap.support@gmail.com</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium">Frequently Asked Questions (FAQs)</h3>
          <div className="mt-4 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="font-semibold">{faq.question}</h4>
                <p className="text-sm text-gray-500 mt-1">{faq.answer}</p>
              </div>
            ))}
           </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium">App Version</h3>
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </div>
    </>
  );
};


// --- MAIN SETTINGS COMPONENT ---
export default function Settings({ onLogout }) {
  const { userData, clearUserData } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  // Centralized logout for the sidebar button
  const handleLogout = useCallback(() => {
    try { clearUserData && clearUserData(); } catch (e) { console.warn(e); }
    // CRITICAL FIX: Clear the correct session storage key
    try { localStorage.removeItem('currentUserData'); localStorage.removeItem('token'); } catch (e) { /* ignore */ }
    if (typeof onLogout === 'function') {
      try { onLogout(); } catch (err) { console.warn(err); }
    }
    navigate('/login', { replace: true });
  }, [clearUserData, onLogout, navigate]);

  // Initial loading check
  if (userData === undefined) return null;

  // Redirect handler when context data is cleared
  if (!userData || (userData.name === '' && localStorage.getItem('currentUserData') === null)) {
    setTimeout(() => navigate('/login', { replace: true }), 20);

    return (
      <div className="p-8 md:p-12 min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Clock className="h-16 w-16 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Logging out and redirecting...</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSettings />;
      case 'security': return <SecuritySettings onLogout={onLogout} />;
      case 'notifications': return <NotificationsSettings />;
      case 'language': return <LanguageSettings />;
      case 'support': return <SupportSection />;
      default: return null;
    }
  };

  return (
    <div className="p-8 md:p-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white rounded-xl shadow-lg p-6 h-full">
          <ul className="space-y-2 font-medium text-gray-700">
            <li>
              <button onClick={() => setActiveSection('profile')} className={`flex items-center w-full p-3 rounded-lg ${activeSection === 'profile' ? 'bg-gray-100 text-[#004AAD]' : 'hover:bg-gray-50'}`}>
                <User className="mr-3 h-5 w-5" /> Profile & Account
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('security')} className={`flex items-center w-full p-3 rounded-lg ${activeSection === 'security' ? 'bg-gray-100 text-[#004AAD]' : 'hover:bg-gray-50'}`}>
                <Shield className="mr-3 h-5 w-5" /> Security & Privacy
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('notifications')} className={`flex items-center w-full p-3 rounded-lg ${activeSection === 'notifications' ? 'bg-gray-100 text-[#004AAD]' : 'hover:bg-gray-50'}`}>
                <Mail className="mr-3 h-5 w-5" /> Notifications
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('language')} className={`flex items-center w-full p-3 rounded-lg ${activeSection === 'language' ? 'bg-gray-100 text-[#004AAD]' : 'hover:bg-gray-50'}`}>
                <Globe className="mr-3 h-5 w-5" /> Language
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 text-red-500">
                <LogOut className="mr-3 h-5 w-5" /> Log Out
              </button>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}