import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Search, Star, MapPin, CheckCircle, Clock, Zap } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import BookingModal from "../components/BookingModal"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["All", "Electrician", "Plumber", "Mechanic", "Tutor", "AC Repair", "Cleaning", "Carpentry", "Painting"]

export default function Services() {
  const { services } = useAppContext()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedService, setSelectedService] = useState<any>(null)

  const filteredServices = services.filter(srv => {
    const matchesSearch =
      srv.name.toLowerCase().includes(search.toLowerCase()) ||
      srv.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "All" || srv.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 pb-10">

      {/* ═══ HERO BANNER — clear image, minimal overlay ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 280 }}>
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=90&auto=format&fit=crop"
          alt="Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle dark-left gradient — image clearly visible on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/20" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-14 py-10 gap-6"
        >
          <div>
            <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-400/20 border border-blue-300/30 text-blue-200 text-xs font-black uppercase tracking-widest backdrop-blur-sm">
              ✅ Verified Professionals
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-3">
              Local Services
            </h1>
            <p className="text-white/75 font-medium max-w-sm text-base">
              Background-checked, community-rated professionals for every need in Ranchi.
            </p>
            <div className="flex gap-4 mt-4 text-white/70 text-sm font-semibold">
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.8 avg rating</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-emerald-400" /> Same-day booking</span>
            </div>
          </div>
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
            <Input
              className="w-full pl-12 h-14 rounded-2xl bg-white border-0 text-slate-900 shadow-2xl font-medium placeholder:text-slate-400"
              placeholder="Search plumber, electrician, tutor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 h-11 text-sm font-black whitespace-nowrap flex-shrink-0 border transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-700 shadow-sm"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-500">
          Showing <span className="text-slate-900 font-black">{filteredServices.length}</span> professionals
          {selectedCategory !== "All" && <> in <span className="text-blue-600">{selectedCategory}</span></>}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {services.filter(s => s.availability === "Available Now").length} available right now
        </div>
      </div>

      {/* Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-slate-700 font-black text-xl mb-2">No services found</p>
          <p className="text-slate-500 font-medium">Try a different category or search term</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredServices.map((srv, i) => (
              <motion.div
                key={srv.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass-card flex flex-col cursor-pointer group"
                onClick={() => setSelectedService(srv)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl bg-slate-100">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=70`
                    }}
                  />
                  {/* Category pill */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-xs font-black text-slate-800 px-3 py-1.5 rounded-full shadow-sm">
                    {srv.category}
                  </div>
                  {/* Verified badge */}
                  {srv.verified && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-md" title="Verified Professional">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                  {/* Availability */}
                  {srv.availability === "Available Now" && (
                    <motion.div
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Available Now
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-black text-slate-900 text-lg leading-tight mb-1.5 group-hover:text-blue-600 transition-colors">
                    {srv.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-black text-amber-600">{srv.rating}</span>
                    <span className="text-slate-400 font-medium">({srv.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-blue-500" /> {srv.distance}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {srv.availability}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Starting at</div>
                      <div className="text-2xl font-black text-slate-900">₹{srv.price}</div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-md border-none px-5 h-11"
                        onClick={e => { e.stopPropagation(); setSelectedService(srv); }}
                      >
                        Book Now
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          isOpen={true}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  )
}
