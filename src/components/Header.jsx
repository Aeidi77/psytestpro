import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, LayoutDashboard, UserCircle, LogOut, FileText, Menu, X } from 'lucide-react'
import { useAuth } from '../state/AuthContext.jsx'

export default function Header() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isActive = (p) => pathname === p

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-gradient-to-r from-green-800 to-emerald-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to={user.role === 'admin' ? '/admin' : '/dashboard'} 
          className="flex items-center space-x-3"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="bg-white p-2 rounded-full">
            <Brain className="h-6 w-6 md:h-8 md:w-8 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">PsyTestPro</h1>
            <p className="text-emerald-200 text-xs md:text-sm">Online Psychological Testing</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {user.role === 'admin' ? (
            <>
              <Link to="/admin" className={`flex items-center gap-2 ${isActive('/admin') ? 'text-yellow-300' : 'hover:text-yellow-200'} transition-colors px-3 py-2 rounded-lg`}>
                <LayoutDashboard size={18}/> Admin
              </Link>
              <Link to="/tests" className={`flex items-center gap-2 ${isActive('/tests') ? 'text-yellow-300' : 'hover:text-yellow-200'} transition-colors px-3 py-2 rounded-lg`}>
                <FileText size={18}/> Tes
              </Link>
              <Link to="/results" className={`flex items-center gap-2 ${isActive('/results') ? 'text-yellow-300' : 'hover:text-yellow-200'} transition-colors px-3 py-2 rounded-lg`}>
                <FileText size={18}/> Hasil
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={`flex items-center gap-2 ${isActive('/dashboard') ? 'text-yellow-300' : 'hover:text-yellow-200'} transition-colors px-3 py-2 rounded-lg`}>
                <LayoutDashboard size={18}/> Dashboard
              </Link>
              <Link to="/tests" className={`flex items-center gap-2 ${isActive('/tests') ? 'text-yellow-300' : 'hover:text-yellow-200'} transition-colors px-3 py-2 rounded-lg`}>
                <FileText size={18}/> Tes
              </Link>
              <Link to="/results" className={`flex items-center gap-2 ${isActive('/results') ? 'text-yellow-300' : 'hover:text-yellow-200'} transition-colors px-3 py-2 rounded-lg`}>
                <FileText size={18}/> Hasil
              </Link>
            </>
          )}

          <Link to="/profile" className={`flex items-center gap-2 ${isActive('/profile') ? 'text-yellow-300' : 'hover:text-yellow-200'} transition-colors px-3 py-2 rounded-lg`}>
            <UserCircle size={18}/> Profil
          </Link>

          <button onClick={logout} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
            <LogOut size={18}/> Keluar
          </button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-white hover:bg-emerald-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-emerald-800 border-t border-emerald-700/50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {user.role === 'admin' ? (
              <>
                <Link 
                  to="/admin" 
                  className={`flex items-center gap-2 ${isActive('/admin') ? 'text-yellow-300' : 'text-white'} py-2 px-4 rounded-lg transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={18}/> Admin
                </Link>
                <Link 
                  to="/tests" 
                  className={`flex items-center gap-2 ${isActive('/tests') ? 'text-yellow-300' : 'text-white'} py-2 px-4 rounded-lg transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={18}/> Tes
                </Link>
                <Link 
                  to="/results" 
                  className={`flex items-center gap-2 ${isActive('/results') ? 'text-yellow-300' : 'text-white'} py-2 px-4 rounded-lg transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={18}/> Hasil
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-2 ${isActive('/dashboard') ? 'text-yellow-300' : 'text-white'} py-2 px-4 rounded-lg transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={18}/> Dashboard
                </Link>
                <Link 
                  to="/tests" 
                  className={`flex items-center gap-2 ${isActive('/tests') ? 'text-yellow-300' : 'text-white'} py-2 px-4 rounded-lg transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={18}/> Tes
                </Link>
                <Link 
                  to="/results" 
                  className={`flex items-center gap-2 ${isActive('/results') ? 'text-yellow-300' : 'text-white'} py-2 px-4 rounded-lg transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={18}/> Hasil
                </Link>
              </>
            )}

            <Link 
              to="/profile" 
              className={`flex items-center gap-2 ${isActive('/profile') ? 'text-yellow-300' : 'text-white'} py-2 px-4 rounded-lg transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserCircle size={18}/> Profil
            </Link>

            <button 
              onClick={() => {
                logout()
                setMobileMenuOpen(false)
              }} 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-left"
            >
              <LogOut size={18}/> Keluar
            </button>
          </div>
        </div>
      )}
    </header>
  )
}