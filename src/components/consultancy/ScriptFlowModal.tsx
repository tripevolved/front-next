'use client'

import { useState } from 'react'
import LeadForm from '@/components/LeadForm'
import TripTypeSelector from '@/components/common/TripTypeSelector'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import TripGoalsSelector from '@/components/common/TripGoalsSelector'
import TripProfileSelector from '@/components/common/TripProfileSelector'

interface ScriptFlowModalProps {
  isOpen: boolean
  onClose: () => void
}

type TravelType = 'casal' | 'individual'

interface ScriptFlowData {
  travelType: TravelType | null
  tripGoals: string[]
  tripProfile: string
  destination: string
  startDate: Date | null
  endDate: Date | null
  additionalDetails: string
}

export default function ScriptFlowModal({ isOpen, onClose }: ScriptFlowModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [flowData, setFlowData] = useState<ScriptFlowData>({
    travelType: null,
    tripGoals: [],
    tripProfile: '',
    destination: '',
    startDate: null,
    endDate: null,
    additionalDetails: ''
  })

  // Calculate trip price based on date range
  const calculateTripPrice = () => {
    if (!flowData.startDate || !flowData.endDate) return 0
    const days = Math.ceil((flowData.endDate.getTime() - flowData.startDate.getTime()) / (1000 * 60 * 60 * 24))
    return days * 300
  }

  const tripPrice = calculateTripPrice()

  const handleNext = () => {
    if (currentStep === 7) {
      // Stay on the same step (final step with sub-steps)
      return
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleClose = () => {
    setCurrentStep(0)
    setFlowData({
      travelType: null,
      tripGoals: [],
      tripProfile: '',
      destination: '',
      startDate: null,
      endDate: null,
      additionalDetails: ''
    })
    onClose()
  }

  const handleLeadFormSuccess = () => {
    // Redirect to registration page where the next steps will happen
    window.location.href = '/app/cadastro'
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Que ótimo que você quer um roteiro personalizado!
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
              Vamos fazer algumas perguntas para entender melhor o que vocês desejam.
              Esse processo é rápido e vai nos ajudar a criar um roteiro que se encaixe perfeitamente no seu perfil e desejos.
            </p>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-baloo text-2xl font-bold text-secondary-900">
                Quem vai viajar com você?
              </h3>
            </div>
            <TripTypeSelector
              selectedType={flowData.travelType || ''}
              onTypeSelect={(type) => setFlowData(prev => ({ ...prev, travelType: type as TravelType }))}
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Qual é o seu perfil de viajante?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg mb-6">
              Escolha o perfil que melhor combina com seu estilo de viagem.
            </p>
            <TripProfileSelector
              selectedProfile={flowData.tripProfile}
              onProfileSelect={(profile) => setFlowData(prev => ({ ...prev, tripProfile: profile }))}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Quais são os objetivos da sua viagem?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg mb-4">
              Selecione até 5 objetivos principais
            </p>
            <TripGoalsSelector
              selectedGoals={flowData.tripGoals}
              onGoalsChange={(goals) => setFlowData(prev => ({ ...prev, tripGoals: goals }))}
              tripType={flowData.travelType || undefined}
              maxSelections={5}
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Qual é o seu destino?
            </h3>
            <div>
              <label className="block text-secondary-600 font-comfortaa text-lg mb-4">
                Para onde você quer viajar?
              </label>
              <input
                type="text"
                value={flowData.destination}
                onChange={(e) => setFlowData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="Ex: Paris, França"
                className="w-full p-4 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 font-comfortaa text-lg"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Quando você quer viajar?
            </h3>
            <div className="space-y-6">
              <label className="block text-secondary-600 font-comfortaa text-lg mb-4">
                Selecione as datas da sua viagem
              </label>
              <DateRangeSelector
                startDate={flowData.startDate}
                endDate={flowData.endDate}
                onDateRangeChange={([startDate, endDate]) => setFlowData(prev => ({ ...prev, startDate, endDate }))}
                minDate={new Date()}
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Conte-nos mais sobre sua viagem
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg mb-6">
              Use suas próprias palavras para nos contar mais sobre o que você espera desta viagem.
            </p>
            <div>
              <label className="block text-secondary-600 font-comfortaa text-lg mb-4">
                Adicione detalhes, expectativas ou qualquer informação que achar importante
              </label>
              <textarea
                value={flowData.additionalDetails}
                onChange={(e) => setFlowData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                placeholder="Ex: Queremos uma viagem romântica, com jantares especiais e passeios tranquilos. Gostamos de arte e história..."
                className="w-full p-4 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 font-comfortaa text-lg min-h-[120px] resize-none"
                rows={5}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-4">
            {/* Price Display */}
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-baloo text-lg font-bold text-secondary-900">
                    Roteiro Personalizado
                  </h4>
                  <p className="text-secondary-600 font-comfortaa text-sm">
                    {flowData.startDate && flowData.endDate 
                      ? `${Math.ceil((flowData.endDate.getTime() - flowData.startDate.getTime()) / (1000 * 60 * 60 * 24))} dias`
                      : 'Duração a definir'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary-600 font-comfortaa">Valor total</p>
                  <p className="font-baloo text-xl font-bold text-accent-600">
                    R$ {tripPrice.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Step Process Information */}
            <div className="space-y-3">
              <h3 className="font-baloo text-xl font-bold text-secondary-900">
                Próximos passos
              </h3>
              
              <div className="space-y-3">
                {/* Step 1: Lead Information */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-baloo text-base font-bold text-secondary-900">
                      Informações de contato
                    </h4>
                    <p className="text-secondary-600 font-comfortaa text-xs">
                      Preencha seus dados para começarmos
                    </p>
                  </div>
                </div>

                {/* Step 2: Password Creation */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-baloo text-base font-bold text-gray-600">
                      Crie sua senha
                    </h4>
                    <p className="text-gray-500 font-comfortaa text-xs">
                      Defina uma senha para sua conta
                    </p>
                  </div>
                </div>

                {/* Step 3: Checkout */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-baloo text-base font-bold text-gray-600">
                      Finalizar pagamento
                    </h4>
                    <p className="text-gray-500 font-comfortaa text-xs">
                      R$ {tripPrice.toLocaleString('pt-BR')} - {flowData.startDate && flowData.endDate 
                        ? `${Math.ceil((flowData.endDate.getTime() - flowData.startDate.getTime()) / (1000 * 60 * 60 * 24))} dias`
                        : 'Duração a definir'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 font-comfortaa text-xs">
                  <strong>Importante:</strong> Após enviar seus dados, você será direcionado para completar o cadastro e pagamento.
                </p>
              </div>
            </div>

            {/* Lead Form */}
            <div className="mt-4">
              <h4 className="font-baloo text-base font-bold text-secondary-900 mb-3">
                Vamos começar?
              </h4>
              <LeadForm
                onSuccess={handleLeadFormSuccess}
                submitButtonText="Enviar e continuar"
                event="pre_agendar"
                eventOptions={{
                  source: 'ScriptFlowModal - Roteiros Sob Medida'
                }}
                additionalMetadata={[
                  {
                    key: 'source',
                    value: 'Roteiros Sob Medida - Flow',
                    keyDescription: 'Fonte do lead'
                  },
                  {
                    key: 'travel_type',
                    value: flowData.travelType || '',
                    keyDescription: 'Tipo de viagem'
                  },
                  {
                    key: 'trip_profile',
                    value: flowData.tripProfile,
                    keyDescription: 'Perfil da viagem'
                  },
                  {
                    key: 'trip_goals',
                    value: flowData.tripGoals.join(', '),
                    keyDescription: 'Objetivos da viagem'
                  },
                  {
                    key: 'destination',
                    value: flowData.destination,
                    keyDescription: 'Destino'
                  },
                  {
                    key: 'start_date',
                    value: flowData.startDate ? flowData.startDate.toISOString().split('T')[0] : '',
                    keyDescription: 'Data de partida'
                  },
                  {
                    key: 'end_date',
                    value: flowData.endDate ? flowData.endDate.toISOString().split('T')[0] : '',
                    keyDescription: 'Data de retorno'
                  },
                  {
                    key: 'additional_details',
                    value: flowData.additionalDetails,
                    keyDescription: 'Detalhes adicionais'
                  },
                  {
                    key: 'trip_price',
                    value: tripPrice.toString(),
                    keyDescription: 'Valor do roteiro'
                  }
                ]}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary-600">
              {currentStep === 7 ? 'Passo 3 de 3 (Finalização)' : `Passo ${currentStep + 1} de 7`}
            </span>
            <span className="text-sm font-medium text-secondary-600">
              {currentStep === 7 ? '100%' : `${Math.round(((currentStep + 1) / 7) * 100)}%`}
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: currentStep === 7 ? '100%' : `${((currentStep + 1) / 7) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          {renderStep()}
        </div>

        {/* Navigation buttons - only show if not on final step */}
        {currentStep !== 7 && (
          <div className="flex justify-between mt-6 flex-shrink-0">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="font-baloo bg-secondary-200 text-secondary-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-secondary-300 transition-all"
              >
                Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !flowData.travelType) ||
                (currentStep === 2 && !flowData.tripProfile) ||
                (currentStep === 3 && flowData.tripGoals.length === 0) ||
                (currentStep === 4 && !flowData.destination.trim()) ||
                (currentStep === 5 && (!flowData.startDate || !flowData.endDate))
              }
              className="font-baloo bg-accent-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all ml-auto disabled:bg-secondary-300 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 