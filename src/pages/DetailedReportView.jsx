// src/pages/DetailedReportView.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ArrowLeft, ShieldCheck, AlertTriangle, Download, XCircle } from 'lucide-react';
import { getStatus } from '../utils/grading';
import { Button } from "../components/ui/button";

// --- Utility function to map severity type to an icon ---
const getIconBySeverity = (severity) => {
    switch (severity ? severity.toLowerCase() : '') {
        case 'high':
        case 'medium': 
            return AlertTriangle;
        case 'low':
        default:
            return ShieldCheck;
    }
};

// Component for listing individual vulnerabilities (failed questions)
const VulnerabilitySection = ({ title, severity, question, answer, details, icon: Icon }) => (
    <div className={`p-4 rounded-lg shadow-md mb-4 border-l-4 
        ${severity.toLowerCase() === 'high' ? 'bg-red-50 border-red-500' : 
          severity.toLowerCase() === 'medium' ? 'bg-orange-50 border-orange-500' : 
          'bg-green-50 border-green-500'}
    `}>
        <div className="flex items-center space-x-3 mb-2">
            <Icon className={`h-6 w-6 flex-shrink-0
                ${severity.toLowerCase() === 'high' ? 'text-red-600' : 
                  severity.toLowerCase() === 'medium' ? 'text-orange-600' : 
                  'text-green-600'}
            `} />
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <span className={`ml-auto px-3 py-1 text-xs font-semibold rounded-full uppercase
                ${severity.toLowerCase() === 'high' ? 'bg-red-500 text-white' : 
                  severity.toLowerCase() === 'medium' ? 'bg-orange-500 text-white' : 
                  'bg-green-500 text-white'}
            `}>
                {severity} Risk
            </span>
        </div>
        
        {/* VULNERABILITY: Explaining the risk based on the negative answer */}
        <h4 className="font-semibold text-gray-700">Vulnerability Detected:</h4>
        <p className="text-gray-700 italic mb-3">
            {/* THIS LINE IS WHERE THE CORRECTED QUESTION TEXT WILL NOW APPEAR */}
            **{question}** (Your Answer: **{answer === 'not sure' ? 'Not Sure' : answer === true ? 'Yes' : 'No'}**)
        </p>

        <h4 className="font-semibold mt-2 text-red-700">Security Risk Explained:</h4>
        <p className="text-sm text-gray-600 border-l-2 border-red-200 pl-3">
            {details} 
        </p>
        
    </div>
);


export default function DetailedReportView() {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    const report = userData.scanHistory.find(r => r.id === parseInt(reportId));

    // Placeholder for Download functionality
    const handleDownloadReport = () => {
        alert("Preparing to download report... (Download logic required)");
        console.log("Initiating report download for:", report.id);
    };

    if (!report) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-4xl font-bold text-red-500">Report Not Found 😥</h1>
                <Button onClick={() => navigate('/dashboard/reports')} className="mt-6">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Go Back to All Reports
                </Button>
            </div>
        );
    }

    const reportStatus = getStatus(report.score);
    const scoreColor = reportStatus === 'Secure' || reportStatus === 'Excellent' ? 'text-green-600' : reportStatus === 'Moderate' ? 'text-orange-600' : reportStatus === 'Danger' || reportStatus === 'At Risk' ? 'text-red-600' : 'text-gray-600';

    // --- DYNAMIC CONTENT FROM GRADING.JS ---
    const vulnerabilities = report.vulnerabilities || [];
    const recommendations = report.recommendations || [];
    
    // 1. Calculate totals and summary based on recommendations (as they are more reliable for counts)
    const actualVulnerabilities = recommendations.filter(rec => rec.id !== 'perfect-score');
    
    const totalVulnerabilities = actualVulnerabilities.length;
    const vulnerabilityIcon = totalVulnerabilities > 0 ? XCircle : ShieldCheck;
    const vulnerabilityColor = totalVulnerabilities > 0 ? 'text-red-600' : 'text-green-600';

    // Group recommendations by severity for the summary card
    const groupedVulnerabilities = actualVulnerabilities.reduce((acc, v) => {
        const severityKey = v.type.toLowerCase();
        acc[severityKey] = (acc[severityKey] || 0) + 1;
        return acc;
    }, {});


    // 2. Determine which array to use for the detailed list rendering.
    // Prioritize the 'vulnerabilities' array (contains Q&A)
    const listToMap = vulnerabilities.length > 0 ? vulnerabilities : actualVulnerabilities;

    // 3. Map the chosen list for display.
    const vulnerabilitySections = listToMap.map(v => {
        // Assume correct structure if using 'vulnerabilities' array (from new, fixed scan)
        // If falling back to 'actualVulnerabilities' (old report), use the rec fields.
        
        const isVulnerabilityArray = v.question !== undefined;

        return {
            // Use recTitle/title for the section header
            title: v.recTitle || v.title || 'Security Recommendation', 
            severity: v.severity || v.type || 'low', 

            // ⭐ CRITICAL CHANGE: If it's a new report object, v.question will be the full text.
            // If it's an old recommendation object, use the title as the question.
            question: isVulnerabilityArray ? v.question : v.title, 
            
            // For new reports, v.answer will be 'false' or 'not sure'. For old reports, assume 'No'.
            answer: isVulnerabilityArray ? v.answer : 'No', 
            
            details: v.recDescription || v.description || 'Details are currently unavailable.', 
            icon: getIconBySeverity(v.severity || v.type)
        };
    });

    const detailedListLength = vulnerabilitySections.length;


    return (
        <main className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-600 hover:text-[#004AAD]">
                    <ArrowLeft className="h-5 w-5 mr-2" /> Back to History
                </Button>
                <Button className="bg-[#00D084] hover:bg-[#00b27b]" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" /> Download PDF Report
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-2xl p-8 border-t-8 border-[#004AAD]">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-4xl font-extrabold text-[#004AAD] mb-2">Detailed Security Report #{report.id}</h1>
                    <p className="text-lg text-gray-600">Generated on: **{report.date}**</p>
                </header>

                {/* --- Quick Stats: Score, Status, and DYNAMIC Vulnerability Count --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-sm font-semibold text-gray-500">Overall Security Score</p>
                        <p className={`text-6xl font-extrabold ${scoreColor}`}>{report.score}%</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-sm font-semibold text-gray-500">Report Status</p>
                        <p className={`text-2xl font-bold mt-2 ${scoreColor}`}>{reportStatus}</p>
                    </div>
                    {/* DYNAMIC VULNERABILITY COUNTER */}
                    <div className="text-center p-4 bg-gray-50 rounded-lg shadow-inner flex flex-col justify-center items-center">
                        <p className="text-sm font-semibold text-gray-500">Total Vulnerabilities</p>
                        <div className="flex items-center mt-2">
                           <p className={`text-4xl font-extrabold ${vulnerabilityColor} mr-2`}>{totalVulnerabilities}</p>
                           <vulnerabilityIcon className={`h-6 w-6 ${vulnerabilityColor}`} />
                        </div>
                    </div>
                </div>

                {/* --- VULNERABILITY SUMMARY (Required before detailed list) --- */}
                <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6 mt-12">Vulnerability Risk Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {['high', 'medium', 'low'].map(severity => {
                        const count = groupedVulnerabilities[severity] || 0;
                        const SeverityIcon = getIconBySeverity(severity);
                        const colorClass = severity === 'high' ? 'text-red-500' : severity === 'medium' ? 'text-orange-500' : 'text-green-500';
                        const bgColorClass = severity === 'high' ? 'bg-red-50' : severity === 'medium' ? 'bg-orange-50' : 'bg-green-50';
                        const borderColorClass = severity === 'high' ? 'border-red-500' : severity === 'medium' ? 'border-orange-500' : 'border-green-500';

                        
                        return (
                            <div key={severity} className={`p-4 rounded-lg shadow-md border ${count > 0 ? `${borderColorClass} ${bgColorClass}` : 'border-gray-200 bg-gray-50'}`}>
                                <div className="flex items-center justify-between">
                                    <h4 className={`text-lg font-bold uppercase ${colorClass}`}>{severity} Risk</h4>
                                    <SeverityIcon className={`h-6 w-6 ${colorClass}`} />
                                </div>
                                <p className={`text-3xl font-extrabold ${colorClass}`}>{count}</p>
                                <p className="text-sm text-gray-600">{count > 0 ? 'Items found. Action required.' : 'No items found.'}</p>
                            </div>
                        );
                    })}
                </div>

                {/* --- Detailed Vulnerability Listing --- */}
                <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6 mt-6">Detailed Vulnerability Listing ({detailedListLength} Items)</h2>
                <div className="space-y-6">
                    {detailedListLength > 0 ? (
                        vulnerabilitySections.map((section, index) => (
                            <VulnerabilitySection 
                                key={index} 
                                title={section.title} 
                                severity={section.severity} 
                                question={section.question}
                                answer={section.answer}
                                details={section.details}
                                icon={section.icon}
                            />
                        ))
                    ) : (
                        <div className="text-center p-8 bg-green-50 rounded-lg border border-green-300">
                            <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="text-lg font-bold text-green-700">No Major Vulnerabilities Detected!</p>
                            <p className="text-gray-600">All questions were answered positively, reflecting a strong security stance.</p>
                        </div>
                    )}
                </div>

                {/* --- Overall Recommendations Summary (Remains the same) --- */}
                {recommendations.length > 0 && (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6 mt-12">Actionable Recommendations Summary</h2>
                        <ul className="list-disc list-outside text-gray-700 ml-6 space-y-4">
                            {recommendations.map((rec, index) => (
                                <li key={index}>
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full uppercase mr-2 
                                        ${rec.type === 'high' ? 'bg-red-400 text-white' : 
                                          rec.type === 'medium' ? 'bg-orange-400 text-white' : 
                                          'bg-gray-300 text-gray-800'}
                                    `}>
                                        {rec.type}
                                    </span>
                                    <strong className="text-gray-900">{rec.title}:</strong> {rec.description}
                                </li>
                            ))}
                        </ul>
                    </>
                )}


                <footer className="mt-8 pt-4 border-t text-sm text-gray-500">
                    <p>This report provides an assessment of your current digital security posture. Actioning the high-severity recommendations is critical for securing your business in the African digital landscape.</p>
                </footer>
            </div>
        </main>
    );
}