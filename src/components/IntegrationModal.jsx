import React, { useState } from 'react'
import { X, ArrowRight, Shield, Lock } from 'lucide-react'
import './IntegrationModal.css'

const IntegrationModal = ({ integration, onConnect, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      
      // Close modal and trigger onConnect after a brief delay
      setTimeout(() => {
        onConnect()
      }, 1000)
    }, 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-header-icons">
            <div className="modal-logo">N2P</div>
            <div className="modal-dots">⋯</div>
            <div 
              className="modal-integration-icon"
              style={{ backgroundColor: integration.color + '20' }}
            >
              <span className="icon-emoji">{integration.icon}</span>
            </div>
          </div>
          <h2>Connect {integration.name}</h2>
          <p className="modal-subtitle">Developed by Net2Phone</p>
        </div>

        {!isConnected ? (
          <>
            <div className="modal-section">
              <h3>This page will redirect to {integration.name}</h3>
              <p>You'll sign in and confirm permissions on {integration.name}'s page.</p>
            </div>

            <div className="modal-section">
              <div className="modal-section-header">
                <Shield size={20} />
                <h3>Private and secure</h3>
              </div>
              <p>
                Data accessed from {integration.name} may be used to provide you relevant and useful information. 
                We do not train generalized models on this data or derivations of it, unless you choose to submit it as feedback. 
                <a href="#" className="modal-link">Learn more</a>
              </p>
            </div>

            <div className="modal-section">
              <div className="modal-section-header">
                <Lock size={20} />
                <h3>You're in control of your data</h3>
              </div>
              <p>
                You can delete your conversations, which will also delete any {integration.name} data used in those conversations. 
                <a href="#" className="modal-link">Learn more</a>
              </p>
            </div>

            <button
              onClick={handleConnect}
              className="modal-connect-button"
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : `Continue to ${integration.name}`}
              {!isConnecting && <ArrowRight size={20} />}
            </button>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Successfully Connected!</h3>
            <p>{integration.name} is now connected to your workspace.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default IntegrationModal
