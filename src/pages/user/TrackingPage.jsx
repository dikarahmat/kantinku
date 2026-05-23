import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { Clock, CheckCircle, ChefHat, Bell, Package } from 'lucide-react'

const STEPS = [
  { key: 'diterima', label: 'Pesanan Diterima', desc: 'Kantin menerima pesananmu', icon: Bell },
  { key: 'dimasak', label: 'Sedang Dimasak', desc: 'Chef sedang menyiapkan pesananmu', icon: ChefHat },
  { key: 'siap', label: 'Siap Diambil', desc: 'Segera ke kantin untuk pengambilan', icon: Package },
  { key: 'selesai', label: 'Selesai', desc: 'Terima kasih sudah memesan!', icon: CheckCircle },
]
const STATUS_ORDER = ['diterima','dimasak','siap','selesai']

export default function TrackingPage() {
  const { orders } = useData()
  const activeOrder = orders.find(o => !['selesai','gagal'].includes(o.status))
  const order = activeOrder || orders[0]

  if (!order) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <Package size={48} className="mx-auto text-white/15 mb-4" />
      <h2 className="text-xl font-bold mb-2">Belum Ada Pesanan</h2>
      <p className="text-white/30 mb-6">Yuk pesan sesuatu dulu!</p>
      <Link to="/app/menu" className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-all">Pesan Sekarang</Link>
    </div>
  )

  const currentIdx = STATUS_ORDER.indexOf(order.status)

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-bold mb-1">Status Pesanan</h1>
      <p className="text-white/30 text-sm mb-8 font-mono">{order.id}</p>

      {order.status !== 'selesai' && order.status !== 'gagal' && (
        <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-6 mb-6 text-center">
          <p className="text-yellow-400/60 text-xs font-bold tracking-widest uppercase mb-2">Estimasi Waktu</p>
          <p className="text-7xl font-black text-yellow-400">{order.estimasi}</p>
          <p className="text-white/50 font-medium mt-1">Menit</p>
          <p className="text-white/25 text-xs mt-2">Pesanan sedang disiapkan oleh kantin</p>
        </div>
      )}

      {order.status === 'selesai' && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mb-6 flex items-center gap-4">
          <CheckCircle size={32} className="text-green-400 flex-shrink-0" />
          <div><p className="font-bold text-green-400">Pesanan Selesai!</p><p className="text-white/35 text-sm">Terima kasih sudah memesan di KantinKu</p></div>
        </div>
      )}

      <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 mb-6">
        {STEPS.map((step, i) => {
          const isActive = i === currentIdx
          const isDone = i < currentIdx
          const Icon = step.icon
          return (
            <div key={step.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isDone ? 'bg-yellow-400 border-yellow-400' : isActive ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/10'}`}>
                  <Icon size={14} className={isDone ? 'text-black' : isActive ? 'text-yellow-400' : 'text-white/20'} />
                </div>
                {i < STEPS.length - 1 && <div className={`w-0.5 h-8 my-1 ${isDone ? 'bg-yellow-400/40' : 'bg-white/5'}`} />}
              </div>
              <div className={`pb-6 ${i === STEPS.length-1 ? 'pb-0' : ''}`}>
                <p className={`font-semibold text-sm ${isActive ? 'text-yellow-400' : isDone ? 'text-white' : 'text-white/25'}`}>{step.label}</p>
                <p className={`text-xs mt-0.5 ${isActive ? 'text-white/40' : isDone ? 'text-white/25' : 'text-white/15'}`}>{step.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* DETAIL — no emoji */}
      <div className="bg-[#161616] border border-white/5 rounded-2xl p-5">
        <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-4">Detail Pesanan</h3>
        <div className="space-y-2">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-white/60">{item.name} x{item.qty}</span>
              <span className="text-white/40">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-white/5 my-3" />
        <div className="flex justify-between font-bold">
          <span className="text-white">Total</span>
          <span className="text-yellow-400">Rp {order.total.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  )
}
