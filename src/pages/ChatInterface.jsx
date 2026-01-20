import React, { useState, useEffect, useRef } from 'react'
import { useOnboarding } from '../context/OnboardingContext'
import { Send, Sparkles } from 'lucide-react'
import './ChatInterface.css'

const ChatInterface = () => {
  const { userData } = useOnboarding()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = {
      id: 1,
      type: 'ai',
      text: `Welcome to Net2Phone Agent, ${userData.name || 'there'}! 👋\n\nI'm your AI assistant, and I'm here to help you get the most out of your workspace.`,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setIsTyping(true)

    // Second message after a delay
    setTimeout(() => {
      const secondMessage = {
        id: 2,
        type: 'ai',
        text: `I see you've connected ${userData.integrations?.length || 0} integration${userData.integrations?.length !== 1 ? 's' : ''} to your workspace. Great start! 🚀`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, secondMessage])
      setIsTyping(true)

      // Third message with next steps
      setTimeout(() => {
        const thirdMessage = {
          id: 3,
          type: 'ai',
          text: `Here are some things you can do next:\n\n• Ask me questions about your connected apps\n• Request summaries of your recent activity\n• Get help with workflows and automation\n• Explore features and capabilities\n\nWhat would you like to start with?`,
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

    // Simulate AI response
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
    <div className="chat-interface">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-logo">N2P</div>
          <div className="chat-header-info">
            <h1>Net2Phone Agent</h1>
            <p>Your AI Assistant</p>
          </div>
        </div>
        <div className="chat-header-right">
          <div className="tokens-info">
            <Sparkles size={16} />
            <span>{userData.tokens?.toLocaleString() || '10,000'} tokens remaining</span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'user' ? (
                <span>{userData.name?.[0]?.toUpperCase() || 'U'}</span>
              ) : (
                <Sparkles size={20} />
              )}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai typing">
            <div className="message-avatar">
              <Sparkles size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-container" onSubmit={handleSend}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          className="chat-input"
          disabled={isTyping}
        />
        <button type="submit" className="chat-send-button" disabled={!inputValue.trim() || isTyping}>
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatInterface
