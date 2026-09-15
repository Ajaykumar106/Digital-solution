import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Search, Star, MapPin, Phone, X, Bookmark, BookmarkCheck, Clock } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

const categories = ["All", "Food", "Handmade", "Retail", "Grocery", "Pharmacy", "Cafe"]

export default function Businesses() {
  const { businesses, toggleSaveBusiness, savedBusinesses } = useAppContext()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selected, setSelected] = useState<any>(null)

  const filtered = businesses.filter(biz => {
    const matchesSearch = biz.name.toLowerCase().includes(search.toLowerCase()) ||
      biz.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "All" || biz.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 pb-10">

      {/* ═══ BANNER ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg" style={{ minHeight: 260 }}>
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop"
          alt="Businesses"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-900/70 to-transparent" />
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-10 gap-6">
          <div>
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-emerald-400/30 border border-emerald-400/40 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              Support Local
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Local Businesses</h1>
            <p className="text-white/75 font-medium max-w-sm">Discover and support the businesses that make Ranchi unique.</p>
          </div>
          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
            <Input
              className="w-full pl-12 h-14 rounded-2xl bg-white border-0 text-slate-900 shadow-xl placeholder:text-slate-400 font-medium"
              placeholder="Search restaurants, shops..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map(cat => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 h-11 text-sm font-bold whitespace-nowrap flex-shrink-0 border transition-all ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 shadow-sm"
            }`}
            variant="outline"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((biz, i) => (
          <motion.div
            key={biz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card flex flex-col cursor-pointer group"
            onClick={() => setSelected(biz)}
          >
            <div className="relative h-44 overflow-hidden rounded-t-2xl">
              <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${biz.isOpen ? 'bg-emerald-500 text-white' : 'bg-slate-600/80 text-white'}`}>
                {biz.isOpen ? '● Open' : '● Closed'}
              </div>
              <button
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                onClick={e => { e.stopPropagation(); toggleSaveBusiness(biz.id); }}
              >
                {savedBusinesses.includes(biz.id)
                  ? <BookmarkCheck className="h-4 w-4 text-blue-600" />
                  : <Bookmark className="h-4 w-4 text-slate-500" />
                }
              </button>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wide">{biz.category}</div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-emerald-600 transition-colors">{biz.name}</h3>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg flex-shrink-0">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-black text-amber-600">{biz.rating}</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-4 flex-1">{biz.description}</p>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-4">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" /> {biz.distance} away
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card text-slate-500 font-medium text-lg">
          No businesses found.
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden z-10 shadow-2xl border border-slate-100"
            >
              <div className="relative h-56">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white"
                >
                  <X className="h-5 w-5 text-slate-700" />
                </button>
                <div className={`absolute bottom-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow ${selected.isOpen ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'}`}>
                  {selected.isOpen ? '● Open Now' : '● Closed'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wide">{selected.category}</div>
                    <h2 className="text-2xl font-black text-slate-900">{selected.name}</h2>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-black text-amber-600">{selected.rating}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-5 font-medium leading-relaxed">{selected.description}</p>
                <div className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-5">
                  <div className="flex items-center gap-3 text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span className="font-semibold text-sm">{selected.distance} away • Ranchi, Jharkhand</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-sm">9:00 AM – 9:00 PM</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 h-12 rounded-xl font-bold"
                    variant="outline"
                    onClick={() => { toggleSaveBusiness(selected.id); }}
                  >
                    {savedBusinesses.includes(selected.id) ? (
                      <><BookmarkCheck className="h-4 w-4 mr-2 text-blue-600" /> Saved</>
                    ) : (
                      <><Bookmark className="h-4 w-4 mr-2" /> Save</>
                    )}
                  </Button>
                  <Link to="/map" className="flex-[2]">
                    <Button className="w-full h-12 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white border-none">
                      Get Directions
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
