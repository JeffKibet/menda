import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Onboarding from './pages/Onboarding'
import Assessment from './pages/Assessment'
import Dashboard from './pages/Dashboard'

function Home() {
  return <h1 className="font-serif-display text-forest">Menda — Home</h1>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AppLayout />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App