'use client'

import { useState } from 'react'
import LeadForm from '@/components/LeadForm'

interface CruiseFlowModalProps {
  isOpen: boolean
  onClose: () => void
}

type TravelType = 'couples' | 'individual' | 'family' | 'friends'
type TripGoal = 'relaxamento' | 'gastronomia' | 'celebracao' | 'romance' | 'experiencias_unicas' | 'mediterraneo' | 'caribe' | 'spa' | 'piscina' | 'desconectar' | 'passeios' | 'aventura'
type Budget = '12000-20000' | '20000-30000' | '30000-50000' | '50000+'

interface CruiseFlowData {
  travelType: TravelType | null
  tripGoals: TripGoal[]
  travelMonth: string
  travelDays: string
  budget: Budget | null
}

export default function CruiseFlowModal({ isOpen, onClose }: CruiseFlowModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [flowData, setFlowData] = useState<CruiseFlowData>({
    travelType: null,
    tripGoals: [],
    travelMonth: '',
    travelDays: '',
    budget: null
  })

  const handleNext = () => {
    if (currentStep === 5) {
      // Stay on the same step (form step)
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
      travelMonth: '',
      travelDays: '',
      budget: null
    })
    onClose()
  }

  const handleFormSuccess = () => {
    // Open Google Calendar in a new tab
    const calendarUrl = 'https://calendar.app.google/zSrzwmgCKFKajYMN6'
    window.open(calendarUrl, '_blank')
    
    // Redirect current page to /obrigado
    window.location.href = '/obrigado'
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Que ótimo que você quer conhecer nossos cruzeiros!
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
              Vamos fazer algumas perguntas para entender melhor o que vocês desejam.
              Esse processo é rápido e vai nos ajudar a garantir que sua viagem se encaixe perfeitamente no seu perfil e desejos.
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
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'couples', label: 'Casal', icon: '❤️' },
                { value: 'individual', label: 'Individual', icon: '👤' },
                { value: 'family', label: 'Família', icon: '👨‍👩‍👧‍👦' },
                { value: 'friends', label: 'Amigos', icon: '👥' }
              ].map((type) => (
                <button
                  key={type.value}
                  className={`p-6 rounded-xl border-2 text-center font-comfortaa text-lg transition-all flex flex-col items-center gap-2 ${
                    flowData.travelType === type.value
                      ? 'border-accent-500 bg-accent-50 text-accent-500'
                      : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                  }`}
                  onClick={() => setFlowData(prev => ({ ...prev, travelType: type.value as TravelType }))}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Quais são os objetivos da sua viagem?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg mb-4">
              Selecione até 3 objetivos principais
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'relaxamento', label: 'Relaxamento' },
                { value: 'gastronomia', label: 'Gastronomia' },
                { value: 'celebracao', label: 'Celebração' },
                { value: 'romance', label: 'Romance' },
                { value: 'experiencias_unicas', label: 'Ter experiências únicas' },
                { value: 'mediterraneo', label: 'Conhecer o Mediterrâneo' },
                { value: 'caribe', label: 'Conhecer o Caribe' },
                { value: 'spa', label: 'Aproveitar o spa' },
                { value: 'piscina', label: 'Curtir a piscina' },
                { value: 'desconectar', label: 'Desconectar do mundo' },
                { value: 'passeios', label: 'Passeios' },
                { value: 'aventura', label: 'Aventura' }
              ].map((goal) => (
                <button
                  key={goal.value}
                  className={`p-3 rounded-lg border-2 text-center font-comfortaa text-sm transition-all ${
                    flowData.tripGoals.includes(goal.value as TripGoal)
                      ? 'border-accent-500 bg-accent-50 text-accent-500'
                      : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                  }`}
                  onClick={() => {
                    const newGoals = flowData.tripGoals.includes(goal.value as TripGoal)
                      ? flowData.tripGoals.filter(g => g !== goal.value)
                      : flowData.tripGoals.length < 3
                        ? [...flowData.tripGoals, goal.value as TripGoal]
                        : flowData.tripGoals
                    setFlowData(prev => ({ ...prev, tripGoals: newGoals }))
                  }}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Quando você quer viajar?
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-4">
                  Mês da viagem
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'janeiro', label: 'Jan' },
                    { value: 'fevereiro', label: 'Fev' },
                    { value: 'marco', label: 'Mar' },
                    { value: 'abril', label: 'Abr' },
                    { value: 'maio', label: 'Mai' },
                    { value: 'junho', label: 'Jun' },
                    { value: 'julho', label: 'Jul' },
                    { value: 'agosto', label: 'Ago' },
                    { value: 'setembro', label: 'Set' },
                    { value: 'outubro', label: 'Out' },
                    { value: 'novembro', label: 'Nov' },
                    { value: 'dezembro', label: 'Dez' }
                  ].map((month) => (
                    <button
                      key={month.value}
                      type="button"
                      onClick={() => setFlowData(prev => ({ ...prev, travelMonth: month.value }))}
                      className={`p-3 border rounded-lg text-center transition-all font-comfortaa text-sm ${
                        flowData.travelMonth === month.value
                          ? 'border-accent-500 bg-accent-50 text-accent-500'
                          : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                      }`}
                    >
                      {month.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-4">
                  Quantos dias você tem disponível?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '7-10', label: '7 a 10 dias' },
                    { value: '10-13', label: '10 a 13 dias' },
                    { value: '13-16', label: '13 a 16 dias' },
                    { value: '16+', label: '16+ dias' }
                  ].map((days) => (
                    <button
                      key={days.value}
                      type="button"
                      onClick={() => setFlowData(prev => ({ ...prev, travelDays: days.value }))}
                      className={`p-4 border rounded-lg text-center transition-all font-comfortaa text-lg ${
                        flowData.travelDays === days.value
                          ? 'border-accent-500 bg-accent-50 text-accent-500'
                          : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                      }`}
                    >
                      {days.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Qual é o seu orçamento por pessoa?
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: '12000-20000', label: 'R$ 12.000 - R$ 20.000' },
                { value: '20000-30000', label: 'R$ 20.000 - R$ 30.000' },
                { value: '30000-50000', label: 'R$ 30.000 - R$ 50.000' },
                { value: '50000+', label: 'R$ 50.000+' }
              ].map((budget) => (
                <button
                  key={budget.value}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    flowData.budget === budget.value
                      ? 'border-accent-500 bg-accent-50 text-accent-500'
                      : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                  }`}
                  onClick={() => setFlowData(prev => ({ ...prev, budget: budget.value as Budget }))}
                >
                  <div className="font-comfortaa text-lg font-semibold">
                    {budget.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Perfeito! Agora vamos te conectar com nossos especialistas
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg mb-6">
              Preencha seus dados de contato e agende uma reunião.
            </p>
            
            <LeadForm
              onSuccess={handleFormSuccess}
              submitButtonText="Enviar e agendar reunião"
              event="agendar"
              eventOptions={{
                source: 'Cruzeiros Únicos - Flow'
              }}
              additionalMetadata={[
                {
                  key: 'source',
                  value: 'Cruzeiros Únicos - Flow',
                  keyDescription: 'Fonte do lead'
                },
                {
                  key: 'travel_type',
                  value: flowData.travelType || '',
                  keyDescription: 'Tipo de viagem'
                },
                {
                  key: 'trip_goals',
                  value: flowData.tripGoals.join(', '),
                  keyDescription: 'Objetivos da viagem'
                },
                {
                  key: 'travel_month',
                  value: flowData.travelMonth,
                  keyDescription: 'Mês da viagem'
                },
                {
                  key: 'travel_days',
                  value: flowData.travelDays,
                  keyDescription: 'Duração da viagem'
                },
                {
                  key: 'budget',
                  value: flowData.budget || '',
                  keyDescription: 'Orçamento'
                }
              ]}
            />
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary-600">
              Passo {currentStep + 1} de 6
            </span>
            <span className="text-sm font-medium text-secondary-600">
              {Math.round(((currentStep + 1) / 6) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-accent-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        {/* Navigation buttons - only show if not on form step */}
        {currentStep !== 5 && (
          <div className="flex justify-between mt-8">
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
                (currentStep === 2 && flowData.tripGoals.length === 0) ||
                (currentStep === 3 && (!flowData.travelMonth || !flowData.travelDays)) ||
                (currentStep === 4 && !flowData.budget)
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