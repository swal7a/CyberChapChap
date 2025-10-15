// src/pages/Recommendations.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { CheckCircle, AlertTriangle, Zap, Clock } from 'lucide-react';
import { Button } from "../components/ui/button";
import { calculateScore } from '../utils/grading';

export default function Recommendations() {
  const { userData } = useContext(UserContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const lastScan = userData.scanHistory[userData.scanHistory.length - 1];

    if (!lastScan || !lastScan.answers) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    const { answers } = lastScan;
    const scanResults = calculateScore(answers);
    
    // The recommendations array from calculateScore now contains full objects
    setRecommendations(scanResults.recommendations);
    setLoading(false);
  }, [userData.scanHistory]);

  const getPriorityColor = (type) => {
    switch (type) {
      case 'high': return 'bg-red-100 border-red-300';
      case 'medium': return 'bg-orange-100 border-orange-300';
      case 'low': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="p-8 md:p-12 text-center">
        <Clock className="mx-auto h-16 w-16 text-blue-500 animate-spin" aria-hidden="true" />
        <p className="mt-4 text-gray-600">Generating personalized recommendations...</p>
      </div>
    );
  }

  // Handle the case where a perfect score returns a string recommendation
  const isStringRecommendation = recommendations.length === 1 && typeof recommendations[0] === 'string';
  const perfectScoreRec = isStringRecommendation ? {
    id: 'perfect-score',
    title: 'Excellent Security Posture!',
    description: recommendations[0],
    type: 'low'
  } : null;

  const finalRecommendations = isStringRecommendation ? [perfectScoreRec] : recommendations;

  return (
    <main className="p-8 md:p-12" aria-label="Security Recommendations">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Security Recommendations</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="h-6 w-6 text-red-500" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-gray-800">Your Personalized Action Plan</h2>
        </div>
        <p className="text-gray-600">
          Based on your last scan on **{userData.lastScanDate || 'N/A'}**, here are the key steps we recommend to improve your security posture.
        </p>
      </div>

      <section aria-labelledby="recommendations-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h2 id="recommendations-list" className="sr-only">List of Security Recommendations</h2>
        {finalRecommendations.map((rec) => (
          <article key={rec.id} className={`rounded-xl p-6 border ${getPriorityColor(rec.type)} flex flex-col items-start`}>
            <div className="flex items-center space-x-3 mb-4">
              {rec.type === 'high' && <Zap className="h-6 w-6 text-red-500" />}
              {rec.type === 'medium' && <AlertTriangle className="h-6 w-6 text-orange-500" />}
              {rec.type === 'low' && <CheckCircle className="h-6 w-6 text-green-500" />}
              <h3 className="text-lg font-bold text-gray-800">{rec.title}</h3>
            </div>
            <p className="text-gray-700 flex-grow">{rec.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}