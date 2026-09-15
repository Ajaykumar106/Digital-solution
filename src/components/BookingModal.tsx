import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, CheckCircle2, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { useAppContext } from "../context/AppContext"
import { toast } from "sonner"

export default function BookingModal({ service, isOpen, onClose }: { service: any, isOpen: boolean, onClose: () => void }) {
  const { addBooking } = useAppContext()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  if (!isOpen) return null

  const handleBook = () => {
    if (!date || !time) {
      toast.error("Please select both date and time")
      return
    }
    
    addBooking({
      serviceId: service.id,
      serviceName: service.name,
      date,
      time
    })
    
    setStep(4)
    toast.success("Booking confirmed!")
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1)
      setDate("")
      setTime("")
    }, 300)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg glass-panel bg-white/90 rounded-3xl overflow-hidden z-10 border border-white/60 shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white/60">
            <h2 className="text-xl font-bold text-slate-900">
              {step === 4 ? "Booking Confirmed" : `Book ${service.name}`}
            </h2>
            <button onClick={handleClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{service.name}</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" /> {service.distance}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step 1: Choose Date</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Today", "Tomorrow", "Next Week"].map(d => (
                      <button 
                        key={d}
                        onClick={() => setDate(d)}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                          date === d 
                            ? "bg-blue-600 border-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]" 
                            : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-[0_4px_14px_rgba(37,99,235,0.3)] border-none" 
                  disabled={!date}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step 2: Choose Time</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"].map(t => (
                      <button 
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                          time === t 
                            ? "bg-blue-600 border-blue-600 text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]" 
                            : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 shadow-sm"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-14 rounded-xl bg-white border-slate-200 text-slate-700 font-bold hover:bg-slate-50 shadow-sm" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1 h-14 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-[0_4px_14px_rgba(37,99,235,0.3)] border-none" 
                    disabled={!time}
                    onClick={() => setStep(3)}
                  >
                    Review
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                  <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Provider</span>
                      <span className="text-slate-900 font-bold">{service.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Date</span>
                      <span className="text-slate-900 font-bold flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-500" /> {date}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Time</span>
                      <span className="text-slate-900 font-bold flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /> {time}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 border-t border-slate-100 pt-3">
                      <span className="font-medium">Starting Price</span>
                      <span className="text-slate-900 font-extrabold text-lg">₹{service.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-14 rounded-xl bg-white border-slate-200 text-slate-700 font-bold hover:bg-slate-50 shadow-sm" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-[2] h-14 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-[0_4px_14px_rgba(37,99,235,0.3)] border-none" onClick={handleBook}>
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full mb-2 shadow-inner border border-emerald-200">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Booking confirmed.</h3>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto">Your appointment with <strong className="text-slate-700">{service.name}</strong> is scheduled for <strong className="text-slate-700">{date}</strong> at <strong className="text-slate-700">{time}</strong>.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block text-left w-full max-w-xs shadow-inner">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Booking ID</span>
                  <span className="font-mono text-slate-700 font-bold tracking-widest text-lg">LX-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                </div>
                <Button className="w-full h-14 rounded-xl bg-white border-slate-200 text-slate-700 font-bold hover:bg-slate-50 shadow-sm mt-4" onClick={handleClose}>
                  Done
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
