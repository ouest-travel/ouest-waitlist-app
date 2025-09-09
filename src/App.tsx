'use client'

import { useState, useEffect } from 'react'
import { WelcomeScreen } from './components/WelcomeScreen'
import { UnlockScreen } from './components/UnlockScreen'
import { PassportStampScreen } from './components/PassportStampScreen'
import { SignUpScreen } from './components/SignUpScreen'
import { ConfirmationScreen } from './components/ConfirmationScreen'
import { ReferralScreen } from './components/ReferralScreen'
import { ProgressTracker } from './components/ProgressTracker'
import { initGA, trackPageView, trackSignUpFlow } from './utils/analytics'

export type FlowStep = 'welcome' | 'unlock' | 'stamp' | 'signup' | 'confirmation' | 'referral'

export interface UserData {
  name: string
  email: string
  password: string
  country: string
  stamps: string[]
  referralCode?: string
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('welcome')
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    country: '',
    stamps: [],
    referralCode: ''
  })
  const [startTime] = useState(Date.now())

  useEffect(() => {
    // Initialize Google Analytics on app load
    initGA()
    trackPageView('Welcome Screen')
    trackSignUpFlow.welcomeViewed()
  }, [])

  useEffect(() => {
    // Track page views when step changes
    const stepNames = {
      welcome: 'Welcome Screen',
      unlock: 'Unlock Screen', 
      stamp: 'Passport Stamp Screen',
      signup: 'Sign Up Form',
      confirmation: 'Confirmation Screen',
      referral: 'Referral Screen'
    }
    
    trackPageView(stepNames[currentStep], userData.email || undefined)
    
    // Track specific flow events
    switch (currentStep) {
      case 'unlock':
        trackSignUpFlow.unlockViewed(userData.email || undefined)
        break
      case 'stamp':
        trackSignUpFlow.stampViewed(userData.email || undefined)
        break
      case 'signup':
        trackSignUpFlow.signupFormViewed(userData.email || undefined)
        break
      case 'confirmation':
        trackSignUpFlow.confirmationViewed(userData.email)
        break
      case 'referral':
        trackSignUpFlow.referralViewed(userData.email)
        break
    }
  }, [currentStep, userData.email])

  const nextStep = () => {
    const steps: FlowStep[] = ['welcome', 'unlock', 'stamp', 'signup', 'confirmation', 'referral']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const addStamp = (stampId: string) => {
    setUserData(prev => ({
      ...prev,
      stamps: [...prev.stamps, stampId]
    }))
    
    // Track stamp collection
    trackSignUpFlow.stampEarned(stampId, userData.email || undefined)
  }

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...data
    }))
  }

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={nextStep} />
      case 'unlock':
        return <UnlockScreen onNext={nextStep} />
      case 'stamp':
        return <PassportStampScreen onNext={nextStep} onAddStamp={addStamp} />
      case 'signup':
        return <SignUpScreen userData={userData} onUpdateUser={updateUserData} onNext={nextStep} />
      case 'confirmation':
        return <ConfirmationScreen userData={userData} onNext={nextStep} />
      case 'referral':
        return <ReferralScreen userData={userData} />
      default:
        return <WelcomeScreen onNext={nextStep} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFCE61] via-[#FFE58A] to-[#EE6C45] relative overflow-hidden">
      {/* Background travel elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-12 h-12 rotate-12">✈️</div>
        <div className="absolute top-40 right-20 w-8 h-8 -rotate-12">🧳</div>
        <div className="absolute bottom-40 left-20 w-10 h-10 rotate-45">🗺️</div>
        <div className="absolute bottom-20 right-10 w-6 h-6 -rotate-45">📍</div>
      </div>

      {currentStep !== 'welcome' && (
        <ProgressTracker currentStep={currentStep} />
      )}
      
      <div className="relative z-10">
        {renderCurrentScreen()}
      </div>
    </div>
  )
}