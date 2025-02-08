import { ChartBarIcon, DocumentChartBarIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Reports() {
  const navigate = useNavigate();
  
  const reportTypes = [
    {
      name: 'Emissions Summary',
      description: 'Monthly and yearly emissions data aggregated by source',
      icon: ChartBarIcon,
      href: '/reports/emissions-summary',
      color: 'bg-blue-500',
    },
    {
      name: 'Detailed Analytics',
      description: 'In-depth analysis of emissions patterns and trends',
      icon: DocumentChartBarIcon,
      href: '/reports/detailed-analytics',
      color: 'bg-green-500',
    },
    {
      name: 'Raw Data Export',
      description: 'Export your emissions data in various formats',
      icon: TableCellsIcon,
      href: '/reports/raw-data',
      color: 'bg-purple-500',
    },
  ];

  const handleDownload = async (reportName: string) => {
    try {
      // In a real application, this would be an API call
      const data = 'Date,Source,Emissions\n2024-01-01,Electricity,100\n2024-01-01,Transport,50';
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportName.toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      // In a real app, show an error notification here
    }
  };

  const getLastThreeMonths = () => {
    const months = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push({
        month: date.toLocaleString('default', { month: 'long' }),
        year: date.getFullYear(),
        date: date.toLocaleDateString(),
      });
    }
    return months;
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="mt-2 text-sm text-gray-600">
          Generate and view detailed reports about your emissions data
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* Report Type Selection */}
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report) => (
              <div
                key={report.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${report.color} rounded-md p-3`}>
                      <report.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {report.name}
                        </dt>
                        <dd className="text-xs text-gray-600 mt-1">
                          {report.description}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <button
                      onClick={() => navigate(report.href)}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      View report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Reports Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
            <div className="mt-4 bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {getLastThreeMonths().map((monthData) => (
                      <li key={monthData.month} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <DocumentChartBarIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {`Monthly Report - ${monthData.month} ${monthData.year}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              Generated {monthData.date}
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => handleDownload(`Monthly Report - ${monthData.month} ${monthData.year}`)}
                              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 