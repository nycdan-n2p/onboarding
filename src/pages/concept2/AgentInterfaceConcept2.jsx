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
        case 'sales-coach':
          simulatedOutput = '🎯 Live coaching active!\n\n"Ask this next: What specific budget range are you working with?"\n\nObjection detected: Price concern\nSuggested response: "Totally fair. What are you comparing it to?"'
          break
        case 'rfp-killer':
          simulatedOutput = '📄 Proposal Generated\n\nScope: Based on your requirements\nTimeline: 6-8 weeks\nPricing: $X,XXX - $XX,XXX\n\nFull proposal document ready for review.'
          break
        case 'ceo-voice':
          simulatedOutput = '🎤 Pitch Versions Generated\n\n10-second: "We help businesses automate workflows"\n30-second: [Sales pitch version]\n60-second: [Investor pitch version]\n\nAll versions ready for playback.'
          break
        case 'angry-customer':
          simulatedOutput = '😤 Response Script Generated\n\nKey Issue: Billing concern\nCalm Response: "I completely understand your frustration..."\nRetention Offer: 15% discount on next invoice\n\nScript ready for your team.'
          break
        case 'workflow-builder':
          simulatedOutput = '⚙️ Workflow Created\n\n1. Lead qualification script\n2. Call booking automation\n3. Reminder sequence (2x)\n4. Follow-up checklist\n\nWorkflow saved and ready to use.'
          break
        case 'cold-call-opener':
          simulatedOutput = '📞 Roleplay Complete\n\nYour Score: 7.5/10\n\nStrengths: Clear value proposition\nAreas to improve: Handle objections better\n\nImproved opener: "Hi [Name], I noticed [specific insight]..."'
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
