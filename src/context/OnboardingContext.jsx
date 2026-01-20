import React, { createContext, useContext, useState } from 'react'

const OnboardingContext = createContext()

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}

export const OnboardingProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    company: '',
    email: '',
    emailVerified: false,
    workType: null,
    integrations: [],
    tokens: 10000, // Limited trial tokens
  })

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }))
  }

  const addIntegration = (integration) => {
    setUserData(prev => ({
      ...prev,
      integrations: [...prev.integrations, integration]
    }))
  }

  const removeIntegration = (integrationId) => {
    setUserData(prev => ({
      ...prev,
      integrations: prev.integrations.filter(i => i.id !== integrationId)
    }))
  }

  return (
    <OnboardingContext.Provider
      value={{
        userData,
        updateUserData,
        addIntegration,
        removeIntegration,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
