import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import IntegrationModal from '../components/IntegrationModal'
import { Check, Plus } from 'lucide-react'
import './IntegrationSelection.css'

const integrations = [
  { id: 'gmail', name: 'Gmail', icon: '📧', color: '#EA4335' },
  { id: 'calendar', name: 'Google Calendar', icon: '📅', color: '#4285F4' },
  { id: 'drive', name: 'Google Drive', icon: '📁', color: '#34A853' },
  { id: 'slack', name: 'Slack', icon: '💬', color: '#4A154B' },
  { id: 'notion', name: 'Notion', icon: '📝', color: '#000000' },
  { id: 'github', name: 'GitHub', icon: '🐙', color: '#181717' },
  { id: 'dropbox', name: 'Dropbox', icon: '📦', color: '#0061FF' },
  { id: 'box', name: 'Box', icon: '📦', color: '#0061D5' },
  { id: 'salesforce', name: 'Salesforce', icon: '☁️', color: '#00A1E0' },
  { id: 'hubspot', name: 'HubSpot', icon: '🎯', color: '#FF7A59' },
  { id: 'zendesk', name: 'Zendesk', icon: '🎧', color: '#03363D' },
  { id: 'jira', name: 'Jira', icon: '🎫', color: '#0052CC' },
]

const IntegrationSelection = () => {
  const navigate = useNavigate()
  const { userData, addIntegration } = useOnboarding()
  const [selectedIntegration, setSelectedIntegration] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const connectedIntegrations = userData.integrations || []

  const isConnected = (integrationId) => {
    return connectedIntegrations.some(i => i.id === integrationId)
  }

  const handleIntegrationClick = (integration) => {
    if (isConnected(integration.id)) {
      return // Already connected, do nothing
    }
    setSelectedIntegration(integration)
    setIsModalOpen(true)
  }

  const handleConnect = (integration) => {
    addIntegration({
      id: integration.id,
      name: integration.name,
      icon: integration.icon,
      color: integration.color,
      connectedAt: new Date().toISOString(),
    })
    setIsModalOpen(false)
    setSelectedIntegration(null)
  }

  const handleContinue = () => {
    navigate('/chat')
  }

  return (
    <div className="integration-page">
      <div className="integration-container">
        <div className="integration-header">
          <h1>Select apps you use at work</h1>
          <p>These apps are enabled for your workspace</p>
        </div>

        <div className="integration-grid">
          {integrations.map((integration) => {
            const connected = isConnected(integration.id)
            
            return (
              <div
                key={integration.id}
                className={`integration-card ${connected ? 'connected' : ''}`}
                onClick={() => !connected && handleIntegrationClick(integration)}
              >
                <div className="integration-icon" style={{ backgroundColor: integration.color + '20' }}>
                  <span className="icon-emoji">{integration.icon}</span>
                </div>
                <div className="integration-name">{integration.name}</div>
                <div className="integration-action">
                  {connected ? (
                    <div className="connected-badge">
                      <Check size={16} />
                      <span>Connected</span>
                    </div>
                  ) : (
                    <Plus size={20} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="integration-footer">
          <button
            onClick={handleContinue}
            className="continue-button"
          >
            Continue to Workspace
          </button>
          <button
            onClick={handleContinue}
            className="skip-button"
          >
            Skip
          </button>
        </div>
      </div>

      {isModalOpen && selectedIntegration && (
        <IntegrationModal
          integration={selectedIntegration}
          onConnect={() => handleConnect(selectedIntegration)}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedIntegration(null)
          }}
        />
      )}
    </div>
  )
}

export default IntegrationSelection
