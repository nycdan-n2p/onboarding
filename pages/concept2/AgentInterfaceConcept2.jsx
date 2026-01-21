import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { agents } from '../../data/agents'
import { ArrowLeft, Mic, Play, Plus, Sparkles } from 'lucide-react'
import './AgentInterfaceConcept2.css'

const AgentInterfaceConcept2 = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const { userData } = useOnboarding()
  const agent = agents.find(a => a.id === agentId)

  const [isRecording, setIsRecording] = useState(false)
  const [output, setOutput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!agent) {
    return (
      <div className="agent-interface-concept2">
        <div className="agent-not-found-concept2">
          <h2>Agent not found</h2>
          <button onClick={() => navigate('/concept2/agents')}>Back to Agents</button>
        </div>
      </div>
    )
  }

  const handleTryNow = () => {
    setIsProcessing(true)
    setTimeout(() => {
      let simulatedOutput = ''
      
      switch (agent.id) {
        case 'accountant-appointment-setter':
          simulatedOutput = '📅 Appointment Booked!\n\nClient: John Smith\nDate: March 15, 2024\nTime: 2:00 PM\n\nConfirmation email sent with:\n• Tax prep checklist\n• Required documents list\n• Office location & parking info\n\nCalendar updated automatically.'
          break
        case 'real-estate-lead-qualifier':
          simulatedOutput = '🏠 Lead Qualified!\n\nBudget: $400,000 - $500,000\nTimeline: Looking to buy in 2-3 months\nLocation: Downtown area, 3BR preferred\n\nProperty matches found: 5 listings\nViewing scheduled: Saturday 2pm\n\nLead score: 8/10 (High priority)'
          break
        case 'medical-appointment-reminder':
          simulatedOutput = '🏥 Reminders Sent!\n\nPatient: Sarah Johnson\nAppointment: Friday, March 12 at 10:00 AM\n\n✅ Called 48 hours before (confirmed)\n✅ Text reminder sent 24 hours before\n✅ Final call completed 2 hours before\n\nPatient confirmed - ready for appointment.'
          break
        case 'insurance-claims-processor':
          simulatedOutput = '🛡️ Claim Processed!\n\nClaim #: CL-2024-001234\nPolicy: Auto Insurance\nIncident: Car accident on March 10\n\n✅ All details collected\n✅ Claim file created\n✅ Confirmation sent to client\n✅ Urgent flag: No (standard processing)\n\nStatus: Under review'
          break
        case 'legal-intake-assistant':
          simulatedOutput = '⚖️ Client Screened!\n\nCaller: Michael Brown\nCase Type: Workers Compensation\nInjury Date: March 5, 2024\n\n✅ Case fits practice area\n✅ Consultation scheduled: March 18, 2pm\n✅ Intake forms sent\n✅ Case prep materials delivered\n\nQualified lead - high value case'
          break
        case 'restaurant-reservation-manager':
          simulatedOutput = '🍽️ Reservation Confirmed!\n\nParty: 4 guests\nDate: Tonight (March 11)\nTime: 7:00 PM\n\n✅ Table available - booked\n✅ Confirmation text sent\n✅ Reminder call scheduled for 5pm\n\nSpecial notes: None\nReservation #: RES-2024-5678'
          break
        default:
          simulatedOutput = 'Agent processing complete. Output ready.'
      }
      
      setOutput(simulatedOutput)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="agent-interface-concept2">
      <div className="agent-interface-header-concept2">
        <button className="back-button-concept2" onClick={() => navigate('/concept2/agents')}>
          <ArrowLeft size={16} />
          Back to Agents
        </button>
        <div className="agent-header-info-concept2">
          <div className="agent-header-icon-concept2">{agent.icon}</div>
          <div>
            <h1>{agent.name}</h1>
            <p>{agent.subtitle}</p>
          </div>
        </div>
        <div className="credits-display-concept2">
          <Sparkles size={16} />
          <span>{userData.credits?.toLocaleString() || '500'} credits</span>
        </div>
      </div>

      <div className="agent-interface-body-concept2">
        <div className="agent-description-concept2">
          <h2>What you do</h2>
          <p className="what-you-do-concept2">{agent.whatYouDo}</p>

          <div className="agent-capabilities-concept2">
            <h3>What the agent does</h3>
            <ul>
              {agent.whatAgentDoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="agent-interface-content-concept2">
          <div className="interface-header-concept2">
            <h3>{agent.name}</h3>
            <p>Try the agent now to see it in action</p>
          </div>
          <div className="try-now-interface-concept2">
            <button 
              className={`try-now-button-concept2 ${isProcessing ? 'processing' : ''}`}
              onClick={handleTryNow}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Try Now'}
              {!isProcessing && <Play size={20} />}
            </button>
            {output && (
              <div className="output-display-concept2">
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

export default AgentInterfaceConcept2
