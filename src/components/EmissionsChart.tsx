import { useEffect, useRef } from 'react'
import { Chart, registerables, ChartConfiguration } from 'chart.js'
import { useEmissionsStore } from '../store/emissions'

Chart.register(...registerables)

export default function EmissionsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const emissions = useEmissionsStore((state) => state.emissions)

  useEffect(() => {
    if (!chartRef.current) return

    const labels = emissions.map(e => 
      new Date(e.createdAt!).toLocaleDateString('en-US', { month: 'short' })
    )
    const data = emissions
      .map(e => e.totalEmissions)
      .filter((value): value is number => value !== undefined)

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d')
    if (ctx) {
      const chartConfig: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Total Emissions (kg CO2e)',
              data,
              borderColor: 'rgb(79, 70, 229)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Carbon Emissions Trend'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              position: 'top',
              align: 'center'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'kg CO2e'
              }
            }
          }
        }
      }

      chartInstance.current = new Chart(ctx, chartConfig)
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [emissions])

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 w-full">
      <div className="space-y-4 w-full">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Emissions Analytics
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Track your carbon emissions over time and compare against targets
          </p>
        </div>

        <div className="h-96 w-full">
          <canvas ref={chartRef} className="w-full h-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-600 text-sm font-medium">Current Month</p>
            <p className="mt-2 text-3xl font-bold text-green-900">850 kg</p>
            <p className="text-green-600 text-sm">↓ 5.6% from last month</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-600 text-sm font-medium">YTD Average</p>
            <p className="mt-2 text-3xl font-bold text-blue-900">1,058 kg</p>
            <p className="text-blue-600 text-sm">Monthly average</p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-indigo-600 text-sm font-medium">Target Status</p>
            <p className="mt-2 text-3xl font-bold text-indigo-900">-10.5%</p>
            <p className="text-indigo-600 text-sm">Below target</p>
          </div>
        </div>
      </div>
    </div>
  )
} 