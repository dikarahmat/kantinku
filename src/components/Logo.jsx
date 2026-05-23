import React from 'react'

// Kita set default showText = true biar kalau dipanggil biasa langsung muncul teksnya
export function Logo({ size = 'md', showText = true, className = '' }) {
  // Mapping ukuran pembungkus logo (gambar)
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18'
  }

  // Mapping ukuran font untuk tulisan KantinKu
  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  const sizeClass = sizes[size] || size
  const textSizeClass = textSizes[size] || 'text-xl'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Wadah Gambar Logo */}
      <div className={`flex items-center justify-center shrink-0 ${sizeClass}`}>
        <img 
          src="/logo.png.png" 
          alt="Logo KantinKu" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Tulisan KantinKu */}
      {showText && (
        <span className={`font-bold tracking-wide text-white ${textSizeClass}`}>
          Kantin<span className="text-yellow-400">Ku</span>
        </span>
      )}
    </div>
  )
}