'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from './ui/button'
import { trackSignUpFlow } from '../utils/analytics'

interface UnlockScreenProps {
  onNext: () => void
}

export function UnlockScreen({ onNext }: UnlockScreenProps) {
  const [unlockProgress, setUnlockProgress] = useState(0)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleUnlock = () => {
    // Track unlock interaction start
    trackSignUpFlow.unlockViewed()
    
    // Animate progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      setUnlockProgress(Math.min(progress, 100))
      
      if (progress >= 100) {
        clearInterval(interval)
        setIsUnlocked(true)
        setShowSparkles(true)
        setShowModal(true)
        
        // Track unlock completion
        trackSignUpFlow.unlockCompleted()
      }
    }, 100)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setTimeout(() => {
      onNext()
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Sparkles Animation */}
      <AnimatePresence>
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: -20,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                  rotate: 360,
                  opacity: 0
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.1,
                  ease: "linear"
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#EE6C45', '#FFCE61', '#FFE58A', '#50366F', '#BF3475'][i % 5]
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#50366F] mb-4">
            Unlock Your Invitation
          </h2>
          <p className="text-lg text-[#50366F]/80">
            {!isUnlocked ? 'Ready to reveal your exclusive access?' : 'Invitation unlocked!'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8"
        >
          <div className="relative mx-auto w-80 h-64 bg-gradient-to-br from-[#FFCE61] to-[#FFE58A] rounded-2xl shadow-2xl overflow-hidden">
            {/* Revealed content underneath */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#EE6C45] to-[#BF3475]">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎟️</div>
                <h3 className="text-2xl font-bold mb-2">YOU'RE IN!</h3>
                <p className="text-lg">Welcome to Ouest Alpha</p>
                <div className="mt-4 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <p className="text-sm">Alpha Tester #1,234</p>
                </div>
              </div>
            </div>

            {/* Scratch overlay */}
            {!isUnlocked && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#FFCE61] to-[#FFE58A] flex items-center justify-center cursor-pointer"
                onClick={handleUnlock}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center text-[#50366F]">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-bold">Tap to Unlock</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              onClick={handleUnlock}
              size="lg"
              className="bg-gradient-to-r from-[#50366F] to-[#BF3475] hover:from-[#50366F]/90 hover:to-[#BF3475]/90 text-white px-8 py-4 rounded-2xl shadow-xl"
            >
              Start Unlocking
            </Button>
          </motion.div>
        )}

        {isUnlocked && (
          <div className="text-[#50366F]/60">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-[#EE6C45] to-[#BF3475] h-2 rounded-full transition-all duration-300"
                style={{ width: `${unlockProgress}%` }}
              ></div>
            </div>
            <p className="text-sm">{Math.round(unlockProgress)}% revealed</p>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-[#50366F] mb-2">You're In!</h3>
              <p className="text-[#50366F]/80 mb-6">
                Congratulations! You've unlocked exclusive access to Ouest Alpha.
              </p>
              <Button
                onClick={handleModalClose}
                className="bg-gradient-to-r from-[#EE6C45] to-[#BF3475] hover:from-[#EE6C45]/90 hover:to-[#BF3475]/90 text-white px-8 py-3 rounded-2xl"
              >
                Claim Your Stamp →
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}