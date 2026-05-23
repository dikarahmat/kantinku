import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { Search, X, Plus } from 'lucide-react'

const TABS = [
  { val: 'nasi', label: 'Nasi' },
  { val: 'mie', label: 'Mie' },
  { val: 'lauk', label: 'Lauk' },
  { val: 'snack', label: 'Snack' },
  { val: 'minuman', label: 'Minuman' },
]

function MenuDetailModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1)
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="h-52 overflow-hidden relative">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all">
            <X size={15} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#161616] to-transparent" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-white">{item.name}</h3>
            <span className="text-yellow-400 font-black text-lg ml-3">Rp {item.price.toLocaleString('id-ID')}</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed mb-5">{item.desc}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2">
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-bold text-lg">−</button>
              <span className="font-bold w-5 text-center">{qty}</span>
              <button onClick={() => setQty(q => q+1)} className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-bold text-lg">+</button>
            </div>
            <button onClick={() => { for(let i=0;i<qty;i++) onAdd(item); onClose() }}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
              <Plus size={16} /> Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const { menu, addToCart } = useData()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('cat') || 'nasi')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [added, setAdded] = useState(null)

  const handleAdd = (e, item) => {
    e.stopPropagation()
    addToCart(item)
    setAdded(item.id)
    setTimeout(() => setAdded(null), 1000)
  }

  const filtered = menu.filter(m => {
    const matchTab = m.category === tab
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch && m.available
  })

  return (
    <div className="relative">
      {/* BACKGROUND HEADER */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=500&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/30 via-[#0B0B0B]/60 to-[#0B0B0B]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-10">
          <h1 className="text-4xl font-black mb-2">Menu Kami</h1>
          <p className="text-white/40">Pilih menu favoritmu dan pesan sekarang</p>
        </div>
      </div>

      {/* KONTEN */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        {/* SEARCH */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
          <input className="w-full bg-[#161616] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-yellow-400/30 transition-colors"
            placeholder="Cari menu..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* TABS */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {TABS.map(t => (
            <button key={t.val} onClick={() => setTab(t.val)}
              className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.val ? 'bg-yellow-400 text-black' : 'bg-[#161616] border border-white/5 text-white/40 hover:text-white'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/20"><p className="text-4xl mb-3">🍽️</p><p>Menu tidak ditemukan</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-400/20 transition-all group cursor-pointer"
                onClick={() => setSelectedItem(item)}>
                <div className="h-40 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="font-semibold mb-1 text-white">{item.name}</p>
                  <p className="text-white/30 text-xs mb-3 line-clamp-2">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">Rp {item.price.toLocaleString('id-ID')}</span>
                    <button onClick={e => handleAdd(e, item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                        added === item.id
                          ? 'bg-green-500 text-white scale-110'
                          : 'bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-105 active:scale-95'
                      }`}>
                      {added === item.id ? '✓ Ditambah!' : '+ Keranjang'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && <MenuDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onAdd={addToCart} />}
    </div>
  )
}
