import { useAppContext } from "../context/AppContext"
import { Calendar, CheckCircle, Clock, MapPin, Bookmark, Award, Shield, Trophy, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function MyActivity() {
  const { bookings, issues, savedBusinesses, businesses } = useAppContext()
  const savedBizDetails = businesses.filter(b => savedBusinesses.includes(b.id))
  const totalPoints = bookings.length * 15 + issues.length * 10 + savedBusinesses.length * 5

  const badges = [
    { label: "First Report", icon: "🏅", desc: "Reported your first civic issue", earned: issues.length > 0 },
    { label: "Service Pro", icon: "⚡", desc: "Booked your first local service", earned: bookings.length > 0 },
    { label: "Community Star", icon: "⭐", desc: "10+ supporters on your reports", earned: issues.reduce((s, i) => s + i.supporters, 0) > 10 },
    { label: "Local Explorer", icon: "🗺️", desc: "Saved a favourite business", earned: savedBusinesses.length > 0 },
    { label: "Civic Champion", icon: "🏆", desc: "Helped resolve 3+ issues", earned: issues.filter(i => i.status === 'Resolved').length >= 1 },
    { label: "DSLC Pioneer", icon: "🚀", desc: "One of Ranchi's first 500 users", earned: true },
  ]

  const earnedBadges = badges.filter(b => b.earned).length
  const progressPct = Math.min(Math.round((totalPoints / 100) * 100), 99)

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">

      {/* ═══ PROFILE HERO ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ minHeight: 220 }}>
        <img
          src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1400&q=80&auto=format&fit=crop"
          alt="Activity"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-blue-800/75" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }}
            className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center text-3xl font-black text-white border-2 border-white/30 shadow-xl backdrop-blur-md flex-shrink-0"
          >
            JD
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-white mb-1 drop-shadow">John Doe</h1>
            <p className="text-blue-200 font-bold flex items-center justify-center md:justify-start gap-2">
              <Shield className="h-4 w-4" /> DSLC Community Member • Level 3
            </p>
            <p className="text-white/55 text-sm font-medium mt-1">Active since September 2024 • Ranchi, Jharkhand</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              {badges.filter(b => b.earned).slice(0, 3).map(b => (
                <span key={b.label} className="text-xs font-bold text-white bg-white/15 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  {b.icon} {b.label}
                </span>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="bg-white/15 rounded-2xl p-5 text-center border border-white/25 backdrop-blur-md min-w-[140px] shadow-xl"
          >
            <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
              <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2 drop-shadow-lg" />
            </motion.div>
            <div className="text-4xl font-black text-white">{totalPoints}</div>
            <div className="text-xs font-black text-blue-200 uppercase tracking-wider mt-1">Impact Points</div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Bookings Made", value: bookings.length, emoji: "📅", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
          { label: "Issues Reported", value: issues.length, emoji: "📌", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
          { label: "Businesses Saved", value: savedBusinesses.length, emoji: "🏪", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { label: "Badges Earned", value: earnedBadges, emoji: "🏆", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className={`glass-card p-5 text-center border ${s.border} ${s.bg}`}
          >
            <div className="text-3xl mb-2">{s.emoji}</div>
            <div className={`text-4xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs font-bold text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ═══ PROGRESS ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2.5">
            <Award className="h-6 w-6 text-amber-500" />
            <div>
              <span className="font-black text-slate-900">Progress to Level 4</span>
              <span className="ml-2 text-sm font-bold text-amber-600">— Community Guardian</span>
            </div>
          </div>
          <span className="text-sm font-black text-blue-600">{progressPct}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full relative"
          >
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-2">
          {100 - totalPoints > 0 ? `${100 - totalPoints} more impact points to unlock Guardian badge` : "🎉 You've unlocked Guardian!"}
        </p>
      </motion.div>

      {/* ═══ BADGES ═══ */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-black text-slate-900 mb-5">🏆 Your Community Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
              whileHover={b.earned ? { scale: 1.03, y: -3 } : {}}
              className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                b.earned
                  ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-sm cursor-default'
                  : 'bg-slate-50 border-slate-100 opacity-40 grayscale'
              }`}
            >
              <div className="text-3xl flex-shrink-0">{b.icon}</div>
              <div>
                <div className="text-sm font-black text-slate-800">{b.label}</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">{b.desc}</div>
                {b.earned && (
                  <span className="inline-block mt-1 text-[10px] font-black text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-200">Earned ✓</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ BOOKINGS + SAVED ═══ */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4">📅 Recent Bookings</h2>
          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50"
            >
              <div className="text-4xl mb-3">🔧</div>
              <p className="text-slate-700 font-bold mb-1">No bookings yet</p>
              <p className="text-slate-500 text-sm font-medium mb-4">Find a local professional to help you!</p>
              <a href="/services" className="inline-block text-sm font-black text-blue-600 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
                Find Services →
              </a>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {bookings.map((bk, i) => (
                <motion.div
                  key={bk.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-slate-900 text-base truncate">{bk.serviceName}</div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {bk.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {bk.time}</span>
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
                    Confirmed
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4">🏪 Saved Businesses</h2>
          {savedBizDetails.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50"
            >
              <div className="text-4xl mb-3">🏪</div>
              <p className="text-slate-700 font-bold mb-1">No saved businesses</p>
              <p className="text-slate-500 text-sm font-medium mb-4">Bookmark your favourite local shops!</p>
              <a href="/businesses" className="inline-block text-sm font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">
                Explore Shops →
              </a>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {savedBizDetails.map((biz, i) => (
                <motion.div
                  key={biz.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="glass-card p-4 flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <img
                      src={biz.image}
                      alt={biz.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-slate-900 text-base leading-tight truncate">{biz.name}</div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-0.5">
                      <MapPin className="h-3 w-3 text-emerald-500" /> {biz.distance}
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500 ml-1" />
                      <span className="font-black text-amber-600">{biz.rating}</span>
                    </div>
                  </div>
                  <Bookmark className="h-5 w-5 text-blue-600 fill-blue-600 flex-shrink-0 drop-shadow-sm" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
