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
    credits: 500, // Limited trial credits
    selectedAgents: [],
    hasPaymentMethod: false,
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

  const addAgent = (agentId) => {
    // First agent is free, no payment required
    if (userData.selectedAgents.length === 0) {
      setUserData(prev => ({
        ...prev,
        selectedAgents: [...prev.selectedAgents, agentId]
      }))
      return { success: true, requiresPayment: false }
    }
    
    // Second+ agent requires payment
    if (!userData.hasPaymentMethod) {
      return { success: false, requiresPayment: true }
    }
    
    // User has payment method, add agent
    setUserData(prev => ({
      ...prev,
      selectedAgents: [...prev.selectedAgents, agentId]
    }))
    return { success: true, requiresPayment: false }
  }

  const removeAgent = (agentId) => {
    setUserData(prev => ({
      ...prev,
      selectedAgents: prev.selectedAgents.filter(id => id !== agentId)
    }))
  }

  const updatePaymentStatus = (hasPayment) => {
    setUserData(prev => ({
      ...prev,
      hasPaymentMethod: hasPayment
    }))
  }

  return (
    <OnboardingContext.Provider
      value={{
        userData,
        updateUserData,
        addIntegration,
        removeIntegration,
        addAgent,
        removeAgent,
        updatePaymentStatus,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
