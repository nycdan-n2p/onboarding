import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { ArrowRight, Mail, User, Building2 } from 'lucide-react'
import './Registration.css'

const Registration = () => {
  const navigate = useNavigate()
  const { updateUserData } = useOnboarding()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
  })
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate sending verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
    localStorage.setItem('verificationToken', verificationToken)
    localStorage.setItem('verificationEmail', formData.email)

    updateUserData({
      name: formData.name,
      company: formData.company,
      email: formData.email,
    })

    // In production, you would send the token via email
    alert(`Verification token sent to ${formData.email}\n\nToken: ${verificationToken}\n\n(For demo purposes, token is shown here)`)
    
    navigate('/verify-email')
  }

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-header">
          <div className="logo-icon">N2P</div>
          <h1>Get Your Free Agent</h1>
          <p>Get started with Net2Phone Agent and receive your first agent free with 500 credits</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <User size={18} />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="company">
              <Building2 size={18} />
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company name"
              className={errors.company ? 'error' : ''}
            />
            {errors.company && <span className="error-message">{errors.company}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="trial-info">
            <div className="info-item">
              <span className="info-label">Free Agent:</span>
              <span className="info-value">1 agent included</span>
            </div>
            <div className="info-item">
              <span className="info-label">Trial Credits:</span>
              <span className="info-value">500 credits</span>
            </div>
            <div className="info-item">
              <span className="info-label">Duration:</span>
              <span className="info-value">30 days</span>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Continue
            <ArrowRight size={20} />
          </button>

          <p className="terms-text">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  )
}

export default Registration
