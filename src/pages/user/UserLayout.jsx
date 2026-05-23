import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { ShoppingCart, Home, UtensilsCrossed, MapPin, Menu, X, LogOut, User } from 'lucide-react'
import { Logo } from '../../components/Logo'

export default function UserLayout() {
  const { cartCount, user, logout } = useData()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenu, setMobileMenu] = useState(false)

  const navLinks = [
    { to: '/app', label: 'Beranda', icon: Home, exact: true },
    { to: '/app/menu', label: 'Menu', icon: UtensilsCrossed },
    { to: '/app/tracking', label: 'Pesanan', icon: MapPin },
    { to: '/app/profile', label: 'Profil', icon: User },
  ]

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path)
  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <nav className="sticky top-0 z-50 bg-[#0B0B0B]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/app"><Logo size="md" /></Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(n => (
                <Link key={n.to} to={n.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(n.to, n.exact) ? 'bg-yellow-400/10 text-yellow-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Link to="/app/cart" className="relative p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-black text-[10px] font-black rounded-full flex items-center justify-center">{cartCount}</span>}
              </Link>
              <button className="md:hidden p-2 hover:bg-white/5 rounded-lg" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-white/5 bg-[#0B0B0B] px-4 py-3 flex flex-col gap-1">
            {navLinks.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${isActive(n.to, n.exact) ? 'bg-yellow-400/10 text-yellow-400' : 'text-white/50'}`}>
                <n.icon size={15} />{n.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-sm text-red-400/60"><LogOut size={14} />Keluar</button>
          </div>
        )}
      </nav>
      <main><Outlet /></main>
      <footer className="border-t border-white/5 py-6 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <p className="text-white/20 text-sm">Pesan Makan, Tanpa Antre</p>
          <Link to="/admin/login" className="text-white/15 hover:text-yellow-400/50 text-xs transition-colors">Admin Panel →</Link>
        </div>
      </footer>
    </div>
  )
}
