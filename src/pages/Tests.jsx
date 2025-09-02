import { Link } from 'react-router-dom'
import { load } from '../utils/storage.jsx'
import { useMemo, useState} from 'react'
import { useAuth } from '../state/AuthContext.jsx'
import { Search, Filter, SortAsc, Brain, Clock, BarChart3, Play, Star, Users, Award, ChevronDown, X } from 'lucide-react'

export default function Tests() {
  const { user } = useAuth()
  const testsAll = load('tests', [])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [sort, setSort] = useState('title:asc')
  const [showFilters, setShowFilters] = useState(false)

  const tests = useMemo(() => {
    const query = q.toLowerCase()
    let list = testsAll.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.category.toLowerCase().includes(query) ||
      t.description?.toLowerCase().includes(query)
    )
    if (cat) list = list.filter(t => t.category === cat)
    const [k, d] = sort.split(':')
    list.sort((a, b) => {
      const A = k === 'questions' ? a.questions.length : a[k]
      const B = k === 'questions' ? b.questions.length : b[k]
      if (A < B) return d === 'asc' ? -1 : 1
      if (A > B) return d === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [testsAll, q, cat, sort])

  // Get unique categories
  const categories = [...new Set(testsAll.map(t => t.category))].sort()

  // Calculate completion status for each test
  const results = load('results', [])
  const userResults = results.filter(r => r.userId === user.id)

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Koleksi Tes Psikologi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Temukan tes yang tepat untuk mengembangkan potensi diri dan memahami kepribadian Anda lebih dalam</p>
      </div>

      {/* Stats Overview - Hanya untuk user, bukan admin */}
      {user.role === 'user' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 font-medium">Total Tes Tersedia</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{testsAll.length}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800 font-medium">Tes Diselesaikan</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{userResults.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-5 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-800 font-medium">Rata-rata Skor</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {userResults.length > 0 
                    ? Math.round(userResults.reduce((acc, curr) => acc + (curr.score / curr.total * 100), 0) / userResults.length) 
                    : 0}%
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Toggle for Mobile */}
      <div className="md:hidden">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm p-4 border border-gray-200"
        >
          <span className="font-medium text-gray-700">Filter & Urutkan</span>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Section */}
      <div className={`bg-white rounded-2xl shadow-lg p-6 mb-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Filter Pencarian</h3>
          <button 
            onClick={() => { setQ(''); setCat(''); setSort('title:asc'); }}
            className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Reset Filter
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Tes</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                placeholder="Judul, kategori, atau deskripsi..." 
                value={q} 
                onChange={e => setQ(e.target.value)} 
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white transition-colors" 
                value={cat} 
                onChange={e => setCat(e.target.value)}
              >
                <option value="">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white transition-colors" 
                value={sort} 
                onChange={e => setSort(e.target.value)}
              >
                <option value="title:asc">Judul (A-Z)</option>
                <option value="title:desc">Judul (Z-A)</option>
                <option value="category:asc">Kategori (A-Z)</option>
                <option value="category:desc">Kategori (Z-A)</option>
                <option value="questions:asc">Jumlah Soal (Sedikit)</option>
                <option value="questions:desc">Jumlah Soal (Banyak)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="text-gray-600">
          Menampilkan <span className="font-semibold text-green-600">{tests.length}</span> dari <span className="font-semibold">{testsAll.length}</span> tes
        </p>
        
        <div className="flex items-center gap-2">
          {(q || cat) && (
            <button 
              onClick={() => { setQ(''); setCat(''); }}
              className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Hapus Filter
            </button>
          )}
          
          {user.role === 'admin' && (
            <Link 
              to="/tests/create"
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            >
              + Tambah Tes Baru
            </Link>
          )}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map(t => {
          const userTestResult = userResults.find(r => r.testId === t.id)
          const completionStatus = userTestResult 
            ? `Diselesaikan: ${Math.round((userTestResult.score / userTestResult.total) * 100)}%` 
            : 'Belum dikerjakan'
            
          return (
          <div key={t.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
            <div className="p-6 flex-grow">
              {/* Category Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {t.category}
                </span>
                {userTestResult && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    <Award className="w-3 h-3 mr-1" />
                    Selesai
                  </span>
                )}
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-xl text-gray-800 mb-3 line-clamp-2">{t.title}</h3>
              
              {/* Description */}
              {t.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {t.description}
                </p>
              )}
              
              {/* Progress bar for completed tests */}
              {userTestResult && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((userTestResult.score / userTestResult.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(userTestResult.score / userTestResult.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-1" />
                  <span>{t.questions.length} soal</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{Math.ceil(t.questions.length * 1.5)} menit</span>
                </div>
              </div>
              
              {/* Completion Status */}
              <div className="text-xs text-gray-500 mb-4">
                {completionStatus}
              </div>
              
              {/* Action Button */}
              <div className="mt-auto">
                {user.role === 'user' ? (
                  <Link 
                    to={`/tests/${t.id}`} 
                    className="w-full inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {userTestResult ? 'Lihat Hasil' : 'Mulai Tes'}
                  </Link>
                ) : (
                  <div className="text-center py-3 px-4 bg-gray-100 text-gray-500 rounded-lg text-sm">
                    Masuk sebagai pengguna untuk mengikuti tes
                  </div>
                )}
              </div>
            </div>
          </div>
        )})}
        
        {/* Empty State */}
        {tests.length === 0 && (
          <div className="col-span-full text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada tes yang ditemukan</h3>
            <p className="text-gray-500 mb-4">Coba ubah filter pencarian Anda atau hapus filter yang aktif</p>
            <button 
              onClick={() => { setQ(''); setCat(''); setSort('title:asc'); }}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Hapus Semua Filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}