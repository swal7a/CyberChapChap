// src/pages/NewScan.jsx 

import React, { useState, useContext } from 'react'; 
import { Button } from "../components/ui/button"; 
import { Progress } from "../components/ui/progress"; 
import WebsiteScan from "./WebsiteScan"; 
import POSWifi from "./POSWifi"; 
import SocialMedia from "./SocialMedia"; 
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from "lucide-react"; 
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../context/UserContext'; 
import { calculateScore, questionnaires } from '../utils/grading'; 
// FIX: Import the save function from the SignupPage
import { saveUserDataToMockDB } from './SignupPage'; // <--- IMPORTED

// Define the steps and their corresponding components 
const steps = [ 
  { name: 'Social Media', component: SocialMedia, questions: questionnaires.socialMedia }, 
  { name: 'POS/Wi-Fi', component: POSWifi, questions: [...questionnaires.pos, ...questionnaires.wifi] }, 
  { name: 'Website', component: WebsiteScan, questions: questionnaires.website }, 
]; 

export default function NewScan() { 
  const [scanStep, setScanStep] = useState(0); 
  const [answers, setAnswers] = useState({}); 
  // We can still use isScanning briefly to show an "Analyzing" message 
  const [isScanning, setIsScanning] = useState(false);  

  const navigate = useNavigate(); 
  const { userData, updateUserData } = useContext(UserContext);  
  // Get the user's email from context for saving the data
  const userEmail = userData.email; // <--- GRAB USER EMAIL

  const handleAnswer = (questionId, value) => { 
    setAnswers(prevAnswers => ({ 
      ...prevAnswers, 
      [questionId]: value, 
    })); 
  }; 

  const handleNextStep = () => { 
    const currentStepQuestions = steps[scanStep].questions; 
    const allAnswered = currentStepQuestions.every(q => answers.hasOwnProperty(q.id)); 

    if (!allAnswered) { 
      alert('Please answer all questions before proceeding.'); 
      return; 
    } 
     
    setScanStep(prev => prev + 1); 
  }; 

  const handlePrevStep = () => { 
    setScanStep(prev => prev - 1); 
  }; 

  const handleStartAnalysis = () => { 
    // 1. Immediate Redundancy Check 
    if (isScanning) return;  
     
    setIsScanning(true); // Start "Analysis" instantly 

    // 2. IMMEDIATE CALCULATION AND REPORT CREATION (Synchronous) 
    const scanResults = calculateScore(answers); 
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); 
    
    // FIX START: Calculate the total number of recommendations
    // We flatten the array of recommendations from all categories to get a total count.
    const totalRecommendations = scanResults.recommendations 
      ? Object.values(scanResults.recommendations).flat().length 
      : 0;
    // FIX END

    // Fix: Calculate ID based on the current history length before the update 
    const currentHistory = userData.scanHistory || []; 
    const newReportId = currentHistory.length + 1; 
     
    const newScanEntry = { 
      id: newReportId,  
      date: currentDate, 
      score: scanResults.total, 
      status: scanResults.status, 
      recommendations: scanResults.recommendations, 
      answers: answers, 
    }; 

    // 3. Create the *NEW COMPLETE USER DATA OBJECT*
    const newUserData = {
        ...userData, // Retain existing data (name, email, businessName, etc.)
        securityScore: scanResults.total,
        scansCompleted: (userData.scansCompleted || 0) + 1,
        lastScanDate: currentDate,
        activeRecommendations: totalRecommendations, // <--- FIX APPLIED HERE
        scanHistory: [...currentHistory, newScanEntry],
    };

    // 4. IMMEDIATE CONTEXT UPDATE (Synchronous - Updates the current session) 
    updateUserData(newUserData); 
     
    // 5. FIX: PERSIST THE NEW DATA BACK TO THE MOCK DATABASE
    if (userEmail) {
        saveUserDataToMockDB(userEmail, newUserData); // <--- PERSISTENCE ADDED HERE
    } else {
        console.error("Cannot save scan data: User email is missing. Persistence failed.");
    }
     
    // 6. IMMEDIATE NAVIGATION AND STATE RESET 
    setTimeout(() => { 
      setIsScanning(false);  
      navigate('/dashboard');  
    }, 1); 
  }; 

  const renderScanStep = () => { 
    if (scanStep < steps.length) { 
      const CurrentComponent = steps[scanStep].component; 
      return <CurrentComponent answers={answers} onAnswer={handleAnswer} />; 
    } else { 
      return ( 
        <div className="text-center p-6 space-y-4"> 
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce" /> 
          <h2 className="text-3xl font-bold text-gray-800">Scan Ready!</h2> 
          <p className="text-gray-600">All your information has been gathered. Click the button below to start your full security analysis.</p> 
          <Button 
            onClick={handleStartAnalysis} 
            disabled={isScanning} 
            className="bg-[#4deea8] hover:bg-[#003a8c] transition-all" 
          > 
            {isScanning ? ( 
              <> 
                <Clock className="h-4 w-4 mr-2 animate-spin" /> Analyzing... 
              </> 
            ) : 'Start Analysis'} 
          </Button> 
        </div> 
      ); 
    } 
  }; 

  const progress = (scanStep / steps.length) * 100; 

  return ( 
    <div className="p-8 md:p-12"> 
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Security Scan Wizard</h1> 
      <div className="bg-white rounded-xl shadow-lg p-6"> 
        <div className="mb-6"> 
          <p className="text-sm font-medium text-gray-500 mb-2">Step {scanStep + 1}/{steps.length + 1}</p> 
          <Progress value={progress} className="w-full" /> 
        </div> 
         
        <div className="relative"> 
          {renderScanStep()} 
        </div> 
         
        <div className="mt-8 flex justify-between"> 
          <Button 
            onClick={handlePrevStep} 
            disabled={scanStep === 0 || isScanning} 
            variant="outline" 
            className="text-gray-600 hover:text-gray-800" 
          > 
            <ArrowLeft className="h-4 w-4 mr-2" /> Back 
          </Button> 
          {scanStep < steps.length && ( 
            <Button 
              onClick={handleNextStep} 
              className="bg-[#00C2A0] hover:bg-[#00a98b]" 
            > 
              Next <ArrowRight className="h-4 w-4 ml-2" /> 
            </Button> 
          )} 
        </div> 
      </div> 
    </div> 
  ); 
}