'use client'

import { useState } from 'react'

interface ContactExpertModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
}

export default function ContactExpertModal({ isOpen, onClose, phoneNumber }: ContactExpertModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Apply Brazilian phone number mask
      const maskedValue = maskPhoneNumber(value)
      setFormData(prev => ({ ...prev, [name]: maskedValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Function to mask phone number in Brazilian format
  const maskPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '')
    
    // Apply mask based on length
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 7) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`
    } else if (numbers.length <= 11) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`
    } else {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Format the message for WhatsApp
    const message = `Olá! Me chamo ${formData.name}. Gostaria de falar com um especialista sobre a minha viagem.`
    
    // Create WhatsApp URL with the message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')
    
    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '' })
    onClose()
    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal content */}
        <div className="text-center mb-6">
          <h2 className="font-baloo text-2xl font-bold text-secondary-900 mb-2">
            Falar com especialista
          </h2>
          <p className="text-gray-600 font-comfortaa">
            Preencha os campos abaixo para ser direcionado aos nossos especialistas no WhatsApp
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white font-baloo py-3 px-6 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Enviando...' : 'Iniciar atendimento'}
          </button>
        </form>
      </div>
    </div>
  )
} 