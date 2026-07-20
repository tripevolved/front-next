'use client'

import { useState } from 'react'
import LeadForm from '@/components/LeadForm'
import TripTypeSelector from '@/components/common/TripTypeSelector'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import { TravelerType } from '@/core/types/trip'

const REGION_OPTIONS = [
  'Mediterrâneo',
  'Caribe',
  'América do Sul',
  'Norte da Europa',
  'Ásia',
  'Antártida',
] as const

const TRIP_TYPES = [
  { id: TravelerType.COUPLE, name: 'Casal', icon: '❤️', available: true },
  { id: TravelerType.FAMILY, name: 'Família', icon: '👨‍👩‍👧‍👦', available: true },
  { id: TravelerType.FRIENDS, name: 'Amigos', icon: '👥', available: true },
  { id: TravelerType.INDIVIDUAL, name: 'Solo', icon: '👤', available: true },
]

interface CruiseLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  searchData?: {
    destination?: string
    month?: string
    duration?: string
    cruiseName?: string
  }
}

interface InquiryData {
  region: string
  startDate: Date | null
  endDate: Date | null
  travelType: TravelerType | null
  mustSeeDestination: string
  journeyDetails: string
}

const INITIAL_DATA: InquiryData = {
  region: '',
  startDate: null,
  endDate: null,
  travelType: null,
  mustSeeDestination: '',
  journeyDetails: '',
}

const TOTAL_STEPS = 5

export default function CruiseLeadModal({
  isOpen,
  onClose,
  onBack,
  searchData = {},
}: CruiseLeadModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [flowData, setFlowData] = useState<InquiryData>(INITIAL_DATA)

  if (!isOpen) return null

  const resetAndClose = () => {
    setCurrentStep(0)
    setFlowData(INITIAL_DATA)
    onClose()
  }

  const handleBack = () => {
    if (currentStep === 0) {
      onBack()
      return
    }
    setCurrentStep((prev) => prev - 1)
  }

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return flowData.region.trim().length > 0
      case 1:
        return flowData.startDate != null && flowData.endDate != null
      case 2:
        return flowData.travelType != null
      case 3:
        return flowData.mustSeeDestination.trim().length > 0
      default:
        return true
    }
  }

  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split('T')[0] : ''

  const additionalMetadata = [
    {
      key: 'source',
      value: 'Cruzeiros Extraordinários',
      keyDescription: 'Fonte',
    },
    {
      key: 'cruise_name',
      value: searchData.cruiseName || '',
      keyDescription: 'Nome do Cruzeiro',
    },
    {
      key: 'cruise_destination',
      value: searchData.destination || '',
      keyDescription: 'Destino do Cruzeiro',
    },
    {
      key: 'cruise_month',
      value: searchData.month || '',
      keyDescription: 'Mês do Cruzeiro',
    },
    {
      key: 'cruise_duration',
      value: searchData.duration || '',
      keyDescription: 'Duração do Cruzeiro',
    },
    {
      key: 'region',
      value: flowData.region,
      keyDescription: 'Região',
    },
    {
      key: 'start_date',
      value: formatDate(flowData.startDate),
      keyDescription: 'Data de partida',
    },
    {
      key: 'end_date',
      value: formatDate(flowData.endDate),
      keyDescription: 'Data de retorno',
    },
    {
      key: 'travel_type',
      value: flowData.travelType || '',
      keyDescription: 'Tipo de viagem',
    },
    {
      key: 'must_see_destination',
      value: flowData.mustSeeDestination,
      keyDescription: 'Destino imperdível',
    },
    {
      key: 'journey_details',
      value: flowData.journeyDetails,
      keyDescription: 'Conte um pouco da jornada',
    },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-2">
              Qual região você quer explorar?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-base mb-4">
              Escolha uma região ou digite outra de sua preferência.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {REGION_OPTIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setFlowData((prev) => ({ ...prev, region }))}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    flowData.region === region
                      ? 'border-accent-500 bg-accent-50 text-accent-700'
                      : 'border-secondary-200 hover:border-accent-300 text-secondary-700'
                  }`}
                >
                  <span className="font-comfortaa text-sm">{region}</span>
                </button>
              ))}
            </div>
            <div>
              <label className="block text-secondary-600 font-comfortaa text-sm mb-2">
                Ou digite outra região:
              </label>
              <input
                type="text"
                value={flowData.region}
                onChange={(e) =>
                  setFlowData((prev) => ({ ...prev, region: e.target.value }))
                }
                placeholder="Ex: Oceano Pacífico"
                className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 font-comfortaa text-sm"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-2">
              Quando você quer viajar?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-base mb-4">
              Selecione as datas da sua viagem.
            </p>
            <DateRangeSelector
              startDate={flowData.startDate}
              endDate={flowData.endDate}
              onDateRangeChange={([startDate, endDate]) =>
                setFlowData((prev) => ({ ...prev, startDate, endDate }))
              }
              minDate={new Date()}
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-2">
              Quem vai viajar com você?
            </h3>
            <TripTypeSelector
              selectedType={flowData.travelType ?? ''}
              onTypeSelect={(type) =>
                setFlowData((prev) => ({ ...prev, travelType: type }))
              }
              types={TRIP_TYPES}
              className="grid-cols-2"
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-2">
              Tem algum destino imperdível?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-base mb-4">
              Conte qual lugar não pode ficar de fora da sua jornada.
            </p>
            <div>
              <label className="block text-secondary-600 font-comfortaa text-sm mb-2">
                Destino imperdível
              </label>
              <input
                type="text"
                value={flowData.mustSeeDestination}
                onChange={(e) =>
                  setFlowData((prev) => ({
                    ...prev,
                    mustSeeDestination: e.target.value,
                  }))
                }
                placeholder="Ex: Santorini, Barbados, Rio de Janeiro"
                className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 font-comfortaa text-sm"
              />
            </div>
            <div>
              <label className="block text-secondary-600 font-comfortaa text-sm mb-2">
                Conte um pouco da jornada{' '}
                <span className="text-secondary-400">(opcional)</span>
              </label>
              <textarea
                value={flowData.journeyDetails}
                onChange={(e) =>
                  setFlowData((prev) => ({
                    ...prev,
                    journeyDetails: e.target.value,
                  }))
                }
                placeholder="Ex: Queremos um roteiro mais calmo, com foco em gastronomia e tempo em terra..."
                className="w-full p-4 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 font-comfortaa text-sm min-h-[120px] resize-none"
                rows={4}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-2">
              Deixe seus dados para começarmos
            </h3>
            <p className="text-secondary-600 font-comfortaa text-base mb-4">
              Nossos especialistas vão entrar em contato para planejar sua jornada.
            </p>
            {(searchData.cruiseName || searchData.destination) && (
              <div className="bg-secondary-50 rounded-lg p-4">
                <p className="text-sm text-secondary-600 mb-1">Cruzeiro de interesse:</p>
                <p className="font-semibold text-secondary-900">
                  {[searchData.cruiseName || searchData.destination, searchData.month, searchData.duration]
                    .filter(Boolean)
                    .join(' • ')}
                </p>
              </div>
            )}
            <LeadForm
              onSuccess={resetAndClose}
              submitButtonText="Enviar e aguardar contato"
              additionalMetadata={additionalMetadata}
              showBackButton={true}
              onBack={handleBack}
              event="agendar"
              eventOptions={{
                destination: flowData.region || searchData.destination,
                month: searchData.month,
                duration: searchData.duration,
                source: 'Cruzeiros Extraordinários',
              }}
              showPreferredContact={true}
              showExpertHelpToggle={true}
            />
          </div>
        )

      default:
        return null
    }
  }

  const isFinalStep = currentStep === TOTAL_STEPS - 1

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          type="button"
          onClick={() => {
            setCurrentStep(0)
            setFlowData(INITIAL_DATA)
            onBack()
          }}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 z-10"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 flex-shrink-0 pr-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary-600">
              Passo {currentStep + 1} de {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-secondary-600">
              {Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="bg-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">{renderStep()}</div>

        {!isFinalStep && (
          <div className="flex justify-between mt-6 flex-shrink-0 gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-full border border-secondary-300 text-secondary-700 font-baloo hover:bg-secondary-50 transition-colors"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
              className="px-6 py-2.5 rounded-full bg-primary-500 text-white font-baloo hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
