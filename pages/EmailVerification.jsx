import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import './EmailVerification.css'

const EmailVerification = () => {
  const navigate = useNavigate()
  const { userData, updateUserData } = useOnboarding()
  const [token, setToken] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('verificationToken')
    if (!storedToken) {
      navigate('/register')
    }
  }, [navigate])

  const handleTokenChange = (index, value) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return

    const newToken = [...token]
    newToken[index] = value
    setToken(newToken)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`token-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !token[index] && index > 0) {
      const prevInput = document.getElementById(`token-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (/^\d{6}$/.test(pastedData)) {
      const newToken = pastedData.split('')
      setToken(newToken)
      document.getElementById('token-5')?.focus()
    }
  }

  const handleVerify = async () => {
    const enteredToken = token.join('')
    const storedToken = localStorage.getItem('verificationToken')

    if (enteredToken.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setIsVerifying(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      if (enteredToken === storedToken) {
        setIsVerified(true)
        updateUserData({ emailVerified: true })
        setTimeout(() => {
          navigate('/work-type')
        }, 1500)
      } else {
        setError('Invalid verification code. Please try again.')
        setIsVerifying(false)
        setToken(['', '', '', '', '', ''])
        document.getElementById('token-0')?.focus()
      }
    }, 1000)
  }

  const resendCode = () => {
    const newToken = Math.floor(100000 + Math.random() * 900000).toString()
    localStorage.setItem('verificationToken', newToken)
    alert(`New verification code sent!\n\nToken: ${newToken}\n\n(For demo purposes)`)
    setToken(['', '', '', '', '', ''])
    setError('')
    document.getElementById('token-0')?.focus()
  }

  useEffect(() => {
    document.getElementById('token-0')?.focus()
  }, [])

  return (
    <div className="verification-page">
      <div className="verification-container">
        <div className="verification-header">
          <div className={`verification-icon ${isVerified ? 'verified' : ''}`}>
            {isVerified ? (
              <CheckCircle size={48} />
            ) : (
              <Mail size={48} />
            )}
          </div>
          <h1>Verify Your Email</h1>
          <p>
            We've sent a 6-digit verification code to
            <br />
            <strong>{userData.email || localStorage.getItem('verificationEmail')}</strong>
          </p>
        </div>

        {!isVerified ? (
          <>
            <div className="token-input-container">
              {token.map((digit, index) => (
                <input
                  key={index}
                  id={`token-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleTokenChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="token-input"
                  disabled={isVerifying}
                />
              ))}
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              onClick={handleVerify}
              className="verify-button"
              disabled={isVerifying || token.join('').length !== 6}
            >
              {isVerifying ? 'Verifying...' : 'Verify Email'}
              {!isVerifying && <ArrowRight size={20} />}
            </button>

            <div className="resend-section">
              <p>Didn't receive the code?</p>
              <button onClick={resendCode} className="resend-button">
                Resend Code
              </button>
            </div>
          </>
        ) : (
          <div className="verified-message">
            <CheckCircle size={64} />
            <h2>Email Verified!</h2>
            <p>Redirecting you to the next step...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailVerification
