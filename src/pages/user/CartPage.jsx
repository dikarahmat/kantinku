import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { cart, cartTotal, updateQty } = useData()
  const [note, setNote] = useState('')
  const [method, setMethod] = useState('ambil')
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!cart.length) return
    navigate('/app/payment', { state: { note, method } })
  }

  if (!cart.length) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <ShoppingCart size={48} className="mx-auto text-white/15 mb-4" />
      <h2 className="text-xl font-bold mb-2">Keranjang Kosong</h2>
      <p className="text-white/30 mb-6">Yuk tambahkan menu favoritmu!</p>
      <Link to="/app/menu" className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-all">Lihat Menu</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/app/menu" className="p-2 hover:bg-white/5 rounded-lg transition-colors"><ArrowLeft size={18} /></Link>
        <div><h1 className="text-2xl font-bold">Keranjang</h1><p className="text-white/30 text-sm">{cart.length} item</p></div>
      </div>
      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden flex">
              <div className="w-20 flex-shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-yellow-400 font-bold text-sm mt-0.5">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-bold text-lg">−</button>
                  <span className="w-5 text-center font-bold text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white font-bold text-lg">+</button>
                </div>
                <button onClick={() => updateQty(item.id, 0)} className="p-1.5 hover:text-red-400 text-white/15 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-4">
            <label className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2 block">Catatan</label>
            <textarea className="w-full bg-transparent text-sm placeholder:text-white/15 resize-none focus:outline-none" placeholder="Contoh: sambalnya dipisah ya..." rows={2} value={note} onChange={e => setNote(e.target.value)} />
          </div>
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-4">
            <label className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3 block">Metode Pengambilan</label>
            <div className="grid grid-cols-2 gap-3">
              {[['ambil', '🏃', 'Ambil Sendiri'], ['meja', '🪑', 'Diantar ke Meja']].map(([val, emoji, label]) => (
                <button key={val} onClick={() => setMethod(val)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${method === val ? 'border-yellow-400/40 bg-yellow-400/8 text-yellow-400' : 'border-white/5 text-white/40 hover:border-white/10'}`}>
                  <span>{emoji}</span>{label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 h-fit sticky top-24">
          <h3 className="font-bold mb-4">Ringkasan</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-white/40"><span>Subtotal</span><span>Rp {cartTotal.toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between text-white/40"><span>Biaya Layanan</span><span>Rp 2.000</span></div>
            <div className="h-px bg-white/5 my-3" />
            <div className="flex justify-between font-bold text-base"><span>Total</span><span className="text-yellow-400">Rp {(cartTotal + 2000).toLocaleString('id-ID')}</span></div>
          </div>
          <button onClick={handleCheckout} className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3.5 rounded-xl transition-all">
            Pilih Pembayaran
          </button>
        </div>
      </div>
    </div>
  )
}
