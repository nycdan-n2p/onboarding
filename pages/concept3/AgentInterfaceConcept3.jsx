import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { agents } from '../../data/agents'
import { ArrowLeft, Sparkles, Play } from 'lucide-react'
import './AgentInterfaceConcept3.css'

const AgentInterfaceConcept3 = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const { userData } = useOnboarding()
  const agent = agents.find(a => a.id === agentId)

  const [output, setOutput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!agent || agentId !== 'medical-appointment-reminder') {
    return (
      <div className="agent-interface-concept3">
        <div className="agent-not-found-concept3">
          <h2>Agent not found</h2>
          <button onClick={() => navigate('/concept3')}>Back to Home</button>
        </div>
      </div>
    )
  }

  const handleTryNow = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const simulatedOutput = '🏥 Reminders Sent!\n\nPatient: Sarah Johnson\nAppointment: Friday, March 12 at 10:00 AM\n\n✅ Called 48 hours before (confirmed)\n✅ Text reminder sent 24 hours before\n✅ Final call completed 2 hours before\n\nPatient confirmed - ready for appointment.'
      
      setOutput(simulatedOutput)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="agent-interface-concept3">
      <div className="agent-interface-header-concept3">
        <button className="back-button-concept3" onClick={() => navigate('/concept3')}>
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="agent-header-info-concept3">
          <div className="agent-header-icon-concept3">{agent.icon}</div>
          <div>
            <h1>{agent.name}</h1>
            <p>{agent.subtitle}</p>
          </div>
        </div>
        {userData.trialEndDate && (
          <div className="trial-badge-header-concept3">
            <span>Free Trial • Expires {new Date(userData.trialEndDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="agent-interface-body-concept3">
        <div className="agent-description-concept3">
          <h2>How It Works</h2>
          <p className="what-you-do-concept3">{agent.whatYouDo}</p>

          <div className="agent-capabilities-concept3">
            <h3>What the agent does:</h3>
            <ul>
              {agent.whatAgentDoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="trial-info-box-concept3">
            <h3>Your Free Trial Includes:</h3>
            <ul>
              <li>✅ Remind 20 appointments automatically</li>
              <li>✅ Multi-channel reminders (call + text)</li>
              <li>✅ Calendar integration</li>
              <li>✅ No-show reporting</li>
            </ul>
          </div>
        </div>

        <div className="agent-interface-content-concept3">
          <div className="interface-header-concept3">
            <h3>Try It Now</h3>
            <p>See how the agent processes appointment reminders in real-time</p>
          </div>
          <div className="try-now-interface-concept3">
            <button 
              className={`try-now-button-concept3 ${isProcessing ? 'processing' : ''}`}
              onClick={handleTryNow}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Try Now'}
              {!isProcessing && <Play size={20} />}
            </button>
            {output && (
              <div className="output-display-concept3">
                <h4>Output:</h4>
                <pre>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentInterfaceConcept3
