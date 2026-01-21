import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Palette } from 'lucide-react'
import { agents } from '../data/agents'
import { useConcept } from '../context/ConceptContext'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()
  const { activeConcept, switchConcept } = useConcept()

  const handleConceptChange = (concept) => {
    switchConcept(concept)
  }

  const getRegisterPath = () => {
    return activeConcept === 'concept1' ? '/register' : `/concept2/register`
  }

  const getTrialText = () => {
    return activeConcept === 'concept1' ? 'Get Free Agent' : 'Start Free Trial'
  }

  return (
    <div className="homepage">
      <nav className="homepage-nav">
        <div className="nav-logo">
          <div className="logo-icon">N2P</div>
          <span>Net2Phone Agent</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <div className="nav-right">
          <div className="concept-selector">
            <Palette size={16} />
            <select 
              value={activeConcept} 
              onChange={(e) => handleConceptChange(e.target.value)}
              className="concept-select"
            >
              <option value="concept1">Concept 1</option>
              <option value="concept2">Concept 2</option>
            </select>
          </div>
          <button className="nav-button" onClick={() => navigate(getRegisterPath())}>
            {getTrialText()}
          </button>
        </div>
      </nav>

      <div className="homepage-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Get Your Free AI Agent
            <br />
            <span className="gradient-text">Ready to Use Right Now</span>
          </h1>
          <p className="hero-description">
            {activeConcept === 'concept1' 
              ? 'Choose from 6 powerful precanned agents designed for real business problems. Get your first agent free with 500 credits. No credit card required to start.'
              : 'Start your 14-day free trial. Get instant access to all 6 specialized agents. No credit card required. Cancel anytime.'}
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => navigate(getRegisterPath())}>
              {activeConcept === 'concept1' ? 'Get Your Free Agent' : 'Start Free Trial'}
              <ArrowRight size={20} />
            </button>
            <button className="cta-secondary" onClick={() => navigate(getRegisterPath())}>
              See All Agents
            </button>
          </div>
          <p className="hero-footer">Join thousands of businesses using Net2Phone Agent</p>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="card-header">
              <span>AI Agent Assistant</span>
            </div>
            <div className="card-content">
              <div className="message user-message">
                <div className="message-avatar">U</div>
                <div className="message-text">What's my schedule for today?</div>
              </div>
              <div className="message ai-message">
                <div className="message-avatar">AI</div>
                <div className="message-text">
                  You have 3 meetings today:
                  <br />• Team Standup at 10:00 AM
                  <br />• Client Call at 2:00 PM
                  <br />• Project Review at 4:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="agents-showcase">
        <div className="agents-showcase-container">
          <div className="agents-showcase-header">
            <h2>Choose Your Free Agent</h2>
            <p>Pick one of these powerful agents to get started. Each one solves a real business problem.</p>
          </div>
          <div className="agents-grid">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="agent-preview-card"
                onClick={() => navigate(getRegisterPath())}
              >
                <div className="agent-preview-icon">{agent.icon}</div>
                <div className="agent-preview-content">
                  <h3>{agent.name}</h3>
                  <p className="agent-preview-subtitle">{agent.subtitle}</p>
                  <p className="agent-preview-description">{agent.whatYouDo}</p>
                </div>
                <div className="agent-preview-badge">Get Free</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="platform-capabilities">
        <div className="platform-capabilities-container">
          <div className="platform-content">
            <div className="platform-icon">
              <Sparkles size={48} />
            </div>
            <h2>Build Your Own Custom Agents</h2>
            <p>
              Once you've experienced the power of our precanned agents, unlock the full platform 
              to build custom AI agents tailored to your specific workflows and business needs.
            </p>
            <ul className="platform-features">
              <li>Custom agent builder with no-code interface</li>
              <li>Integrate with your existing tools and APIs</li>
              <li>Team collaboration and sharing</li>
              <li>Advanced analytics and monitoring</li>
            </ul>
            <button className="platform-cta" onClick={() => navigate(getRegisterPath())}>
              Start Building
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
