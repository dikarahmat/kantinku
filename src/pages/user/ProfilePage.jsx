import { useData } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, Package, User, Mail, Hash, Clock } from 'lucide-react'

export default function ProfilePage() {
  const { user, orders, logout } = useData()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }
  const totalSpend = orders.reduce((s, o) => s + o.total, 0)
  const doneOrders = orders.filter(o => o.status === 'selesai')

  if (!user) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <User size={48} className="mx-auto text-white/15 mb-4" />
      <p className="text-white/40 mb-4">Kamu belum login</p>
      <button onClick={() => navigate('/login')} className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl">Login</button>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-bold mb-8">Profil Saya</h1>

      {/* PROFILE CARD */}
      <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 mb-5 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 font-black text-2xl flex-shrink-0">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-white/40 text-sm mt-0.5">{user.nim}</p>
          <span className="inline-flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold px-2.5 py-1 rounded-full mt-2">
            Anggota Aktif
          </span>
        </div>
      </div>

      {/* INFO */}
      <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 mb-5">
        <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-4">Informasi Akun</h3>
        <div className="space-y-3">
          {[
            [User, 'Nama Lengkap', user.name],
            [Hash, 'NIM', user.nim],
            [Mail, 'Email', `${user.nim.toLowerCase()}@uim.ac.id`],
          ].map(([Icon, label, value]) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-white/40" />
              </div>
              <div>
                <p className="text-white/30 text-xs">{label}</p>
                <p className="text-white text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          [orders.length, 'Total Pesanan'],
          [doneOrders.length, 'Selesai'],
          [`Rp ${(totalSpend/1000).toFixed(0)}K`, 'Total Belanja'],
        ].map(([val, label]) => (
          <div key={label} className="bg-[#161616] border border-white/5 rounded-2xl p-4 text-center">
            <p className="text-xl font-black text-yellow-400">{val}</p>
            <p className="text-white/30 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      {orders.length > 0 && (
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 mb-5">
          <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-4">Riwayat Pesanan</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package size={14} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-mono">#{order.id.slice(-6)}</p>
                    <p className="text-white/30 text-xs">{order.items.length} item · {new Date(order.time).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold text-sm">Rp {order.total.toLocaleString('id-ID')}</p>
                  <span className={`text-xs font-semibold ${order.status === 'selesai' ? 'text-green-400' : 'text-yellow-400'}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border border-red-400/20 bg-red-400/5 hover:bg-red-400/10 text-red-400 font-semibold py-3.5 rounded-xl transition-all text-sm">
        <LogOut size={15} /> Keluar dari Akun
      </button>
    </div>
  )
}
