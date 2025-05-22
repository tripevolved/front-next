'use client'

import { useState } from 'react'
import ContactExpertModal from './ContactExpertModal'

interface ContactCardProps {
  phoneNumber?: string
}

export default function ContactCard({ phoneNumber = '5512991694499' }: ContactCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="bg-primary-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
        <div className="mb-6">
          <svg className="w-12 h-12 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-2xl font-baloo font-bold text-primary-900 mb-2">
            Entrar em contato conosco
          </h3>
          <p className="text-primary-600 font-comfortaa">
            Nossos especialistas estão sempre presentes para te guiar a uma viagem transformadora.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-600 transition-colors"
        >
          Falar com especialista
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Contact Expert Modal */}
      <ContactExpertModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
} 