"use client"

import { useAuth } from "../context/AuthContext"

const CreditUsage = () => {
  const { user } = useAuth()

  if (!user) return null

  const totalCredits = user.recharged ? 8 : 4 
  const usedCredits = totalCredits - user.credits
  const percentage = (user.credits / totalCredits) * 100


  return (
    <div className="card bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">API Credit Usage</h2>

      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700">Credits Remaining:</span>
        <span className="font-bold text-lg">
          {user.credits} / {totalCredits}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className={`h-4 rounded-full ${percentage > 25 ? "bg-green-500" : "bg-red-500"}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Used: {usedCredits}</span>
        <span>Remaining: {user.credits}</span>
      </div>

      {user.credits === 0 && (
        <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-bold">Credits Exhausted!</p>
          <p className="mt-1">
            {user.recharged
              ? "You've already recharged once and cannot recharge again."
              : "Please send an email to recharge your credits."}
          </p>
        </div>
      )}
    </div>
  )
}

export default CreditUsage
