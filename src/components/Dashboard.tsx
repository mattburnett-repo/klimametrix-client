import { useState } from 'react'
import { CalculatorIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import EmissionsChart from './EmissionsChart'
import QuickCalculator from './QuickCalculator'

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('calculator')

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Carbon Emissions Dashboard</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Tabs */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setSelectedTab('calculator')}
              className={`${
                selectedTab === 'calculator'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <CalculatorIcon className="h-5 w-5 mr-2" />
              Quick Calculator
            </button>
            <button
              onClick={() => setSelectedTab('analytics')}
              className={`${
                selectedTab === 'analytics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Analytics
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="py-4">
          {selectedTab === 'calculator' ? (
            <QuickCalculator />
          ) : (
            <EmissionsChart />
          )}
        </div>
      </div>
    </div>
  )
} 