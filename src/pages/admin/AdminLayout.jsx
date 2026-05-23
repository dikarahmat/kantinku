import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, LogOut, Menu, X, UserCircle } from 'lucide-react'
import { Logo } from '../../components/Logo'

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Pesanan Masuk', icon: ShoppingBag },
  { to: '/admin/menu', label: 'Kelola Menu', icon: UtensilsCrossed },
  { to: '/admin/profile', label: 'Profil Kantin', icon: UserCircle },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoggedIn = localStorage.getItem('kk-admin')

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  const logout = () => {
    localStorage.removeItem('kk-admin')
    navigate('/admin/login', { replace: true })
  }

  const isActive = (to) => location.pathname.startsWith(to)

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex text-white">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex w-60 flex-col bg-[#0F0F0F] border-r border-white/5 sticky top-0 h-screen">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <p className="font-bold text-sm text-white">KantinKu</p>
              <p className="text-yellow-400 text-[10px] font-bold tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          <p className="text-[10px] font-bold text-white/20 tracking-widest uppercase px-3 py-2.5">Navigasi</p>
          {NAV.map(n => (
            <Link key={n.to} to={n.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(n.to) ? 'bg-yellow-400/10 text-yellow-400 border-l-2 border-yellow-400 pl-[10px]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <n.icon size={16} />{n.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold text-sm">V</div>
            <div>
              <p className="text-sm font-semibold text-white">Pak Viktor</p>
              <p className="text-white/30 text-xs">Pemilik Kantin</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut size={14} />Keluar
          </button>
        </div>
      </aside>

      {/* NAVBAR ATAS MOBILE */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F] border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" showText={false} />
          <div>
            <p className="font-bold text-sm text-white">KantinKu</p>
            <p className="text-yellow-400 text-[10px] font-bold tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-white/60">
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* SIDEBAR MOBILE */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/70" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 h-full bg-[#0F0F0F] p-4 space-y-1 pt-16" onClick={e => e.stopPropagation()}>
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${isActive(n.to) ? 'bg-yellow-400/10 text-yellow-400' : 'text-white/40'}`}>
                <n.icon size={15} />{n.label}
              </Link>
            ))}
            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-3 text-red-400/60 text-sm mt-4">
              <LogOut size={14} />Keluar
            </button>
          </div>
        </div>
      )}

      {/* KONTEN UTAMA */}
      <main className="flex-1 min-w-0 p-6 md:p-8 mt-14 md:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
