// src/components/scan/SocialMediaScan.jsx
import React from 'react';
import { Button } from "../components/ui/button";
import { questionnaires } from "../utils/grading";
import { FaFacebook } from 'react-icons/fa';

// The custom icon component you provided
import { Smartphone } from 'lucide-react';



const SocialMediaSecurityIcon = ({ 
  size = 'lg', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 p-3',
    md: 'w-16 h-16 p-4', 
    lg: 'w-20 h-20 p-4'
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  return (
    <div 
      className={`bg-gradient-to-r from-[#004AAD] to-[#00D084] rounded-full flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <Smartphone className={`${iconSizes[size]} text-white`} />
    </div>
  );
};

export default function SocialMediaScan({ answers, onAnswer }) {
  const questions = questionnaires.socialMedia;

  return (
    <div className="p-4">
      {/* Container for the icon and text header */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        {/* The new custom icon component */}
        <SocialMediaSecurityIcon size="lg" />
        <h2 className="text-3xl font-bold text-gray-800">Social Media Security</h2>
        <p className="text-gray-600">Answer these simple questions to assess your social media security posture</p>
      </div>

      {/* The rest of the component remains unchanged */}
      {questions.map((q) => (
        <div key={q.id} className="bg-white rounded-lg shadow-sm p-5 mb-4 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1 mb-3 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-700">{q.text}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {/* Example descriptions for non-techies */}
                {q.id === "sm1" && "Adds an extra layer of security beyond just a password."}
                {q.id === "sm2" && "Protects against data breaches on one platform affecting others."}
                {q.id === "sm3" && "Helps you create and remember unique passwords easily and securely."}
                {q.id === "sm4" && "Ensures you don't lose access if your main account is compromised."}
                {q.id === "sm5" && "Helps you spot suspicious login activity right away."}
                {q.id === "sm6" && "Limits who can post and access sensitive information."}
                {q.id === "sm7" && "Teaches your team to recognize and avoid fake login pages or messages."}
                {q.id === "sm8" && "Prevents former employees from accessing your accounts."}
              </p>
            </div>
            
            <div className="flex space-x-2 flex-shrink-0">
              <Button
                variant={answers[q.id] === true ? 'default' : 'outline'}
                onClick={() => onAnswer(q.id, true)}
                className={answers[q.id] === true ? 'bg-[#00D084] hover:bg-[#00b27b] text-white' : 'border-gray-300 hover:bg-gray-100'}
              >
                Yes
              </Button>
              <Button
                variant={answers[q.id] === false ? 'default' : 'outline'}
                onClick={() => onAnswer(q.id, false)}
                className={answers[q.id] === false ? 'bg-red-500 hover:bg-red-600 text-white' : 'border-gray-300 hover:bg-gray-100'}
              >
                No
              </Button>
              <Button
                variant={answers[q.id] === 'not sure' ? 'default' : 'outline'}
                onClick={() => onAnswer(q.id, 'not sure')}
                className={answers[q.id] === 'not sure' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border-gray-300 hover:bg-gray-100'}
              >
                Not Sure
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}