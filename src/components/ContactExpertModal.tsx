'use client'

import { useState } from 'react'
import LeadForm from './LeadForm'

interface ContactExpertModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber?: string
}

export default function ContactExpertModal({ isOpen, onClose, phoneNumber = '5512991694499' }: ContactExpertModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-baloo font-bold text-primary-600 mb-4">
              Obrigado pelo seu interesse!
            </h3>
            <p className="text-gray-600 mb-6">
              Um de nossos especialistas entrará em contato em breve para ajudar você a planejar sua próxima viagem.
            </p>
            <button
              onClick={onClose}
              className="bg-primary-600 text-white font-baloo py-2 px-6 rounded-full hover:bg-primary-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-baloo font-bold text-primary-600 mb-2">
              Falar com especialista
            </h2>
            <p className="text-gray-600 mb-6">
              Preencha os campos abaixo para ser direcionado para um de nossos especialistas no WhatsApp.
            </p>
            <LeadForm 
              onSuccess={() => setIsSuccess(true)}
              submitButtonText="Iniciar atendimento"
              redirectToWhatsApp={true}
              phoneNumber={phoneNumber}
            />
          </>
        )}
      </div>
    </div>
  )
}