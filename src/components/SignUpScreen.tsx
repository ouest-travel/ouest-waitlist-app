'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { UserData } from '../App'
import { trackSignUpFlow, trackEvent, trackConversion } from '../utils/analytics'

interface SignUpScreenProps {
  userData: UserData
  onUpdateUser: (data: Partial<UserData>) => void
  onNext: () => void
}

export function SignUpScreen({ userData, onUpdateUser, onNext }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    country: userData.country
  })
  const [alphaSeatsLeft] = useState(134)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStarted, setFormStarted] = useState(false)

  // Track when user starts interacting with form
  useEffect(() => {
    if (!formStarted && (formData.name || formData.email || formData.password || formData.country)) {
      setFormStarted(true)
      trackSignUpFlow.signupFormStarted(userData.email || undefined)
    }
  }, [formData, formStarted, userData.email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Update user data
      onUpdateUser(formData)
      
      // Track successful signup completion
      trackSignUpFlow.signupCompleted(formData.email, formData.country)
      trackConversion('signup', 1, formData.email)
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        onNext()
      }, 1500)
    } catch (error) {
      // Track form submission error
      trackSignUpFlow.formError('submission_failed', undefined, formData.email || undefined)
      setIsSubmitting(false)
    }
  }

  const handleSocialSignUp = (provider: 'google' | 'apple') => {
    setIsSubmitting(true)
    
    // Track social signup attempt
    trackEvent('social_signup_attempted', {
      event_category: 'signup_flow',
      event_label: provider,
      user_id: userData.email || undefined,
      custom_parameters: { provider }
    })
    
    // Simulate social auth
    setTimeout(() => {
      const socialUserData = {
        name: `${provider} User`,
        email: `user@${provider}.com`
      }
      
      onUpdateUser(socialUserData)
      
      // Track successful social signup
      trackSignUpFlow.signupCompleted(socialUserData.email, formData.country || 'unknown')
      trackConversion('signup', 1, socialUserData.email)
      
      setIsSubmitting(false)
      onNext()
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Track field completion for key fields
    if (value && (field === 'email' || field === 'name')) {
      trackEvent('form_field_completed', {
        event_category: 'signup_flow',
        event_label: field,
        user_id: userData.email || undefined,
        custom_parameters: { field_name: field }
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-[#50366F] mb-4">
            Claim Your Seat
          </h2>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#EE6C45] to-[#BF3475] rounded-full text-white text-sm">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Only {alphaSeatsLeft} Alpha seats left!
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          {/* Social Sign-Up Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              onClick={() => handleSocialSignUp('google')}
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-3 rounded-2xl font-medium shadow-sm"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button
              type="button"
              onClick={() => handleSocialSignUp('apple')}
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-2xl font-medium shadow-sm"
            >
              <svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or sign up with email</span>
            </div>
          </div>

          {/* Email Sign-Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[#50366F]">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1 rounded-xl border-gray-200 focus:border-[#50366F] focus:ring-[#50366F]/20"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-[#50366F]">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 rounded-xl border-gray-200 focus:border-[#50366F] focus:ring-[#50366F]/20"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#50366F]">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mt-1 rounded-xl border-gray-200 focus:border-[#50366F] focus:ring-[#50366F]/20"
                placeholder="Create a password"
                required
                minLength={8}
              />
            </div>

            <div>
              <Label htmlFor="country" className="text-[#50366F]">Country</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                <SelectTrigger className="mt-1 rounded-xl border-gray-200 focus:border-[#50366F] focus:ring-[#50366F]/20">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="af">Afghanistan</SelectItem>
                  <SelectItem value="al">Albania</SelectItem>
                  <SelectItem value="dz">Algeria</SelectItem>
                  <SelectItem value="ad">Andorra</SelectItem>
                  <SelectItem value="ao">Angola</SelectItem>
                  <SelectItem value="ag">Antigua and Barbuda</SelectItem>
                  <SelectItem value="ar">Argentina</SelectItem>
                  <SelectItem value="am">Armenia</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="at">Austria</SelectItem>
                  <SelectItem value="az">Azerbaijan</SelectItem>
                  <SelectItem value="bs">Bahamas</SelectItem>
                  <SelectItem value="bh">Bahrain</SelectItem>
                  <SelectItem value="bd">Bangladesh</SelectItem>
                  <SelectItem value="bb">Barbados</SelectItem>
                  <SelectItem value="by">Belarus</SelectItem>
                  <SelectItem value="be">Belgium</SelectItem>
                  <SelectItem value="bz">Belize</SelectItem>
                  <SelectItem value="bj">Benin</SelectItem>
                  <SelectItem value="bt">Bhutan</SelectItem>
                  <SelectItem value="bo">Bolivia</SelectItem>
                  <SelectItem value="ba">Bosnia and Herzegovina</SelectItem>
                  <SelectItem value="bw">Botswana</SelectItem>
                  <SelectItem value="br">Brazil</SelectItem>
                  <SelectItem value="bn">Brunei</SelectItem>
                  <SelectItem value="bg">Bulgaria</SelectItem>
                  <SelectItem value="bf">Burkina Faso</SelectItem>
                  <SelectItem value="bi">Burundi</SelectItem>
                  <SelectItem value="cv">Cabo Verde</SelectItem>
                  <SelectItem value="kh">Cambodia</SelectItem>
                  <SelectItem value="cm">Cameroon</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="cf">Central African Republic</SelectItem>
                  <SelectItem value="td">Chad</SelectItem>
                  <SelectItem value="cl">Chile</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="co">Colombia</SelectItem>
                  <SelectItem value="km">Comoros</SelectItem>
                  <SelectItem value="cg">Congo</SelectItem>
                  <SelectItem value="cd">Congo, Democratic Republic</SelectItem>
                  <SelectItem value="cr">Costa Rica</SelectItem>
                  <SelectItem value="hr">Croatia</SelectItem>
                  <SelectItem value="cu">Cuba</SelectItem>
                  <SelectItem value="cy">Cyprus</SelectItem>
                  <SelectItem value="cz">Czech Republic</SelectItem>
                  <SelectItem value="ci">Côte d'Ivoire</SelectItem>
                  <SelectItem value="dk">Denmark</SelectItem>
                  <SelectItem value="dj">Djibouti</SelectItem>
                  <SelectItem value="dm">Dominica</SelectItem>
                  <SelectItem value="do">Dominican Republic</SelectItem>
                  <SelectItem value="ec">Ecuador</SelectItem>
                  <SelectItem value="eg">Egypt</SelectItem>
                  <SelectItem value="sv">El Salvador</SelectItem>
                  <SelectItem value="gq">Equatorial Guinea</SelectItem>
                  <SelectItem value="er">Eritrea</SelectItem>
                  <SelectItem value="ee">Estonia</SelectItem>
                  <SelectItem value="sz">Eswatini</SelectItem>
                  <SelectItem value="et">Ethiopia</SelectItem>
                  <SelectItem value="fj">Fiji</SelectItem>
                  <SelectItem value="fi">Finland</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ga">Gabon</SelectItem>
                  <SelectItem value="gm">Gambia</SelectItem>
                  <SelectItem value="ge">Georgia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="gh">Ghana</SelectItem>
                  <SelectItem value="gr">Greece</SelectItem>
                  <SelectItem value="gd">Grenada</SelectItem>
                  <SelectItem value="gt">Guatemala</SelectItem>
                  <SelectItem value="gn">Guinea</SelectItem>
                  <SelectItem value="gw">Guinea-Bissau</SelectItem>
                  <SelectItem value="gy">Guyana</SelectItem>
                  <SelectItem value="ht">Haiti</SelectItem>
                  <SelectItem value="hn">Honduras</SelectItem>
                  <SelectItem value="hu">Hungary</SelectItem>
                  <SelectItem value="is">Iceland</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="ir">Iran</SelectItem>
                  <SelectItem value="iq">Iraq</SelectItem>
                  <SelectItem value="ie">Ireland</SelectItem>
                  <SelectItem value="il">Israel</SelectItem>
                  <SelectItem value="it">Italy</SelectItem>
                  <SelectItem value="jm">Jamaica</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="jo">Jordan</SelectItem>
                  <SelectItem value="kz">Kazakhstan</SelectItem>
                  <SelectItem value="ke">Kenya</SelectItem>
                  <SelectItem value="ki">Kiribati</SelectItem>
                  <SelectItem value="kp">Korea, North</SelectItem>
                  <SelectItem value="kr">Korea, South</SelectItem>
                  <SelectItem value="kw">Kuwait</SelectItem>
                  <SelectItem value="kg">Kyrgyzstan</SelectItem>
                  <SelectItem value="la">Laos</SelectItem>
                  <SelectItem value="lv">Latvia</SelectItem>
                  <SelectItem value="lb">Lebanon</SelectItem>
                  <SelectItem value="ls">Lesotho</SelectItem>
                  <SelectItem value="lr">Liberia</SelectItem>
                  <SelectItem value="ly">Libya</SelectItem>
                  <SelectItem value="li">Liechtenstein</SelectItem>
                  <SelectItem value="lt">Lithuania</SelectItem>
                  <SelectItem value="lu">Luxembourg</SelectItem>
                  <SelectItem value="mg">Madagascar</SelectItem>
                  <SelectItem value="mw">Malawi</SelectItem>
                  <SelectItem value="my">Malaysia</SelectItem>
                  <SelectItem value="mv">Maldives</SelectItem>
                  <SelectItem value="ml">Mali</SelectItem>
                  <SelectItem value="mt">Malta</SelectItem>
                  <SelectItem value="mh">Marshall Islands</SelectItem>
                  <SelectItem value="mr">Mauritania</SelectItem>
                  <SelectItem value="mu">Mauritius</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                  <SelectItem value="fm">Micronesia</SelectItem>
                  <SelectItem value="md">Moldova</SelectItem>
                  <SelectItem value="mc">Monaco</SelectItem>
                  <SelectItem value="mn">Mongolia</SelectItem>
                  <SelectItem value="me">Montenegro</SelectItem>
                  <SelectItem value="ma">Morocco</SelectItem>
                  <SelectItem value="mz">Mozambique</SelectItem>
                  <SelectItem value="mm">Myanmar</SelectItem>
                  <SelectItem value="na">Namibia</SelectItem>
                  <SelectItem value="nr">Nauru</SelectItem>
                  <SelectItem value="np">Nepal</SelectItem>
                  <SelectItem value="nl">Netherlands</SelectItem>
                  <SelectItem value="nz">New Zealand</SelectItem>
                  <SelectItem value="ni">Nicaragua</SelectItem>
                  <SelectItem value="ne">Niger</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="mk">North Macedonia</SelectItem>
                  <SelectItem value="no">Norway</SelectItem>
                  <SelectItem value="om">Oman</SelectItem>
                  <SelectItem value="pk">Pakistan</SelectItem>
                  <SelectItem value="pw">Palau</SelectItem>
                  <SelectItem value="pa">Panama</SelectItem>
                  <SelectItem value="pg">Papua New Guinea</SelectItem>
                  <SelectItem value="py">Paraguay</SelectItem>
                  <SelectItem value="pe">Peru</SelectItem>
                  <SelectItem value="ph">Philippines</SelectItem>
                  <SelectItem value="pl">Poland</SelectItem>
                  <SelectItem value="pt">Portugal</SelectItem>
                  <SelectItem value="qa">Qatar</SelectItem>
                  <SelectItem value="ro">Romania</SelectItem>
                  <SelectItem value="ru">Russia</SelectItem>
                  <SelectItem value="rw">Rwanda</SelectItem>
                  <SelectItem value="kn">Saint Kitts and Nevis</SelectItem>
                  <SelectItem value="lc">Saint Lucia</SelectItem>
                  <SelectItem value="vc">Saint Vincent and the Grenadines</SelectItem>
                  <SelectItem value="ws">Samoa</SelectItem>
                  <SelectItem value="sm">San Marino</SelectItem>
                  <SelectItem value="st">Sao Tome and Principe</SelectItem>
                  <SelectItem value="sa">Saudi Arabia</SelectItem>
                  <SelectItem value="sn">Senegal</SelectItem>
                  <SelectItem value="rs">Serbia</SelectItem>
                  <SelectItem value="sc">Seychelles</SelectItem>
                  <SelectItem value="sl">Sierra Leone</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="sk">Slovakia</SelectItem>
                  <SelectItem value="si">Slovenia</SelectItem>
                  <SelectItem value="sb">Solomon Islands</SelectItem>
                  <SelectItem value="so">Somalia</SelectItem>
                  <SelectItem value="za">South Africa</SelectItem>
                  <SelectItem value="ss">South Sudan</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="lk">Sri Lanka</SelectItem>
                  <SelectItem value="sd">Sudan</SelectItem>
                  <SelectItem value="sr">Suriname</SelectItem>
                  <SelectItem value="se">Sweden</SelectItem>
                  <SelectItem value="ch">Switzerland</SelectItem>
                  <SelectItem value="sy">Syria</SelectItem>
                  <SelectItem value="tj">Tajikistan</SelectItem>
                  <SelectItem value="tz">Tanzania</SelectItem>
                  <SelectItem value="th">Thailand</SelectItem>
                  <SelectItem value="tl">Timor-Leste</SelectItem>
                  <SelectItem value="tg">Togo</SelectItem>
                  <SelectItem value="to">Tonga</SelectItem>
                  <SelectItem value="tt">Trinidad and Tobago</SelectItem>
                  <SelectItem value="tn">Tunisia</SelectItem>
                  <SelectItem value="tr">Turkey</SelectItem>
                  <SelectItem value="tm">Turkmenistan</SelectItem>
                  <SelectItem value="tv">Tuvalu</SelectItem>
                  <SelectItem value="ug">Uganda</SelectItem>
                  <SelectItem value="ua">Ukraine</SelectItem>
                  <SelectItem value="ae">United Arab Emirates</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uy">Uruguay</SelectItem>
                  <SelectItem value="uz">Uzbekistan</SelectItem>
                  <SelectItem value="vu">Vanuatu</SelectItem>
                  <SelectItem value="va">Vatican City</SelectItem>
                  <SelectItem value="ve">Venezuela</SelectItem>
                  <SelectItem value="vn">Vietnam</SelectItem>
                  <SelectItem value="ye">Yemen</SelectItem>
                  <SelectItem value="zm">Zambia</SelectItem>
                  <SelectItem value="zw">Zimbabwe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#EE6C45] to-[#BF3475] hover:from-[#EE6C45]/90 hover:to-[#BF3475]/90 text-white py-3 rounded-2xl shadow-xl font-medium mt-6 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Securing Your Seat...
                </div>
              ) : (
                'Secure My Alpha Access'
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center space-x-2 text-[#50366F]/60">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm">Exclusive Alpha Access</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}