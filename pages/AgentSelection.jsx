import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { agents } from '../data/agents'
import { Check, Lock, Plus, ArrowRight } from 'lucide-react'
import './AgentSelection.css'

const AgentSelection = () => {
  const navigate = useNavigate()
  const { userData, addAgent } = useOnboarding()
  const [selectedAgentId, setSelectedAgentId] = useState(null)

  const handleAgentClick = (agent) => {
    const isSelected = userData.selectedAgents?.includes(agent.id)
    
    if (isSelected) {
      // Already selected, navigate to agent interface
      navigate(`/agent/${agent.id}`)
      return
    }

    // Try to add agent
    const result = addAgent(agent.id)
    
    if (result.requiresPayment) {
      // Redirect to payment page with agent ID
      navigate(`/payment?agentId=${agent.id}`)
    } else {
      // Agent added successfully, navigate to agent interface
      setSelectedAgentId(agent.id)
      setTimeout(() => {
        navigate(`/agent/${agent.id}`)
      }, 500)
    }
  }

  const getAgentStatus = (agentId) => {
    const isSelected = userData.selectedAgents?.includes(agentId)
    const canAddFree = userData.selectedAgents?.length === 0
    const requiresPayment = userData.selectedAgents?.length > 0 && !isSelected

    return {
      isSelected,
      canAddFree,
      requiresPayment,
      buttonText: isSelected ? 'Open Agent' : canAddFree ? 'Get Free Agent' : 'Add Agent',
      buttonIcon: isSelected ? <ArrowRight size={16} /> : requiresPayment ? <Lock size={16} /> : <Plus size={16} />
    }
  }

  return (
    <div className="agent-selection-page">
      <div className="agent-selection-container">
        <div className="agent-selection-header">
          <h1>Select Your AI Agent</h1>
          <p>Choose your first agent free, or add more with a subscription</p>
          <div className="agent-count">
            {userData.selectedAgents?.length || 0} of {userData.selectedAgents?.length === 0 ? '1' : 'unlimited'} agent{userData.selectedAgents?.length !== 1 ? 's' : ''} selected
            {userData.selectedAgents?.length > 0 && !userData.hasPaymentMethod && (
              <span className="payment-required"> • Payment required for additional agents</span>
            )}
          </div>
        </div>

        <div className="agent-grid">
          {agents.map((agent) => {
            const status = getAgentStatus(agent.id)
            const isSelected = status.isSelected

            return (
              <div
                key={agent.id}
                className={`agent-card ${isSelected ? 'selected' : ''} ${status.requiresPayment ? 'requires-payment' : ''}`}
              >
                <div className="agent-card-header">
                  <div className="agent-icon">{agent.icon}</div>
                  <div className="agent-title-section">
                    <h3>{agent.name}</h3>
                    <p className="agent-subtitle">{agent.subtitle}</p>
                  </div>
                  {isSelected && (
                    <div className="selected-badge">
                      <Check size={16} />
                      <span>Active</span>
                    </div>
                  )}
                </div>

                <div className="agent-card-body">
                  <div className="agent-section">
                    <h4>What you do</h4>
                    <p>{agent.whatYouDo}</p>
                  </div>

                  <div className="agent-section">
                    <h4>What the agent does</h4>
                    <ul>
                      {agent.whatAgentDoes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="agent-features">
                    <div className="free-preview">
                      <h4>Free Preview</h4>
                      <p>{agent.freePreview}</p>
                    </div>
                    <div className="trial-unlock">
                      <h4>
                        <Lock size={14} />
                        Trial Unlock
                      </h4>
                      <ul>
                        {agent.trialUnlock.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="agent-card-footer">
                  <button
                    className={`agent-select-button ${isSelected ? 'selected' : ''} ${status.requiresPayment ? 'requires-payment' : ''}`}
                    onClick={() => handleAgentClick(agent)}
                  >
                    {status.buttonIcon}
                    {status.buttonText}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="agent-selection-footer">
          <p className="platform-note">
            Want to build your own custom agent? <a href="#custom">Learn more about our platform</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AgentSelection
