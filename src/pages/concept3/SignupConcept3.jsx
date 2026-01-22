import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { ArrowRight, Mail, User, Building2, Phone } from 'lucide-react'
import './SignupConcept3.css'

const SignupConcept3 = () => {
  const navigate = useNavigate()
  const { updateUserData } = useOnboarding()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceName: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.practiceName.trim()) {
      newErrors.practiceName = 'Practice name is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // Set trial start date
    const trialStartDate = new Date()
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 14) // 14-day trial

    updateUserData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.practiceName,
      businessType: 'medical',
      trialStartDate: trialStartDate.toISOString(),
      trialEndDate: trialEndDate.toISOString(),
      credits: 500,
      emailVerified: true,
      // Pre-select the medical appointment reminder agent
      selectedAgents: ['medical-appointment-reminder'],
    })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Navigate directly to the agent interface
      navigate('/concept3/agent/medical-appointment-reminder')
    }, 1000)
  }

  return (
    <div className="signup-page-concept3">
      <div className="signup-container-concept3">
        <div className="signup-header-concept3">
          <button className="back-button-concept3" onClick={() => navigate('/concept3')}>
            ← Back
          </button>
          <div className="signup-logo-concept3">
            <div className="logo-icon-concept3">N2P</div>
            <span>Medical Appointment Reminder</span>
          </div>
        </div>

        <div className="signup-content-concept3">
          <div className="signup-intro-concept3">
            <h1>Start Your Free Trial</h1>
            <p>Get 14 days free access to automated appointment reminders. No credit card required.</p>
          </div>

          <form className="signup-form-concept3" onSubmit={handleSubmit}>
            <div className="form-group-concept3">
              <label htmlFor="name">
                <User size={18} />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Sarah Johnson"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message-concept3">{errors.name}</span>}
            </div>

            <div className="form-group-concept3">
              <label htmlFor="email">
                <Mail size={18} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sarah@practice.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message-concept3">{errors.email}</span>}
            </div>

            <div className="form-group-concept3">
              <label htmlFor="practiceName">
                <Building2 size={18} />
                Practice Name *
              </label>
              <input
                type="text"
                id="practiceName"
                name="practiceName"
                value={formData.practiceName}
                onChange={handleChange}
                placeholder="Johnson Medical Practice"
                className={errors.practiceName ? 'error' : ''}
              />
              {errors.practiceName && <span className="error-message-concept3">{errors.practiceName}</span>}
            </div>

            <div className="form-group-concept3">
              <label htmlFor="phone">
                <Phone size={18} />
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="trial-benefits-concept3">
              <h3>What you'll get:</h3>
              <ul>
                <li>✅ 14-day free trial</li>
                <li>✅ Automated reminder calls & texts</li>
                <li>✅ Calendar integration</li>
                <li>✅ No credit card required</li>
              </ul>
            </div>

            <button type="submit" className="submit-button-concept3" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Start Free Trial'}
              {!isSubmitting && <ArrowRight size={20} />}
            </button>

            <p className="terms-text-concept3">
              By continuing, you agree to our Terms of Service and Privacy Policy. 
              Your free trial starts immediately.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupConcept3
