import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import DetailedAnalytics from './DetailedAnalytics';

export default function ReportView() {
  const { reportType } = useParams();
  const navigate = useNavigate();

  const getReportContent = () => {
    switch (reportType) {
      case 'emissions-summary':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Emissions Summary Report</h2>
            {/* Placeholder for actual emissions data */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-2">Total Emissions</h3>
                <p className="text-3xl font-bold text-gray-900">2,453 tCO2e</p>
                <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Breakdown by Source</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Electricity</span>
                    <span className="font-medium">1,245 tCO2e</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Transportation</span>
                    <span className="font-medium">856 tCO2e</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Manufacturing</span>
                    <span className="font-medium">352 tCO2e</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'detailed-analytics':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Detailed Analytics Report</h2>
            <DetailedAnalytics />
          </div>
        );
      case 'raw-data':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Raw Data Export</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Full Dataset Export</h3>
                  <p className="text-sm text-gray-500">All emissions data in CSV format</p>
                </div>
                <button
                  onClick={() => handleDownload('full')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Download CSV
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Monthly Summary</h3>
                  <p className="text-sm text-gray-500">Monthly aggregated data</p>
                </div>
                <button
                  onClick={() => handleDownload('monthly')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Download CSV
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Report not found</div>;
    }
  };

  const handleDownload = async (type: 'full' | 'monthly') => {
    try {
      // In a real application, this would be an API call
      const data = type === 'full' 
        ? 'Date,Source,Emissions\n2024-01-01,Electricity,100\n2024-01-01,Transport,50'
        : 'Month,Total Emissions\nJan 2024,150\nFeb 2024,145';
      
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emissions-${type}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      // In a real app, show an error notification here
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Reports
        </button>
        {getReportContent()}
      </div>
    </div>
  );
} 