'use client'

import LeadForm from '@/components/LeadForm'

interface CruiseLeadModalProps {
  isOpen: boolean
  onClose: () => void
  searchData: {
    destination?: string
    month?: string
    duration?: string
    cruiseName?: string
  }
}

export default function CruiseLeadModal({ isOpen, onClose, searchData }: CruiseLeadModalProps) {
  if (!isOpen) return null

  const additionalMetadata = [
    {
      key: 'cruise_destination',
      value: searchData.destination || '',
      keyDescription: 'Destino do Cruzeiro'
    },
    {
      key: 'cruise_month',
      value: searchData.month || '',
      keyDescription: 'Mês do Cruzeiro'
    },
    {
      key: 'cruise_duration',
      value: searchData.duration || '',
      keyDescription: 'Duração do Cruzeiro'
    },
    {
      key: 'cruise_name',
      value: searchData.cruiseName || '',
      keyDescription: 'Nome do Cruzeiro'
    },
    {
      key: 'source',
      value: 'Cruzeiros Extraordinários',
      keyDescription: 'Fonte'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
            Nossos especialistas vão entrar em contato para planejar sua jornada
          </h2>
          
          {/* Search Summary */}
          <div className="bg-secondary-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-secondary-600 mb-2">Suas informações:</p>
            <p className="font-semibold text-secondary-900">
              {searchData.cruiseName || searchData.destination} • {searchData.month} • {searchData.duration}
            </p>
          </div>
        </div>

        <LeadForm
          onSuccess={onClose}
          submitButtonText="Enviar e aguardar contato"
          additionalMetadata={additionalMetadata}
          showBackButton={true}
          onBack={onClose}
          event="agendar"
          eventOptions={{
            destination: searchData.destination,
            month: searchData.month,
            duration: searchData.duration,
            source: 'Cruzeiros Extraordinários'
          }}
        />
      </div>
    </div>
  )
}
