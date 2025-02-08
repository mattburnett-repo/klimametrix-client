import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { emissionsApi } from '../services/api'
import { EmissionData } from '../types'
import { useEmissionsStore } from '../store/emissions'

export default function QuickCalculator() {
  const [result, setResult] = useState<EmissionData | null>(null)
  const addEmission = useEmissionsStore((state) => state.addEmission)
  
  const mutation = useMutation({
    mutationFn: emissionsApi.create,
    onSuccess: (data) => {
      setResult(data)
      addEmission(data)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data: EmissionData = {
      electricity: Number(formData.get('electricity')),
      fuel: Number(formData.get('fuel')),
      waste: Number(formData.get('waste')),
    }

    mutation.mutate(data)
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Quick Carbon Calculator
        </h3>
        
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div>
            <label htmlFor="electricity" className="block text-sm font-medium text-gray-700">
              Monthly Electricity Usage (kWh)
            </label>
            <input
              type="number"
              name="electricity"
              id="electricity"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="fuel" className="block text-sm font-medium text-gray-700">
              Monthly Fuel Consumption (L)
            </label>
            <input
              type="number"
              name="fuel"
              id="fuel"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="waste" className="block text-sm font-medium text-gray-700">
              Monthly Waste Generated (kg)
            </label>
            <input
              type="number"
              name="waste"
              id="waste"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {mutation.isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Calculating...
              </>
            ) : 'Calculate Emissions'}
          </button>

          {mutation.isError && (
            <div className="rounded-md bg-red-50 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error calculating emissions</h3>
                  <div className="mt-2 text-sm text-red-700">Please try again later.</div>
                </div>
              </div>
            </div>
          )}
        </form>

        {result && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-gray-900">Results</h4>
            <dl className="mt-4 space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-600">Electricity</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {(result.electricity * 0.5).toFixed(2)} kg CO2e
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-600">Fuel</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {(result.fuel * 2.3).toFixed(2)} kg CO2e
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-600">Waste</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {(result.waste * 1.5).toFixed(2)} kg CO2e
                </dd>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between">
                <dt className="text-base font-medium text-gray-900">Total Emissions</dt>
                <dd className="text-base font-medium text-indigo-600">
                  {result.totalEmissions?.toFixed(2)} kg CO2e
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  )
} 