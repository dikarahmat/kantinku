import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { ArrowLeft, CheckCircle, QrCode, CreditCard, Banknote, Smartphone } from 'lucide-react'

const METHODS = [
  { id: 'qris', label: 'QRIS', desc: 'Scan QR dari semua e-wallet', icon: QrCode, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  { id: 'va_bca', label: 'Virtual Account BCA', desc: 'Transfer via ATM / m-banking BCA', icon: CreditCard, color: 'text-blue-300', bg: 'bg-blue-300/10 border-blue-300/20' },
  { id: 'va_mandiri', label: 'Virtual Account Mandiri', desc: 'Transfer via ATM / Livin Mandiri', icon: CreditCard, color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  { id: 'gopay', label: 'GoPay', desc: 'Bayar dengan saldo GoPay', icon: Smartphone, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  { id: 'ovo', label: 'OVO', desc: 'Bayar dengan saldo OVO', icon: Smartphone, color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
  { id: 'cash', label: 'Bayar di Kasir', desc: 'Bayar tunai saat ambil pesanan', icon: Banknote, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
]

export default function PaymentPage() {
  const { cartTotal, placeOrder } = useData()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState('')
  const [step, setStep] = useState('choose') // choose | confirm | success
  const [loading, setLoading] = useState(false)

  const total = cartTotal + 2000
  const method = METHODS.find(m => m.id === selected)

  const handlePay = () => {
    if (!selected) return
    setLoading(true)
    setTimeout(() => {
      placeOrder(state?.note || '', state?.method || 'ambil', selected)
      setStep('success')
      setLoading(false)
    }, 1200)
  }

  if (step === 'success') return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-green-400" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Pesanan Berhasil!</h1>
      <p className="text-white/40 mb-8">Pesananmu sedang diproses oleh kantin</p>
      <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 mb-6 text-left">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/40">Metode Bayar</span>
          <span className="font-semibold">{method?.label}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Total</span>
          <span className="text-yellow-400 font-bold">Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>
      <Link to="/app/tracking" className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3.5 rounded-xl transition-all mb-3">
        Lihat Status Pesanan
      </Link>
      <Link to="/app" className="block w-full border border-white/10 text-white/50 hover:text-white py-3.5 rounded-xl transition-all text-sm">
        Kembali ke Beranda
      </Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/app/cart" className="p-2 hover:bg-white/5 rounded-lg transition-colors"><ArrowLeft size={18} /></Link>
        <div><h1 className="text-2xl font-bold">Pilih Pembayaran</h1><p className="text-white/30 text-sm">Total: <span className="text-yellow-400 font-bold">Rp {total.toLocaleString('id-ID')}</span></p></div>
      </div>

      <div className="space-y-3 mb-8">
        {METHODS.map(m => (
          <button key={m.id} onClick={() => setSelected(m.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${selected === m.id ? 'border-yellow-400/40 bg-yellow-400/5' : 'border-white/5 bg-[#161616] hover:border-white/10'}`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${m.bg}`}>
              <m.icon size={18} className={m.color} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{m.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{m.desc}</p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${selected === m.id ? 'border-yellow-400 bg-yellow-400' : 'border-white/20'}`} />
          </button>
        ))}
      </div>

      {/* QRIS PREVIEW */}
      {selected === 'qris' && (
        <div className="bg-[#161616] border border-blue-400/20 rounded-2xl p-6 mb-6 text-center">
          <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-4">Scan QR Code</p>
          <div className="w-36 h-36 bg-white rounded-xl mx-auto flex items-center justify-center mb-4">
            <QrCode size={80} className="text-black" />
          </div>
          <p className="text-yellow-400 font-bold text-lg">Rp {total.toLocaleString('id-ID')}</p>
          <p className="text-white/30 text-xs mt-1">Berlaku 10 menit</p>
        </div>
      )}

      {/* VA NUMBER */}
      {(selected === 'va_bca' || selected === 'va_mandiri') && (
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3">Nomor Virtual Account</p>
          <p className="font-mono text-2xl font-bold text-yellow-400 tracking-widest">1234 5678 9012 3456</p>
          <p className="text-white/30 text-xs mt-2">Salin dan transfer tepat sebesar <span className="text-white/60">Rp {total.toLocaleString('id-ID')}</span></p>
        </div>
      )}

      <button onClick={handlePay} disabled={!selected || loading}
        className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.15)]">
        {loading ? 'Memproses...' : selected === 'cash' ? 'Konfirmasi Pesanan' : 'Konfirmasi Pembayaran'}
      </button>
    </div>
  )
}
