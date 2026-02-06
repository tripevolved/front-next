'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LeadsApiService } from '@/clients/leads'
import { LocalStorageService } from '@/clients/local'
import { EventType } from '@/components/basic/FacebookPixel'
import { PhoneInput } from '@/components/common/PhoneInput'
import * as fpixel from '@/utils/libs/fpixel'

interface LeadFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  submitButtonText?: string
  redirectToWhatsApp?: boolean
  phoneNumber?: string
  additionalMetadata?: Array<{
    key: string
    value: string
    keyDescription: string
  }>
  showBackButton?: boolean
  onBack?: () => void
  event?: EventType
  eventOptions?: Record<string, any>
}

interface UtmParams {
  source?: string
  campaign?: string
  term?: string
  medium?: string
  content?: string
}

const getUtmParams = (searchParams: URLSearchParams | null): UtmParams => {
  if (!searchParams) return {}
  
  return {
    source: searchParams.get('utm_source') || undefined,
    campaign: searchParams.get('utm_campaign') || undefined,
    term: searchParams.get('utm_term') || undefined,
    medium: searchParams.get('utm_medium') || undefined,
    content: searchParams.get('utm_content') || undefined,
  }
}

function LeadFormContent({ 
  onSuccess, 
  onError, 
  submitButtonText = 'Enviar', 
  redirectToWhatsApp = false,
  phoneNumber = '',
  additionalMetadata = [],
  showBackButton = false,
  onBack,
  event,
  eventOptions,
}: LeadFormProps) {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // digits only
    countryCode: '+55' // Default to Brazil
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const utmParams = getUtmParams(searchParams)
      const utmMetadata = Object.entries(utmParams)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => ({
          key: `utm_${key}`,
          value: value!,
          keyDescription: `UTM ${key.charAt(0).toUpperCase() + key.slice(1)}`
        }))

      // Combine UTM metadata with additional metadata
      const metadata = [...utmMetadata, ...additionalMetadata]

      // Combine country code with phone number (phone is already digits)
      const phoneWithCountryCode = `${formData.countryCode}${formData.phone}`

      // Create lead data
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: phoneWithCountryCode,
        metadata
      }

      // Create lead
      const response = await LeadsApiService.createLead(leadData)
      
      // Save only the name to local storage using LocalStorageService
      if (response) {
        LocalStorageService.setTraveler({
          id: response.id,
          name: formData.name
        })
      }
      
      if (redirectToWhatsApp && phoneNumber) {
        // Format the message for WhatsApp
        const message = `Olá! Me chamo ${formData.name} e gostaria de saber mais sobre os destinos.`
        
        // Create WhatsApp URL with the message
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank')
      }
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess()
      }
      
      // Reset form (phone stored as digits)
      setFormData({ name: '', email: '', phone: '', countryCode: '+55' })

      // Send event
      if (event) {
        fpixel.event(event, eventOptions)
      }
    } catch (err) {
      console.error('Error creating lead:', err)
      const errorMessage = 'Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.'
      setError(errorMessage)
      
      // Call error callback if provided
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
        <PhoneInput
          id="phone"
          value={formData.phone}
          onChange={(digits) => setFormData(prev => ({ ...prev, phone: digits }))}
          showCountryCode
          countryCode={formData.countryCode}
          onCountryCodeChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className={`${showBackButton ? 'flex justify-between gap-4' : ''}`}>
        {showBackButton && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Voltar
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${showBackButton ? 'flex-1' : 'w-full'} bg-primary-600 text-white font-baloo py-3 px-6 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-70`}
        >
          {isSubmitting ? 'Enviando...' : submitButtonText}
        </button>
      </div>
    </form>
  )
}

export default function LeadForm(props: LeadFormProps) {
  return (
    <Suspense fallback={<div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>}>
      <LeadFormContent {...props} />
    </Suspense>
  )
} 