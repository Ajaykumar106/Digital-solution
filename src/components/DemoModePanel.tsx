import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, Play, Zap } from "lucide-react"
import { Button } from "./ui/button"

export function DemoModePanel() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const demoSteps = [
    { title: "Find an Electrician", path: "/services", tag: "Services" },
    { title: "Report a Streetlight Issue", path: "/community", tag: "Community" },
    { title: "Discover Local Businesses", path: "/businesses", tag: "Businesses" },
    { title: "View Community Dashboard", path: "/dashboard", tag: "Dashboard" },
    { title: "Check My Activity", path: "/my-activity", tag: "Profile" },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-[72px] right-0 z-40 flex items-center gap-1.5 rounded-l-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white shadow-lg hover:bg-amber-600 transition-colors"
      >
        <Zap className="h-3.5 w-3.5" /> Judge Demo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">DSLC</p>
                <h3 className="text-lg font-bold">Judge Demo Mode</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 hover:bg-white/20 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-2.5">
              {demoSteps.map((step, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-between h-12 text-left font-medium border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  onClick={() => { navigate(step.path); setIsOpen(false) }}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">{i + 1}</span>
                    {step.title}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">{step.tag}</span>
                    <Play className="h-4 w-4 text-blue-500" />
                  </span>
                </Button>
              ))}

              <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
                <p className="text-sm font-semibold text-blue-800 mb-1">💬 Try the AI Assistant</p>
                <p className="text-xs text-blue-600">Click the chat bubble (bottom-right) and type <strong>"my water tap is leaking"</strong> to see AI-powered service matching in action.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
