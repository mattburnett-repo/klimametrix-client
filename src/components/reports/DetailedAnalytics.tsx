import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DetailedAnalytics() {
  // Sample data - replace with real API data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const emissionsData = [120, 135, 125, 142, 131, 128];
  const targetData = [130, 130, 130, 130, 130, 130];

  const lineChartData: ChartData<'line'> = {
    labels: months,
    datasets: [
      {
        label: 'Actual Emissions',
        data: emissionsData,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Target',
        data: targetData,
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
        tension: 0,
      },
    ],
  };

  const sourceData = {
    labels: ['Electricity', 'Transportation', 'Manufacturing', 'Heating', 'Other'],
    datasets: [{
      label: 'Emissions by Source',
      data: [45, 25, 20, 7, 3],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    }],
  };

  const stats = [
    { name: 'Total Emissions', value: '2,453 tCO2e', change: '+2.3%', trend: 'up' },
    { name: 'Monthly Average', value: '204 tCO2e', change: '-1.5%', trend: 'down' },
    { name: 'Highest Source', value: 'Electricity', change: '45%', trend: 'neutral' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              <dd className={`mt-2 text-sm ${
                stat.trend === 'up' ? 'text-red-600' : 
                stat.trend === 'down' ? 'text-green-600' : 
                'text-gray-600'
              }`}>
                {stat.change} from previous period
              </dd>
            </div>
          </div>
        ))}
      </div>

      {/* Emissions Trend */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Emissions Trend</h3>
          <div className="h-80">
            <Line 
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Emissions (tCO2e)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Emissions by Source */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Emissions by Source</h3>
          <div className="h-80">
            <Bar
              data={sourceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Percentage (%)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Analysis Notes */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis Notes</h3>
          <div className="prose max-w-none">
            <ul className="space-y-2 text-gray-600">
              <li>Emissions are trending slightly above target for the current period</li>
              <li>Electricity remains the largest source of emissions at 45%</li>
              <li>Transportation emissions have decreased by 1.5% compared to last period</li>
              <li>Current trajectory suggests potential for 5% reduction by year end</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 