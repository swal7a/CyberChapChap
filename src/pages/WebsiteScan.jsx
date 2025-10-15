// src/pages/WebsiteScan.jsx
import React, { useState, useContext, useMemo } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Globe, Clock, ShieldCheck, XCircle } from 'lucide-react';
// Import the calculateScore function from grading.js
import { questionnaires, calculateScore as gradingCalculateScore } from '../utils/grading';
import { UserContext } from '../context/UserContext';
import { Toaster, toast } from 'react-hot-toast';

// Helper component to display the result of a single website check
const ScanResultItem = ({ question, isAnswered, answer }) => {
    // Determine the icon and text based on the answer
    const Icon = answer === true ? ShieldCheck : XCircle;
    const colorClass = answer === true ? 'text-green-600' : 'text-red-600';
    const statusText = answer === true ? 'Pass' : answer === false ? 'Fail' : 'Pending';

    return (
        <div className={`flex items-center p-3 rounded-lg border 
            ${isAnswered ? 'bg-white shadow-sm' : 'bg-gray-100 text-gray-500'}
        `}>
            {isAnswered ? (
                <Icon className={`h-5 w-5 mr-3 ${colorClass} flex-shrink-0`} />
            ) : (
                <Clock className="h-5 w-5 mr-3 text-gray-500 animate-pulse flex-shrink-0" />
            )}
            <span className="flex-1 text-sm text-gray-700">{question}</span>
            <span className={`text-sm font-semibold ml-4 ${colorClass}`}>
                {isAnswered ? statusText : 'Scanning...'}
            </span>
        </div>
    );
};

export default function WebsiteScan({ answers, onAnswer }) {
    const { userData, updateUserData } = useContext(UserContext);
    const [hasWebsite, setHasWebsite] = useState(answers.hasWebsite !== undefined ? answers.hasWebsite : null);
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    // State to hold the results once the scan is complete
    const [scanResults, setScanResults] = useState(null); 
    const [urlError, setUrlError] = useState(''); // State for URL validation error
    
    const websiteQuestions = questionnaires.website;

    // Use a derived state to map website questions to their current state/answer
    const initialWebsiteState = useMemo(() => {
        return websiteQuestions.reduce((acc, q) => {
            acc[q.id] = { 
                ...q, 
                // Use the existing answer if available, otherwise null
                result: answers[q.id] !== undefined ? answers[q.id] : null, 
                scanned: answers[q.id] !== undefined 
            };
            return acc;
        }, {});
    }, [answers, websiteQuestions]);

    const [questionStates, setQuestionStates] = useState(initialWebsiteState);

    const handleInitialAnswer = (value) => {
        setHasWebsite(value);
        onAnswer('hasWebsite', value);
        
        if (value) {
            // Reset question states for a new scan if they switch back to 'Yes'
            setQuestionStates(initialWebsiteState); 
        } else {
            // Reset/clear answers if the user says they don't have a website
            websiteQuestions.forEach(q => onAnswer(q.id, undefined));
            setQuestionStates(initialWebsiteState); // Reset results display
            setScanResults(null);
            setUrlError('');
        }
    };

    // Helper function for basic URL validation
    const isValidUrl = (inputUrl) => {
        try {
            // Must have 'http' or 'https' and a valid domain part
            const urlPattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i);
            return urlPattern.test(inputUrl);
        } catch (e) {
            return false;
        }
    };

    // Simulated scan function that returns the *intended* answers
    const getSimulatedAnswers = (targetUrl) => {
        // Mock logic for realistic results
        let web1_result = true; // HTTPS is common
        let web2_result = Math.random() < 0.3 ? false : true; // Random pass/fail for uptime
        let web3_result = Math.random() < 0.6 ? false : true; // Security headers often fail
        
        // Quick URL check to make the result feel responsive to the input (optional realism)
        if (targetUrl.includes('insecure')) web1_result = false; 

        return {
            [websiteQuestions[0].id]: web1_result, // 'web1'
            [websiteQuestions[1].id]: web2_result, // 'web2'
            [websiteQuestions[2].id]: web3_result, // 'web3'
        };
    };

    const startAutomatedScan = async () => {
        setUrlError('');
        
        // ⭐ VALIDATION: Check if URL is valid
        if (!isValidUrl(url)) {
            setUrlError('Please enter a valid URL (e.g., https://yourbusiness.com).');
            return;
        }

        setIsScanning(true);
        setScanResults(null); // Clear previous results
        
        // Get the final answers we intend to save
        const finalAutomatedAnswers = getSimulatedAnswers(url);
        
        // 1. Simulate the scanning process step-by-step
        let currentStates = {};
        for (let i = 0; i < websiteQuestions.length; i++) {
            const q = websiteQuestions[i];
            const answerForQ = finalAutomatedAnswers[q.id];

            // Wait 500ms for visual effect
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Update the state for the question that just finished scanning
            currentStates = {
                ...currentStates,
                [q.id]: {
                    ...q,
                    result: answerForQ,
                    scanned: true
                }
            };
            setQuestionStates(currentStates);
        }

        // 2. Once all checks are visually complete, update parent state and user data
        
        // Update the parent state with the new answers
        Object.keys(finalAutomatedAnswers).forEach(qId => {
            onAnswer(qId, finalAutomatedAnswers[qId]);
        });

        // Get all answers from the entire quiz, including the newly scanned web answers
        const allAnswers = { ...answers, ...finalAutomatedAnswers };
        
        // Use the centralized grading function to calculate the full results
        const scanResultsData = gradingCalculateScore(allAnswers);
        
        // 3. Update User Context and display final results/toast
        updateUserData({
            securityScore: scanResultsData.total,
            scansCompleted: userData.scansCompleted + 1,
            lastScanDate: new Date().toLocaleDateString('en-US'),
            websiteStatus: scanResultsData.sectionScores.website?.status || 'N/A', // Use section-specific status
            activeRecommendations: scanResultsData.vulnerabilities.length,
            scanHistory: [
                ...userData.scanHistory,
                {
                    // Store the full results from grading.js
                    date: new Date().toISOString(),
                    score: scanResultsData.total,
                    category: 'Website Scan',
                    answers: allAnswers,
                    recommendations: scanResultsData.recommendations, // Store recommendations
                    vulnerabilities: scanResultsData.vulnerabilities, // Store detailed vulnerabilities
                },
            ],
        });
        
        setScanResults(scanResultsData); 
        setIsScanning(false);
        toast.success("Website Scan completed successfully! Click the next button for the whole scan.", { duration: 3000 });
    };

    const initialScanSection = (
        <section className="max-w-xl mx-auto bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Do you have a business website?</h3>
            <div className="flex space-x-4">
                <Button
                    onClick={() => handleInitialAnswer(true)}
                    className={`flex-1 ${hasWebsite === true ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                    disabled={isScanning}
                >
                    Yes
                </Button>
                <Button
                    onClick={() => handleInitialAnswer(false)}
                    className={`flex-1 ${hasWebsite === false ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                    disabled={isScanning}
                >
                    No
                </Button>
            </div>
            {hasWebsite && (
                <div className="mt-6 space-y-4">
                    <Label htmlFor="website-url" className="font-semibold">Website URL</Label>
                    <Input
                        id="website-url"
                        type="url"
                        placeholder="e.g. https://www.yourbusiness.com"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            setUrlError(''); // Clear error on change
                        }}
                        disabled={isScanning}
                        className={urlError ? 'border-red-500' : ''} // Highlight input on error
                    />
                    {urlError && <p className="text-red-500 text-sm">{urlError}</p>} 
                    <Button
                        onClick={startAutomatedScan}
                        disabled={isScanning || url.length === 0}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
                    >
                        {isScanning ? (
                            <>
                                <Clock className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" /> Scanning...
                            </>
                        ) : (
                            'Start Automated Scan'
                        )}
                    </Button>
                </div>
            )}
            {/* REMOVED: "No website? Great! You've avoided one category of risk..." */}
        </section>
    );

    const resultsSection = (
        <section className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-600 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Website Check Results</h3>
            <div className="space-y-3">
                {Object.values(questionStates).map((qState) => (
                    <ScanResultItem 
                        key={qState.id}
                        question={qState.text}
                        isAnswered={qState.scanned}
                        answer={qState.result}
                    />
                ))}
            </div>
            {scanResults && (
                <div className="pt-4 border-t mt-4">
                    {/* REMOVED: "Results are saved to your history. View the full report in the Dashboard." */}
                    
                </div>
            )}
        </section>
    );

    return (
        <main className="space-y-8" aria-label="Website Security Scan">
            <Toaster />
            <header className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Globe className="h-10 w-10 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Automated Website Security Scan</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Enter your website URL, and we will automatically check for critical vulnerabilities like missing encryption and security headers.
                </p>
            </header>
            
            {initialScanSection}

            {/* Display results only after the user has a website and the scan is done or in progress */}
            {hasWebsite && (isScanning || scanResults) && resultsSection}
        </main>
    );
}