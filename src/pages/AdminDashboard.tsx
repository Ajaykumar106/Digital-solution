import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { ShieldAlert, CheckCircle, Clock, Users, Activity } from "lucide-react"
import { Button } from "../components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminDashboard() {
  const { issues, bookings, updateIssueStatus, updateBookingStatus } = useAppContext()
  const [activeTab, setActiveTab] = useState<"issues" | "bookings">("issues")

  // Stats
  const pendingIssues = issues.filter(i => i.status !== 'Resolved' && i.status !== 'Rejected').length
  const totalIssues = issues.length
  const activeBookings = bookings.filter(b => b.status === 'Confirmed').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reported': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200'
      case 'Confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 rounded-3xl p-8 shadow-xl text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-black uppercase tracking-widest mb-3">
            <ShieldAlert className="h-4 w-4" /> System Admin
          </div>
          <h1 className="text-3xl font-black">Admin Control Panel</h1>
          <p className="text-slate-400 font-medium text-sm mt-1">Manage community reports and service bookings in real-time.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center border border-white/10">
            <div className="text-3xl font-black text-white">{pendingIssues}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Issues</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 text-center border border-white/10">
            <div className="text-3xl font-black text-emerald-400">{activeBookings}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Bookings</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("issues")}
          className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
            activeTab === "issues" ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Civic Issues ({totalIssues})
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
            activeTab === "bookings" ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Service Bookings ({bookings.length})
        </button>
      </div>

      {/* Content */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "issues" && (
              <div className="divide-y divide-slate-100">
                {issues.length === 0 ? (
                  <div className="p-10 text-center text-slate-500 font-medium">No issues reported yet.</div>
                ) : (
                  issues.map(issue => (
                    <div key={issue.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-black border ${getStatusColor(issue.status)}`}>
                            {issue.status}
                          </span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{issue.category} • {issue.date}</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-1">{issue.title}</h3>
                        <p className="text-slate-500 text-sm font-medium mb-2">{issue.desc}</p>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {issue.supporters} Supporters</span>
                          <span>Reported by: Citizen_{issue.id.slice(1, 5)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 w-full md:w-48">
                        {issue.status === 'Reported' && (
                          <Button onClick={() => updateIssueStatus(issue.id, 'In Progress')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                            Mark In Progress
                          </Button>
                        )}
                        {(issue.status === 'Reported' || issue.status === 'In Progress') && (
                          <Button onClick={() => updateIssueStatus(issue.id, 'Resolved')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                            <CheckCircle className="h-4 w-4 mr-2" /> Resolve Issue
                          </Button>
                        )}
                        {issue.status !== 'Rejected' && issue.status !== 'Resolved' && (
                          <Button onClick={() => updateIssueStatus(issue.id, 'Rejected')} variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                            Reject
                          </Button>
                        )}
                        {(issue.status === 'Resolved' || issue.status === 'Rejected') && (
                          <div className="text-center py-2 px-4 bg-slate-100 rounded-xl text-xs font-bold text-slate-500">
                            Action Completed
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="divide-y divide-slate-100">
                {bookings.length === 0 ? (
                  <div className="p-10 text-center text-slate-500 font-medium">No services booked yet.</div>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-black border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booking {booking.id}</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-1">{booking.serviceName}</h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-2">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.date || 'Today'}</span>
                          <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> Provider: {booking.provider}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 w-full md:w-48">
                        {booking.status === 'Confirmed' && (
                          <>
                            <Button onClick={() => updateBookingStatus(booking.id, 'Completed')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                              Mark Completed
                            </Button>
                            <Button onClick={() => updateBookingStatus(booking.id, 'Cancelled')} variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                              Cancel Booking
                            </Button>
                          </>
                        )}
                        {booking.status !== 'Confirmed' && (
                          <div className="text-center py-2 px-4 bg-slate-100 rounded-xl text-xs font-bold text-slate-500">
                            Booking Closed
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
