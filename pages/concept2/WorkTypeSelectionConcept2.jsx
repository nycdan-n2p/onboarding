import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { 
  Code, FileText, MessageCircle, DollarSign, GraduationCap, Heart,
  PenTool, Monitor, Building, Users, Scale, Settings
} from 'lucide-react'
import './WorkTypeSelectionConcept2.css'

const workTypes = [
  { id: 'engineering', label: 'Engineering', icon: Code },
  { id: 'product', label: 'Product Management', icon: FileText },
  { id: 'customer', label: 'Customer Experience', icon: MessageCircle },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'research', label: 'Research & Education', icon: GraduationCap },
  { id: 'healthcare', label: 'Healthcare', icon: Heart },
  { id: 'design', label: 'Design', icon: PenTool },
  { id: 'marketing', label: 'Marketing', icon: Monitor },
  { id: 'sales', label: 'Sales', icon: Building },
  { id: 'hr', label: 'People & HR', icon: Users },
  { id: 'legal', label: 'Legal', icon: Scale },
  { id: 'other', label: 'Other', icon: Settings },
]

const WorkTypeSelectionConcept2 = () => {
  const navigate = useNavigate()
  const { updateUserData } = useOnboarding()
  const [selectedType, setSelectedType] = useState(null)

  const handleSelect = (typeId) => {
    setSelectedType(typeId)
  }

  const handleContinue = () => {
    if (!selectedType) return
    
    updateUserData({ workType: selectedType })
    navigate('/concept2/integrations')
  }

  return (
    <div className="work-type-page-concept2">
      <div className="work-type-container-concept2">
        <div className="work-type-header-concept2">
          <h1>What kind of work do you do?</h1>
          <p>Select the option that best applies</p>
        </div>

        <div className="work-type-grid-concept2">
          {workTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id
            
            return (
              <button
                key={type.id}
                className={`work-type-card-concept2 ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(type.id)}
              >
                <Icon size={24} />
                <span>{type.label}</span>
              </button>
            )
          })}
        </div>

        <div className="work-type-footer-concept2">
          <button
            onClick={handleContinue}
            className="continue-button-concept2"
            disabled={!selectedType}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkTypeSelectionConcept2
