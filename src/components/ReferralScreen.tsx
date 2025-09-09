import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { UserData } from '../App'

interface ReferralScreenProps {
  userData: UserData
}

export function ReferralScreen({ userData }: ReferralScreenProps) {
  const [referralCode] = useState(`OUEST-${userData.name.replace(/\s+/g, '').toUpperCase().slice(0,6)}-ALPHA`)
  const [referralLink] = useState(`https://ouest.app/invite/${referralCode.toLowerCase()}`)
  const [copied, setCopied] = useState(false)
  const [referralCount] = useState(0)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Preview stamps that can be earned
  const exclusiveStamps = [
    {
      id: 'tokyo-launch',
      name: 'Tokyo Launch',
      icon: '🗾',
      color: 'from-red-500 to-red-700',
      description: 'Earned when Ouest launches in Tokyo',
      unlocked: false
    },
    {
      id: 'rio-carnival',
      name: 'Rio Carnival',
      icon: '🎭',
      color: 'from-teal-500 to-teal-700',
      description: 'Exclusive carnival season stamp',
      unlocked: false
    },
    {
      id: 'paris-explorer',
      name: 'Paris Explorer',
      icon: '🗼',
      color: 'from-purple-500 to-purple-700',
      description: 'Vintage airmail explorer badge',
      unlocked: false
    },
    {
      id: 'crew-builder',
      name: 'Crew Builder',
      icon: '👥',
      color: 'from-orange-500 to-orange-700',
      description: 'For bringing 5+ friends to Alpha',
      unlocked: referralCount >= 5
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#50366F] mb-4">
            Bring Your Crew
          </h2>
          <h3 className="text-2xl text-[#BF3475] mb-4">
            Get Exclusive Stamps
          </h3>
          <p className="text-lg text-[#50366F]/80 max-w-2xl mx-auto">
            Share Ouest Alpha with your friends and unlock rare collectible stamps that show your explorer status.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Referral Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          >
            <h4 className="text-xl font-bold text-[#50366F] mb-4">Your Referral Link</h4>
            <p className="text-[#50366F]/80 mb-6">
              Share this link with friends to give them Alpha access and earn exclusive stamps for yourself.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#50366F] mb-2">
                Referral Code
              </label>
              <div className="flex">
                <Input
                  value={referralCode}
                  readOnly
                  className="flex-1 rounded-l-xl border-r-0 focus:border-[#50366F] bg-gray-50"
                />
                <Button
                  onClick={copyToClipboard}
                  className="rounded-r-xl rounded-l-none bg-[#50366F] hover:bg-[#50366F]/90 text-white px-4"
                >
                  {copied ? '✓' : '📋'}
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#50366F] mb-2">
                Share Link
              </label>
              <div className="flex">
                <Input
                  value={referralLink}
                  readOnly
                  className="flex-1 rounded-l-xl border-r-0 focus:border-[#50366F] bg-gray-50 text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  className="rounded-r-xl rounded-l-none bg-gradient-to-r from-[#EE6C45] to-[#BF3475] hover:from-[#EE6C45]/90 hover:to-[#BF3475]/90 text-white px-4"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFCE61] to-[#FFE58A] rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#50366F]">Friends Invited</p>
                  <p className="text-[#50366F]/80 text-sm">Earn stamps for each friend who joins</p>
                </div>
                <div className="text-3xl font-bold text-[#50366F]">
                  {referralCount}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Exclusive Stamps Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          >
            <h4 className="text-xl font-bold text-[#50366F] mb-4">Collectible Stamps</h4>
            <p className="text-[#50366F]/80 mb-6">
              Preview of exclusive stamps you can earn through referrals and at launch.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {exclusiveStamps.map((stamp, index) => (
                <motion.div
                  key={stamp.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`
                    relative p-4 rounded-2xl border-2 transition-all duration-300
                    ${stamp.unlocked 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-gray-50 opacity-75'
                    }
                  `}
                >
                  {stamp.unlocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  <div className={`
                    w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center bg-gradient-to-br ${stamp.color} shadow-lg
                  `}>
                    <span className="text-2xl">{stamp.icon}</span>
                  </div>
                  
                  <h5 className="font-bold text-sm text-[#50366F] text-center mb-1">
                    {stamp.name}
                  </h5>
                  <p className="text-xs text-[#50366F]/60 text-center">
                    {stamp.description}
                  </p>
                  
                  {!stamp.unlocked && (
                    <div className="absolute inset-0 bg-white/50 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h4 className="text-lg font-bold text-[#50366F] mb-4">
            Quick Share
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join me on Ouest Alpha! 🌍✈️ Let's plan epic trips together. Use my link: ${referralLink}`)}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl"
            >
              Share on Twitter
            </Button>
            <Button
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Hey! I just got Alpha access to Ouest - a new collaborative travel app! Want to join me? ${referralLink}`)}`)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl"
            >
              Share on WhatsApp
            </Button>
            <Button
              onClick={() => window.open(`mailto:?subject=Join me on Ouest Alpha&body=Hey! I just got exclusive Alpha access to Ouest, a new collaborative travel planning app. Want to join me and start planning some amazing trips together? Use my referral link: ${referralLink}`)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl"
            >
              Share via Email
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-[#50366F]/60"
        >
          <p className="text-sm">
            🎯 Start inviting friends • Exclusive stamps unlock at launch • Limited Alpha seats available
          </p>
        </motion.div>
      </div>
    </div>
  )
}