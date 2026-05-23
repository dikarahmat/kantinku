export function Logo({ size = 'md', showText = true }) {
  const sizes = { sm: 'w-7 h-7', md: 'w-8 h-8', lg: 'w-10 h-10', xl: 'w-12 h-12' }
  const textSizes = { sm: 'text-base', md: 'text-lg', lg: 'text-xl', xl: 'text-2xl' }

  return (
    <div className="flex items-center gap-2">
      <img src="/logo.png.png" alt="KantinKu" className={`${sizes[size]} object-contain`} />
      {showText && (
        <span className={`font-bold ${textSizes[size]} text-white`}>
          Kantin<span className="text-yellow-400">Ku</span>
        </span>
      )}
    </div>
  )
}
