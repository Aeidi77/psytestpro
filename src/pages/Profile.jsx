import { useState} from 'react'
import { useAuth } from '../state/AuthContext.jsx'
import { load, save } from '../utils/storage.jsx'
import { User, Lock, Eye, EyeOff, Save, Edit3, CheckCircle, UserCircle } from 'lucide-react'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [fullName, setFullName] = useState(user.fullName)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSaved, setIsSaved] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi'
    }
    
    if (!username.trim()) {
      newErrors.username = 'Username harus diisi'
    } else if (username.length < 3) {
      newErrors.username = 'Username minimal 3 karakter'
    }
    
    if (password) {
      if (password.length < 6) {
        newErrors.password = 'Password minimal 6 karakter'
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Konfirmasi password tidak sesuai'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveProfile = () => {
    if (!validateForm()) return
    
    const users = load('users', [])
    const userIndex = users.findIndex(u => u.id === user.id)
    
    if (userIndex !== -1) {
      const updatedUser = { 
        ...users[userIndex], 
        fullName, 
        username 
      }
      
      // Only update password if provided
      if (password) {
        updatedUser.password = password
      }
      
      users[userIndex] = updatedUser
      save('users', users)
      setUser(updatedUser)
      
      // Reset password fields
      setPassword('')
      setConfirmPassword('')
      
      // Show success message
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola Profil</h1>
        <p className="text-gray-600">Ubah informasi profil dan kata sandi akun Anda</p>
      </div>

      {/* Success Notification */}
      {isSaved && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Profil berhasil diperbarui!</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-center flex-col">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <UserCircle className="w-12 h-12" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{user.fullName}</h2>
              <p className="text-emerald-100">@{user.username}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Edit Profile Form */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Edit3 className="w-5 h-5 mr-2 text-green-600" />
              Edit Profil
            </h3>
            
            <div className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`} 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)} 
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
                  <input 
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`} 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Masukkan username"
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-green-600" />
              Ubah Kata Sandi
            </h3>
            <p className="text-sm text-gray-600 mb-4">Kosongkan jika tidak ingin mengubah kata sandi</p>
            
            <div className="space-y-4">
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Baru</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Masukkan kata sandi baru"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`} 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    placeholder="Konfirmasi kata sandi baru"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button 
              onClick={saveProfile} 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}