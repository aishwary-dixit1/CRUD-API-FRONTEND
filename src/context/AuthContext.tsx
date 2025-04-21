"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "../services/api"

interface User {
  id: string
  name: string
  email: string
  apiKey: string
  apiUrl: string
  credits: number
  recharged: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: () => void
  logout: () => void
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkAuth = async (): Promise<boolean> => {
    try {
      setLoading(true)
      console.log("checking for auth");
      const response = await api.get("/auth/me")
      setUser(response.data)
      console.log("done -> ", response.data);
      return true
    } catch (err) {
      setUser(null)
      return false
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  const logout = async () => {
    try {
      await api.get("/auth/logout")
      setUser(null)
    } catch (err) {
      setError("Failed to logout")
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, checkAuth }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
