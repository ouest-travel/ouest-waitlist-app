import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from './ui/button'

interface PassportStampScreenProps {
  onNext: () => void
  onAddStamp: (stampId: string) => void
}

export function PassportStampScreen({ onNext, onAddStamp }: PassportStampScreenProps) {
  const [showStampAnimation, setShowStampAnimation] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showInkSplash, setShowInkSplash] = useState(false)

  useEffect(() => {
    // Trigger stamp animation after component mounts
    const timer = setTimeout(() => {
      setShowStampAnimation(true)
      setShowInkSplash(true)
      onAddStamp('alpha-tester-2025')
    }, 800)

    // Show tooltip after stamp animation
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 2500)

    // Hide ink splash after animation
    const inkTimer = setTimeout(() => {
      setShowInkSplash(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
      clearTimeout(inkTimer)
    }
  }, [onAddStamp])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#50366F] mb-4">
            Welcome to the Collection
          </h2>
          <p className="text-lg text-[#50366F]/80 max-w-2xl mx-auto">
            Your passport is ready to be stamped! This is your first collectible destination stamp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8"
        >
          {/* Passport Book */}
          <div className="relative mx-auto w-[500px] h-[360px] perspective-1000">
            {/* Passport Cover */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: showStampAnimation ? -130 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#50366F] to-[#2d1b4e] rounded-lg shadow-2xl origin-left z-20"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="p-8 text-white text-center h-full flex flex-col justify-between relative">
                {/* Passport texture overlay */}
                <div className="absolute inset-0 opacity-10 rounded-lg" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                  backgroundSize: '8px 8px, 4px 4px'
                }}></div>
                
                {/* Header */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 border-3 border-yellow-400 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-600">
                    <span className="text-3xl">✈️</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 tracking-wider">PASSPORT</h3>
                  <p className="text-sm opacity-90 tracking-widest">OUEST COLLECTION</p>
                </div>

                {/* Globe illustration */}
                <div className="relative z-10">
                  <div className="w-32 h-40 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-6xl drop-shadow-lg">🌍</div>
                  </div>
                </div>
                
                {/* Serial number */}
                <div className="relative z-10 text-xs opacity-70 tracking-wider">
                  No. OV-2025-001
                </div>
              </div>
            </motion.div>

            {/* Passport Interior Pages */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-lg shadow-xl border border-gray-200">
              <div className="p-6 h-full relative overflow-hidden">
                {/* Official Header */}
                <div className="border-b-2 border-[#50366F] pb-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#50366F] text-sm tracking-wider">TRAVEL DOCUMENT</h4>
                      <p className="text-xs text-gray-600">Ouest Digital Passport</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>Document No: OV-2025-001</p>
                      <p>Issue Date: Jan 2025</p>
                    </div>
                  </div>
                </div>

                {/* Stamps Table Header */}
                <div className="mb-4">
                  <h5 className="font-semibold text-[#50366F] text-sm mb-3">DESTINATION STAMPS & VISAS</h5>
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-3">
                    <div>DATE</div>
                    <div>DESTINATION</div>
                    <div>TYPE</div>
                    <div>STATUS</div>
                  </div>

                  {/* Table Rows */}
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-4 gap-2 py-1 border-b border-gray-100">
                      <div className="text-gray-600">15 JAN 2025</div>
                      <div className="font-medium">ALPHA ACCESS</div>
                      <div className="text-[#50366F]">EXCLUSIVE</div>
                      <div className="text-green-600 font-medium">✓ APPROVED</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-1 border-b border-gray-100">
                      <div className="text-gray-400">-- --- ----</div>
                      <div className="text-gray-400">NEXT DESTINATION</div>
                      <div className="text-gray-400">TRAVEL</div>
                      <div className="text-gray-400">PENDING</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-1 border-b border-gray-100">
                      <div className="text-gray-400">-- --- ----</div>
                      <div className="text-gray-400">ADVENTURE AWAITS</div>
                      <div className="text-gray-400">EXPLORE</div>
                      <div className="text-gray-400">PENDING</div>
                    </div>
                  </div>
                </div>

                {/* Stamp Area */}
                <div className="absolute top-20 right-6 w-44 h-44">
                  <div className="relative w-full h-full">
                    {/* Ink splash effect */}
                    <AnimatePresence>
                      {showInkSplash && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0.8 }}
                          animate={{ scale: 1.2, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute inset-0 bg-gradient-radial from-[#50366F]/30 via-[#50366F]/10 to-transparent rounded-full"
                        />
                      )}
                    </AnimatePresence>

                    {/* Main Stamp */}
                    <AnimatePresence>
                      {showStampAnimation && (
                        <motion.div
                          initial={{ scale: 0, rotate: -25, opacity: 0, y: -20 }}
                          animate={{ 
                            scale: 1, 
                            rotate: -8, 
                            opacity: 1,
                            y: 0
                          }}
                          transition={{ 
                            duration: 1.2, 
                            delay: 0.3,
                            type: "spring",
                            bounce: 0.5
                          }}
                          className="absolute inset-0"
                        >
                          {/* Outer Stamp Ring */}
                          <div className="w-full h-full relative">
                            {/* Ink texture background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#50366F] via-[#663d7a] to-[#50366F] rounded-full opacity-90"></div>
                            
                            {/* Grunge texture overlay */}
                            <div className="absolute inset-0 opacity-40 rounded-full">
                              {Array.from({ length: 30 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-1 h-1 bg-black/30 rounded-full"
                                  style={{
                                    left: `${15 + Math.random() * 70}%`,
                                    top: `${15 + Math.random() * 70}%`,
                                    transform: `scale(${0.5 + Math.random() * 1.5})`,
                                    opacity: Math.random() * 0.6
                                  }}
                                />
                              ))}
                            </div>

                            {/* Stamp Border */}
                            <div className="absolute inset-2 border-3 border-white/80 rounded-full"></div>
                            <div className="absolute inset-4 border border-white/40 rounded-full"></div>
                            
                            {/* Stamp Content */}
                            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
                              <div className="text-4xl mb-3 drop-shadow-lg">✈️</div>
                              <div className="text-center">
                                <p className="font-bold text-sm tracking-wider">OUEST ALPHA</p>
                                <p className="text-xs mt-1 opacity-90">JANUARY 2025</p>
                                <div className="w-12 h-px bg-white/60 mx-auto my-2"></div>
                                <p className="text-[10px] tracking-widest opacity-80">
                                  EXCLUSIVE ACCESS
                                </p>
                                <p className="text-[8px] mt-1 opacity-70">
                                  MEMBER #001
                                </p>
                              </div>
                            </div>

                            {/* Stamp perforation effect */}
                            <div className="absolute inset-0">
                              {Array.from({ length: 24 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-2 h-2 bg-white rounded-full"
                                  style={{
                                    left: `${50 + 40 * Math.cos((i * 15 * Math.PI) / 180)}%`,
                                    top: `${50 + 40 * Math.sin((i * 15 * Math.PI) / 180)}%`,
                                    transform: 'translate(-50%, -50%)',
                                    opacity: 0.3
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {showTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-[#50366F] text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-30"
                        >
                          Your first Ouest stamp! Collect more at launch.
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-4 border-transparent border-t-[#50366F]"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Official Info */}
                <div className="absolute bottom-4 left-6 right-6 text-xs text-gray-500 border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>Digital Travel Document • Blockchain Verified</p>
                    </div>
                    <div className="text-right">
                      <p>Page 01 of 01</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-[#EE6C45] to-[#BF3475] hover:from-[#EE6C45]/90 hover:to-[#BF3475]/90 text-white px-8 py-4 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105"
            disabled={!showStampAnimation}
          >
            Claim Your Seat →
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-6 text-[#50366F]/60"
        >
          <p className="text-sm">🎯 Stamp #1 of your collection • More destinations coming at launch</p>
        </motion.div>
      </div>
    </div>
  )
}