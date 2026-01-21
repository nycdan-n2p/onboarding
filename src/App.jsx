import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Registration from './pages/Registration'
import EmailVerification from './pages/EmailVerification'
import WorkTypeSelection from './pages/WorkTypeSelection'
import IntegrationSelection from './pages/IntegrationSelection'
import ChatInterface from './pages/ChatInterface'
import AgentSelection from './pages/AgentSelection'
import AgentInterface from './pages/AgentInterface'
import Payment from './pages/Payment'
import { OnboardingProvider } from './context/OnboardingContext'
import './App.css'

function App() {
  return (
    <OnboardingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/work-type" element={<WorkTypeSelection />} />
          <Route path="/integrations" element={<IntegrationSelection />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/agents" element={<AgentSelection />} />
          <Route path="/agent/:agentId" element={<AgentInterface />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </OnboardingProvider>
  )
}

export default App
