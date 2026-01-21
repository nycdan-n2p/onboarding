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
// Concept 2 pages
import RegistrationConcept2 from './pages/concept2/RegistrationConcept2'
import EmailVerificationConcept2 from './pages/concept2/EmailVerificationConcept2'
import WorkTypeSelectionConcept2 from './pages/concept2/WorkTypeSelectionConcept2'
import IntegrationSelectionConcept2 from './pages/concept2/IntegrationSelectionConcept2'
import ChatInterfaceConcept2 from './pages/concept2/ChatInterfaceConcept2'
import AgentSelectionConcept2 from './pages/concept2/AgentSelectionConcept2'
import AgentInterfaceConcept2 from './pages/concept2/AgentInterfaceConcept2'
import PaymentConcept2 from './pages/concept2/PaymentConcept2'
import { OnboardingProvider } from './context/OnboardingContext'
import { ConceptProvider } from './context/ConceptContext'
import './App.css'

function App() {
  return (
    <ConceptProvider>
      <OnboardingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Concept 1 routes */}
            <Route path="/register" element={<Registration />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/work-type" element={<WorkTypeSelection />} />
            <Route path="/integrations" element={<IntegrationSelection />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/agents" element={<AgentSelection />} />
            <Route path="/agent/:agentId" element={<AgentInterface />} />
            <Route path="/payment" element={<Payment />} />
            {/* Concept 2 routes */}
            <Route path="/concept2/register" element={<RegistrationConcept2 />} />
            <Route path="/concept2/verify-email" element={<EmailVerificationConcept2 />} />
            <Route path="/concept2/work-type" element={<WorkTypeSelectionConcept2 />} />
            <Route path="/concept2/integrations" element={<IntegrationSelectionConcept2 />} />
            <Route path="/concept2/chat" element={<ChatInterfaceConcept2 />} />
            <Route path="/concept2/agents" element={<AgentSelectionConcept2 />} />
            <Route path="/concept2/agent/:agentId" element={<AgentInterfaceConcept2 />} />
            <Route path="/concept2/payment" element={<PaymentConcept2 />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </OnboardingProvider>
    </ConceptProvider>
  )
}

export default App
