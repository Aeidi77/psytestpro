import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import { Brain, BarChart3, Shield, Sparkles, Quote, User, Lock, LogIn, Eye, EyeOff, ClipboardCheck } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login, user } = useAuth()

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md p-8 text-center border border-white/20">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <ClipboardCheck size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Anda sudah masuk</h2>
          <p className="text-gray-600 mb-6">Silakan lanjutkan ke halaman beranda</p>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const res = login(username.trim(), password)
    if (!res.ok) {
      setError(res.message)
      setIsLoading(false)
    } else {
      setTimeout(() => {
        navigate('/')
        setIsLoading(false)
      }, 1000)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row-reverse">
        {/* Sidebar kanan dengan form login */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-2/5 flex items-center justify-center p-4 sm:p-6 md:p-8 order-2 md:order-1">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-white/20">
              {/* Header dengan gradient */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-center relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="bg-white/20 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Brain size={32} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">PsyTestPro</h1>
                  <p className="text-green-100 mt-1">Masuk ke akun Anda</p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <form onSubmit={onSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <User size={16} className="mr-2 text-green-500" />
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-500" />
                      </div>
                      <input 
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/50"
                        placeholder="Masukkan username Anda"
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Lock size={16} className="mr-2 text-green-500" />
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-500" />
                      </div>
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/50"
                        placeholder="Masukkan password Anda"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-gray-500 hover:text-green-600 transition-colors" />
                        ) : (
                          <Eye size={18} className="text-gray-500 hover:text-green-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg py-3 font-semibold flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <LogIn size={18} className="mr-2" />
                        Masuk
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <Link 
                      to="/register" 
                      className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
                    >
                      Daftar sekarang
                    </Link>
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50/70 p-4 text-center border-t border-gray-200/30">
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} Psikotes Online. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar kiri dengan konten */}
        <div className="w-full md:w-1/2 lg:w-3/5 xl:w-3/5 flex bg-gradient-to-br from-green-500/10 to-emerald-500/10 items-center justify-center p-6 sm:p-8 md:p-12 relative overflow-hidden backdrop-blur-md order-1 md:order-2">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/5"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-green-900/10"></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"></div>
          
          <div className="text-center text-gray-800 max-w-lg relative z-10">
            {/* Ikon ilustratif */}
            <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-6 sm:mb-8">
              <div className="bg-white/20 p-3 sm:p-4 rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain size={30} className="sm:w-10 sm:h-10 text-green-600" />
              </div>
              <div className="bg-white/20 p-3 sm:p-4 rounded-full transform hover:scale-110 transition-transform duration-300 animation-delay-200 shadow-lg">
                <BarChart3 size={30} className="sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <div className="bg-white/20 p-3 sm:p-4 rounded-full transform hover:scale-110 transition-transform duration-300 animation-delay-400 shadow-lg">
                <Shield size={30} className="sm:w-10 sm:h-10 text-teal-600" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Tingkatkan Potensi Diri Anda</h2>
            <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Temukan kekuatan dan kelemahan Anda melalui serangkaian tes psikologi yang komprehensif. 
              Mulai perjalanan pengenalan diri Anda sekarang.
            </p>

            {/* Fitur-fitur */}
            <div className="space-y-3 sm:space-y-4 text-left mb-8 sm:mb-10">
              <div className="flex items-center bg-white/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-green-500 p-2 rounded-full mr-3 sm:mr-4 shadow-md">
                  <Sparkles size={14} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Tes Kognitif, Tes Kepribadian, Tes Minat Bakat, dan berbagai tes lainnya</span>
              </div>
              <div className="flex items-center bg-white/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-emerald-500 p-2 rounded-full mr-3 sm:mr-4 shadow-md">
                  <BarChart3 size={14} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Analisis Hasil Mendalam</span>
              </div>
              <div className="flex items-center bg-white/30 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-teal-500 p-2 rounded-full mr-3 sm:mr-4 shadow-md">
                  <Shield size={14} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base">Platform yang Aman dan Terpercaya</span>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white/30 rounded-xl border border-white/20 backdrop-blur-sm shadow-sm">
            <Quote className="mx-auto text-green-400/70 mb-2 sm:w-6 sm:h-6" size={20} />
              <p className="italic text-gray-700 text-base sm:text-lg">
                "Mengenal diri sendiri adalah awal dari semua kebijaksanaan."
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">- muttaqin</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}