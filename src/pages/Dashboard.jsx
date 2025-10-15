// src/pages/Dashboard.jsx
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Shield, BarChart, CheckCircle, Lightbulb, Lock, Award } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import Confetti from 'react-confetti';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// Ensure this path is correct for your map.png location
import AfricaMap from '../assets/map.png'; 

// --- Dynamic Mission Section Component ---
const MissionSection = ({ hasScans }) => {
    return (
        <div className="flex-1 p-6 relative rounded-xl bg-gray-100/30 backdrop-blur-md border border-gray-200 shadow-xl text-center mb-8 lg:mb-0 lg:mr-8 transition-all duration-500">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 tracking-tight font-serif">
                {hasScans ? "Congratulations! A Step Secured." : "Our Mission: Securing Africa Digitally"}
            </h2>
            <div className="relative mx-auto w-full max-w-sm">
                <img 
                    src={AfricaMap} 
                    alt="Map of Africa" 
                    className={`w-full h-auto opacity-75 ${hasScans ? 'grayscale-0' : 'grayscale transition-all duration-1000'}`} 
                />
                {hasScans ? (
                    <Award className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-yellow-500 animate-wiggle" />
                ) : (
                    <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-green-500 animate-bounce" />
                )}
            </div>
            <p className="mt-4 text-gray-600 font-medium">
                {hasScans
                    ? "Your scan results are a proactive step towards a safer digital landscape. Every secure business helps build a secure Africa."
                    : "Cyber threats are on the rise. By taking your first security scan, you're not just protecting your business—you're joining a movement to build a more secure digital future for Africa."
                }
            </p>
            {!hasScans && (
                // FIX: Changed link to the more standard '/scan' route
                <Link to="/dashboard/scan" className="mt-6 inline-block bg-[#004AAD] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    Start Your First Scan!
                </Link>
            )}
        </div>
    );
};

// --- Statistics Component (Doughnut Chart) ---
const StatsDiagram = () => {
    // Illustrative data representing the proportion of assessed businesses in key regions 
    // that fall into high-risk categories. Total sum is 100 to fill the chart.
    const securityData = [
        { country: "South Africa", riskLabel: "High Vulnerability", value: 35, color: "#10b981" }, // Emerald Green
        { country: "Nigeria", riskLabel: "Moderate-High Risk", value: 30, color: "#3b82f6" },    // Blue
        { country: "Kenya & East Africa", riskLabel: "Emerging Threats", value: 20, color: "#f97316" },    // Orange
        { country: "North Africa (Egypt, etc.)", riskLabel: "Cross-Border Exposure", value: 15, color: "#ef4444" },    // Red
    ];

    const calculateStrokeDasharray = (value, total) => {
        const circumference = 2 * Math.PI * 70;
        const percentage = (value / total) * 100;
        const dashoffset = circumference - (percentage / 100) * circumference;
        return {
            strokeDasharray: circumference,
            strokeDashoffset: dashoffset,
        };
    };

    const totalAssessedPercentage = securityData.reduce((sum, item) => sum + (item.value || 0), 0); // Should be 100

    return (
        <div className="flex-1 p-6 flex flex-col items-center bg-gray-50 rounded-xl shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-serif">Digital Risk Profile (Businesses Assessed)</h3>
            
            <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                    {securityData.map((data, index) => {
                        const rotation = securityData.slice(0, index).reduce((sum, item) => sum + ((item.value || 0) / totalAssessedPercentage) * 360, 0);
                        const { strokeDasharray, strokeDashoffset } = calculateStrokeDasharray(data.value || 0, totalAssessedPercentage);
                        return (
                            <circle
                                key={index}
                                className="transition-all duration-1000 ease-out"
                                cx="50%"
                                cy="50%"
                                r="70"
                                fill="transparent"
                                stroke={data.color}
                                strokeWidth="20"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-[#004AAD] drop-shadow">100%</span>
                    <span className="text-sm font-medium text-gray-600">Assessed</span>
                </div>
            </div>
            
            <ul className="mt-6 text-sm text-gray-700 space-y-2 text-left w-full max-w-xs">
                {securityData.map((data, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <span className="flex items-center">
                            <span style={{ backgroundColor: data.color }} className="w-3 h-3 rounded-full mr-2 shadow-md"></span>
                            <span className="font-bold">{data.country}:</span>
                        </span>
                        <span className="ml-2 font-medium">{data.value}% - {data.riskLabel}</span>
                    </li>
                ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4 italic">
                *Data is illustrative based on generalized cyber threat research (2024). Your scan provides **accurate data for your business**.
            </p>
        </div>
    );
};

// --- Combined Map and Stats Component for easy conditional rendering ---
const MapAndStatsSection = ({ hasScans }) => (
    <section className="flex flex-col lg:flex-row gap-6">
        <MissionSection hasScans={hasScans} />
        <StatsDiagram />
    </section>
);


// --- Main Dashboard Component ---
export default function Dashboard() {
    const { userData } = useContext(UserContext);
    const [showConfetti, setShowConfetti] = useState(false);

    const facts = [
        "60% of small businesses close within 6 months of a cyber attack.",
        "Weak or stolen passwords cause 80% of data breaches.",
        "95% of breaches are caused by human error.",
        "Ransomware attacks happen every 11 seconds worldwide.",
        "Phishing makes up 36% of all breaches.",
    ];
    const factOfTheDay = facts[Math.floor(Math.random() * facts.length)];
    const hasScans = userData.scansCompleted > 0;

    const getScoreStatus = (score) => {
        if (score >= 90) return { text: 'Excellent', color: 'bg-green-100 text-green-700' };
        if (score >= 80) return { text: 'Secure', color: 'bg-green-100 text-green-700' };
        if (score >= 60) return { text: 'Moderate', color: 'bg-yellow-100 text-yellow-700' };
        if (score >= 40) return { text: 'At Risk', color: 'bg-orange-100 text-orange-700' };
        return { text: 'Danger', color: 'bg-red-100 text-red-700' };
    };

    const { color: scoreColor } = getScoreStatus(userData.securityScore);

    useEffect(() => {
        if (userData.scansCompleted > 0) {
            const score = userData.securityScore;
            if (score >= 80) {
                setShowConfetti(true);
                toast.success(`Your security score is ${score}%! You are Secure.`, { duration: 5000 });
            } else {
                toast.error(`Your security score is ${score}%. Security risks detected!`, { duration: 5000 });
            }
        }
    }, [userData.securityScore, userData.scansCompleted]);


    // --- Components defined inline to reuse the state variables ---

    // Score Bar and Quick Stats Section
    const ScoreAndQuickStatsSection = (
        <section aria-label="Security overview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Bar (2/3 width) */}
            <div className="md:col-span-2 bg-white shadow-xl rounded-xl p-6 transition-all">
                <div className="flex items-center space-x-3 mb-5">
                    <Shield className="h-7 w-7 text-[#39FF14] animate-pulse" aria-hidden="true" />
                    <h2 className="text-xl font-bold text-gray-800">Your Security Score</h2>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <p className="text-6xl font-extrabold text-blue-600 drop-shadow-lg font-mono">
                            {userData.securityScore}%
                        </p>
                        <span className={`px-4 py-1 mt-3 inline-block rounded-full text-sm font-semibold ${scoreColor}`}>
                            {getScoreStatus(userData.securityScore).text}
                        </span>
                        <p className="text-gray-600 mt-3">
                            Last scan: <span className="font-medium">{userData.lastScanDate}</span> — Status:{" "}
                            <span className="font-semibold">{getScoreStatus(userData.securityScore).text}</span>.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 w-full md:w-1/2">
                        <Progress value={userData.securityScore} className="w-full" />
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Score trend: <span className="font-medium">{userData.progressTrend}</span>
                        </p>
                    </div>
                    </div>
                    </div>
                    {/* Quick Stats (1/3 width) */}
                    <div className="md:col-span-1 bg-white shadow-xl rounded-xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-gray-800">Quick Stats</h3>
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <BarChart className="h-6 w-6 text-blue-600" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold font-mono">{userData.scansCompleted}</p>
                                <p className="text-gray-500 text-sm">Scans Completed</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold font-mono">{userData.activeRecommendations}</p>
                                <p className="text-gray-500 text-sm">Active Recommendations</p>
                            </div>
                        </div>
                    </div>
                </section>
    );

    // Fact of the Day Section
    const FactOfTheDaySection = (
        <section
            aria-label="Cybersecurity fact"
            className="bg-gradient-to-r from-blue-600 to-[#39FF14] text-white rounded-xl shadow-xl p-6"
        >
            <h2 className="text-lg font-semibold mb-2">💡 Cybersecurity Fact of the Day</h2>
            <p className="text-white/90 font-light">{factOfTheDay}</p>
        </section>
    );

    // Recent Activity Section
    const RecentActivitySection = (
        <section aria-label="Recent activity" className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <ul className="space-y-3">
                <li className="flex justify-between items-center border-b pb-2 last:border-none">
                    <span className="text-gray-600">Scan completed on {userData.lastScanDate}</span>
                    <span className={`${getScoreStatus(userData.securityScore).color} font-bold`}>{getScoreStatus(userData.securityScore).text} ({userData.securityScore}%)</span>
                </li>
            </ul>
        </section>
    );

    return (
        <div className="space-y-10 animate-fadeIn" role="main">
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} gravity={0.3} />}
            <Toaster />

            <header>
                <h1 className="text-3xl font-extrabold text-blue-700 font-serif">
                    Welcome back, {userData.name || 'User'}! 👋
                </h1>
                <p className="text-gray-600 mt-2 font-medium">Your personal cybersecurity command center.</p>
            </header>
            
            {/*                 IMPLEMENTING THE CORRECT LOGIC:
                IF hasScans (Returning User):
                    1. Score Bar & Quick Stats
                    2. Fact of the Day
                    3. Recent Activity
                    4. Map and Statistics Diagram
                ELSE (New User):
                    1. Map and Statistics Diagram
                    2. Fact of the Day (Always show)
            */}

            {hasScans ? (
                <>
                    {/* 1. Score Bar & Quick Stats */}
                    {ScoreAndQuickStatsSection} 
                    
                    {/* 2. Fact of the Day (always visible) */}
                    {FactOfTheDaySection}
                    
                    {/* 3. Recent Activity */}
                    {RecentActivitySection}
                    
                    {/* 4. Map and Statistics Diagram (LAST for returning users) */}
                    <MapAndStatsSection hasScans={hasScans} />
                </>
            ) : (
                <>
                    {/* 1. Map and Statistics Diagram (FIRST for new users) */}
                    <MapAndStatsSection hasScans={hasScans} />

                    {/* 2. Fact of the Day (Always visible) */}
                    {FactOfTheDaySection}
                </>
            )}

        </div>
    );
}