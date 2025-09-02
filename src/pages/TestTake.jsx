import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { load, save } from '../utils/storage.jsx'
import { useAuth } from '../state/AuthContext.jsx'
import { ArrowLeft, Clock, Brain, AlertCircle } from 'lucide-react'

export default function TestTake() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const test = useMemo(() => load('tests', []).find(t => t.id === id), [id])
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)

  if (!test) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tes tidak ditemukan</h2>
        <p className="text-gray-600 mb-6">Tes yang Anda cari tidak tersedia atau telah dihapus.</p>
        <button 
          onClick={() => navigate('/tests')}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Kembali ke Daftar Tes
        </button>
      </div>
    </div>
  )

  const submit = () => {
    // simple scoring: +1 for correct
    let score = 0
    test.questions.forEach((q, idx) => {
      if (Number(answers[q.id]) === Number(q.answer)) score++
    })
    const result = {
      id: crypto.randomUUID(),
      userId: user.id,
      testId: test.id,
      testTitle: test.title,
      takenAt: new Date().toISOString(),
      total: test.questions.length,
      score
    }
    const results = load('results', [])
    results.push(result)
    save('results', results)
    navigate('/results')
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/tests')}
          className="flex items-center text-green-600 hover:text-green-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <Brain className="w-4 h-4 mr-1" />
            <span>{currentQuestion + 1} / {test.questions.length}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{Math.ceil(test.questions.length * 1.5)} menit</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Test Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div>
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-4">
            {test.category}
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{test.title}</h2>
          <p className="text-gray-600">Jawab semua soal dengan jujur sesuai dengan kondisi Anda</p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h4 className="font-semibold text-lg text-gray-800 mb-4">
            #{currentQuestion + 1} {test.questions[currentQuestion].text}
          </h4>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {test.questions[currentQuestion].options.map((opt, i) => (
              <label 
                key={i} 
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${
                  Number(answers[test.questions[currentQuestion].id]) === i 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <input 
                  type="radio" 
                  name={test.questions[currentQuestion].id} 
                  checked={Number(answers[test.questions[currentQuestion].id]) === i} 
                  onChange={() => {
                    setAnswers(a => ({ ...a, [test.questions[currentQuestion].id]: i }))
                    // Auto-advance to next question after selection
                    setTimeout(() => {
                      if (currentQuestion < test.questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1)
                      }
                    }, 300)
                  }}
                  className="hidden"
                />
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                  Number(answers[test.questions[currentQuestion].id]) === i 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-400'
                }`}>
                  {Number(answers[test.questions[currentQuestion].id]) === i && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button 
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentQuestion === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sebelumnya
        </button>
        
        <div className="flex items-center space-x-2">
          {test.questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-2 h-2 rounded-full ${
                currentQuestion === idx 
                  ? 'bg-green-500' 
                  : answers[test.questions[idx].id] !== undefined 
                    ? 'bg-green-300' 
                    : 'bg-gray-300'
              }`}
              aria-label={`Pertanyaan ${idx + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={() => {
            if (currentQuestion < test.questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1)
            } else {
              // Last question, show submit confirmation
              if (window.confirm('Apakah Anda yakin ingin mengumpulkan jawaban? Pastikan Anda telah menjawab semua soal.')) {
                submit()
              }
            }
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {currentQuestion < test.questions.length - 1 ? 'Selanjutnya' : 'Kumpulkan Jawaban'}
        </button>
      </div>
    </div>
  )
}