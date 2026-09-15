import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { MapPin, ArrowRight, Wrench, Building2, AlertOctagon, HeartHandshake, Users, TrendingUp, ShieldCheck, Zap, CheckCircle } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="flex flex-col gap-20 pb-10">

      {/* ══════════════════════════════════════════
          HERO — Parallax + Clear Image (FULL BLEED)
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden shadow-2xl -mt-6" style={{ height: "calc(100vh - 64px)", minHeight: 600 }}>
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=90&auto=format&fit=crop"
            alt="Community"
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.1)" }}
          />
        </motion.div>
        {/* Lighter overlay so image is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/65 via-blue-900/50 to-indigo-900/60" />
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-full"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 backdrop-blur-md px-5 py-2.5 text-sm font-bold text-white shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <MapPin className="h-4 w-4 text-blue-300" />
            Powering Communities in Ranchi, Jharkhand
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as any }}
            className="mb-5 text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white drop-shadow-lg"
          >
            Digital Solutions
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-300 to-cyan-300"
            >
              for Local Communities
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mb-10 max-w-2xl text-lg md:text-xl text-white/85 font-medium leading-relaxed drop-shadow"
          >
            One platform for every citizen — find trusted services, support local businesses, report civic issues, and access emergency resources.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/services">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-white text-blue-900 font-black text-base shadow-2xl hover:bg-blue-50 border-none">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/community">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-white/50 bg-white/15 backdrop-blur-md text-white font-black text-base hover:bg-white/25">
                  Report a Problem
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            {[
              { value: "12,400+", label: "Citizens Served" },
              { value: "326", label: "Verified Pros" },
              { value: "87", label: "Issues Resolved" },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs font-bold text-white/65">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-8 bg-white/40 rounded-full" />
          <div className="text-white/50 text-xs font-semibold">Scroll</div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          ANIMATED STATS
      ══════════════════════════════════════════ */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="pt-10"
      >
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest">Live Impact</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { icon: Users, target: 12400, suffix: "+", label: "Citizens Served", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
            { icon: CheckCircle, target: 326, suffix: "", label: "Verified Providers", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { icon: AlertOctagon, target: 87, suffix: "", label: "Issues Resolved", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { icon: Building2, target: 142, suffix: "", label: "Local Businesses", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass-card p-6 flex flex-col items-center text-center gap-3 border ${s.border}`}
            >
              <motion.div
                className={`h-14 w-14 rounded-2xl ${s.bg} flex items-center justify-center`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <s.icon className={`h-7 w-7 ${s.color}`} />
              </motion.div>
              <div className={`text-4xl font-black ${s.color}`}>
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-sm font-bold text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════
          CORE FEATURES
      ══════════════════════════════════════════ */}
      <section>
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest">What We Offer</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">Everything your community<br />needs, in one place.</h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto font-medium text-lg">Built specifically for residents of Ranchi, Jharkhand.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {[
            {
              icon: Wrench, color: "text-blue-600", bg: "bg-blue-100", border: "border-t-blue-500",
              imgUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
              title: "Local Services",
              desc: "Book verified plumbers, electricians, AC repair, tutors, and mechanics. All background-checked and rated by your neighbors.",
              cta: "Find Professionals", link: "/services",
              tags: ["4.8★ avg rating", "Verified pros", "Same-day booking"]
            },
            {
              icon: Building2, color: "text-emerald-600", bg: "bg-emerald-100", border: "border-t-emerald-500",
              imgUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
              title: "Local Businesses",
              desc: "Discover restaurants, handicraft shops, grocery stores, and pharmacies — all within walking distance.",
              cta: "Explore Shops", link: "/businesses",
              tags: ["142+ listed", "Open/Closed status", "Save favorites"]
            },
            {
              icon: AlertOctagon, color: "text-amber-600", bg: "bg-amber-100", border: "border-t-amber-500",
              imgUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80",
              title: "Community Pulse",
              desc: "Report potholes, water failures, broken lights, and garbage overflow. Track resolution in real-time with status updates.",
              cta: "Report Issue", link: "/community",
              tags: ["Real-time tracking", "Community voting", "Direct to RMC"]
            },
            {
              icon: HeartHandshake, color: "text-purple-600", bg: "bg-purple-100", border: "border-t-purple-500",
              imgUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
              title: "Emergency Resources",
              desc: "Instant access to emergency contacts, RIMS Hospital, Police, fire brigade, and municipal helplines.",
              cta: "Get Help Now", link: "/resources",
              tags: ["24/7 emergency lines", "Hospital locator", "Municipal contacts"]
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`glass-card flex flex-col overflow-hidden border-t-4 ${f.border} group`}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={f.imgUrl} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.bg} shadow-md`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">{f.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {f.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={f.link} className="mt-auto">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-black h-12 transition-all">
                      {f.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          AI ASSISTANT SECTION
      ══════════════════════════════════════════ */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: 240 }}>
        <img
          src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format&fit=crop"
          alt="AI"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-blue-900/80 to-indigo-900/70" />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-sm uppercase tracking-wider">AI-Powered Intelligence</span>
            </motion.div>
            <h2 className="text-4xl font-black text-white mb-4">Meet DSLC AI</h2>
            <p className="text-white/75 font-medium max-w-lg leading-relaxed">
              Tell us your problem in plain language — "I have a water leak" or "there's a pothole near my house" — our AI instantly connects you to the right service or authority. Powered by <strong className="text-white">Google Gemini</strong>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Find a plumber", "Report pothole", "Nearest hospital", "Local food"].map(p => (
                <span key={p} className="text-xs font-bold text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">{p}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-20 h-20 rounded-3xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-4xl">🤖</span>
            </motion.div>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white text-blue-900 font-black text-base shadow-2xl hover:bg-blue-50"
              >
                Ask DSLC AI →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — Premium Animated (Dark)
      ══════════════════════════════════════════ */}
      <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 px-6 py-20 md:px-12 md:py-28 shadow-2xl my-10">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-black uppercase tracking-widest backdrop-blur-md">Simple Process</div>
          <h2 className="text-4xl md:text-5xl font-black text-white">How DSLC Works</h2>
          <p className="mt-4 text-slate-400 font-medium text-lg max-w-xl mx-auto">Three simple steps to connect with your community.</p>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-blue-500/30 via-emerald-500/30 to-purple-500/30 z-0" />

          {[
            {
              step: "01", emoji: "🔍", title: "Find What You Need",
              desc: "Browse verified services, local businesses, or emergency resources — organized for your community.",
              color: "from-blue-400 to-blue-600", bg: "bg-slate-800/50", glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]", delay: 0
            },
            {
              step: "02", emoji: "⚡", title: "Connect Instantly",
              desc: "Book a service, report a civic issue, or contact an authority — all in under 60 seconds, no paperwork.",
              color: "from-emerald-400 to-emerald-600", bg: "bg-slate-800/50", glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]", delay: 0.15
            },
            {
              step: "03", emoji: "🏆", title: "Track & Earn Points",
              desc: "Follow up on bookings and civic issues in real-time. Your activity builds your community impact score.",
              color: "from-purple-400 to-purple-600", bg: "bg-slate-800/50", glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]", delay: 0.3
            },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: s.delay, ease: "easeOut" as any }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`p-8 text-center relative z-10 rounded-3xl border border-white/10 backdrop-blur-xl ${s.bg} ${s.glow} transition-shadow duration-300`}
            >
              <div className="relative inline-block mb-6">
                <motion.div
                  className={`w-[104px] h-[104px] rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-2xl mx-auto ring-4 ring-slate-900`}
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                >
                  <span className="text-5xl">{s.emoji}</span>
                </motion.div>
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 text-sm font-black shadow-xl ring-4 ring-slate-900">
                  {s.step}
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST FOOTER BANNER
      ══════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <div className="flex items-center gap-5">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg"
          >
            <ShieldCheck className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">Built for Jharkhand</h3>
            <p className="text-slate-500 font-medium">Hackathon Project — Digital Solutions for Local Communities 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </motion.div>
          <span className="text-slate-700 font-black text-lg">12,400+ citizens already benefitting</span>
        </div>
      </motion.section>
    </div>
  )
}
