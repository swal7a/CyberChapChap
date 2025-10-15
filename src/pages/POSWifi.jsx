// src/pages/PosWifiScan.jsx
import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Wifi, Smartphone } from 'lucide-react';
import { questionnaires } from '../utils/grading';

export default function PosWifiScan({ answers, onAnswer }) {
  const [hasPos, setHasPos] = useState(answers.hasPos !== undefined ? answers.hasPos : null);
  const [hasWifi, setHasWifi] = useState(true); // Wi-Fi is mandatory, so this is always true

  const posQuestions = questionnaires.pos;
  const wifiQuestions = questionnaires.wifi;

  const handleInitialAnswer = (section, value) => {
    if (section === 'pos') {
      setHasPos(value);
      onAnswer('hasPos', value);
      // Clear previous answers if the user changes their mind
      if (!value) {
        posQuestions.forEach(q => onAnswer(q.id, undefined));
      }
    }
  };

  return (
    <main className="space-y-8" aria-label="POS and Wi-Fi Security Scan">
      <header className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Wifi className="h-10 w-10 text-white" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">POS & Wi-Fi Security</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let's secure your Point of Sale and wireless networks.
        </p>
      </header>

      {/* POS System Questions */}
      <section className="space-y-6">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Do you use a POS system?</h3>
          <div className="flex space-x-4">
            <Button 
              onClick={() => handleInitialAnswer('pos', true)} 
              className={`flex-1 ${hasPos === true ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
            >
              Yes
            </Button>
            <Button 
              onClick={() => handleInitialAnswer('pos', false)} 
              className={`flex-1 ${hasPos === false ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
            >
              No
            </Button>
          </div>
          {hasPos && (
            <div className="mt-6 space-y-4">
              {posQuestions.map(q => (
                <div key={q.id}>
                  <h4 className="font-medium text-gray-800">{q.text}</h4>
                  {/* Non-techie explanation for POS questions */}
                  <p className="text-sm text-gray-500 mt-1">
                    {q.id === "pos1" && "Protects against malicious software that could steal payment data."}
                    {q.id === "pos2" && "Limits who can access sensitive information and change settings."}
                    {q.id === "pos3" && "Keeps your system updated with the latest security fixes."}
                    {q.id === "pos4" && "Encrypts credit card data to prevent it from being stolen during transactions."}
                    {q.id === "pos5" && "Adds an extra layer of security beyond just a password."}
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <Button
                      onClick={() => onAnswer(q.id, true)}
                      className={`flex-1 ${answers[q.id] === true ? 'bg-[#00D084] hover:bg-[#00b27b] text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => onAnswer(q.id, false)}
                      className={`flex-1 ${answers[q.id] === false ? 'bg-red-500 hover:bg-red-600 text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                    >
                      No
                    </Button>
                    <Button
                      onClick={() => onAnswer(q.id, 'not sure')}
                      className={`flex-1 ${answers[q.id] === 'not sure' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                    >
                      Not Sure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Wi-Fi Questions (Mandatory) */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Business Wi-Fi Network</h3>
          <p className="text-gray-600 mb-4">
            We will scan your business Wi-Fi network's security.
          </p>
          <div className="mt-6 space-y-4">
            {wifiQuestions.map(q => (
              <div key={q.id}>
                <h4 className="font-medium text-gray-800">{q.text}</h4>
                {/* Non-techie explanation for Wi-Fi questions */}
                <p className="text-sm text-gray-500 mt-1">
                  {q.id === "wifi1" && "A strong password prevents unauthorized access to your network."}
                  {q.id === "wifi2" && "Hides your network name so it's not visible to the public."}
                  {q.id === "wifi3" && "Separates your business network from the one your guests use, protecting your sensitive data."}
                  {q.id === "wifi4" && "Prevents others from using your internet and adds a layer of privacy."}
                  {q.id === "wifi5" && "An extra layer of security that requires permission for new devices to join your network."}
                  {q.id === "wifi6" && "Limits the type of websites that can be accessed from the network."}
                </p>
                <div className="flex space-x-4 mt-2">
                  <Button
                    onClick={() => onAnswer(q.id, true)}
                    className={`flex-1 ${answers[q.id] === true ? 'bg-[#00D084] hover:bg-[#00b27b] text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => onAnswer(q.id, false)}
                    className={`flex-1 ${answers[q.id] === false ? 'bg-red-500 hover:bg-red-600 text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                  >
                    No
                  </Button>
                  <Button
                    onClick={() => onAnswer(q.id, 'not sure')}
                    className={`flex-1 ${answers[q.id] === 'not sure' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                  >
                    Not Sure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}