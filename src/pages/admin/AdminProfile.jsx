import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Store, Phone, Clock, MapPin, Mail, Edit3, Check } from 'lucide-react'

export default function AdminProfile() {
  const { orders, menu } = useData()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    ownerName: 'Pak Viktor',
    kantinName: 'Kantin Viktor',
    phone: '0812-3456-7890',
    email: 'viktor@kantinku.ac.id',
    address: 'Gedung Pusat, Lantai 1, Universitas Indonesia Maju',
    openTime: '07:00',
    closeTime: '16:00',
    desc: 'Kantin kampus terpercaya sejak 2018. Menyajikan berbagai menu nasi, mie, lauk, dan minuman segar dengan harga terjangkau untuk mahasiswa.',
  })
  const [form, setForm] = useState(profile)

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const totalOrders = orders.length
  const doneOrders = orders.filter(o => o.status === 'selesai').length

  const save = () => { setProfile(form); setEditing(false) }

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Profil Kantin</h1>
          <p className="text-white/40 text-sm">Kelola informasi kantin Anda</p>
        </div>
        <button onClick={() => editing ? save() : setEditing(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${editing ? 'bg-green-400 text-black' : 'bg-yellow-400 text-black hover:bg-yellow-300'}`}>
          {editing ? <><Check size={14} />Simpan</> : <><Edit3 size={14} />Edit Profil</>}
        </button>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5 mb-5">
        {/* AVATAR CARD */}
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <Store size={32} className="text-yellow-400" />
          </div>
          <div className="text-center">
            <p className="font-bold text-white text-lg">{profile.kantinName}</p>
            <p className="text-white/40 text-sm mt-0.5">{profile.ownerName}</p>
          </div>
          <div className="w-full pt-3 border-t border-white/5 space-y-2">
            {[
              [totalOrders, 'Total Order'],
              [doneOrders, 'Selesai'],
              [`Rp ${(totalRevenue/1000).toFixed(0)}K`, 'Revenue'],
            ].map(([v, l]) => (
              <div key={l} className="flex justify-between text-sm">
                <span className="text-white/40">{l}</span>
                <span className="font-bold text-yellow-400">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
          <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-5">Informasi Kantin</h3>
          <div className="space-y-4">
            {[
              [Store, 'Nama Kantin', 'kantinName'],
              [null, 'Nama Pemilik', 'ownerName'],
              [Phone, 'Nomor HP', 'phone'],
              [Mail, 'Email', 'email'],
              [MapPin, 'Alamat', 'address'],
            ].map(([Icon, label, key]) => (
              <div key={key} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  {Icon ? <Icon size={14} className="text-white/40" /> : <span className="text-white/40 text-xs font-bold">ID</span>}
                </div>
                <div className="flex-1">
                  <p className="text-white/30 text-xs mb-1">{label}</p>
                  {editing ? (
                    <input value={form[key]} onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                      className="w-full bg-[#0F0F0F] border border-white/10 focus:border-yellow-400/30 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors" />
                  ) : (
                    <p className="text-white text-sm font-medium">{profile[key]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPERATIONAL */}
      <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 mb-5">
        <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-5">Jam Operasional</h3>
        <div className="grid grid-cols-2 gap-4">
          {[['openTime','Buka'],['closeTime','Tutup']].map(([key, label]) => (
            <div key={key}>
              <p className="text-white/30 text-xs mb-2 flex items-center gap-1.5"><Clock size={11} />{label}</p>
              {editing ? (
                <input type="time" value={form[key]} onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                  className="bg-[#0F0F0F] border border-white/10 focus:border-yellow-400/30 rounded-lg px-3 py-2.5 text-white text-sm outline-none transition-colors" />
              ) : (
                <p className="text-white font-bold text-2xl">{profile[key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DESC */}
      <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-4">Deskripsi Kantin</h3>
        {editing ? (
          <textarea value={form.desc} onChange={e => setForm(p => ({...p, desc: e.target.value}))} rows={4}
            className="w-full bg-[#0F0F0F] border border-white/10 focus:border-yellow-400/30 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors resize-none" />
        ) : (
          <p className="text-white/50 text-sm leading-relaxed">{profile.desc}</p>
        )}
      </div>
    </div>
  )
}
