// src/pages/Reports.jsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Download, FileText } from 'lucide-react'; 
import { UserContext } from '../context/UserContext';
// Only import Line chart component
import { Line } from 'react-chartjs-2'; 
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getStatus } from '../utils/grading';

// Register only the components needed for the Line Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  // Keep only the Line Chart container ref
  const chartContainerRef = useRef(null); 
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Use a single useEffect for the Line Chart resizer
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === chartContainerRef.current) {
          setContainerSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    observer.observe(chartContainerRef.current);

    // This is the cleanup function to avoid memory leaks
    return () => observer.disconnect();
  }, []);

  const getStatusColor = (score) => {
    // Simplified Tailwind colors for clear background/text differentiation
    if (score >= 80) return 'bg-green-100 text-green-700';
    if (score >= 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  // FIX: Filter the scan history to remove entries that don't have a simple numeric ID.
  const uniqueScanHistory = userData.scanHistory.filter(report => {
    // Keep reports where the id is a number (e.g., 1, 2, 3) and not a raw timestamp string
    return Number.isFinite(report.id);
  });

  // Line Chart Data (Now using the filtered history)
  const lineChartData = {
    labels: uniqueScanHistory.map(report => report.date),
    datasets: [
      {
        label: 'Security Score',
        data: uniqueScanHistory.map(report => report.score),
        borderColor: '#004AAD',
        backgroundColor: 'rgba(0, 74, 173, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' },
      title: {
        display: true,
        text: 'Security Score Trend Over Time',
        color: '#333',
        font: { size: 16, weight: 'bold' }
      },
    },
    scales: {
      y: {
        min: 0, max: 100,
        title: { display: true, text: 'Score (%)' },
      },
      x: {
        title: { display: true, text: 'Scan Date' },
        ticks: { font: { size: 10 } },
      }
    }
  };

  // Use navigate to route to the detailed report component
  const handleViewReport = (reportId) => {
    navigate(`/dashboard/reports/${reportId}`);
  };

  const handleDownloadReport = (report) => {
    console.log(`Downloading report for scan on: ${report.date}`);
    alert('Download functionality will be implemented in a later step!');
  };

  return (
    <main className="p-8 md:p-12" aria-label="Scan History and Reports">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Scan History & Reports</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600 mb-6">Here you can view and manage all of your past security assessment reports.</p>
        
        {/* Line Chart Section (Score Trend) */}
        {/* Only show the trend chart if there is more than one data point */}
        {uniqueScanHistory.length > 1 ? (
          <div ref={chartContainerRef} className="mb-8 w-full mx-auto h-96 border p-4 rounded-lg bg-gray-50">
            {containerSize.width > 0 && containerSize.height > 0 && (
              <Line
                data={lineChartData}
                options={lineChartOptions}
                width={containerSize.width}
                height={containerSize.height}
              />
            )}
          </div>
        ) : uniqueScanHistory.length === 1 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg border mb-8">
                <p className="text-lg font-semibold text-gray-700">Need more data!</p>
                <p className="text-gray-500">Run at least two scans to see your security score trend over time.</p>
            </div>
        ) : null}
        
        <h2 className="text-xl font-bold mt-8 mb-4">All Scan Records</h2>

        {uniqueScanHistory.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-200">
            {uniqueScanHistory.slice().reverse().map(report => (
              <li key={report.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 mb-2 sm:mb-0">
                  <div className="font-semibold text-lg text-gray-800">
                    Report #{report.id}
                  </div>
                  <div className="text-sm text-gray-500">{report.date}</div>
                </div>
                
                <div className="flex flex-wrap items-center space-x-4 mt-2 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.score)}`}>
                    Score: {report.score}%
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.score)}`}>
                    Status: {getStatus(report.score)}
                  </span>
                  <Button
                    variant="outline"
                    className="flex items-center text-[#004AAD] border-gray-300"
                    onClick={() => handleViewReport(report.id)} 
                  >
                    <FileText className="h-4 w-4 mr-2" aria-hidden="true" /> View Report
                  </Button>
                  <Button
                    className="bg-[#00D084] hover:bg-[#00b27b]"
                    onClick={() => handleDownloadReport(report)}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-8 text-blue-500">
            <p>No reports found. Start a new scan to see your first report!</p>
          </div>
        )}
      </div>
    </main>
  );
}