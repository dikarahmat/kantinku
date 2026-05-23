import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

const MENU_DEFAULT = [
  // NASI
  { id: 'm1', name: 'Nasi Goreng Ayam', category: 'nasi', price: 15000, desc: 'Nasi goreng dengan ayam kampung dan telur mata sapi', available: true, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop' },
  { id: 'm2', name: 'Nasi Rendang', category: 'nasi', price: 18000, desc: 'Nasi putih dengan rendang sapi empuk', available: true, img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop' },
  { id: 'm3', name: 'Nasi Ayam Bakar', category: 'nasi', price: 17000, desc: 'Nasi dengan ayam bakar bumbu kecap', available: true, img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop' },
  // MIE
  { id: 'm4', name: 'Mie Goreng Spesial', category: 'mie', price: 14000, desc: 'Mie goreng dengan telur dan sayuran segar', available: true, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop' },
  { id: 'm5', name: 'Mie Ayam Solo', category: 'mie', price: 13000, desc: 'Mie ayam kuah gurih khas Solo', available: true, img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=300&fit=crop' },
  { id: 'm6', name: 'Mie Rebus Pedas', category: 'mie', price: 12000, desc: 'Mie rebus dengan kuah pedas dan topping lengkap', available: true, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop' },
  // LAUK
  { id: 'm7', name: 'Sate Ayam 10 Tusuk', category: 'lauk', price: 20000, desc: 'Sate ayam dengan bumbu kacang spesial', available: true, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop' },
  { id: 'm8', name: 'Ayam Geprek', category: 'lauk', price: 16000, desc: 'Ayam crispy geprek dengan sambal bawang', available: true, img: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop' },
  { id: 'm9', name: 'Tempe Orek', category: 'lauk', price: 8000, desc: 'Tempe orek kering manis pedas', available: true, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop' },
  // SNACK
  { id: 'm10', name: 'Risoles Mayo', category: 'snack', price: 5000, desc: 'Risoles isi ragout dan mayo creamy', available: true, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop' },
  { id: 'm11', name: 'Gorengan Mix', category: 'snack', price: 6000, desc: 'Mix gorengan: bakwan, tempe, tahu', available: true, img: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=400&h=300&fit=crop' },
  // MINUMAN
  { id: 'm12', name: 'Es Teh Manis', category: 'minuman', price: 5000, desc: 'Teh manis segar dengan es batu', available: true, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
  { id: 'm13', name: 'Es Jeruk Peras', category: 'minuman', price: 8000, desc: 'Jeruk peras segar dengan es batu', available: true, img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop' },
  { id: 'm14', name: 'Jus Alpukat', category: 'minuman', price: 12000, desc: 'Jus alpukat creamy dengan susu kental', available: true, img: 'https://images.unsplash.com/photo-1638176066959-e9e49d71f48d?w=400&h=300&fit=crop' },
]

export function DataProvider({ children }) {
  const [menu, setMenu] = useState(() => { const s = localStorage.getItem('kk-menu'); return s ? JSON.parse(s) : MENU_DEFAULT })
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState(() => { const s = localStorage.getItem('kk-orders'); return s ? JSON.parse(s) : [] })
  const [user, setUser] = useState(() => { const s = localStorage.getItem('kk-user'); return s ? JSON.parse(s) : null })

  useEffect(() => { localStorage.setItem('kk-menu', JSON.stringify(menu)) }, [menu])
  useEffect(() => { localStorage.setItem('kk-orders', JSON.stringify(orders)) }, [orders])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const login = (nim, pass) => {
    if (nim === '24101140123' && pass === '123456') {
      const u = { nim, name: 'Dika Rahmat', role: 'mahasiswa' }
      setUser(u); localStorage.setItem('kk-user', JSON.stringify(u)); return true
    }
    return false
  }
  const logout = () => { setUser(null); localStorage.removeItem('kk-user') }

  const addToCart = (item) => setCart(prev => { const ex = prev.find(i => i.id === item.id); if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i); return [...prev, { ...item, qty: 1 }] })
  const updateQty = (id, qty) => { if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id)); else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i)) }
  const clearCart = () => setCart([])
  const placeOrder = (note, method, payment) => {
    const order = { id: 'ORD-' + Date.now(), items: [...cart], total: cartTotal + 2000, note, method, payment, status: 'diterima', estimasi: 12, time: Date.now() }
    setOrders(prev => [order, ...prev]); clearCart(); return order.id
  }
  const updateOrderStatus = (id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  const addMenuItem = (item) => setMenu(prev => [...prev, { ...item, id: 'm' + Date.now() }])
  const updateMenuItem = (id, updates) => setMenu(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m))
  const deleteMenuItem = (id) => setMenu(prev => prev.filter(m => m.id !== id))

  return (
    <DataContext.Provider value={{ menu, cart, orders, cartCount, cartTotal, user, login, logout, addToCart, updateQty, clearCart, placeOrder, updateOrderStatus, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
