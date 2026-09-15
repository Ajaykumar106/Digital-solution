import { useState } from "react"
import { Navigation, Wrench, Building2, AlertTriangle, HeartPulse } from "lucide-react"
import { motion } from "framer-motion"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Ranchi coordinates
const RANCHI_CENTER: [number, number] = [23.3441, 85.3096]

type PinType = "service" | "business" | "issue" | "resource"

const mapData = [
  // Services
  { id: "s1", type: "service" as PinType, label: "Rahul Electrical", sub: "Electrician • 4.8★", lat: 23.3481, lng: 85.3126, price: "₹300" },
  { id: "s2", type: "service" as PinType, label: "Kumar Plumbing", sub: "Plumber • 4.6★", lat: 23.3351, lng: 85.3216, price: "₹250" },
  { id: "s3", type: "service" as PinType, label: "Ranchi Auto Works", sub: "Mechanic • 4.9★", lat: 23.3510, lng: 85.2950, price: "₹500" },
  // Businesses
  { id: "b1", type: "business" as PinType, label: "Spice Route", sub: "Restaurant • Open", lat: 23.3411, lng: 85.3196, price: "" },
  { id: "b2", type: "business" as PinType, label: "Jharkhand Crafts", sub: "Handmade • Open", lat: 23.3581, lng: 85.3256, price: "" },
  { id: "b3", type: "business" as PinType, label: "Green Valley Pharmacy", sub: "Pharmacy • 24hr", lat: 23.3311, lng: 85.3156, price: "" },
  // Issues
  { id: "i1", type: "issue" as PinType, label: "Broken Streetlight", sub: "Kanke Road • Reported", lat: 23.3651, lng: 85.3196, price: "" },
  { id: "i2", type: "issue" as PinType, label: "Severe Pothole", sub: "Harmu Bypass • In Progress", lat: 23.3381, lng: 85.2896, price: "" },
  // Resources
  { id: "r1", type: "resource" as PinType, label: "RIMS Hospital", sub: "Emergency • 0651-2541000", lat: 23.3751, lng: 85.3296, price: "" },
  { id: "r2", type: "resource" as PinType, label: "City Police HQ", sub: "Public Safety • 100", lat: 23.3451, lng: 85.3056, price: "" },
]

const pinConfig = {
  service: { color: "text-white", bg: "bg-blue-600", bgHex: "#2563eb", icon: Wrench, label: "Services" },
  business: { color: "text-white", bg: "bg-emerald-500", bgHex: "#10b981", icon: Building2, label: "Businesses" },
  issue: { color: "text-white", bg: "bg-amber-500", bgHex: "#f59e0b", icon: AlertTriangle, label: "Issues" },
  resource: { color: "text-white", bg: "bg-red-500", bgHex: "#ef4444", icon: HeartPulse, label: "Resources" },
}

const filterOptions: { key: PinType | "all"; label: string; color: string }[] = [
  { key: "all", label: "All", color: "bg-slate-900 text-white" },
  { key: "service", label: "Services", color: "bg-blue-600 text-white" },
  { key: "business", label: "Businesses", color: "bg-emerald-500 text-white" },
  { key: "issue", label: "Issues", color: "bg-amber-500 text-white" },
  { key: "resource", label: "Emergency", color: "bg-red-500 text-white" },
]

// Component to dynamically set map view
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  map.setView(center, map.getZoom())
  return null
}

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState<PinType | "all">("all")
  const [activeCenter, setActiveCenter] = useState<[number, number]>(RANCHI_CENTER)

  const visiblePins = activeFilter === "all" ? mapData : mapData.filter(p => p.type === activeFilter)

  // Custom marker icon creator
  const createCustomIcon = (type: PinType) => {
    const bgHex = pinConfig[type].bgHex
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div style="background-color: ${bgHex}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                ${type === 'service' ? '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' : ''}
                ${type === 'business' ? '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>' : ''}
                ${type === 'issue' ? '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>' : ''}
                ${type === 'resource' ? '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 13v6"/><path d="M9 16h6"/>' : ''}
              </svg>
            </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    })
  }

  return (
    <div className="space-y-6 pb-10">

      {/* ═══ BANNER ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 180 }}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80&auto=format&fit=crop"
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 px-8 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-black uppercase tracking-widest">
              📍 Real Interactive Map
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow mb-2">Community Map</h1>
            <p className="text-white/70 font-medium max-w-sm text-sm">Explore live services, businesses, civic issues, and emergency resources dynamically pinned across Ranchi.</p>
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
              {f.key === 'all' ? mapData.length : mapData.filter(p => p.type === f.key).length}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Real Map Area */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl" style={{ height: 560 }}>
        <MapContainer 
          center={RANCHI_CENTER} 
          zoom={13} 
          style={{ height: '100%', width: '100%', zIndex: 10 }}
          zoomControl={false}
        >
          <MapUpdater center={activeCenter} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {visiblePins.map((pin) => (
            <Marker 
              key={pin.id} 
              position={[pin.lat, pin.lng]}
              icon={createCustomIcon(pin.type)}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="p-1 w-48">
                  <div className={`-mt-1 -mx-1 -pt-1 px-3 py-2 rounded-t-lg mb-2 text-white font-black text-xs ${pinConfig[pin.type].bg}`}>
                    {pinConfig[pin.type].label}
                  </div>
                  <h3 className="font-black text-slate-900 text-sm mb-1">{pin.label}</h3>
                  <p className="text-slate-500 text-xs font-medium mb-3">{pin.sub}</p>
                  
                  {pin.price && (
                    <div className="flex items-center justify-between bg-blue-50 rounded-lg px-2 py-1.5 mb-2 border border-blue-100">
                      <span className="text-[10px] font-bold text-slate-500">Starting at</span>
                      <span className="font-black text-blue-700 text-sm">{pin.price}</span>
                    </div>
                  )}
                  
                  <button className="w-full py-2 rounded-lg text-xs font-black bg-slate-900 text-white hover:bg-slate-700 transition-colors">
                    {pin.type === 'service' ? 'Book Now' :
                     pin.type === 'business' ? 'View Shop' :
                     pin.type === 'resource' ? 'Call Now' : 'View Issue'}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 z-[20] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100">
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
        <h2 className="text-xl font-black text-slate-900 mb-4">📍 Tap to Navigate</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mapData.slice(0, 4).map((pin, i) => {
            const cfg = pinConfig[pin.type]
            const Icon = cfg.icon
            return (
              <motion.div
                key={pin.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card p-4 flex items-center gap-3 cursor-pointer hover:border-blue-200 hover:shadow-md"
                onClick={() => setActiveCenter([pin.lat, pin.lng])}
              >
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-sm truncate">{pin.label}</p>
                  <p className="text-[11px] font-bold text-slate-500 truncate mt-0.5">{pin.sub}</p>
                </div>
                <Navigation className="h-4 w-4 text-slate-400" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
