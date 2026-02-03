'use client'

import { useState } from 'react'
import LeadForm from '@/components/LeadForm'
import TripTypeSelector from '@/components/common/TripTypeSelector'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import TripGoalsSelector from '@/components/common/TripGoalsSelector'
import TripProfileSelector from '@/components/common/TripProfileSelector'

interface LeadFlowModalProps {
  isOpen: boolean
  onClose: () => void
  destinations: string[]
  source: string
  skipDestination?: boolean
  skipProfile?: boolean
}

type TravelType = 'casal'

interface LeadFlowData {
  travelType: TravelType | null
  tripGoals: string[]
  tripProfile: string
  destination: string
  startDate: Date | null
  endDate: Date | null
  selectedMonth: string
  dateSelectionType: 'calendar' | 'month'
  additionalDetails: string
}

export default function LeadFlowModal({ isOpen, onClose, destinations, source, skipDestination = false, skipProfile = false }: LeadFlowModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [flowData, setFlowData] = useState<LeadFlowData>({
    travelType: null,
    tripGoals: [],
    tripProfile: '',
    destination: '',
    startDate: null,
    endDate: null,
    selectedMonth: '',
    dateSelectionType: 'calendar',
    additionalDetails: ''
  })

  // Define which logical steps to show (0-7)
  const getVisibleSteps = (): number[] => {
    const steps = [0] // Always show welcome step
    if (!skipDestination) steps.push(1)
    steps.push(2) // Travel type - always shown
    if (!skipProfile) steps.push(3)
    steps.push(4, 5, 6, 7) // Goals, dates, details, lead form - always shown
    return steps
  }

  const visibleSteps = getVisibleSteps()
  const totalSteps = visibleSteps.length
  const finalStepIndex = totalSteps - 1

  // Get the logical step number from the current visible step index
  const getLogicalStep = (visibleStepIndex: number): number => {
    return visibleSteps[visibleStepIndex] ?? 0
  }

  const handleNext = () => {
    if (currentStep === finalStepIndex) {
      // Stay on the same step (final step with lead form)
      return
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 0) return
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
      selectedMonth: '',
      dateSelectionType: 'calendar',
      additionalDetails: ''
    })
    onClose()
  }

  const handleLeadFormSuccess = () => {
    // Redirect to thank you page
    window.location.href = '/obrigado'
  }

  const renderStep = () => {
    const logicalStep = getLogicalStep(currentStep)
    
    switch (logicalStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Vamos criar sua viagem dos sonhos!
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
              Vamos fazer algumas perguntas para entender melhor o que você deseja.
              Esse processo leva menos de 5 minutos e vai nos ajudar a personalizar a sua viagem para você.
            </p>
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <p className="text-accent-800 font-comfortaa text-sm">
                <strong>Próximos passos:</strong> Após preencher suas informações, nossos especialistas entrarão em contato para agendar uma reunião inicial e apresentar o dossiê.
              </p>
            </div>
          </div>
        )

      case 1:
        if (skipDestination) {
          // This step is skipped, should not reach here
          return null
        }
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Para onde você quer ir nessa viagem?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg mb-6">
              Escolha um destino da nossa lista ou digite outro de sua preferência.
            </p>
            <div className="space-y-4">
              {/* Destination Options */}
              <div className="grid grid-cols-2 gap-3">
                {destinations.map((destination) => (
                  <button
                    key={destination}
                    onClick={() => setFlowData(prev => ({ ...prev, destination }))}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      flowData.destination === destination
                        ? 'border-accent-500 bg-accent-50 text-accent-700'
                        : 'border-secondary-200 hover:border-accent-300 text-secondary-700'
                    }`}
                  >
                    <span className="font-comfortaa text-sm">{destination}</span>
                  </button>
                ))}
              </div>
              
              {/* Other Destination Input */}
              <div className="mt-4">
                <label className="block text-secondary-600 font-comfortaa text-sm mb-2">
                  Ou digite outro destino:
                </label>
                <input
                  type="text"
                  value={flowData.destination}
                  onChange={(e) => setFlowData(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Ex: Jamaica"
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 font-comfortaa text-sm"
                />
              </div>
            </div>
          </div>
        )

      case 2:
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

      case 3:
        if (skipProfile) {
          // This step is skipped, should not reach here
          return null
        }
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

      case 4:
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

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Quando você quer viajar?
            </h3>
            <div className="space-y-6">
              {/* Selection Type Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setFlowData(prev => ({ ...prev, dateSelectionType: 'calendar' }))}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    flowData.dateSelectionType === 'calendar'
                      ? 'border-accent-500 bg-accent-50 text-accent-700'
                      : 'border-secondary-200 hover:border-accent-300 text-secondary-700'
                  }`}
                >
                  <span className="font-comfortaa text-sm font-medium">Datas específicas</span>
                </button>
                <button
                  onClick={() => setFlowData(prev => ({ ...prev, dateSelectionType: 'month' }))}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    flowData.dateSelectionType === 'month'
                      ? 'border-accent-500 bg-accent-50 text-accent-700'
                      : 'border-secondary-200 hover:border-accent-300 text-secondary-700'
                  }`}
                >
                  <span className="font-comfortaa text-sm font-medium">Mês específico</span>
                </button>
              </div>

              {/* Calendar Selection */}
              {flowData.dateSelectionType === 'calendar' && (
                <div>
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
              )}

              {/* Month Selection */}
              {flowData.dateSelectionType === 'month' && (
                <div>
                  <label className="block text-secondary-600 font-comfortaa text-lg mb-4">
                    Selecione o mês da sua viagem
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                    ].map((month) => (
                      <button
                        key={month}
                        onClick={() => setFlowData(prev => ({ ...prev, selectedMonth: month }))}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          flowData.selectedMonth === month
                            ? 'border-accent-500 bg-accent-50 text-accent-700'
                            : 'border-secondary-200 hover:border-accent-300 text-secondary-700'
                        }`}
                      >
                        <span className="font-comfortaa text-sm">{month}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                Adicione detalhes, expectativas ou qualquer informação que achar importante.
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
        // Final step (lead form) - always shown
        return (
          <div className="space-y-6">
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">
                Próximos passos
              </h3>
              <div className="space-y-3">
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

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-baloo text-base font-bold text-green-600">
                      Conversa inicial com um especialista
                    </h4>
                    <p className="text-green-500 font-comfortaa text-xs">
                      Nossos especialistas entrarão em contato em até 24h úteis para conversar sobre sua viagem
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-baloo text-base font-bold text-gray-600">
                      Sua proposta personalizada
                    </h4>
                    <p className="text-gray-500 font-comfortaa text-xs">
                      Nossos especialistas criarão uma proposta personalizada para sua viagem
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-baloo text-lg font-bold text-secondary-900 mb-3">
                Deixe seus dados para começarmos
              </h4>
              <p className="text-secondary-600 font-comfortaa text-sm mb-4">
                Nossos especialistas entrarão em contato para planejar sua viagem personalizada.
              </p>
              <LeadForm
                onSuccess={handleLeadFormSuccess}
                submitButtonText="Enviar e aguardar contato"
                event="agendar"
                eventOptions={{
                  source: `LeadFlowModal - ${source}`
                }}
                additionalMetadata={[
                  {
                    key: 'source',
                    value: `${source} - Flow`,
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
                    key: 'selected_month',
                    value: flowData.selectedMonth,
                    keyDescription: 'Mês selecionado'
                  },
                  {
                    key: 'date_selection_type',
                    value: flowData.dateSelectionType,
                    keyDescription: 'Tipo de seleção de data'
                  },
                  {
                    key: 'additional_details',
                    value: flowData.additionalDetails,
                    keyDescription: 'Detalhes adicionais'
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
              Passo {currentStep + 1} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-secondary-600">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentStep + 1) / totalSteps) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          {renderStep()}
        </div>

        {/* Navigation buttons - only show if not on final step */}
        {currentStep !== finalStepIndex && (
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
                (getLogicalStep(currentStep) === 1 && !skipDestination && !flowData.destination.trim()) ||
                (getLogicalStep(currentStep) === 2 && !flowData.travelType) ||
                (getLogicalStep(currentStep) === 3 && !skipProfile && !flowData.tripProfile) ||
                (getLogicalStep(currentStep) === 4 && flowData.tripGoals.length === 0) ||
                (getLogicalStep(currentStep) === 5 && (
                  (flowData.dateSelectionType === 'calendar' && (!flowData.startDate || !flowData.endDate)) ||
                  (flowData.dateSelectionType === 'month' && !flowData.selectedMonth)
                ))
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