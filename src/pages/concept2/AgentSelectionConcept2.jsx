import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { agents } from '../../data/agents'
import { Check, Lock, Plus, ArrowRight } from 'lucide-react'
import './AgentSelectionConcept2.css'

const AgentSelectionConcept2 = () => {
  const navigate = useNavigate()
  const { userData, addAgent } = useOnboarding()
  const [selectedAgentId, setSelectedAgentId] = useState(null)

  const handleAgentClick = (agent) => {
    const isSelected = userData.selectedAgents?.includes(agent.id)
    
    if (isSelected) {
      navigate(`/concept2/agent/${agent.id}`)
      return
    }

    const result = addAgent(agent.id)
    
    if (result.requiresPayment) {
      navigate(`/concept2/payment?agentId=${agent.id}`)
    } else {
      setSelectedAgentId(agent.id)
      setTimeout(() => {
        navigate(`/concept2/agent/${agent.id}`)
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
      buttonText: isSelected ? 'Open Agent' : canAddFree ? 'Start Free Trial' : 'Add Agent',
      buttonIcon: isSelected ? <ArrowRight size={16} /> : requiresPayment ? <Lock size={16} /> : <Plus size={16} />
    }
  }

  return (
    <div className="agent-selection-page-concept2">
      <div className="agent-selection-container-concept2">
        <div className="agent-selection-header-concept2">
          <h1>Choose Your Agent</h1>
          <p>You're on a 14-day free trial. Try any agent - no credit card required.</p>
          {userData.trialEndDate && (
            <div className="trial-badge-concept2">
              <span>Free Trial • </span>
              <span>Expires {new Date(userData.trialEndDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="agent-grid-concept2">
          {agents.map((agent) => {
            const status = getAgentStatus(agent.id)
            const isSelected = status.isSelected

            return (
              <div
                key={agent.id}
                className={`agent-card-concept2 ${isSelected ? 'selected' : ''} ${status.requiresPayment ? 'requires-payment' : ''}`}
              >
                <div className="agent-card-header-concept2">
                  <div className="agent-icon-concept2">{agent.icon}</div>
                  <div className="agent-title-section-concept2">
                    <h3>{agent.name}</h3>
                    <p className="agent-subtitle-concept2">{agent.subtitle}</p>
                  </div>
                  {isSelected && (
                    <div className="selected-badge-concept2">
                      <Check size={16} />
                      <span>Active</span>
                    </div>
                  )}
                </div>

                <div className="agent-card-body-concept2">
                  <div className="agent-section-concept2">
                    <h4>What you do</h4>
                    <p>{agent.whatYouDo}</p>
                  </div>

                  <div className="agent-section-concept2">
                    <h4>What the agent does</h4>
                    <ul>
                      {agent.whatAgentDoes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="agent-features-concept2">
                    <div className="free-preview-concept2">
                      <h4>Free Preview</h4>
                      <p>{agent.freePreview}</p>
                    </div>
                    <div className="trial-unlock-concept2">
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

                <div className="agent-card-footer-concept2">
                  <button
                    className={`agent-select-button-concept2 ${isSelected ? 'selected' : ''} ${status.requiresPayment ? 'requires-payment' : ''}`}
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

        <div className="agent-selection-footer-concept2">
          <p className="platform-note-concept2">
            Want to build your own custom agent? <a href="#custom">Learn more about our platform</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AgentSelectionConcept2
