import { FlowStep } from '../App'

interface ProgressTrackerProps {
  currentStep: FlowStep
}

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  const steps = [
    { id: 'unlock', label: 'Unlock Invite', icon: '🔓' },
    { id: 'stamp', label: 'Claim Stamp', icon: '🛂' },
    { id: 'signup', label: 'Sign Up', icon: '✍️' },
    { id: 'confirmation', label: 'Confirm', icon: '✅' }
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep)
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
        <div className="flex items-center space-x-6">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex
            const isUpcoming = index > currentStepIndex

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white' : 
                      isActive ? 'bg-[#50366F] text-white ring-4 ring-[#50366F]/20' : 
                      'bg-gray-200 text-gray-400'}
                  `}>
                    {isCompleted ? '✓' : step.icon}
                  </div>
                  <span className={`
                    text-xs mt-1 transition-colors duration-300
                    ${isActive ? 'text-[#50366F] font-medium' : 'text-gray-500'}
                  `}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 h-0.5 mx-2 transition-colors duration-300
                    ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}