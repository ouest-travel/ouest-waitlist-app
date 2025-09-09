import { motion } from 'motion/react'
import { Button } from './ui/button'
import { trackSignUpFlow } from '../utils/analytics'

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  const handleStartJourney = () => {
    // Track welcome CTA click
    trackSignUpFlow.welcomeStarted()
    onNext()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#50366F] mb-4">
            Your Boarding Pass to
            <span className="block bg-gradient-to-r from-[#BF3475] to-[#50366F] bg-clip-text text-transparent">
              Ouest Alpha Awaits
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#50366F]/80 max-w-2xl mx-auto">
            Plan, budget, and share your trips with your crew.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mb-8"
        >
          {/* Stylized passport on wooden desk */}
          <div className="relative mx-auto w-80 h-60 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-2xl transform rotate-1">
            {/* Wood grain texture */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-amber-900 to-amber-700 rounded-lg"></div>
            
            {/* Passport */}
            <div className="absolute top-8 left-8 w-32 h-44 bg-[#50366F] rounded-sm shadow-xl transform -rotate-3">
              <div className="p-4 text-white text-center">
                <div className="w-6 h-6 mx-auto mb-2 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-xs">✈️</span>
                </div>
                <div className="text-xs font-bold">PASSPORT</div>
                <div className="text-[10px] mt-1">OUEST ALPHA</div>
                <div className="mt-4 w-16 h-20 bg-white/20 rounded-sm flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
            </div>

            {/* Boarding pass elements */}
            <div className="absolute top-6 right-6 w-20 h-16 bg-white rounded-sm shadow-lg transform rotate-6">
              <div className="p-2 text-xs text-[#50366F]">
                <div className="font-bold">OUEST</div>
                <div className="text-[8px]">ALPHA PASS</div>
                <div className="mt-1 text-[8px]">SEAT: VIP</div>
              </div>
            </div>

            {/* Map corner */}
            <div className="absolute bottom-6 right-6 w-16 h-12 bg-amber-100 rounded-sm shadow-lg transform -rotate-12 overflow-hidden">
              <div className="p-1 text-xs text-amber-800">
                <div className="w-full h-full bg-gradient-to-br from-green-200 to-blue-200 rounded flex items-center justify-center">
                  🗺️
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={handleStartJourney}
            size="lg"
            className="bg-gradient-to-r from-[#EE6C45] to-[#BF3475] hover:from-[#EE6C45]/90 hover:to-[#BF3475]/90 text-white px-8 py-4 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 transform -skew-x-12 group-hover:animate-pulse"></span>
            <span className="relative flex items-center space-x-2">
              <span>🔓</span>
              <span>Tap to Unlock</span>
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-[#50366F]/60"
        >
          <p className="text-sm">Exclusive Alpha Access • Limited Seats Available</p>
        </motion.div>
      </div>
    </div>
  )
}