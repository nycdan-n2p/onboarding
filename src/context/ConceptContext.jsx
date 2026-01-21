import React, { createContext, useContext, useState, useEffect } from 'react'

const ConceptContext = createContext()

export const useConcept = () => {
  const context = useContext(ConceptContext)
  if (!context) {
    throw new Error('useConcept must be used within ConceptProvider')
  }
  return context
}

export const ConceptProvider = ({ children }) => {
  const [activeConcept, setActiveConcept] = useState(() => {
    // Get from localStorage or default to 'concept1'
    return localStorage.getItem('activeConcept') || 'concept1'
  })

  useEffect(() => {
    localStorage.setItem('activeConcept', activeConcept)
  }, [activeConcept])

  const switchConcept = (concept) => {
    setActiveConcept(concept)
  }

  return (
    <ConceptContext.Provider
      value={{
        activeConcept,
        switchConcept,
      }}
    >
      {children}
    </ConceptContext.Provider>
  )
}
