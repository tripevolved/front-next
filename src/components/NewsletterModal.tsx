import { useState } from 'react'
import LeadForm from './LeadForm'

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
  additionalMetadata?: Array<{
    key: string
    value: string
    keyDescription: string
  }>
}

export default function NewsletterModal({ 
  isOpen, 
  onClose,
  additionalMetadata = []
}: NewsletterModalProps) {
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

        {!isSuccess ? (
          <>
            <h2 className="text-2xl font-baloo font-bold text-primary-600 mb-2">
              Assine nossa newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Preencha seus dados para receber conteúdos exclusivos sobre viagens.
            </p>
            <LeadForm 
              onSuccess={() => setIsSuccess(true)}
              submitButtonText="Assinar"
              additionalMetadata={additionalMetadata}
            />
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-primary-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-baloo font-bold text-primary-600 mb-4">
              Obrigado por se inscrever!
            </h2>
            <p className="text-gray-600 mb-6">
              Você receberá em breve nossos conteúdos exclusivos sobre viagens. Enquanto isso, que tal seguir a Trip Evolved no Instagram?
            </p>
            <a
              href="https://instagram.com/tripevolved"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Seguir @tripevolved
            </a>
          </div>
        )}
      </div>
    </div>
  )
} 