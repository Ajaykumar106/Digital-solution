import { Link, useLocation } from "react-router-dom"
import { MapPin, Bell, Menu, X, Home, LayoutDashboard, Wrench, Building2, Users, HeartHandshake, Map, CheckCircle, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const notifications = [
  { id: 1, icon: "✅", title: "Booking Confirmed", desc: "Rahul Electrical — Today at 2:00 PM", time: "2 min ago", unread: true },
  { id: 2, icon: "🔄", title: "Issue Status Updated", desc: "Pothole at Harmu: In Progress", time: "1 hr ago", unread: true },
  { id: 3, icon: "👥", title: "Community Support", desc: "12 people supported your reported issue", time: "3 hrs ago", unread: false },
  { id: 4, icon: "🏆", title: "Badge Unlocked!", desc: "You earned 'First Report' badge", time: "Yesterday", unread: false },
]

export function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const unreadCount = notifications.filter(n => n.unread).length

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Services", path: "/services", icon: Wrench },
    { name: "Businesses", path: "/businesses", icon: Building2 },
    { name: "Community", path: "/community", icon: Users },
    { name: "Resources", path: "/resources", icon: HeartHandshake },
    { name: "Map", path: "/map", icon: Map },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-primary">
        <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.08, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-[10px] tracking-tight shadow-lg"
            >
              DSLC
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-slate-900 text-base tracking-tight">DSLC</span>
              <span className="text-[10px] text-slate-500 font-semibold leading-none hidden sm:block">Digital Solutions for Local Communities</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                  location.pathname === item.path
                    ? "text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-blue-100 rounded-xl"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <MapPin className="h-3 w-3 text-blue-600" />
              Ranchi, JH
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative h-9 w-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-0.5 -top-0.5 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow-md"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h3 className="font-black text-slate-900">Notifications</h3>
                        <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Mark all read</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className={`flex items-start gap-3 px-5 py-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${n.unread ? 'bg-blue-50/50' : ''}`}>
                            <div className="text-xl flex-shrink-0">{n.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-slate-900 text-sm">{n.title}</p>
                                {n.unread && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                              </div>
                              <p className="text-slate-500 text-xs font-medium mt-0.5">{n.desc}</p>
                              <p className="text-slate-400 text-xs mt-1">{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-5 py-3 text-center">
                        <button className="text-sm font-bold text-blue-600 hover:underline">View all notifications</button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <Link to="/my-activity">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-black cursor-pointer shadow-md"
              >
                JD
              </motion.div>
            </Link>

            <button className="lg:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-3 grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
