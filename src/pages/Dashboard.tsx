"use client"

import { useAuth } from "../context/AuthContext"
import ApiCredentials from "../components/ApiCredentials"
import CreditUsage from "../components/CreditUsage"
import RechargeInstructions from "../components/RechargeInstructions"

const Dashboard = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6">
        <ApiCredentials />
        <CreditUsage />
        <RechargeInstructions />

        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">API Usage Guide</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Making API Requests</h3>
              <p className="text-gray-600 mb-2">To use the API, include your credentials in the request headers:</p>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>{`
// Example API request
fetch('${user.apiUrl}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': '${user.apiKey}',
    'X-API-URL': '${user.apiUrl}'
  },
  body: JSON.stringify({
    value: 'Sample data',
    txHash: 'transaction-hash-123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
                `}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Available Endpoints</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  <span className="font-mono">POST /</span> - Create a new entry
                </li>
                <li>
                  <span className="font-mono">GET /:id</span> - Retrieve an entry by ID
                </li>
                <li>
                  <span className="font-mono">PUT /:id</span> - Update an existing entry
                </li>
                <li>
                  <span className="font-mono">DELETE /:id</span> - Delete an entry
                </li>
              </ul>
            </div>

            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
              <p className="font-bold">Remember:</p>
              <p>Each API request consumes 1 credit from your account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
