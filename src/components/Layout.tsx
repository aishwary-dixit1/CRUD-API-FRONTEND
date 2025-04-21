import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { Toaster } from "react-hot-toast"

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} CRUD Platform. Developed by Aishwary Dixit</p>
        </div>
      </footer>
      <Toaster position="top-center" />
    </div>
  )
}

export default Layout
