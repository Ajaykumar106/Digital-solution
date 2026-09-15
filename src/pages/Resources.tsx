import { useAppContext } from "../context/AppContext"
import { Phone, ExternalLink, ShieldAlert, HeartPulse, Building, Bus, GraduationCap, Users } from "lucide-react"
import { Button } from "../components/ui/button"
import { motion } from "framer-motion"

export default function Resources() {
  const { resources } = useAppContext()

  const getIcon = (category: string) => {
    switch (category) {
      case 'Healthcare': return <HeartPulse className="h-8 w-8 text-red-600" />
      case 'Public Safety': return <ShieldAlert className="h-8 w-8 text-blue-600" />
      case 'Public Services': return <Building className="h-8 w-8 text-amber-600" />
      case 'Education': return <GraduationCap className="h-8 w-8 text-emerald-600" />
      case 'Transport': return <Bus className="h-8 w-8 text-purple-600" />
      case 'Community Help': return <Users className="h-8 w-8 text-pink-600" />
      default: return <Phone className="h-8 w-8 text-slate-500" />
    }
  }

  const getBg = (category: string) => {
    switch (category) {
      case 'Healthcare': return 'bg-red-50 border-red-100'
      case 'Public Safety': return 'bg-blue-50 border-blue-100'
      case 'Public Services': return 'bg-amber-50 border-amber-100'
      case 'Education': return 'bg-emerald-50 border-emerald-100'
      case 'Transport': return 'bg-purple-50 border-purple-100'
      case 'Community Help': return 'bg-pink-50 border-pink-100'
      default: return 'bg-slate-50 border-slate-200'
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">

      {/* ═══ BANNER ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg" style={{ minHeight: 240 }}>
        <img
          src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2070&auto=format&fit=crop"
          alt="Resources"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-900/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-12 py-10 flex flex-col justify-center gap-3">
          <div className="inline-block w-fit mb-2 px-3 py-1 rounded-full bg-purple-400/30 border border-purple-300/40 text-purple-200 text-xs font-bold uppercase tracking-wider">
            Emergency & Help
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">Community Resources</h1>
          <p className="text-white/75 font-medium max-w-md">Instant access to emergency services, municipal contacts, and critical community resources for all Ranchi residents.</p>
        </div>
      </section>

      {/* ═══ SOS PANEL ═══ */}
      <div className="rounded-3xl overflow-hidden border-2 border-red-200 bg-red-50 shadow-md">
        <div className="bg-red-600 px-6 py-3 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-white" />
          <span className="text-white font-black text-sm uppercase tracking-wide">🚨 Emergency SOS — Available 24/7</span>
        </div>
        <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-red-800 mb-1">In case of emergency, call immediately</h3>
            <p className="text-red-600 font-medium">Ambulance, Police, Fire Brigade — all available instantly</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="font-black bg-red-600 hover:bg-red-700 text-white border-none h-12 px-6 rounded-xl shadow-md">
              🚑 Ambulance (108)
            </Button>
            <Button className="font-black bg-red-600 hover:bg-red-700 text-white border-none h-12 px-6 rounded-xl shadow-md">
              🚔 Police (100)
            </Button>
            <Button className="font-black bg-orange-600 hover:bg-orange-700 text-white border-none h-12 px-6 rounded-xl shadow-md">
              🚒 Fire (101)
            </Button>
          </div>
        </div>
      </div>

      {/* ═══ RESOURCE CARDS ═══ */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-5">Key Community Contacts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((res, i) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col gap-4"
            >
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm ${getBg(res.category)}`}>
                {getIcon(res.category)}
              </div>
              <div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{res.category}</div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{res.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{res.description}</p>
              </div>
              <Button className="mt-auto h-12 rounded-xl font-bold border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-sm" variant="outline">
                {res.phone ? (
                  <><Phone className="h-4 w-4 mr-2 text-slate-400" /> {res.phone}</>
                ) : (
                  <><ExternalLink className="h-4 w-4 mr-2 text-slate-400" /> {res.actionText}</>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ TIPS ═══ */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-black text-slate-900 mb-4">💡 Tips for Residents</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: "📱", tip: "Save all emergency numbers in your contacts for quick access." },
            { icon: "📍", tip: "Share your exact location when calling emergency services." },
            { icon: "🤝", tip: "Report civic issues via DSLC Community Pulse for faster resolution." },
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white/60 rounded-2xl border border-slate-100">
              <span className="text-2xl flex-shrink-0">{t.icon}</span>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed">{t.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
