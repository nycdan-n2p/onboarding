import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { ArrowRight, Building2, Users, Target, TrendingUp } from 'lucide-react'
import './QualificationConcept2.css'

const businessTypes = [
  { id: 'accounting', label: 'Accounting Firm', icon: '📊' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏠' },
  { id: 'medical', label: 'Medical Practice', icon: '🏥' },
  { id: 'insurance', label: 'Insurance Agency', icon: '🛡️' },
  { id: 'legal', label: 'Law Firm', icon: '⚖️' },
  { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { id: 'retail', label: 'Retail', icon: '🛍️' },
  { id: 'other', label: 'Other', icon: '🏢' },
]

const businessSizes = [
  { id: 'solo', label: 'Just me', value: '1' },
  { id: 'small', label: '2-10 employees', value: '2-10' },
  { id: 'medium', label: '11-50 employees', value: '11-50' },
  { id: 'large', label: '51+ employees', value: '51+' },
]

const goals = [
  { id: 'save-time', label: 'Save time on repetitive tasks', icon: '⏱️' },
  { id: 'grow-revenue', label: 'Grow revenue', icon: '📈' },
  { id: 'improve-service', label: 'Improve customer service', icon: '💬' },
  { id: 'reduce-costs', label: 'Reduce operational costs', icon: '💰' },
]

const QualificationConcept2 = () => {
  const navigate = useNavigate()
  const { updateUserData } = useOnboarding()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    businessSize: '',
    locations: '1',
    goals: [],
    referralSource: '',
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

  const handleBusinessTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, businessType: typeId }))
    setErrors(prev => ({ ...prev, businessType: '' }))
  }

  const handleBusinessSizeSelect = (sizeId) => {
    setFormData(prev => ({ ...prev, businessSize: sizeId }))
    setErrors(prev => ({ ...prev, businessSize: '' }))
  }

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }))
  }

  const validateStep = (stepNum) => {
    const newErrors = {}
    
    if (stepNum === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }
    
    if (stepNum === 2) {
      if (!formData.businessType) newErrors.businessType = 'Please select your business type'
      if (!formData.businessSize) newErrors.businessSize = 'Please select your business size'
    }
    
    if (stepNum === 3) {
      if (formData.goals.length === 0) newErrors.goals = 'Please select at least one goal'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep(step)) return
    
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    if (!validateStep(3)) return

    // Set trial start date
    const trialStartDate = new Date()
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 14) // 14-day trial

    updateUserData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      businessType: formData.businessType,
      businessSize: formData.businessSize,
      locations: formData.locations,
      goals: formData.goals,
      referralSource: formData.referralSource,
      trialStartDate: trialStartDate.toISOString(),
      trialEndDate: trialEndDate.toISOString(),
      credits: 500,
      emailVerified: true, // Skip email verification in this flow
    })

    // Go straight to agent selection
    navigate('/concept2/agents')
  }

  return (
    <div className="qualification-page-concept2">
      <div className="qualification-container-concept2">
        <div className="qualification-progress-concept2">
          <div className="progress-steps-concept2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`progress-step-concept2 ${step >= num ? 'active' : ''} ${step > num ? 'completed' : ''}`}
              >
                <div className="step-number-concept2">{num}</div>
                <div className="step-label-concept2">
                  {num === 1 && 'Contact Info'}
                  {num === 2 && 'Business Details'}
                  {num === 3 && 'Your Goals'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="qualification-content-concept2">
          {step === 1 && (
            <div className="qualification-step-concept2">
              <div className="step-header-concept2">
                <h1>Start Your Free Trial</h1>
                <p>Get 14 days free access to all agents. No credit card required.</p>
              </div>

              <div className="form-section-concept2">
                <div className="form-group-concept2">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message-concept2">{errors.name}</span>}
                </div>

                <div className="form-group-concept2">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message-concept2">{errors.email}</span>}
                </div>

                <div className="form-group-concept2">
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="qualification-step-concept2">
              <div className="step-header-concept2">
                <h1>Tell us about your business</h1>
                <p>This helps us personalize your experience</p>
              </div>

              <div className="form-section-concept2">
                <div className="form-group-concept2">
                  <label>Business Type *</label>
                  <div className="business-type-grid-concept2">
                    {businessTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        className={`business-type-card-concept2 ${formData.businessType === type.id ? 'selected' : ''}`}
                        onClick={() => handleBusinessTypeSelect(type.id)}
                      >
                        <span className="type-icon-concept2">{type.icon}</span>
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.businessType && <span className="error-message-concept2">{errors.businessType}</span>}
                </div>

                <div className="form-group-concept2">
                  <label>Business Size *</label>
                  <div className="business-size-grid-concept2">
                    {businessSizes.map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        className={`business-size-card-concept2 ${formData.businessSize === size.id ? 'selected' : ''}`}
                        onClick={() => handleBusinessSizeSelect(size.id)}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                  {errors.businessSize && <span className="error-message-concept2">{errors.businessSize}</span>}
                </div>

                <div className="form-group-concept2">
                  <label htmlFor="locations">Number of Locations</label>
                  <input
                    type="number"
                    id="locations"
                    name="locations"
                    value={formData.locations}
                    onChange={handleChange}
                    min="1"
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="qualification-step-concept2">
              <div className="step-header-concept2">
                <h1>What are your main goals?</h1>
                <p>Select all that apply</p>
              </div>

              <div className="form-section-concept2">
                <div className="form-group-concept2">
                  <div className="goals-grid-concept2">
                    {goals.map((goal) => (
                      <button
                        key={goal.id}
                        type="button"
                        className={`goal-card-concept2 ${formData.goals.includes(goal.id) ? 'selected' : ''}`}
                        onClick={() => handleGoalToggle(goal.id)}
                      >
                        <span className="goal-icon-concept2">{goal.icon}</span>
                        <span>{goal.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.goals && <span className="error-message-concept2">{errors.goals}</span>}
                </div>

                <div className="form-group-concept2">
                  <label htmlFor="referralSource">How did you hear about us? (Optional)</label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Friend/Colleague Referral</option>
                    <option value="ad">Online Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="qualification-footer-concept2">
            {step > 1 && (
              <button
                type="button"
                className="back-button-concept2"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            <button
              type="button"
              className="next-button-concept2"
              onClick={handleNext}
            >
              {step === 3 ? 'Start Free Trial' : 'Continue'}
              <ArrowRight size={20} />
            </button>
          </div>

          <p className="trial-terms-concept2">
            By continuing, you agree to our Terms of Service and Privacy Policy. 
            Your 14-day free trial starts now. No credit card required.
          </p>
        </div>
      </div>
    </div>
  )
}

export default QualificationConcept2
