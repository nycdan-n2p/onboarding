import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()

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
        <button className="nav-button" onClick={() => navigate('/register')}>
          Start Free Trial
        </button>
      </nav>

      <div className="homepage-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            AI-Powered Business Communication
            <br />
            <span className="gradient-text">That Works for You</span>
          </h1>
          <p className="hero-description">
            Connect your tools, automate workflows, and transform how your team communicates.
            Get started with a free trial and limited tokens to experience the power of AI.
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => navigate('/register')}>
              Start Free Trial
              <ArrowRight size={20} />
            </button>
            <button className="cta-secondary" onClick={() => navigate('/register')}>
              Contact Sales
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
    </div>
  )
}

export default HomePage
