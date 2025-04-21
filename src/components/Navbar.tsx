"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

const Navbar = () => {
  const { user, login, logout } = useAuth()
  const location = useLocation()

  const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/")
        toast.success("Logout successfully.")
    }


  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            CRUD Platform
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:inline">Welcome, {user.name}</span>
                {location.pathname !== "/dashboard" && (
                  <Link to="/dashboard" className="btn btn-primary">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="btn bg-red-500 hover:bg-red-600 text-white">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={login} className="btn btn-primary flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
