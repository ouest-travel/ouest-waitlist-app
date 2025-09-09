// Google Analytics 4 tracking utility
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = 'GA_MEASUREMENT_ID' // Replace with your actual GA4 Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return

  // Create script tags for GA4
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_title: document.title,
      page_location: window.location.href,
    });
  `
  document.head.appendChild(script2)
}

// Track page views
export const trackPageView = (pageName: string, userId?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_TRACKING_ID, {
    page_title: pageName,
    page_location: window.location.href,
    user_id: userId
  })

  console.log(`📊 Analytics: Page view tracked - ${pageName}`, { userId })
}

// Track custom events
export const trackEvent = (
  eventName: string, 
  parameters: {
    event_category?: string
    event_label?: string
    value?: number
    user_id?: string
    custom_parameters?: Record<string, any>
  } = {}
) => {
  if (typeof window === 'undefined' || !window.gtag) return

  const eventData = {
    event_category: parameters.event_category || 'engagement',
    event_label: parameters.event_label,
    value: parameters.value,
    user_id: parameters.user_id,
    ...parameters.custom_parameters
  }

  window.gtag('event', eventName, eventData)
  
  console.log(`📊 Analytics: Event tracked - ${eventName}`, eventData)
}

// Track sign-up flow specific events
export const trackSignUpFlow = {
  // Welcome screen events
  welcomeViewed: (userId?: string) => 
    trackEvent('welcome_screen_viewed', { 
      event_category: 'signup_flow',
      event_label: 'welcome_screen',
      user_id: userId 
    }),

  welcomeStarted: (userId?: string) => 
    trackEvent('signup_flow_started', { 
      event_category: 'signup_flow',
      event_label: 'welcome_cta_clicked',
      user_id: userId 
    }),

  // Unlock screen events
  unlockViewed: (userId?: string) => 
    trackEvent('unlock_screen_viewed', { 
      event_category: 'signup_flow',
      event_label: 'unlock_screen',
      user_id: userId 
    }),

  unlockCompleted: (userId?: string) => 
    trackEvent('unlock_completed', { 
      event_category: 'signup_flow',
      event_label: 'unlock_interaction_completed',
      user_id: userId 
    }),

  // Passport stamp events
  stampViewed: (userId?: string) => 
    trackEvent('passport_stamp_viewed', { 
      event_category: 'signup_flow',
      event_label: 'stamp_screen',
      user_id: userId 
    }),

  stampEarned: (stampId: string, userId?: string) => 
    trackEvent('passport_stamp_earned', { 
      event_category: 'gamification',
      event_label: stampId,
      user_id: userId,
      custom_parameters: { stamp_id: stampId }
    }),

  // Sign-up form events
  signupFormViewed: (userId?: string) => 
    trackEvent('signup_form_viewed', { 
      event_category: 'signup_flow',
      event_label: 'signup_form',
      user_id: userId 
    }),

  signupFormStarted: (userId?: string) => 
    trackEvent('signup_form_started', { 
      event_category: 'signup_flow',
      event_label: 'form_interaction_started',
      user_id: userId 
    }),

  signupCompleted: (userEmail: string, country: string) => 
    trackEvent('signup_completed', { 
      event_category: 'conversion',
      event_label: 'user_registered',
      value: 1,
      user_id: userEmail,
      custom_parameters: { 
        user_country: country,
        signup_method: 'alpha_tester_flow'
      }
    }),

  // Confirmation events
  confirmationViewed: (userEmail: string) => 
    trackEvent('confirmation_viewed', { 
      event_category: 'signup_flow',
      event_label: 'confirmation_screen',
      user_id: userEmail 
    }),

  // Referral events
  referralViewed: (userEmail: string) => 
    trackEvent('referral_screen_viewed', { 
      event_category: 'signup_flow',
      event_label: 'referral_screen',
      user_id: userEmail 
    }),

  referralShared: (userEmail: string, shareMethod: string) => 
    trackEvent('referral_shared', { 
      event_category: 'referral',
      event_label: shareMethod,
      user_id: userEmail,
      custom_parameters: { share_method: shareMethod }
    }),

  // Error tracking
  formError: (errorType: string, fieldName?: string, userId?: string) => 
    trackEvent('form_error', { 
      event_category: 'error',
      event_label: errorType,
      user_id: userId,
      custom_parameters: { 
        error_type: errorType,
        field_name: fieldName 
      }
    })
}

// Track user journey timing
export const trackTiming = (
  timingCategory: string,
  timingVar: string,
  timingValue: number,
  timingLabel?: string
) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'timing_complete', {
    name: timingVar,
    value: timingValue,
    event_category: timingCategory,
    event_label: timingLabel
  })

  console.log(`⏱️ Analytics: Timing tracked - ${timingCategory}:${timingVar} = ${timingValue}ms`)
}

// Enhanced conversion tracking
export const trackConversion = (
  conversionType: 'signup' | 'referral' | 'engagement',
  value: number = 1,
  userId?: string
) => {
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: conversionType,
    value,
    user_id: userId,
    custom_parameters: {
      conversion_type: conversionType,
      conversion_value: value
    }
  })
}