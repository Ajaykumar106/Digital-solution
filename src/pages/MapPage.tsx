import { useState } from "react"
import { MapPin, Navigation, Layers, Search, Wrench, Building2, AlertTriangle, HeartPulse, X, Star, Phone, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppContext } from "../context/AppContext"

type PinType = "service" | "business" | "issue" | "resource"

const mapPins = [
  // Services
  { id: "s1", type: "service" as PinType, label: "Rahul Electrical", sub: "Electrician • 4.8★", top: "28%", left: "38%", price: "₹300" },
  { id: "s2", type: "service" as PinType, label: "Kumar Plumbing", sub: "Plumber • 4.6★", top: "50%", left: "55%", price: "₹250" },
  { id: "s3", type: "service" as PinType, label: "Ranchi Auto Works", sub: "Mechanic • 4.9★", top: "68%", left: "42%", price: "₹500" },
  // Businesses
  { id: "b1", type: "business" as PinType, label: "Spice Route", sub: "Restaurant • Open", top: "40%", left: "65%", price: "" },
  { id: "b2", type: "business" as PinType, label: "Jharkhand Crafts", sub: "Handmade • Open", top: "22%", left: "72%", price: "" },
  { id: "b3", type: "business" as PinType, label: "Green Valley Pharmacy", sub: "Pharmacy • 24hr", top: "60%", left: "70%", price: "" },
  // Issues
  { id: "i1", type: "issue" as PinType, label: "Broken Streetlight", sub: "Kanke Road • Reported", top: "35%", left: "25%", price: "" },
  { id: "i2", type: "issue" as PinType, label: "Severe Pothole", sub: "Harmu Bypass • In Progress", top: "62%", left: "30%", price: "" },
  // Resources
  { id: "r1", type: "resource" as PinType, label: "RIMS Hospital", sub: "Emergency • 0651-2541000", top: "18%", left: "60%", price: "" },
  { id: "r2", type: "resource" as PinType, label: "City Police HQ", sub: "Public Safety • 100", top: "75%", left: "58%", price: "" },
]

const pinConfig: Record<PinType, { color: string; bg: string; icon: any; label: string; glow: string }> = {
  service: { color: "text-white", bg: "bg-blue-600", icon: Wrench, label: "Services", glow: "shadow-[0_0_16px_rgba(37,99,235,0.5)]" },
  business: { color: "text-white", bg: "bg-emerald-500", icon: Building2, label: "Businesses", glow: "shadow-[0_0_16px_rgba(16,185,129,0.5)]" },
  issue: { color: "text-white", bg: "bg-amber-500", icon: AlertTriangle, label: "Issues", glow: "shadow-[0_0_16px_rgba(245,158,11,0.5)]" },
  resource: { color: "text-white", bg: "bg-red-500", icon: HeartPulse, label: "Resources", glow: "shadow-[0_0_16px_rgba(239,68,68,0.5)]" },
}

const filterOptions: { key: PinType | "all"; label: string; color: string }[] = [
  { key: "all", label: "All", color: "bg-slate-900 text-white" },
  { key: "service", label: "Services", color: "bg-blue-600 text-white" },
  { key: "business", label: "Businesses", color: "bg-emerald-500 text-white" },
  { key: "issue", label: "Issues", color: "bg-amber-500 text-white" },
  { key: "resource", label: "Emergency", color: "bg-red-500 text-white" },
]

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState<PinType | "all">("all")
  const [selectedPin, setSelectedPin] = useState<typeof mapPins[0] | null>(null)

  const visiblePins = activeFilter === "all" ? mapPins : mapPins.filter(p => p.type === activeFilter)

  return (
    <div className="space-y-6 pb-10">

      {/* ═══ BANNER ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 200 }}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80&auto=format&fit=crop"
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-black uppercase tracking-widest">
              📍 Ranchi Community Map
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow mb-2">Community Map</h1>
            <p className="text-white/70 font-medium max-w-sm">Explore all services, businesses, civic issues, and emergency resources near you in Ranchi.</p>
          </div>
          <div className="relative flex-shrink-0 w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
            <input
              className="w-full pl-10 pr-4 h-12 rounded-2xl bg-white border-0 shadow-xl text-slate-900 font-medium placeholder:text-slate-400 outline-none"
              placeholder="Search on map..."
            />
          </div>
        </motion.div>
      </section>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filterOptions.map(f => (
          <motion.button
            key={f.key}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(f.key)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-black transition-all border ${
              activeFilter === f.key
                ? `${f.color} border-transparent shadow-lg scale-105`
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {f.label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-md text-xs ${activeFilter === f.key ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
              {f.key === 'all' ? mapPins.length : mapPins.filter(p => p.type === f.key).length}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Map Area */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl" style={{ height: 520 }}>
        {/* Map background */}
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80&auto=format&fit=crop"
          alt="Map background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(20%) brightness(1.05) saturate(0.9)" }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-blue-900/10" />

        {/* Ranchi label */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-black text-slate-900 text-sm">Ranchi, Jharkhand</span>
        </div>

        {/* Map Pins */}
        <AnimatePresence>
          {visiblePins.map((pin, i) => {
            const cfg = pinConfig[pin.type]
            const Icon = cfg.icon
            return (
              <motion.button
                key={pin.id}
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 20 }}
                whileHover={{ scale: 1.2, y: -4, zIndex: 20 }}
                whileTap={{ scale: 0.9 }}
                style={{ top: pin.top, left: pin.left, position: "absolute", transform: "translate(-50%,-50%)" }}
                className={`${cfg.bg} ${cfg.glow} p-2.5 rounded-full cursor-pointer relative z-10 flex items-center justify-center`}
                onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}
              >
                <Icon className={`h-4 w-4 ${cfg.color}`} />
                {/* Pulse ring for issues */}
                {pin.type === 'issue' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-amber-400"
                    animate={{ scale: [1, 1.8, 1.8], opacity: [1, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            )
          })}
        </AnimatePresence>

        {/* Selected Pin Popup */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-4 right-4 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-30"
            >
              <div className={`px-4 py-3 flex items-center justify-between ${pinConfig[selectedPin.type].bg}`}>
                <span className="text-white font-black text-sm">{pinConfig[selectedPin.type].label}</span>
                <button onClick={() => setSelectedPin(null)} className="text-white/70 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-black text-slate-900 text-base mb-1">{selectedPin.label}</h3>
                <p className="text-slate-500 text-sm font-medium mb-3">{selectedPin.sub}</p>
                {selectedPin.price && (
                  <div className="flex items-center justify-between bg-blue-50 rounded-xl px-3 py-2.5 mb-3 border border-blue-100">
                    <span className="text-xs font-bold text-slate-500">Starting at</span>
                    <span className="font-black text-blue-700 text-lg">{selectedPin.price}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl text-xs font-black bg-slate-900 text-white hover:bg-slate-700 transition-colors">
                    {selectedPin.type === 'service' ? 'Book Now' :
                     selectedPin.type === 'business' ? 'View Shop' :
                     selectedPin.type === 'resource' ? 'Call Now' : 'View Issue'}
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                    <Navigation className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-black text-xl transition-colors">+</button>
          <button className="w-10 h-10 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-black text-xl transition-colors">−</button>
          <button className="w-10 h-10 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
            <Navigation className="h-4 w-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2.5">Legend</p>
          <div className="flex flex-col gap-2">
            {Object.entries(pinConfig).map(([key, cfg]) => {
              const Icon = cfg.icon
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{cfg.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Nearby quick list */}
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4">📍 Nearest to You</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mapPins.slice(0, 4).map((pin, i) => {
            const cfg = pinConfig[pin.type]
            const Icon = cfg.icon
            return (
              <motion.div
                key={pin.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card p-4 flex items-center gap-3 cursor-pointer"
                onClick={() => setSelectedPin(pin)}
              >
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-sm truncate">{pin.label}</p>
                  <p className="text-xs font-medium text-slate-500 truncate">{pin.sub}</p>
                </div>
                {pin.price && <span className="text-xs font-black text-blue-700 flex-shrink-0">{pin.price}</span>}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
