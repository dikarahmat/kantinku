import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { TrendingUp, ShoppingBag, CheckCircle, UtensilsCrossed, ArrowRight, Circle } from 'lucide-react'

const FOOD_IMGS = [
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=48&h=48&fit=crop',
]

const STATUS_CFG = {
  diterima: { label: 'Diterima', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  dimasak: { label: 'Dimasak', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  siap: { label: 'Siap Diambil', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  selesai: { label: 'Selesai', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  gagal: { label: 'Gagal', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
}

export default function AdminDashboard() {
  const { orders, menu, updateOrderStatus } = useData()
  const revenue = orders.reduce((s, o) => s + o.total, 0)
  const active = orders.filter(o => !['selesai', 'gagal'].includes(o.status))
  const done = orders.filter(o => o.status === 'selesai').length

  const stats = [
    { label: 'Total Pendapatan', value: `Rp ${(revenue / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', gold: true },
    { label: 'Pesanan Aktif', value: active.length, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
    { label: 'Selesai Hari Ini', value: done, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
    { label: 'Menu Tersedia', value: menu.filter(m => m.available).length, icon: UtensilsCrossed, color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
  ]

  return (
    <div className="max-w-6xl">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-white/30 text-sm uppercase tracking-wider mb-1">Selamat datang kembali</p>
        <h1 className="text-3xl font-bold">Dashboard <span className="text-yellow-400 italic font-light">Kantin Viktor</span></h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className={`bg-[#161616] border rounded-2xl p-5 ${s.gold ? 'border-yellow-400/15 bg-gradient-to-br from-yellow-400/5 to-transparent' : 'border-white/5'}`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${s.bg}`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className={`text-2xl font-black mb-1 ${s.gold ? 'text-yellow-400' : ''}`}>{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* LIVE ORDERS */}
      <div className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h2 className="font-bold">Monitor Pesanan Aktif</h2>
            <p className="text-white/30 text-xs mt-0.5">{active.length} pesanan sedang berjalan</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            LIVE
          </div>
        </div>

        {active.length === 0 ? (
          <div className="py-16 text-center text-white/20">
            <ShoppingBag size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">Belum ada pesanan aktif</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#0B0B0B] text-[10px] font-bold text-white/20 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">Order</th>
                  <th className="px-6 py-3 text-left">Menu</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {active.map((o, i) => {
                  const s = STATUS_CFG[o.status]
                  return (
                    <tr key={o.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={FOOD_IMGS[i % FOOD_IMGS.length]} alt="" className="w-9 h-9 rounded-lg object-cover" />
                          <div>
                            <p className="font-mono text-sm font-semibold">#{o.id.slice(-6)}</p>
                            <p className="text-white/30 text-xs">{new Date(o.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {o.items.slice(0, 2).map(item => (
                            <span key={item.id} className="text-xs bg-white/5 px-2 py-0.5 rounded-md text-white/60">{item.name} ×{item.qty}</span>
                          ))}
                          {o.items.length > 2 && <span className="text-xs text-white/30">+{o.items.length - 2}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-yellow-400 font-semibold text-sm">Rp {o.total.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.color}`}>{s.label}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {o.status === 'diterima' && <button onClick={() => updateOrderStatus(o.id, 'dimasak')} className="text-xs bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 hover:bg-yellow-400 hover:text-black px-3 py-1.5 rounded-lg font-semibold transition-all">Masak</button>}
                          {o.status === 'dimasak' && <button onClick={() => updateOrderStatus(o.id, 'siap')} className="text-xs bg-blue-400/10 border border-blue-400/20 text-blue-400 hover:bg-blue-400 hover:text-black px-3 py-1.5 rounded-lg font-semibold transition-all">Siap</button>}
                          {o.status === 'siap' && <button onClick={() => updateOrderStatus(o.id, 'selesai')} className="text-xs bg-green-400/10 border border-green-400/20 text-green-400 hover:bg-green-400 hover:text-black px-3 py-1.5 rounded-lg font-semibold transition-all">Selesai</button>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-3 border-t border-white/5">
          <Link to="/admin/orders" className="text-yellow-400 text-sm font-medium hover:text-yellow-300 flex items-center gap-1">
            Lihat semua pesanan <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
