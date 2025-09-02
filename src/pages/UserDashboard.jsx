import { Link } from 'react-router-dom'
import { load } from '../utils/storage.jsx'
import { useAuth } from '../state/AuthContext.jsx'
import { FileText, BarChart3, User, Clock, Award, Brain } from 'lucide-react'

export default function UserDashboard() {
  const { user } = useAuth()
  const tests = load('tests', [])
  const results = load('results', []).filter(r => r.userId === user.id)
  
  // Hitung tes yang sedang berjalan (jika ada)
  const ongoingTests = results.filter(r => r.status === 'in-progress').length
  // Hitung tes yang telah diselesaikan
  const completedTests = results.filter(r => r.status === 'completed').length

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Halo, {user.fullName}!</h2>
            <p className="text-emerald-100 mt-2">Selamat datang kembali di dashboard Anda</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white/20 p-3 rounded-full">
            <Brain size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mulai Tes Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="p-6">
            <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mulai Tes</h3>
            <p className="text-gray-600 mb-4">Tersedia {tests.length} tes untuk mengembangkan potensi Anda.</p>
            <Link 
              to="/tests" 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              Lihat Tes
            </Link>
          </div>
        </div>

        {/* Hasil Saya Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="p-6">
            <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Hasil Saya</h3>
            <p className="text-gray-600 mb-4">Anda memiliki {results.length} hasil tes yang dapat dianalisis.</p>
            <Link 
              to="/results" 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              Lihat Hasil
            </Link>
          </div>
        </div>

        {/* Profil Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="p-6">
            <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <User size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Profil</h3>
            <p className="text-gray-600 mb-4">Kelola informasi akun dan preferensi pengguna Anda.</p>
            <Link 
              to="/profile" 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              Lihat Profil
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity (jika ada) */}
      {results.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {results.slice(0, 3).map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <Award size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{result.testName || "Tes Psikologi"}</p>
                    <p className="text-sm text-gray-600">Diselesaikan: {new Date(result.completedAt || Date.now()).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {result.score ? `Skor: ${result.score}` : 'Selesai'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white text-center mt-14">
        <p className="text-lg italic">"Pengenalan diri adalah awal dari semua kebijaksanaan."</p>
        <p className="text-sm mt-2">- Aristotle</p>
      </div>
    </div>
  )
}