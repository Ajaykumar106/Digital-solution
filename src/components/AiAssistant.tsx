import { useState, useRef, useEffect } from "react"
import { X, Send, Bot, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  role: 'ai' | 'user'
  content: string
  action?: { label: string; link: string }
}

const QUICK_PROMPTS = ["Find plumber 🔧", "Report pothole 🚧", "Emergency contacts 🚨", "Local food 🍽️"]

// Rich rule-based fallback — each answer is unique
function getRuleBasedResponse(msg: string): Message {
  const lower = msg.toLowerCase()

  if (lower.includes('plumb') || lower.includes('tap') || lower.includes('drain') || lower.includes('leak')) {
    return { role: 'ai', content: "Found it! 🔧 Kumar Plumbing Solutions is rated 4.6⭐ and is just 2.5 km away. They're available today. You can book them directly and they'll arrive same-day. Starting at ₹250 per visit.", action: { label: "Book Kumar Plumbing →", link: "/services" } }
  }
  if (lower.includes('electr') || lower.includes('wire') || lower.includes('switch') || lower.includes('power')) {
    return { role: 'ai', content: "Perfect! ⚡ Rahul Electrical Services is available RIGHT NOW and is just 1.2 km from you. He's rated 4.8⭐ with 124 reviews. One of the best-reviewed electricians in Ranchi.", action: { label: "Book Electrician →", link: "/services" } }
  }
  if (lower.includes('road') || lower.includes('pothole') || lower.includes('bump')) {
    return { role: 'ai', content: "Let's report that! 🚧 I'll help you submit this directly to Ranchi Municipal Corporation (RMC). Your report will be tracked publicly and other citizens can support it, increasing chances of faster resolution.", action: { label: "Report Pothole →", link: "/community" } }
  }
  if (lower.includes('garbage') || lower.includes('waste') || lower.includes('dirty') || lower.includes('trash')) {
    return { role: 'ai', content: "Waste management issues affect everyone. 🗑️ Report this to RMC via the Community Pulse — select 'Waste' category. Reports with photos get resolved 40% faster!", action: { label: "Report Garbage Issue →", link: "/community" } }
  }
  if (lower.includes('water') || lower.includes('supply') || lower.includes('borewell')) {
    return { role: 'ai', content: "Water supply issues are critical! 💧 Call RMC at 1800-345-6546 or report it as 'Water' category in Community Pulse. 82 residents in Bariatu already raised similar issues — you can join and support that report.", action: { label: "View Water Issues →", link: "/community" } }
  }
  if (lower.includes('hospital') || lower.includes('doctor') || lower.includes('medical') || lower.includes('ambulance')) {
    return { role: 'ai', content: "Medical emergency? 🏥 Call 108 for ambulance immediately. RIMS Hospital emergency is at 0651-2541000. Sadar Hospital also provides free OPD services. I've listed all healthcare resources for you.", action: { label: "Emergency Resources →", link: "/resources" } }
  }
  if (lower.includes('police') || lower.includes('theft') || lower.includes('crime') || lower.includes('danger')) {
    return { role: 'ai', content: "Safety first! 🚔 Call 100 for police immediately. Ranchi Police Control Room operates 24/7. For non-emergency FIR registration, you can also visit the nearest police station.", action: { label: "View Safety Resources →", link: "/resources" } }
  }
  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat') || lower.includes('hungry')) {
    return { role: 'ai', content: "Hungry? 🍽️ Spice Route Restaurant is just 0.5 km away and is open right now! They serve excellent litti chokha and North Indian thali. Rated 4.7⭐ by the community.", action: { label: "Find Restaurants →", link: "/businesses" } }
  }
  if (lower.includes('shop') || lower.includes('market') || lower.includes('buy') || lower.includes('store')) {
    return { role: 'ai', content: "Let me find you the best local shops! 🏪 Ranchi has amazing local businesses — from Jharkhand handicrafts to electronics to groceries. Browse our full directory with open/closed status.", action: { label: "Explore Local Shops →", link: "/businesses" } }
  }
  if (lower.includes('ac') || lower.includes('air condition') || lower.includes('cooling')) {
    return { role: 'ai', content: "AC issues? ❄️ CoolBreeze AC Repair is available today, just 4.1 km from you, rated 4.5⭐. They handle all brands — split, window, central. Starting at ₹450 per service call.", action: { label: "Book AC Repair →", link: "/services" } }
  }
  if (lower.includes('clean') || lower.includes('maid') || lower.includes('sweep') || lower.includes('wash')) {
    return { role: 'ai', content: "Home cleaning sorted! 🧹 SparkClean Home Services is available right now, just 1.9 km away, and rated 4.6⭐. They handle deep cleaning, regular cleaning, and post-construction cleaning.", action: { label: "Book Cleaning →", link: "/services" } }
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('namaste')) {
    return { role: 'ai', content: "Namaste! 🙏 I'm DSLC AI, your digital assistant for Ranchi community services. I can help you find plumbers, electricians, restaurants, report civic issues, or get emergency contacts. What do you need today?" }
  }
  if (lower.includes('map') || lower.includes('location') || lower.includes('where') || lower.includes('near')) {
    return { role: 'ai', content: "Looking for something nearby? 📍 Our interactive Community Map shows all services, businesses, issues, and emergency resources near you in Ranchi. Tap any pin for details!", action: { label: "Open Community Map →", link: "/map" } }
  }

  return { role: 'ai', content: "I can help you with: 🔧 Finding local services (plumbers, electricians, tutors), 🏪 Discovering businesses near you, 🚧 Reporting civic issues to RMC, or 🚨 Emergency contacts. What would you like help with?", action: { label: "Explore All Features →", link: "/dashboard" } }
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Namaste! 🙏 I'm DSLC AI, your community assistant for Ranchi. Ask me to find a plumber, report a pothole, locate a hospital, or discover local businesses!" }
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text?: string) => {
    const userMsg = (text || input).trim()
    if (!userMsg) return
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput("")
    setIsTyping(true)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY

    if (!apiKey) {
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, getRuleBasedResponse(userMsg)])
      }, 900)
      return
    }

    try {
      const systemInstruction = `You are DSLC AI (Digital Solutions for Local Communities), a helpful and friendly community assistant specifically for Ranchi, Jharkhand, India. 

Your role:
- Help citizens find local services: plumbers (Kumar Plumbing Solutions, ₹250), electricians (Rahul Electrical, ₹300), AC repair (CoolBreeze, ₹450), tutors (Saraswati Tutors, ₹400/hr)
- Suggest local businesses: Spice Route Restaurant (4.7★, 0.5km), Jharkhand Handicrafts (4.9★), Green Valley Pharmacy (4.8★)
- Guide users to report civic issues to RMC (Ranchi Municipal Corporation) via Community Pulse feature
- Share emergency contacts: Ambulance 108, Police 100, Fire 101, RIMS Hospital 0651-2541000

Rules:
- Keep responses to 2-3 sentences max
- Be warm, friendly, and practical
- Always suggest a specific action the user can take
- Use local Ranchi context (mention real area names like Harmu, Kanke Road, Bariatu, Morabadi when relevant)
- Use one relevant emoji per response`

      const contents = messages.slice(-6).map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
      contents.push({ role: 'user', parts: [{ text: userMsg }] })

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: { temperature: 0.85, maxOutputTokens: 180, topP: 0.9 }
        })
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      const aiText = data.candidates[0].content.parts[0].text
      setIsTyping(false)
      setMessages(prev => [...prev, { role: 'ai', content: aiText }])
    } catch {
      setIsTyping(false)
      setMessages(prev => [...prev, getRuleBasedResponse(userMsg)])
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            data-ai-trigger
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-blue-600 text-white font-black shadow-[0_8px_30px_rgba(37,99,235,0.45)] hover:bg-blue-700 border border-blue-500"
            onClick={() => setIsOpen(true)}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <Bot className="h-5 w-5" />
            </motion.div>
            DSLC AI
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col w-[350px] md:w-[400px] bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Bot className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <div className="font-black text-sm leading-none">DSLC AI</div>
                  <div className="text-[11px] text-blue-200 font-semibold mt-0.5 flex items-center gap-1.5">
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                    />
                    Powered by Google Gemini
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100 flex gap-2 overflow-x-auto scrollbar-hide">
              {QUICK_PROMPTS.map(p => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(p.replace(/[^a-zA-Z ]/g, '').trim())}
                  className="flex-shrink-0 text-xs font-black text-blue-700 bg-white border border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
                >
                  {p}
                </motion.button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 overflow-y-auto px-4 py-4" style={{ maxHeight: 320, minHeight: 220 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-900 rounded-tl-sm border border-slate-200'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.action && (
                    <Link to={msg.action.link} onClick={() => setIsOpen(false)}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition-all shadow-sm"
                      >
                        {msg.action.label}
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-1.5 bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 w-fit border border-slate-200"
                  >
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-slate-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.18 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-100 bg-white flex gap-2 items-center">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !isTyping && sendMessage()}
                placeholder="Ask about services, issues, emergency..."
                className="flex-1 rounded-2xl border-slate-200 bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 h-12"
              />
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="h-12 w-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white border-none flex-shrink-0 shadow-md disabled:opacity-50"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
