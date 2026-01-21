import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { agents } from '../../data/agents'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import './PaymentConcept2.css'

const PaymentConcept2 = () => {
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
      navigate('/concept2/agents')
    }
  }, [agentId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    
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
    
    // Format CVC
    if (name === 'cvc') {
      const formatted = value.replace(/\D/g, '')
      if (formatted.length <= 4) {
        setFormData(prev => ({ ...prev, [name]: formatted }))
      }
      return
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
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

    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      updatePaymentStatus(true)
      
      if (agentId) {
        addAgent(agentId)
      }
      
      setTimeout(() => {
        if (agentId) {
          navigate(`/concept2/agent/${agentId}`)
        } else {
          navigate('/concept2/agents')
        }
      }, 2000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="payment-page-concept2">
        <div className="payment-success-concept2">
          <div className="success-icon-concept2">✓</div>
          <h2>Payment Successful!</h2>
          <p>Your payment method has been added. {agent && `Redirecting to ${agent.name}...`}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-page-concept2">
      <div className="payment-container-concept2">
        <button className="payment-back-button-concept2" onClick={() => navigate('/concept2/agents')}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="payment-header-concept2">
          <div className="payment-icon-concept2">
            <CreditCard size={32} />
          </div>
          <h1>Add Payment Method</h1>
          <p>Add a payment method to unlock additional agents</p>
          {agent && (
            <div className="agent-info-concept2">
              <Lock size={16} />
              <span>Adding: {agent.name}</span>
            </div>
          )}
        </div>

        <form className="payment-form-concept2" onSubmit={handleSubmit}>
          <div className="form-section-concept2">
            <h3>Card Information</h3>
            <div className="form-row-concept2">
              <div className="form-group-concept2 full-width">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? 'error' : ''}
                />
                {errors.cardNumber && <span className="error-message-concept2">{errors.cardNumber}</span>}
              </div>
            </div>
            <div className="form-row-concept2">
              <div className="form-group-concept2">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={errors.expiryDate ? 'error' : ''}
                />
                {errors.expiryDate && <span className="error-message-concept2">{errors.expiryDate}</span>}
              </div>
              <div className="form-group-concept2">
                <label>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  className={errors.cvc ? 'error' : ''}
                />
                {errors.cvc && <span className="error-message-concept2">{errors.cvc}</span>}
              </div>
            </div>
            <div className="form-row-concept2">
              <div className="form-group-concept2 full-width">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.cardholderName ? 'error' : ''}
                />
                {errors.cardholderName && <span className="error-message-concept2">{errors.cardholderName}</span>}
              </div>
            </div>
          </div>

          <div className="form-section-concept2">
            <h3>Billing Address</h3>
            <div className="form-row-concept2">
              <div className="form-group-concept2 full-width">
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="123 Main St"
                  className={errors.addressLine1 ? 'error' : ''}
                />
                {errors.addressLine1 && <span className="error-message-concept2">{errors.addressLine1}</span>}
              </div>
            </div>
            <div className="form-row-concept2">
              <div className="form-group-concept2">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message-concept2">{errors.city}</span>}
              </div>
              <div className="form-group-concept2">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className={errors.postalCode ? 'error' : ''}
                />
                {errors.postalCode && <span className="error-message-concept2">{errors.postalCode}</span>}
              </div>
            </div>
          </div>

          <button type="submit" className="submit-payment-button-concept2" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Add Payment Method'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentConcept2
