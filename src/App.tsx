import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Services from "./pages/Services"
import Businesses from "./pages/Businesses"
import Community from "./pages/Community"
import Resources from "./pages/Resources"
import MapPage from "./pages/MapPage"
import MyActivity from "./pages/MyActivity"
import { Toaster } from "sonner"
import { AiAssistant } from "./components/AiAssistant"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/my-activity" element={<MyActivity />} />
          </Routes>
        </main>
        <Footer />
        <AiAssistant />
        <Toaster position="bottom-right" richColors />
      </div>
    </Router>
  )
}

export default App
