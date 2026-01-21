import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { Send, Sparkles, UserPlus } from 'lucide-react'
import './ChatInterfaceConcept2.css'

const ChatInterfaceConcept2 = () => {
  const navigate = useNavigate()
  const { userData } = useOnboarding()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'ai',
      text: `Welcome to Net2Phone Agent, ${userData.name || 'there'}! 👋\n\nI'm your AI assistant, and I'm here to help you get the most out of your workspace.`,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setIsTyping(true)

    setTimeout(() => {
      const secondMessage = {
        id: 2,
        type: 'ai',
        text: `I see you've connected ${userData.integrations?.length || 0} integration${userData.integrations?.length !== 1 ? 's' : ''} to your workspace. Great start! 🚀`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, secondMessage])
      setIsTyping(true)

      setTimeout(() => {
        const thirdMessage = {
          id: 3,
          type: 'ai',
          text: `To get started, let's select your first AI agent. I'll help you choose one that fits your needs.\n\nWe have 6 powerful agents ready to use:\n• Accountant Appointment Setter\n• Real Estate Lead Qualifier\n• Medical Appointment Reminder\n• Insurance Claims Processor\n• Legal Intake Assistant\n• Restaurant Reservation Manager\n\nClick "Select Your Agent" above to get started!`,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, thirdMessage])
        setIsTyping(false)
      }, 2000)
    }, 2000)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: `I understand you're asking about "${inputValue}". As your AI assistant, I'm here to help you navigate your workspace and make the most of your connected integrations. Feel free to ask me anything about your work, schedule, or the tools you've connected!`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="chat-interface-concept2">
      <div className="chat-header-concept2">
        <div className="chat-header-left-concept2">
          <div className="chat-logo-concept2">N2P</div>
          <div className="chat-header-info-concept2">
            <h1>Net2Phone Agent</h1>
            <p>Your AI Assistant</p>
          </div>
        </div>
        <div className="chat-header-right-concept2">
          <button 
            className="select-agent-button-concept2"
            onClick={() => navigate('/concept2/agents')}
          >
            <UserPlus size={16} />
            Select Your Agent
          </button>
          <div className="tokens-info-concept2">
            <Sparkles size={16} />
            <span>{userData.credits?.toLocaleString() || '500'} credits remaining</span>
          </div>
        </div>
      </div>

      <div className="chat-messages-concept2">
        {messages.map((message) => (
          <div key={message.id} className={`message-concept2 ${message.type}`}>
            <div className="message-avatar-concept2">
              {message.type === 'user' ? (
                <span>{userData.name?.[0]?.toUpperCase() || 'U'}</span>
              ) : (
                <Sparkles size={20} />
              )}
            </div>
            <div className="message-content-concept2">
              <div className="message-text-concept2">{message.text}</div>
              <div className="message-time-concept2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message-concept2 ai typing">
            <div className="message-avatar-concept2">
              <Sparkles size={20} />
            </div>
            <div className="message-content-concept2">
              <div className="typing-indicator-concept2">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-container-concept2" onSubmit={handleSend}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          className="chat-input-concept2"
          disabled={isTyping}
        />
        <button type="submit" className="chat-send-button-concept2" disabled={!inputValue.trim() || isTyping}>
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatInterfaceConcept2
