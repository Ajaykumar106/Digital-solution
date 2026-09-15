import { Link } from "react-router-dom"
import { MapPin, Mail, Phone, Shield, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-10 bg-white border-t border-slate-100 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-[10px] shadow-md">DSLC</div>
              <div>
                <div className="font-extrabold text-slate-900">DSLC</div>
                <div className="text-[10px] text-slate-500 font-semibold">Digital Solutions for Local Communities</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
              Connecting citizens of Ranchi, Jharkhand to verified services, local businesses, and civic infrastructure — all in one platform.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active Hackathon Demo 2024
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-black text-slate-900 mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Find Services", path: "/services" },
                { label: "Local Businesses", path: "/businesses" },
                { label: "Community Pulse", path: "/community" },
                { label: "Community Map", path: "/map" },
                { label: "Emergency Resources", path: "/resources" },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-slate-500 font-medium hover:text-blue-600 hover:font-bold transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-black text-slate-900 mb-4 text-sm uppercase tracking-wider">For Citizens</h4>
            <ul className="space-y-2.5">
              {[
                "Report a Pothole",
                "Book a Plumber",
                "Find Nearest Hospital",
                "Support a Community Issue",
                "Discover Local Shops",
              ].map(item => (
                <li key={item}>
                  <span className="text-sm text-slate-500 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-slate-900 mb-4 text-sm uppercase tracking-wider">Quick Contacts</h4>
            <div className="space-y-3">
              {[
                { icon: Phone, label: "Police", val: "100", color: "text-blue-600" },
                { icon: Phone, label: "Ambulance", val: "108", color: "text-red-600" },
                { icon: Phone, label: "Fire Brigade", val: "101", color: "text-orange-600" },
                { icon: Phone, label: "RMC Helpline", val: "1800-345-6546", color: "text-purple-600" },
                { icon: MapPin, label: "Location", val: "Ranchi, Jharkhand", color: "text-emerald-600" },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-2">
                  <c.icon className={`h-3.5 w-3.5 ${c.color} flex-shrink-0`} />
                  <span className="text-xs font-bold text-slate-500">{c.label}:</span>
                  <span className={`text-xs font-black ${c.color}`}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Shield className="h-3.5 w-3.5 text-blue-500" />
            Built for the Digital Solutions for Local Communities Hackathon 2024 • Ranchi, Jharkhand
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-medium">Powered by</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">React</span>
              <span className="text-xs font-black text-purple-600 bg-purple-50 border border-purple-100 px-2 py-1 rounded-md">Tailwind</span>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md">Gemini AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
