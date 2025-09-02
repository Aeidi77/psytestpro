import { useEffect, useMemo, useState } from 'react'
import { load, save, uid } from '../utils/storage.jsx'
import { useAuth } from '../state/AuthContext.jsx'
import { Search, Filter, Plus, Edit, Trash2, BarChart3, Users, FileText, Brain, X, ChevronDown, ChevronUp, Award } from 'lucide-react'

const headers = [
  { key: 'title', label: 'Judul' },
  { key: 'category', label: 'Kategori' },
  { key: 'questions', label: 'Jumlah Soal' },
  { key: 'actions', label: 'Aksi' }
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const [tests, setTests] = useState(load('tests', []))
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: 'title', dir: 'asc' })
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ id: '', title: '', category: 'Kognitif', questions: [] })
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  useEffect(() => { save('tests', tests) }, [tests])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    let out = tests.filter(t => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
    out.sort((a, b) => {
      const A = a[sort.key], B = b[sort.key]
      if (A < B) return sort.dir === 'asc' ? -1 : 1
      if (A > B) return sort.dir === 'asc' ? 1 : -1
      return 0
    })
    return out
  }, [tests, query, sort])

  const openCreate = () => { setForm({ id: '', title: '', category: 'Kognitif', questions: [] }); setModalOpen(true) }
  const openEdit = (t) => { setForm(JSON.parse(JSON.stringify(t))); setModalOpen(true) }
  const remove = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tes ini?')) {
      setTests(t => t.filter(x => x.id !== id))
    }
  }

  const addQuestion = () => {
    setForm(f => ({
      ...f,
      questions: [...f.questions, { id: uid(), text: '', options: ['','','',''], answer: 0 }]
    }))
  }
  
  const updateQuestion = (qid, patch) => {
    setForm(f => ({ ...f, questions: f.questions.map(q => q.id === qid ? { ...q, ...patch } : q)}))
  }
  
  const removeQuestion = (qid) => {
    if (form.questions.length <= 1) {
      alert('Tes harus memiliki minimal 1 soal')
      return
    }
    setForm(f => ({ ...f, questions: f.questions.filter(q => q.id !== qid) }))
  }

  const addOption = (qid) => {
    setForm(f => ({
      ...f,
      questions: f.questions.map(q => 
        q.id === qid ? { ...q, options: [...q.options, ''] } : q
      )
    }))
  }

  const removeOption = (qid, index) => {
    setForm(f => ({
      ...f,
      questions: f.questions.map(q => {
        if (q.id === qid) {
          const newOptions = q.options.filter((_, i) => i !== index)
          // Adjust answer if needed
          let newAnswer = q.answer
          if (index === q.answer) newAnswer = 0
          else if (index < q.answer) newAnswer = q.answer - 1
          
          return { ...q, options: newOptions, answer: newAnswer }
        }
        return q
      })
    }))
  }

  const saveForm = () => {
    if (!form.title.trim()) return alert('Judul tidak boleh kosong')
    if (form.questions.length === 0) return alert('Minimal 1 soal')
    
    // Validate all questions
    for (let i = 0; i < form.questions.length; i++) {
      const q = form.questions[i]
      if (!q.text.trim()) return alert(`Soal #${i+1} harus diisi`)
      if (q.options.some(opt => !opt.trim())) return alert(`Semua opsi pada soal #${i+1} harus diisi`)
    }
    
    if (form.id) {
      setTests(prev => prev.map(t => t.id === form.id ? form : t))
    } else {
      setTests(prev => [...prev, { ...form, id: uid() }])
    }
    setModalOpen(false)
  }

  // Stats for dashboard
  const totalTests = tests.length
  const totalQuestions = tests.reduce((acc, test) => acc + test.questions.length, 0)
  const categories = [...new Set(tests.map(t => t.category))]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-600 mt-1">Halo, {user.fullName}. Kelola tes psikotes, buat soal, dan lihat hasil peserta.</p>
        </div>
        <button 
          onClick={openCreate} 
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Buat Tes Baru
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800 font-medium">Total Tes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalTests}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-5 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-800 font-medium">Total Soal</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalQuestions}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-800 font-medium">Kategori Tes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{categories.length}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                placeholder="Cari judul atau kategori..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
              />
            </div>
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="w-full md:w-auto flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                {sort.dir === 'asc' ? '↑ ' : '↓ '}
                {headers.find(h => h.key === sort.key)?.label}
              </span>
              {sortDropdownOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </button>
            
            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {headers.filter(h => h.key !== 'actions').map(header => (
                  <div key={header.key}>
                    <button
                      onClick={() => {
                        setSort({ key: header.key, dir: 'asc' })
                        setSortDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                    >
                      {header.label} ↑
                    </button>
                    <button
                      onClick={() => {
                        setSort({ key: header.key, dir: 'desc' })
                        setSortDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                    >
                      {header.label} ↓
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {headers.map(h => (
                  <th key={h.key} className="text-left py-4 px-6 font-semibold text-gray-700">
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">{t.title}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">{t.questions.length}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openEdit(t)} 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Tes"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => remove(t.id)} 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Tes"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={headers.length} className="py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Tidak ada tes yang ditemukan</p>
                    {query && (
                      <button 
                        onClick={() => setQuery('')} 
                        className="text-green-600 hover:text-green-800 mt-2 text-sm font-medium"
                      >
                        Hapus pencarian
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit Test */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">{form.id ? 'Edit Tes' : 'Buat Tes Baru'}</h3>
              <button 
                onClick={() => setModalOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Tes</label>
                  <input 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    value={form.title} 
                    onChange={e => setForm({ ...form, title: e.target.value })} 
                    placeholder="Masukkan judul tes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                    value={form.category} 
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="Kognitif">Kognitif</option>
                    <option value="Kepribadian">Kepribadian</option>
                    <option value="Logika">Logika</option>
                    <option value="Numerik">Numerik</option>
                    <option value="Verbal">Verbal</option>
                    <option value="Emosional">Emosional</option>
                    <option value="Minat Bakat">Minat Bakat</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Daftar Soal</h4>
                  <button 
                    onClick={addQuestion} 
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah Soal
                  </button>
                </div>

                <div className="space-y-4">
                  {form.questions.map((q, idx) => (
                    <div key={q.id} className="border rounded-xl p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Soal #{idx+1}</span>
                        <button 
                          onClick={() => removeQuestion(q.id)} 
                          className="text-red-600 hover:text-red-800 text-sm flex items-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Hapus
                        </button>
                      </div>
                      
                      <textarea 
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                        placeholder="Teks soal..." 
                        rows="2"
                        value={q.text} 
                        onChange={e => updateQuestion(q.id, { text: e.target.value })}
                      />
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Opsi Jawaban</label>
                          <button 
                            onClick={() => addOption(q.id)} 
                            className="text-green-600 hover:text-green-800 text-sm flex items-center transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Tambah Opsi
                          </button>
                        </div>
                        
                        <div className="grid gap-2">
                          {q.options.map((opt, i) => (
                            <div key={i} className="flex items-center">
                              <input 
                                type="radio" 
                                checked={q.answer === i}
                                onChange={() => updateQuestion(q.id, { answer: i })}
                                className="mr-2 text-green-500 focus:ring-green-500"
                              />
                              <input 
                                className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                                placeholder={`Opsi ${i+1}`} 
                                value={opt}
                                onChange={e => updateQuestion(q.id, { 
                                  options: q.options.map((o, oi) => oi === i ? e.target.value : o) 
                                })}
                              />
                              {q.options.length > 2 && (
                                <button 
                                  onClick={() => removeOption(q.id, i)} 
                                  className="ml-2 p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-3 flex items-center">
                          <span className="text-sm text-gray-600 mr-2">Jawaban benar:</span>
                          <select 
                            className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                            value={q.answer} 
                            onChange={e => updateQuestion(q.id, { answer: Number(e.target.value) })}
                          >
                            {q.options.map((_, i) => (
                              <option key={i} value={i}>Opsi {i+1}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button 
                onClick={() => setModalOpen(false)} 
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={saveForm} 
                className="px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
              >
                Simpan Tes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}