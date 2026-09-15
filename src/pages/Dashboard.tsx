import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Search, MapPin, AlertTriangle, Building2, Wrench, Shield, ChevronRight, TrendingUp, Clock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { motion } from "framer-motion"

export default function Dashboard() {
  const { issues, businesses } = useAppContext()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = search.toLowerCase()
    if (q.includes("plumb") || q.includes("electr") || q.includes("ac") || q.includes("mechanic")) navigate('/services')
    else if (q.includes("food") || q.includes("shop") || q.includes("restaurant")) navigate('/businesses')
    else if (q.includes("road") || q.includes("pothole") || q.includes("water") || q.includes("light")) navigate('/community')
    else if (q.includes("hospital") || q.includes("police") || q.includes("emergency")) navigate('/resources')
    else navigate('/map')
  }

  return (
    <div className="space-y-10 pb-10">

      {/* ═══ HERO SEARCH BANNER ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
          alt="City"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-indigo-900/85" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Good morning, Ranchi! 👋</h1>
            <p className="text-white/70 font-medium text-lg">What does your community need today?</p>
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-16 pl-14 pr-36 rounded-2xl text-slate-900 bg-white border-0 shadow-2xl font-medium text-base placeholder:text-slate-400 focus:ring-4 focus:ring-blue-400/30"
              placeholder="Search services, shops, report issues..."
            />
            <Button type="submit" className="absolute right-2 top-2 bottom-2 rounded-xl px-6 font-bold bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            {["Find a plumber", "Report pothole", "Nearest hospital", "Local restaurants"].map(hint => (
              <button
                key={hint}
                onClick={() => { setSearch(hint); }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white/90 bg-white/15 border border-white/25 hover:bg-white/25 transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUICK ACTIONS ═══ */}
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Wrench, label: "Find Services", sub: "Plumbers, electricians...", path: "/services", bg: "bg-blue-100", iconColor: "text-blue-600" },
            { icon: AlertTriangle, label: "Report Issue", sub: "Potholes, lights, water", path: "/community", bg: "bg-amber-100", iconColor: "text-amber-600" },
            { icon: Building2, label: "Local Shops", sub: "Food, retail, pharmacy", path: "/businesses", bg: "bg-emerald-100", iconColor: "text-emerald-600" },
            { icon: Shield, label: "Emergency", sub: "Police, hospital, fire", path: "/resources", bg: "bg-red-100", iconColor: "text-red-600" },
          ].map(qa => (
            <Link key={qa.label} to={qa.path}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card p-5 flex flex-col gap-3 cursor-pointer"
              >
                <div className={`h-12 w-12 rounded-2xl ${qa.bg} flex items-center justify-center`}>
                  <qa.icon className={`h-6 w-6 ${qa.iconColor}`} />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base">{qa.label}</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5">{qa.sub}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ═══ RECENT ACTIVITY ═══ */}
      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-slate-900">🔥 Community Issues</h2>
            <Link to="/community" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="space-y-3">
            {issues.slice(0, 3).map(issue => (
              <div key={issue.id} className="glass-card p-4 flex gap-4 items-start">
                <div className={`h-10 w-10 rounded-xl flex-shrink-0 flex items-center justify-center text-lg ${
                  issue.urgency === "Critical" ? "bg-red-100" : issue.urgency === "High" ? "bg-amber-100" : "bg-slate-100"
                }`}>
                  {issue.urgency === "Critical" ? "🚨" : issue.urgency === "High" ? "⚠️" : "📌"}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{issue.title}</h4>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin className="h-3 w-3" /> {issue.location}
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 ${
                  issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                  issue.status === 'In Progress' ? 'bg-purple-100 text-purple-700' :
                  issue.status === 'Under Review' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{issue.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-slate-900">🏪 Popular Near You</h2>
            <Link to="/businesses" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="space-y-3">
            {businesses.slice(0, 3).map(biz => (
              <div key={biz.id} className="glass-card p-4 flex gap-4 items-center">
                <img src={biz.image} alt={biz.name} className="w-14 h-14 rounded-xl object-cover shadow-sm flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{biz.name}</h4>
                  <div className="text-xs font-medium text-slate-500">{biz.category} • {biz.distance}</div>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${biz.isOpen ? 'bg-emerald-500' : 'bg-slate-300'}`} title={biz.isOpen ? "Open" : "Closed"} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COMMUNITY PULSE ═══ */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-black text-slate-900">Community Pulse</h2>
          <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Active Issues", value: issues.filter(i => i.status !== 'Resolved').length, icon: "⚠️" },
            { label: "Resolved This Week", value: issues.filter(i => i.status === 'Resolved').length, icon: "✅" },
            { label: "Community Supporters", value: issues.reduce((sum, i) => sum + i.supporters, 0), icon: "👥" },
          ].map(s => (
            <div key={s.label} className="text-center p-4 bg-white/60 rounded-2xl border border-white/80">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-slate-900">{s.value}</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
