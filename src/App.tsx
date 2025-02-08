import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Reports from './components/Reports'
import ReportView from './components/reports/ReportView'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 overflow-auto focus:outline-none">
          <main className="flex-1 relative z-0 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:reportType" element={<ReportView />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App 
