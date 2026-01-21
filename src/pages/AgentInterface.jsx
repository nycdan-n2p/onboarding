import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { agents } from '../data/agents'
import { ArrowLeft, Mic, Play, Plus, Sparkles } from 'lucide-react'
import './AgentInterface.css'

const AgentInterface = () => {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const { userData } = useOnboarding()
  const agent = agents.find(a => a.id === agentId)

  const [isRecording, setIsRecording] = useState(false)
  const [output, setOutput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!agent) {
    return (
      <div className="agent-interface">
        <div className="agent-not-found">
          <h2>Agent not found</h2>
          <button onClick={() => navigate('/agents')}>Back to Agents</button>
        </div>
      </div>
    )
  }

  const handleTryNow = () => {
    setIsProcessing(true)
    setTimeout(() => {
      // Simulate agent output based on agent type
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

  const renderAgentInterface = () => {
    switch (agent.id) {
      case 'sales-coach':
        return (
          <div className="agent-interface-content">
            <div className="interface-header">
              <h3>Live Sales Coach</h3>
              <p>Press record and start your sales call. The agent will guide you in real-time.</p>
            </div>
            <div className="recording-interface">
              <button 
                className={`record-button ${isRecording ? 'recording' : ''}`}
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic size={24} />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              {isRecording && (
                <div className="live-feedback">
                  <div className="pulse-indicator"></div>
                  <span>Listening for objections...</span>
                </div>
              )}
            </div>
          </div>
        )
      
      case 'rfp-killer':
        return (
          <div className="agent-interface-content">
            <div className="interface-header">
              <h3>Voice RFP Generator</h3>
              <p>Speak your requirements and get a complete proposal in minutes.</p>
            </div>
            <div className="voice-input-interface">
              <button className="voice-button" onClick={handleTryNow}>
                <Mic size={24} />
                Start Voice Input
              </button>
              <textarea 
                className="input-area"
                placeholder="Or type your requirements here..."
                rows={4}
              />
            </div>
          </div>
        )
      
      case 'ceo-voice':
        return (
          <div className="agent-interface-content">
            <div className="interface-header">
              <h3>CEO Pitch Maker</h3>
              <p>Record your rambling thoughts and get polished pitch versions.</p>
            </div>
            <div className="voice-input-interface">
              <button className="voice-button" onClick={handleTryNow}>
                <Mic size={24} />
                Record Your Pitch (45 seconds)
              </button>
            </div>
          </div>
        )
      
      case 'angry-customer':
        return (
          <div className="agent-interface-content">
            <div className="interface-header">
              <h3>Customer Complaint Handler</h3>
              <p>Input the customer complaint and get a professional response script.</p>
            </div>
            <div className="complaint-interface">
              <textarea 
                className="input-area"
                placeholder="Paste or type the customer complaint here..."
                rows={6}
              />
              <button className="process-button" onClick={handleTryNow}>
                Generate Response Script
              </button>
            </div>
          </div>
        )
      
      case 'workflow-builder':
        return (
          <div className="agent-interface-content">
            <div className="interface-header">
              <h3>Workflow Builder</h3>
              <p>Describe your process in natural language and get a complete workflow.</p>
            </div>
            <div className="voice-input-interface">
              <button className="voice-button" onClick={handleTryNow}>
                <Mic size={24} />
                Describe Your Workflow
              </button>
              <textarea 
                className="input-area"
                placeholder="Or type your workflow description here..."
                rows={4}
              />
            </div>
          </div>
        )
      
      case 'cold-call-opener':
        return (
          <div className="agent-interface-content">
            <div className="interface-header">
              <h3>Cold Call Trainer</h3>
              <p>Practice your pitch with AI roleplay and get scored.</p>
            </div>
            <div className="roleplay-interface">
              <select className="industry-select">
                <option>Select Industry</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Retail</option>
              </select>
              <button className="roleplay-button" onClick={handleTryNow}>
                <Play size={20} />
                Start Roleplay
              </button>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="agent-interface-content">
            <div className="interface-header">
              <h3>{agent.name}</h3>
              <p>{agent.whatYouDo}</p>
            </div>
            <button className="try-now-button" onClick={handleTryNow}>
              Try Now
            </button>
          </div>
        )
    }
  }

  return (
    <div className="agent-interface">
      <div className="agent-interface-header">
        <button className="back-button" onClick={() => navigate('/agents')}>
          <ArrowLeft size={20} />
          Back to Agents
        </button>
        <div className="agent-header-info">
          <div className="agent-header-icon">{agent.icon}</div>
          <div>
            <h1>{agent.name}</h1>
            <p>{agent.subtitle}</p>
          </div>
        </div>
        <div className="credits-display">
          <Sparkles size={16} />
          <span>{userData.credits?.toLocaleString() || '500'} credits</span>
        </div>
      </div>

      <div className="agent-interface-body">
        <div className="agent-description">
          <h2>How it works</h2>
          <p className="what-you-do">{agent.whatYouDo}</p>
          <div className="agent-capabilities">
            <h3>Capabilities:</h3>
            <ul>
              {agent.whatAgentDoes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="agent-workspace">
          {renderAgentInterface()}
          
          {isProcessing && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>Processing...</p>
            </div>
          )}

          {output && (
            <div className="output-area">
              <h4>Output</h4>
              <div className="output-content">{output}</div>
            </div>
          )}
        </div>

        <div className="agent-actions">
          <button 
            className="add-another-agent-button"
            onClick={() => navigate('/agents')}
          >
            <Plus size={16} />
            Add Another Agent
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgentInterface
