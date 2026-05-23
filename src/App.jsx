import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DataProvider } from './context/DataContext'

import LandingPage from './pages/user/LandingPage'
import LoginPage from './pages/user/LoginPage'

import UserLayout from './pages/user/UserLayout'
import Home from './pages/user/Home'
import MenuPage from './pages/user/MenuPage'
import CartPage from './pages/user/CartPage'
import PaymentPage from './pages/user/PaymentPage'
import TrackingPage from './pages/user/TrackingPage'
import ProfilePage from './pages/user/ProfilePage'

import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminMenu from './pages/admin/AdminMenu'
import AdminProfile from './pages/admin/AdminProfile'

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTE PUBLIK */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* RUTE ADMIN LOGIN - di luar AdminLayout */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* RUTE ADMIN PANEL */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* RUTE USER APP */}
          <Route path="/app" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="tracking" element={<TrackingPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}
