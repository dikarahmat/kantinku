import { useData } from '../../context/DataContext'

const STATUS_CFG = {
  diterima: { label: 'Diterima', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', next: 'dimasak', nextLabel: 'Mulai Masak' },
  dimasak: { label: 'Sedang Dimasak', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', next: 'siap', nextLabel: 'Tandai Siap' },
  siap: { label: 'Siap Diambil', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', next: 'selesai', nextLabel: 'Selesai' },
  selesai: { label: 'Selesai', color: 'text-green-400 bg-green-400/10 border-green-400/20', next: null },
  gagal: { label: 'Gagal', color: 'text-red-400 bg-red-400/10 border-red-400/20', next: null },
}

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
]

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useData()
  const active = orders.filter(o => !['selesai', 'gagal'].includes(o.status))
  const history = orders.filter(o => ['selesai', 'gagal'].includes(o.status))

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Pesanan Masuk</h1>
        <p className="text-white/30 text-sm">{active.length} aktif · {history.length} selesai</p>
      </div>

      {/* ACTIVE */}
      {active.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Pesanan Aktif</p>
          </div>
          <div className="space-y-3">
            {active.map((order, i) => {
              const s = STATUS_CFG[order.status]
              return (
                <div key={order.id} className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
                  {/* HEAD */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={AVATARS[i % AVATARS.length]} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-sm">Pelanggan</p>
                        <p className="font-mono text-white/30 text-xs">#{order.id.slice(-8)}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${s.color}`}>{s.label}</span>
                  </div>

                  {/* ITEMS */}
                  <div className="px-5 py-3 border-b border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {order.items.map(item => (
                        <span key={item.id} className="flex items-center gap-1.5 text-xs bg-white/5 px-3 py-1.5 rounded-lg">
                          <span>{item.img}</span>
                          <span className="text-white/70">{item.name}</span>
                          <span className="text-white/30">×{item.qty}</span>
                        </span>
                      ))}
                    </div>
                    {order.note && (
                      <p className="text-white/30 text-xs mt-2 italic">📝 {order.note}</p>
                    )}
                  </div>

                  {/* FOOT */}
                  <div className="flex items-center justify-between px-5 py-3 flex-wrap gap-3">
                    <div>
                      <p className="text-white/30 text-xs">{order.method === 'meja' ? '🪑 Diantar ke Meja' : '🏃 Ambil Sendiri'}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-yellow-400 font-bold">Rp {order.total.toLocaleString('id-ID')}</span>
                      {s.next && (
                        <button onClick={() => updateOrderStatus(order.id, s.next)}
                          className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold px-4 py-2 rounded-lg transition-all">
                          {s.nextLabel} →
                        </button>
                      )}
                      {!['selesai', 'gagal'].includes(order.status) && (
                        <button onClick={() => updateOrderStatus(order.id, 'gagal')}
                          className="border border-white/10 hover:border-red-400/30 text-white/30 hover:text-red-400 text-xs px-3 py-2 rounded-lg transition-all">
                          Gagalkan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div>
          <p className="text-xs font-bold text-white/20 uppercase tracking-wider mb-4">Riwayat Pesanan</p>
          <div className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-[#0B0B0B] text-[10px] font-bold text-white/20 uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Order ID</th>
                    <th className="px-5 py-3 text-left">Item</th>
                    <th className="px-5 py-3 text-left">Total</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-left">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(o => {
                    const s = STATUS_CFG[o.status]
                    return (
                      <tr key={o.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="px-5 py-3 font-mono text-sm text-white/50">#{o.id.slice(-6)}</td>
                        <td className="px-5 py-3 text-sm text-white/40">{o.items.length} item</td>
                        <td className="px-5 py-3 text-yellow-400 font-semibold text-sm">Rp {o.total.toLocaleString('id-ID')}</td>
                        <td className="px-5 py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.color}`}>{s.label}</span></td>
                        <td className="px-5 py-3 text-white/30 text-xs">{new Date(o.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="text-center py-20 text-white/20">
          <p className="text-4xl mb-3">📭</p>
          <p>Belum ada pesanan masuk</p>
        </div>
      )}
    </div>
  )
}
