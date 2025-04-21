"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard")
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CRUD Platform</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your gateway to powerful API services with built-in credit management
        </p>

        <button onClick={login} className="btn btn-primary text-lg px-8 py-3 flex items-center mx-auto">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
          <p className="text-gray-600">Login securely with Google OAuth. No passwords to remember.</p>
        </div>

        <div className="card text-center">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">API Management</h3>
          <p className="text-gray-600">Get your unique API credentials and manage your API usage.</p>
        </div>

        <div className="card text-center">
          <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Credit System</h3>
          <p className="text-gray-600">Track your API usage with our credit system. Recharge when needed.</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li className="pl-2">
            <span className="font-semibold">Login with Google</span> - Securely authenticate with your Google account
          </li>
          <li className="pl-2">
            <span className="font-semibold">Get API Credentials</span> - Receive your unique API URL and API Key
          </li>
          <li className="pl-2">
            <span className="font-semibold">Use Your Credits</span> - Start with 4 request credits to use the API
          </li>
          <li className="pl-2">
            <span className="font-semibold">Recharge When Needed</span> - Send an email to recharge your credits once
          </li>
        </ol>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <button onClick={login} className="btn btn-primary text-lg px-8 py-3">
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Home
