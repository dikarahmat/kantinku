import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Lock, User, ArrowRight } from 'lucide-react'
import { Logo } from '../../components/Logo'

export default function AdminLogin() {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Kalau udah login, langsung redirect
  if (localStorage.getItem('kk-admin')) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handle = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (u === 'admin' && p === 'admin123') {
        localStorage.setItem('kk-admin', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Username atau password salah.')
      }
      setLoading(false)
    }, 700)
  }

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-hidden bg-[#0B0B0B]">
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&h=900&fit=crop" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#0B0B0B]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/60 via-transparent to-[#0B0B0B]/80" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm mb-10 transition-colors">
            ← Kembali ke Beranda
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center">
              <Logo size="sm" showText={false} />
            </div>
            <div>
              <p className="font-bold text-white text-base">KantinKu</p>
              <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">Selamat Datang</h1>
          <p className="text-white/40 text-sm mb-8">Masuk untuk mengelola kantin Anda</p>

          <div className="bg-[#111111]/90 backdrop-blur border border-white/8 rounded-2xl p-7">
            <form onSubmit={handle} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-2">Username</label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input value={u} onChange={e => { setU(e.target.value); setError('') }}
                    className="w-full bg-[#1A1A1A] border border-white/8 focus:border-yellow-400/40 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                    placeholder="admin" required />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-2">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input type="password" value={p} onChange={e => { setP(e.target.value); setError('') }}
                    className="w-full bg-[#1A1A1A] border border-white/8 focus:border-yellow-400/40 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                    placeholder="••••••••" required />
                </div>
              </div>
              {error && <p className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] mt-2">
                {loading ? 'Memverifikasi...' : <><span>Masuk ke Dashboard</span><ArrowRight size={14} /></>}
              </button>
              <p className="text-center text-white/20 text-xs pt-1">Demo: admin / admin123</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
