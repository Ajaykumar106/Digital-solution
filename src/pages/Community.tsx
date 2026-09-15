import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { MapPin, ThumbsUp, Calendar, Plus, Filter, Image as ImageIcon, ArrowUpRight } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function Community() {
  const { issues, addIssue, supportIssue } = useAppContext()
  const [activeTab, setActiveTab] = useState<"pulse" | "report">("pulse")
  const [filterStatus, setFilterStatus] = useState("All")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Road")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [urgency, setUrgency] = useState("Medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !location) { toast.error("Please fill all required fields"); return }
    addIssue({ title, category, description, location, urgency })
    toast.success("Issue reported to RMC! Thank you for making Ranchi better. 🙌")
    setTitle(""); setDescription(""); setLocation("")
    setActiveTab("pulse")
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Reported': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Under Review': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'In Progress': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      default: return 'bg-slate-100 text-slate-600 border-slate-200'
    }
  }

  const getUrgencyDot = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-500'
      case 'High': return 'bg-orange-500'
      case 'Medium': return 'bg-amber-400'
      default: return 'bg-slate-300'
    }
  }

  const filteredIssues = filterStatus === "All" ? issues : issues.filter(i => i.status === filterStatus)

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">

      {/* ═══ BANNER with REAL PHOTO ═══ */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 280 }}>
        <img
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=80&auto=format&fit=crop"
          alt="Community people"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-amber-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-8 md:px-14 py-12 flex flex-col justify-center gap-4"
        >
          <div className="inline-block w-fit px-4 py-1.5 rounded-full bg-amber-400/25 border border-amber-300/40 text-amber-100 text-xs font-black uppercase tracking-widest backdrop-blur-sm">
            🏛️ Civic Engagement
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">Community Pulse</h1>
          <p className="text-white/80 font-medium max-w-md text-lg">Report civic issues, vote on problems, and track how Ranchi is improving — together.</p>
          <div className="flex flex-wrap gap-5 mt-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
            >
              <span className="text-white font-black text-lg">{issues.length}</span>
              <span className="text-white/70 text-sm font-semibold">Issues Reported</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
            >
              <span className="text-emerald-300 font-black text-lg">{issues.filter(i => i.status === 'Resolved').length}</span>
              <span className="text-white/70 text-sm font-semibold">Resolved</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
            >
              <span className="text-blue-300 font-black text-lg">{issues.reduce((s, i) => s + i.supporters, 0)}</span>
              <span className="text-white/70 text-sm font-semibold">Supporters</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tabs */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab("pulse")}
          className={`flex-1 py-3.5 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'pulse'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          🔥 Community Pulse
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'pulse' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{issues.length}</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab("report")}
          className={`flex-1 py-3.5 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'report'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Plus className="h-4 w-4" /> Report Issue
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'pulse' ? (
          <motion.div key="pulse" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
              <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
              {["All", "Reported", "Under Review", "In Progress", "Resolved"].map(s => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap flex-shrink-0 border transition-all ${
                    filterStatus === s ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {s} {s === "All" ? `(${issues.length})` : `(${issues.filter(i => i.status === s).length})`}
                </motion.button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <AnimatePresence>
                {filteredIssues.map((issue, i) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="glass-card p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getUrgencyDot(issue.urgency)}`} />
                        <h3 className="font-black text-slate-900 text-lg leading-tight">{issue.title}</h3>
                      </div>
                      <span className={`text-xs font-black px-3 py-1.5 rounded-full border flex-shrink-0 ${getStatusStyle(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm font-medium line-clamp-2 leading-relaxed">{issue.description}</p>

                    <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                      <MapPin className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm font-bold text-slate-700">{issue.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <span className={`px-2 py-1 rounded-md ${
                          issue.urgency === 'Critical' ? 'bg-red-50 text-red-600' :
                          issue.urgency === 'High' ? 'bg-orange-50 text-orange-600' :
                          'bg-slate-100 text-slate-500'
                        }`}>{issue.urgency}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{issue.date}</span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border border-slate-200 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
                        onClick={() => { supportIssue(issue.id); toast.success(`Supported! ${issue.supporters + 1} total.`); }}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" /> {issue.supporters} Support
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div key="report" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
                <h2 className="text-2xl font-black text-white mb-1">Report a Civic Issue</h2>
                <p className="text-white/80 font-medium">Your report goes directly to Ranchi Municipal Corporation for action.</p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <div className="space-y-1.5">
                  <Label className="text-slate-800 font-black">Issue Title <span className="text-red-500">*</span></Label>
                  <Input className="h-12 border-slate-200 bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 rounded-xl" placeholder="E.g., Broken streetlight on Station Road" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-slate-800 font-black">Category</Label>
                    <select className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-400 outline-none" value={category} onChange={e => setCategory(e.target.value)}>
                      <option>Road</option><option>Streetlight</option><option>Water</option>
                      <option>Waste</option><option>Transport</option><option>Public Safety</option><option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-800 font-black">Urgency Level</Label>
                    <select className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-400 outline-none" value={urgency} onChange={e => setUrgency(e.target.value)}>
                      <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-800 font-black">Exact Location <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                    <Input className="pl-11 h-12 border-slate-200 bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 rounded-xl" placeholder="Street name, landmark, area in Ranchi..." value={location} onChange={e => setLocation(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-800 font-black">Description <span className="text-red-500">*</span></Label>
                  <textarea className="w-full min-h-[110px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 outline-none resize-none" placeholder="Describe the issue in detail — duration, severity, any safety risks for residents..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <label className="block">
                  <input type="file" className="hidden" accept="image/*" />
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-200 rounded-2xl p-8 cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-colors"
                  >
                    <ImageIcon className="h-7 w-7 text-slate-400" />
                    <div className="text-sm font-bold text-slate-500">Click to attach a photo <span className="text-slate-400 font-medium">(optional, helps RMC act faster)</span></div>
                  </motion.div>
                </label>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" className="w-full h-14 rounded-2xl text-base font-black bg-amber-600 hover:bg-amber-700 text-white shadow-lg border-none flex items-center justify-center gap-2">
                    🚨 Submit Report to RMC <ArrowUpRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
