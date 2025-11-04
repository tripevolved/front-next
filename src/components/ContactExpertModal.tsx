import { useRouter } from 'next/navigation'
import LeadForm from './LeadForm'

interface ContactExpertModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  additionalMetadata?: Array<{
    key: string
    value: string
    keyDescription: string
  }>
}

export default function ContactExpertModal({ 
  isOpen, 
  onClose,
  onSuccess,
  additionalMetadata = []
}: ContactExpertModalProps) {
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess()
    } else {
      onClose()
      // Redirect to WhatsApp
      const message = encodeURIComponent('Olá! Gostaria de conversar com um especialista sobre minha viagem.')
      const whatsappUrl = `https://wa.me/5551993582462?text=${message}`
      window.open(whatsappUrl, '_blank')
    }
  }

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

        <h2 className="text-2xl font-baloo font-bold text-primary-600 mb-2">
          Falar com especialista
        </h2>
        <p className="text-gray-600 mb-6">
          Preencha os campos abaixo e vamos te direcionar para nosso WhatsApp.
        </p>
        <LeadForm
          onSuccess={handleSuccess}
          submitButtonText="Falar com especialista"
          additionalMetadata={additionalMetadata}
          event="agendar"
          eventOptions={{
            source: additionalMetadata.find(item => item.key === 'source')?.value || 'Contact Expert Modal'
          }}
        />
      </div>
    </div>
  )
}