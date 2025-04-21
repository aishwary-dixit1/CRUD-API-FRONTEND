"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { ClipboardIcon, CheckIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import toast from "react-hot-toast"

const ApiCredentials = () => {
  const { user } = useAuth()
  const [showApiKey, setShowApiKey] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)

  if (!user) return null

  const copyToClipboard = async (text: string, type: "key" | "url") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "key") {
        setCopiedKey(true)
        setTimeout(() => setCopiedKey(false), 2000)
      } else {
        setCopiedUrl(true)
        setTimeout(() => setCopiedUrl(false), 2000)
      }
      toast.success(`${type === "key" ? "API Key" : "API URL"} copied to clipboard`)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  const maskedApiKey = showApiKey || !user.apiKey ? user.apiKey ?? "N/A" : user.apiKey.substring(0, 8) + "••••••••••••••••"


  return (
    <div className="card bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your API Credentials</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-100 p-3 rounded-l-md font-mono text-sm overflow-x-auto">{maskedApiKey}</div>
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-3 bg-gray-200 hover:bg-gray-300 transition-colors"
              title={showApiKey ? "Hide API Key" : "Show API Key"}
            >
              {showApiKey ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
            <button
              onClick={() => copyToClipboard(user.apiKey, "key")}
              className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-r-md transition-colors"
              title="Copy to clipboard"
            >
              {copiedKey ? <CheckIcon size={18} /> : <ClipboardIcon size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API URL</label>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-100 p-3 rounded-l-md font-mono text-sm overflow-x-auto">{user.apiUrl}</div>
            <button
              onClick={() => copyToClipboard(user.apiUrl, "url")}
              className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-r-md transition-colors"
              title="Copy to clipboard"
            >
              {copiedUrl ? <CheckIcon size={18} /> : <ClipboardIcon size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Use these credentials to authenticate your API requests. Include them in your request headers:</p>
        <pre className="bg-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
          <code>{`X-API-Key: ${maskedApiKey}\nX-API-URL: ${user.apiUrl}`}</code>
        </pre>
      </div>
    </div>
  )
}

export default ApiCredentials
