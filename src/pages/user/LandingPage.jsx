import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Clock, ShieldCheck, ChevronDown } from 'lucide-react'
import { Logo } from '../../components/Logo'

export default function LandingPage() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/4 rounded-full blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#0B0B0B]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollTo('menu-section')} className="hover:text-white transition-colors">Menu</button>
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">How it Works</button>
            <button onClick={() => scrollTo('app-section')} className="hover:text-white transition-colors">App</button>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign In</Link>
            <Link to="/login" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-5 py-2 rounded-full transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=900&fit=crop" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/70 via-[#0B0B0B]/40 to-[#0B0B0B]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
            <Zap size={11} /> Pesan Sekarang, Makan Lebih Cepat
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Pesan Makan,<br />
            <span className="text-yellow-400" style={{fontFamily:'Georgia,serif',fontStyle:'italic',fontWeight:300}}>Tanpa Antri.</span>
          </h1>
          <p className="text-white/50 text-lg mb-10 leading-relaxed max-w-lg">
            Revolusi makan siang di kantor dan kampus. Nikmati kemudahan memesan menu favorit Anda langsung dari genggaman tanpa harus berdiri lama di barisan.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/login" className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_24px_rgba(250,204,21,0.3)] text-base">
              Mulai Pesan Sekarang <ArrowRight size={16} />
            </Link>
            <button onClick={() => scrollTo('menu-section')} className="flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-medium px-7 py-4 rounded-full transition-all text-base">
              Lihat Menu Hari Ini
            </button>
          </div>
        </div>
        <button onClick={() => scrollTo('features')} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/50 transition-colors animate-bounce">
          <ChevronDown size={24} />
        </button>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-yellow-400/60 text-xs font-bold uppercase tracking-widest mb-3">Kenapa KantinKu?</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            [Zap, 'Pesan Super Cepat', 'Pilih menu dan konfirmasi dalam hitungan detik. Tidak perlu antre panjang.', 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'],
            [Clock, 'Estimasi Waktu Real', 'Pantau status pesananmu secara langsung. Tahu kapan makananmu siap diambil.', 'text-blue-400 bg-blue-400/10 border-blue-400/20'],
            [ShieldCheck, 'Pembayaran Aman', 'QRIS, Virtual Account, GoPay, OVO hingga bayar tunai. Semua tersedia.', 'text-green-400 bg-green-400/10 border-green-400/20'],
          ].map(([Icon, title, desc, cls]) => (
            <div key={title} className="bg-[#161616] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${cls}`}>
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu-section" className="py-24 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-yellow-400/60 text-xs font-bold uppercase tracking-widest mb-3">Menu Populer</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Pilihan Terfavorit</h2>
            <Link to="/login" className="text-yellow-400 text-sm font-medium hover:text-yellow-300 hidden md:block">Lihat Semua Menu →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ['https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop','Nasi Goreng Ayam','Rp 15.000'],
              ['https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop','Mie Goreng Spesial','Rp 14.000'],
              ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop','Sate Ayam','Rp 20.000'],
              ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop','Es Teh Manis','Rp 5.000'],
            ].map(([img, name, price]) => (
              <Link to="/login" key={name} className="group bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-400/20 transition-all">
                <div className="h-36 overflow-hidden">
                  <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm">{name}</p>
                  <p className="text-yellow-400 font-bold text-sm mt-0.5">{price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-yellow-400/60 text-xs font-bold uppercase tracking-widest mb-3">Cara Kerja</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Mudah dalam 3 Langkah</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ['01','Pilih Menu','Browse menu lengkap kantin kampus, filter by kategori, dan tambahkan ke keranjang.'],
            ['02','Bayar & Konfirmasi','Pilih metode pembayaran favoritmu — QRIS, transfer bank, atau tunai.'],
            ['03','Ambil Pesanan','Pantau status real-time. Ambil saat notifikasi "Siap Diambil" muncul.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="relative">
              <p className="text-6xl font-black text-white/5 mb-4">{num}</p>
              <h3 className="font-bold text-xl mb-3 -mt-8">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APP SECTION */}
      <section id="app-section" className="py-24 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-yellow-400/60 text-xs font-bold uppercase tracking-widest mb-3">Akses Mudah</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tersedia di Web & Mobile</h2>
          <p className="text-white/40 mb-10 max-w-md mx-auto">Akses KantinKu dari browser di HP atau laptop. Tidak perlu install app, langsung bisa dipakai.</p>
          <Link to="/login" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_24px_rgba(250,204,21,0.3)]">
            Mulai Sekarang <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-white/20 text-sm">© 2026 KantinKu – Universitas Indonesia Maju</p>
          <div className="flex gap-6 text-white/20 text-sm">
            {['Syarat & Ketentuan','Pusat Bantuan','Privasi','Kontak'].map(l => (
              <a key={l} href="#" className="hover:text-white/50 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
