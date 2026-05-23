import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { ChevronRight, Clock, Zap } from 'lucide-react'

const CATEGORIES = [
  { key: 'nasi', label: 'Nasi', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop' },
  { key: 'mie', label: 'Mie', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop' },
  { key: 'minuman', label: 'Minuman', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
  { key: 'lauk', label: 'Lauk', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop' },
  { key: 'snack', label: 'Snack', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop' },
]

export default function Home() {
  const { menu, addToCart, orders, user } = useData()
  const [added, setAdded] = useState(null)
  const popular = menu.filter(m => m.available).slice(0, 3)
  const activeOrder = orders.find(o => !['selesai','gagal'].includes(o.status))

  const handleAdd = (item) => { addToCart(item); setAdded(item.id); setTimeout(() => setAdded(null), 800) }

  return (
    <div className="relative">
      {/* BACKGROUND HERO */}
      <div className="absolute inset-0 h-[600px] overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=900&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-[#0B0B0B]/60 to-[#0B0B0B]" />
        {/* subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/60 via-transparent to-[#0B0B0B]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* ACTIVE ORDER BANNER */}
        {activeOrder && (
          <Link to="/app/tracking" className="flex items-center justify-between bg-yellow-400/8 border border-yellow-400/20 rounded-xl px-5 py-4 mt-6 hover:bg-yellow-400/12 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400/15 rounded-full flex items-center justify-center"><Clock size={15} className="text-yellow-400" /></div>
              <div>
                <p className="text-yellow-400 font-semibold text-sm">Pesanan Aktif</p>
                <p className="text-white/40 text-xs">Estimasi {activeOrder.estimasi} menit · Tap untuk lihat status</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-yellow-400" />
          </Link>
        )}

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-8 py-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/8 border border-yellow-400/15 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Zap size={11} /> Pesan Sekarang, Makan Lebih Cepat
            </div>
            {user && (
              <p className="text-white text-4xl md:text-5xl font-black mb-1">Halo, {user.name.split(' ')[0]} 👋</p>
            )}
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Lapar melanda?<br />
              <span className="text-yellow-400">Ayo cari makan</span>
            </h1>
            <p className="text-white/40 text-base mb-8 leading-relaxed">Pilih menu, bayar, dan ambil saat sudah siap.</p>
            <div className="flex items-center gap-4">
              <Link to="/app/menu" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.2)]">Lihat Menu</Link>
              <Link to="/app/tracking" className="border border-white/10 hover:border-white/20 text-white/60 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-all">Cek Pesanan</Link>
            </div>
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/5">
              {[['500+','Mahasiswa'],['50+','Menu'],['< 15 mnt','Estimasi']].map(([v,l]) => (
                <div key={l}><p className="text-xl font-bold text-yellow-400">{v}</p><p className="text-white/30 text-xs mt-0.5">{l}</p></div>
              ))}
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            <div className="col-span-2 h-48 rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop" alt="" className="w-full h-full object-cover" /></div>
            <div className="h-36 rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop" alt="" className="w-full h-full object-cover" /></div>
            <div className="h-36 rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop" alt="" className="w-full h-full object-cover" /></div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Kategori Menu</h2>
            <Link to="/app/menu" className="text-yellow-400 text-sm font-medium hover:text-yellow-300 flex items-center gap-1">Lihat Semua <ChevronRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => (
              <Link key={cat.key} to={`/app/menu?cat=${cat.key}`} className="group relative rounded-2xl overflow-hidden aspect-square">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center pb-3">
                  <p className="font-bold text-sm">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* POPULAR */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Populer Sekarang</h2>
            <Link to="/app/menu" className="text-yellow-400 text-sm font-medium hover:text-yellow-300 flex items-center gap-1">Lihat Semua <ChevronRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popular.map(item => (
              <div key={item.id} className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-400/20 transition-all group">
                <div className="h-40 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <p className="font-semibold mb-1">{item.name}</p>
                  <p className="text-white/30 text-xs mb-3 line-clamp-1">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                    <button onClick={() => handleAdd(item)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${added === item.id ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black hover:bg-yellow-300'}`}>
                      {added === item.id ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
