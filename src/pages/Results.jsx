import { load } from '../utils/storage.jsx'
import { useAuth } from '../state/AuthContext.jsx'

export default function Results() {
  const { user } = useAuth()
  const all = load('results', [])
  const list = user.role === 'admin' ? all : all.filter(r => r.userId === user.id)
  const users = load('users', [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Hasil Tes</h2>
          <p className="text-slate-600 mt-2">Lihat riwayat dan hasil tes psikologis Anda</p>
        </div>
        {list.length > 0 && (
          <div className="mt-4 md:mt-0">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {list.length} {list.length === 1 ? 'hasil' : 'hasil'}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Nama</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Tes</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Skor</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Tanggal</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map(r => {
                const userData = users.find(u => u.id === r.userId)
                const percentage = (r.score / r.total) * 100
                let statusColor = 'bg-red-100 text-red-800'
                
                if (percentage >= 80) {
                  statusColor = 'bg-green-100 text-green-800'
                } else if (percentage >= 60) {
                  statusColor = 'bg-yellow-100 text-yellow-800'
                }
                
                return (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">
                          {user.role === 'admin' ? (userData?.fullName || '-') : '-'}
                        </p>
                        {user.role === 'admin' && userData?.email && (
                          <p className="text-sm text-slate-500">{userData.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800">{r.testTitle}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-semibold text-slate-800 mr-2">{r.score}/{r.total}</span>
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              percentage >= 80 ? 'bg-green-500' : 
                              percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-slate-800">{new Date(r.takenAt).toLocaleDateString('id-ID')}</p>
                        <p className="text-sm text-slate-500">{new Date(r.takenAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                        {percentage >= 80 ? 'Tinggi' : percentage >= 60 ? 'Sedang' : 'Rendah'}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {list.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-slate-100 p-4 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-700 mb-1">Belum ada hasil tes</h3>
                    <p className="text-slate-500">Hasil tes akan muncul di sini setelah menyelesaikan suatu tes.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {list.length > 0 && (
          <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
            <p className="text-sm text-slate-600">
              Menampilkan {list.length} dari {all.length} hasil
            </p>
          </div>
        )}
      </div>
    </div>
  )
}