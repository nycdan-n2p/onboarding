import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { agents } from '../data/agents'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import './Payment.css'

const Payment = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const agentId = searchParams.get('agentId')
  const { userData, updatePaymentStatus, addAgent } = useOnboarding()
  
  const agent = agentId ? agents.find(a => a.id === agentId) : null

  const [formData, setFormData] = useState({
    email: userData.email || '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
    country: 'United States',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!agentId) {
      navigate('/agents')
    }
  }, [agentId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formatted.length <= 19) {
        setFormData(prev => ({ ...prev, [name]: formatted }))
      }
      return
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
      if (formatted.length <= 5) {
        setFormData(prev => ({ ...prev, [name]: formatted }))
      }
      return
    }
    
    // Format CVC (3-4 digits)
    if (name === 'cvc') {
      const formatted = value.replace(/\D/g, '')
      if (formatted.length <= 4) {
        setFormData(prev => ({ ...prev, [name]: formatted }))
      }
      return
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required'
    }
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Valid card number is required'
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Valid expiry date (MM/YY) is required'
    }
    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = 'Valid CVC is required'
    }
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required'
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      updatePaymentStatus(true)
      
      // If there's an agent to add, add it now
      if (agentId) {
        addAgent(agentId)
      }
      
      // Redirect after success
      setTimeout(() => {
        if (agentId) {
          navigate(`/agent/${agentId}`)
        } else {
          navigate('/agents')
        }
      }, 2000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="payment-page">
        <div className="payment-success">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Your payment method has been added. {agent && `Redirecting to ${agent.name}...`}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <button className="payment-back-button" onClick={() => navigate('/agents')}>
          <ArrowLeft size={20} />
          Back to Agents
        </button>

        <div className="payment-content">
          <div className="payment-left">
            <div className="payment-header">
              <h1>Add Payment Method</h1>
              {agent && (
                <div className="agent-context">
                  <span className="agent-icon">{agent.icon}</span>
                  <div>
                    <p className="agent-context-label">Adding agent:</p>
                    <p className="agent-context-name">{agent.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="subscription-details">
              <div className="subscription-item">
                <div>
                  <p className="subscription-label">Add Agent Subscription</p>
                  <p className="subscription-billing">Billed monthly</p>
                </div>
                <div className="subscription-price">
                  <p>$29.00</p>
                  <p className="price-per-month">per agent/month</p>
                </div>
              </div>
              <div className="subscription-total">
                <p>Total Due Today</p>
                <p className="total-amount">$29.00</p>
              </div>
            </div>
          </div>

          <div className="payment-right">
            <form className="payment-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
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
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Information</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 1234 1234 1234"
                    maxLength={19}
                    className={errors.cardNumber ? 'error' : ''}
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiration Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={errors.expiryDate ? 'error' : ''}
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="CVC"
                      maxLength={4}
                      className={errors.cvc ? 'error' : ''}
                    />
                    {errors.cvc && <span className="error-message">{errors.cvc}</span>}
                  </div>
                </div>

                <div className="card-logos">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>Amex</span>
                  <span>Discover</span>
                </div>

                <div className="form-group">
                  <label htmlFor="cardholderName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    placeholder="Full name on card"
                    className={errors.cardholderName ? 'error' : ''}
                  />
                  {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
                </div>
              </div>

              <div className="form-section">
                <h3>Billing Address</h3>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="addressLine1">Address Line 1</label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Street address"
                    className={errors.addressLine1 ? 'error' : ''}
                  />
                  {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="ZIP / Postal code"
                      className={errors.postalCode ? 'error' : ''}
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                  </div>
                </div>
              </div>

              <div className="form-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  You'll be charged monthly based on the agents you use until you cancel. By subscribing, you agree to our Terms of Service and Privacy Policy.
                </label>
              </div>

              <div className="payment-security">
                <Lock size={16} />
                <span>Pay securely. Your payment information is encrypted.</span>
              </div>

              <button
                type="submit"
                className="payment-submit-button"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
