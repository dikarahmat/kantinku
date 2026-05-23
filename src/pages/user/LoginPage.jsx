import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
// 1. IMPORT KOMPONEN LOGO KITA DI SINI
import { Logo } from '../../components/Logo'

export default function LoginPage() {
  const { login } = useData()
  const navigate = useNavigate()
  const [nim, setNim] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (login(nim, pass)) { navigate('/app') }
      else { setError('NIM atau password salah. Demo: 24101140123 / 123456') }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=900&fit=crop" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0B0B0B]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/60 via-transparent to-[#0B0B0B]/80" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 border-b border-white/5 bg-[#0B0B0B]/60 backdrop-blur px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/">
          {/* 2. GANTI STRUKTUR LAMA PAKE KOMPONEN LOGO */}
          <Logo size="md" showText={true} />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/40">
          <a href="#">Menu</a><a href="#">Promo</a><a href="#">Tentang Kami</a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40 px-4 py-2">Masuk</span>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-5 py-2 rounded-full transition-all">Daftar</button>
        </div>
      </nav>

      {/* LOGIN BOX CONTAINER */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            {/* 3. UBAH DI SINI JUGA BIAR LOGO TENGAH MUNCUL RAPI */}
            <div className="w-16 h-16 bg-[#1A1A1A]/80 backdrop-blur border border-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Masuk ke <span className="text-yellow-400">KantinKu</span></h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mx-auto" />
          </div>

          <div className="bg-[#111111]/90 backdrop-blur border border-white/8 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handle} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-2">NIM / EMAIL</label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input value={nim} onChange={e => { setNim(e.target.value); setError('') }}
                    className="w-full bg-[#1A1A1A] border border-white/8 focus:border-yellow-400/40 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                    placeholder="24101140123" required />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider">PASSWORD</label>
                  <button type="button" className="text-xs text-yellow-400 hover:text-yellow-300">Lupa?</button>
                </div>
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                  <input type={showPass ? 'text' : 'password'} value={pass} onChange={e => { setPass(e.target.value); setError('') }}
                    className="w-full bg-[#1A1A1A] border border-white/8 focus:border-yellow-400/40 rounded-xl pl-10 pr-12 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                    placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              {error && <p className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                {loading ? 'Memverifikasi...' : <><span>Masuk</span><ArrowRight size={15} /></>}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-white/20 text-xs uppercase tracking-wider">atau</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/8 hover:border-yellow-400/20 rounded-xl py-3 text-sm font-medium text-white/60 hover:text-white transition-all">
                <span>🔵</span> Masuk dengan Google
              </button>
            </form>
          </div>
          <p className="text-center text-white/20 text-xs mt-6">
            Belum punya akun? <a href="#" className="text-yellow-400/70 hover:text-yellow-400">Daftar Sekarang</a>
          </p>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/5 bg-[#0B0B0B]/60 backdrop-blur py-5 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/20 text-xs">© 2026 KantinKu – Universitas Indonesia Maju</p>
        <div className="flex gap-5 text-white/20 text-xs">
          {['Syarat & Ketentuan','Pusat Bantuan','Privasi','Kontak'].map(l => (
            <a key={l} href="#" className="hover:text-white/40 transition-colors">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}