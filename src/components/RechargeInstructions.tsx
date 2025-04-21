"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { rechargeCredits } from "../services/api"
import { MailIcon } from "lucide-react"
import toast from "react-hot-toast"

const RechargeInstructions = () => {
  const { user, checkAuth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (!user || user.credits > 0) return null

  const handleSimulateRecharge = async () => {
    if (user.recharged) {
      toast.error("You have already recharged once and cannot recharge again.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await rechargeCredits(user.email)
      setSuccess(result.message)
      await checkAuth() // Refresh user data
      toast.success("Credits recharged successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        toast.error(err.message)
      } else {
        setError("An unknown error occurred")
        toast.error("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const emailSubject = "Please recharge my credits"
  const supportEmail = "mr.dixit17@gmail.com"
  const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(emailSubject)}`

  return (
    <div className="card bg-white shadow-lg rounded-lg p-6 mb-6 border-t-4 border-yellow-500">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Recharge Your Credits</h2>

      {user.recharged ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Credits exhausted. Cannot recharge again.</p>
          <p>You have already used your one-time recharge opportunity.</p>
        </div>
      ) : (
        <>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
            <p className="font-bold">Your credits are exhausted!</p>
            <p>Send an email to recharge your credits (one-time only).</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                Send an email to <span className="font-mono">{supportEmail}</span>
              </li>
              <li>
                Use the subject: <span className="font-mono">{emailSubject}</span>
              </li>
              <li>You will receive 4 additional credits</li>
              <li>This can only be done once per account</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={mailtoLink} className="btn btn-primary flex items-center justify-center">
              <MailIcon className="mr-2" size={18} />
              Open Email Client
            </a>

            <button
              onClick={handleSimulateRecharge}
              disabled={loading}
              className="btn bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>Simulate Email Recharge</span>
              )}
            </button>
          </div>

          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

          {success && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">{success}</div>}
        </>
      )}
    </div>
  )
}

export default RechargeInstructions
