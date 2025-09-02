import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Tests from './pages/Tests.jsx'
import TestTake from './pages/TestTake.jsx'
import Results from './pages/Results.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './state/AuthContext.jsx'

export default function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Header />}
      <main className="flex-1 py-6">
        <Routes>
          <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          } />

          <Route path="/tests" element={
            <ProtectedRoute>
              <Tests />
            </ProtectedRoute>
          } />

          <Route path="/tests/:id" element={
            <ProtectedRoute role="user">
              <TestTake />
            </ProtectedRoute>
          } />

          <Route path="/results" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  )
}
