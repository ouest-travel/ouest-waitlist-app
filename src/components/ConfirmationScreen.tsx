import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from './ui/button'
import { UserData } from '../App'

interface ConfirmationScreenProps {
  userData: UserData
  onNext: () => void
}

export function ConfirmationScreen({ userData, onNext }: ConfirmationScreenProps) {
  const [showBoardingPass, setShowBoardingPass] = useState(false)
  const [showShareButtons, setShowShareButtons] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBoardingPass(true)
    }, 800)

    const shareTimer = setTimeout(() => {
      setShowShareButtons(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(shareTimer)
    }
  }, [])

  const handleShare = (platform: string) => {
    const shareText = "I just joined the Ouest Alpha! 🌍✈️ Building the future of collaborative travel planning with my crew. #OuestAlpha #TravelTech"
    const shareUrl = "https://ouest.app/alpha"

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        // You could show a toast here
        break
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#50366F] mb-4">
            Welcome to the Crew!
          </h2>
          <p className="text-lg text-[#50366F]/80 max-w-2xl mx-auto">
            Congratulations, {userData.name}! You're now part of an exclusive group of Alpha testers shaping the future of travel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8"
        >
          {/* Animated Boarding Pass */}
          <div className="relative mx-auto max-w-lg">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={showBoardingPass ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border-l-8 border-[#50366F] relative"
            >
              {/* Perforated edge */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-[#50366F] to-[#BF3475]">
                <div className="flex flex-col justify-center h-full">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white rounded-full mx-auto mb-1"></div>
                  ))}
                </div>
              </div>

              <div className="pl-12 pr-6 py-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#50366F]">OUEST</h3>
                    <p className="text-sm text-gray-500">ALPHA ACCESS PASS</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#EE6C45] to-[#BF3475] rounded-full flex items-center justify-center">
                      <span className="text-2xl">✈️</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Passenger</p>
                    <p className="font-bold text-[#50366F]">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                    <p className="font-bold text-green-600">APPROVED</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Seat</p>
                    <p className="font-bold text-[#50366F]">ALPHA-001</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Gate</p>
                    <p className="font-bold text-[#50366F]">VIP</p>
                  </div>
                </div>

                {/* Stamp */}
                <div className="flex justify-end">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={showBoardingPass ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center transform rotate-12 border-4 border-red-600"
                  >
                    <div className="text-center text-white">
                      <p className="text-xs font-bold">APPROVED</p>
                      <p className="text-[8px]">JAN 2025</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showShareButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold text-[#50366F] mb-4">
                Share Your Invite
              </h3>
              <p className="text-[#50366F]/80 mb-6">
                Let your friends know you're part of something special
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button
                  onClick={() => handleShare('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </Button>

                <Button
                  onClick={() => handleShare('linkedin')}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Button>

                <Button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>

                <Button
                  onClick={() => handleShare('copy')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-[#EE6C45] to-[#BF3475] hover:from-[#EE6C45]/90 hover:to-[#BF3475]/90 text-white px-8 py-4 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            Earn More Stamps →
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-8 text-[#50366F]/60"
        >
          <p className="text-sm">🎯 Your journey begins now • Check your email for next steps</p>
        </motion.div>
      </div>
    </div>
  )
}