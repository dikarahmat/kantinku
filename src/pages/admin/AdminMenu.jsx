import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const CATEGORY_IMGS = {
  nasi: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=250&fit=crop'],
  mie: ['https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=250&fit=crop'],
  lauk: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=250&fit=crop'],
  snack: ['https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=400&h=250&fit=crop'],
  minuman: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=250&fit=crop'],
}

const EMPTY = { name: '', category: 'nasi', price: '', desc: '', available: true, img: '' }

export default function AdminMenu() {
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem } = useData()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [filter, setFilter] = useState('semua')

  const filtered = filter === 'semua' ? menu : menu.filter(m => m.category === filter)

  const getImg = (item, index) => {
    if (item.img) return item.img
    const imgs = CATEGORY_IMGS[item.category] || CATEGORY_IMGS.nasi
    return imgs[index % imgs.length]
  }

  const submit = (e) => {
    e.preventDefault()
    const item = { ...form, price: parseInt(form.price) }
    if (!item.img) {
      const imgs = CATEGORY_IMGS[item.category] || CATEGORY_IMGS.nasi
      item.img = imgs[0]
    }
    if (editId) { updateMenuItem(editId, item); setEditId(null) }
    else addMenuItem(item)
    setForm(EMPTY); setShowForm(false)
  }

  const edit = (item) => {
    setForm({ ...item, price: String(item.price) })
    setEditId(item.id); setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Kelola Menu</h1>
          <p className="text-white/40 text-sm">{menu.length} item · {menu.filter(m => m.available).length} tersedia</p>
        </div>
        <button onClick={() => { setShowForm(p => !p); setEditId(null); setForm(EMPTY) }}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2.5 rounded-xl text-sm transition-all">
          {showForm ? <><X size={14} />Tutup</> : <><Plus size={14} />Tambah Menu</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#161616] border border-yellow-400/20 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-yellow-400 mb-5 text-base">{editId ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-wider block mb-1.5">Nama Menu</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Nasi Goreng Spesial" required
                  className="w-full bg-[#0F0F0F] border border-white/5 focus:border-yellow-400/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-wider block mb-1.5">Kategori</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full bg-[#0F0F0F] border border-white/5 focus:border-yellow-400/30 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors">
                  {['nasi','mie','lauk','snack','minuman'].map(c => <option key={c} value={c} className="bg-[#161616]">{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-wider block mb-1.5">Harga (Rp)</label>
                <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  placeholder="15000" required
                  className="w-full bg-[#0F0F0F] border border-white/5 focus:border-yellow-400/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-wider block mb-1.5">URL Foto (opsional)</label>
                <input value={form.img} onChange={e => setForm(p => ({ ...p, img: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#0F0F0F] border border-white/5 focus:border-yellow-400/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-wider block mb-1.5">Deskripsi</label>
                <input value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
                  placeholder="Deskripsi singkat menu..."
                  className="w-full bg-[#0F0F0F] border border-white/5 focus:border-yellow-400/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <label className="flex items-center gap-3 cursor-pointer" onClick={() => setForm(p => ({ ...p, available: !p.available }))}>
                <div className={`w-10 h-5 rounded-full transition-all relative ${form.available ? 'bg-yellow-400' : 'bg-white/10'}`}>
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all`} style={{ left: form.available ? '22px' : '2px' }} />
                </div>
                <span className="text-sm text-white/50">{form.available ? 'Tersedia' : 'Tidak Tersedia'}</span>
              </label>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowForm(false); setEditId(null) }}
                  className="border border-white/10 text-white/40 hover:text-white px-4 py-2 rounded-xl text-sm transition-all">Batal</button>
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-2 rounded-xl text-sm transition-all">
                  {editId ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {['semua','nasi','mie','lauk','snack','minuman'].map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${filter === c ? 'bg-yellow-400 text-black' : 'bg-[#161616] border border-white/5 text-white/40 hover:text-white'}`}>
            {c === 'semua' ? 'Semua' : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <div key={item.id} className={`bg-[#161616] border rounded-2xl overflow-hidden hover:border-yellow-400/20 transition-all group ${!item.available ? 'opacity-50' : 'border-white/5'}`}>
            <div className="relative h-36 overflow-hidden">
              <img src={getImg(item, i)} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button onClick={() => updateMenuItem(item.id, { available: !item.available })}
                className={`absolute top-2 right-2 text-xs font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm transition-all ${item.available ? 'bg-green-400/20 border-green-400/30 text-green-400' : 'bg-red-400/20 border-red-400/30 text-red-400'}`}>
                {item.available ? 'Tersedia' : 'Habis'}
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="font-semibold text-sm text-white leading-tight">{item.name}</p>
                <span className="text-yellow-400 font-bold text-sm ml-2 flex-shrink-0">Rp {(item.price/1000).toFixed(0)}K</span>
              </div>
              <p className="text-white/30 text-xs mb-3 line-clamp-1">{item.desc}</p>
              <div className="flex gap-2">
                <button onClick={() => edit(item)} className="flex-1 flex items-center justify-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 hover:bg-yellow-400 hover:text-black text-xs font-semibold py-2 rounded-lg transition-all">
                  <Pencil size={11} />Edit
                </button>
                <button onClick={() => deleteMenuItem(item.id)} className="flex items-center justify-center w-8 h-8 border border-white/5 hover:border-red-400/30 text-white/25 hover:text-red-400 rounded-lg transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
