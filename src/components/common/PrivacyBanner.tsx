'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the user has already accepted the privacy policy
    const hasAccepted = localStorage.getItem('privacyAccepted')
    
    if (!hasAccepted) {
      // Show the banner if the user hasn't accepted yet
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    // Save the user's acceptance in localStorage
    localStorage.setItem('privacyAccepted', 'true')
    // Hide the banner
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4 md:p-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          <p className="mb-2">
            Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
            <Link href="/privacidade" className="text-primary-600 hover:text-primary-700 underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/privacidade" 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Saiba mais
          </Link>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
} 