'use client'

import { useState, useEffect, useRef } from 'react'
import { TripsApiService } from '@/clients/trips'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import DateRangePicker from './DateRangePicker'
import LeadForm from './LeadForm'
import { CreateTripRequest, TripTravelers } from '@/core/types/trip'
import { LocalStorageService } from '@/clients/local'

// Types for the wizard
interface TripDates {
  startDate: string | null
  endDate: string | null
  month: number | null
}

interface TripGoals {
  goals: string[]
}

interface TripProfile {
  profile: string
}

interface TripType {
  type: string
}

interface UserInfo {
  name: string
  email: string
  phone: string
}

// Step components
const StepDates = ({ onNext, onBack }: { onNext: (dates: TripDates) => void, onBack?: () => void }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectionMode, setSelectionMode] = useState<'month' | 'range'>('month')

  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectionMode === 'month' && selectedMonth) {
      // For month selection, only populate the month field
      onNext({
        startDate: null,
        endDate: null,
        month: parseInt(selectedMonth)
      })
    } else if (selectionMode === 'range' && startDate && endDate) {
      // For date range selection, only populate the startDate and endDate fields
      onNext({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        month: null
      })
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Quando você quer viajar?</h2>
      <p className="text-gray-600 mb-6">Selecione as datas da sua viagem para encontrarmos os melhores destinos para você.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Toggle button for selection mode */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-gray-50">
            <button
              type="button"
              onClick={() => setSelectionMode('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectionMode === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Selecionar Mês
            </button>
            <button
              type="button"
              onClick={() => setSelectionMode('range')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectionMode === 'range'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Selecionar Datas
            </button>
          </div>
        </div>

        {/* Month selection */}
        {selectionMode === 'month' && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {months.map((month) => (
              <button
                key={month.value}
                type="button"
                onClick={() => setSelectedMonth(month.value)}
                className={`p-3 border rounded-lg text-center transition-all ${
                  selectedMonth === month.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-primary-300'
                }`}
              >
                {month.label}
              </button>
            ))}
          </div>
        )}

        {/* Date range selection */}
        {selectionMode === 'range' && (
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            minDate={new Date()}
          />
        )}

        <div className="flex justify-between pt-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
            >
              Voltar
            </button>
          )}
          <button
            type="submit"
            disabled={
              (selectionMode === 'month' && !selectedMonth) || 
              (selectionMode === 'range' && (!startDate || !endDate))
            }
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

const StepGoals = ({ onNext, onBack }: { onNext: (goals: TripGoals) => void, onBack: () => void }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [availableGoals, setAvailableGoals] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const goals = await TripsApiService.getGoals()
        setAvailableGoals(goals)
      } catch (err) {
        console.error('Error fetching goals:', err)
        setError('Não foi possível carregar os objetivos. Por favor, tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGoals()
  }, [])

  const handleGoalClick = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal))
    } else if (selectedGoals.length < 5) {
      setSelectedGoals([...selectedGoals, goal])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ goals: selectedGoals })
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600 font-medium">Carregando objetivos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Defina sua viagem</h2>
      <p className="text-gray-600 mb-6">Selecione até 5 palavras que melhor definem a viagem dos seus sonhos.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="bg-gray-100 sm:bg-white px-1 py-2 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-3 overflow-y-auto max-h-[50vh] pr-2">
          {availableGoals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleGoalClick(goal)}
              disabled={!selectedGoals.includes(goal) && selectedGoals.length >= 5}
              className={`py-1.5 px-1.5 sm:p-3 border rounded-full text-center transition-all min-h-[30px] sm:min-h-[56px] flex items-center justify-center ${
                selectedGoals.includes(goal)
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <span className="text-sm leading-tight">{goal}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={selectedGoals.length === 0}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

const StepProfile = ({ onNext, onBack }: { onNext: (profile: TripProfile) => void, onBack: () => void }) => {
  const [profile, setProfile] = useState('')

  const profiles = [
    { id: 'relax', name: 'Relax', icon: '🌴' },
    { id: 'alternativo', name: 'Alternativo', icon: '🎨' },
    { id: 'aventureiro', name: 'Aventureiro', icon: '🏃' },
    { id: 'gastronomico', name: 'Gastronômico', icon: '🍽️' },
    { id: 'garantido', name: 'Garantido', icon: '✅' },
    { id: 'intelectual', name: 'Intelectual', icon: '📚' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ profile })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Qual é o seu perfil de viajante?</h2>
      <p className="text-gray-600 mb-6">Escolha o perfil que melhor combina com seu estilo de viagem.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {profiles.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProfile(p.id)}
              className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 ${
                profile === p.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300'
              }`}
            >
              <span className="text-2xl">{p.icon}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!profile}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

const StepType = ({ onNext, onBack, buttonText = "Próximo" }: { onNext: (type: TripType) => void, onBack: () => void, buttonText?: string }) => {
  const [type, setType] = useState('')

  const types = [
    { id: 'casal', name: 'Casal', icon: '❤️', available: true },
    { id: 'individual', name: 'Individual', icon: '👤', available: true },
    { id: 'familia', name: 'Família', icon: '👨‍👩‍👧‍👦', available: false },
    { id: 'amigos', name: 'Amigos', icon: '👥', available: false }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ type })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Com quem você vai viajar?</h2>
      <p className="text-gray-600 mb-6">Selecione o tipo de viagem que melhor se adequa ao seu grupo.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {types.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => t.available && setType(t.id)}
              disabled={!t.available}
              className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 relative ${
                type === t.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300'
              } ${!t.available && 'opacity-50 cursor-not-allowed'}`}
            >
              <span className="text-2xl">{t.icon}</span>
              <span>{t.name}</span>
              {!t.available && (
                <span className="absolute top-2 right-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Em breve
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!type}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

function StepContact({ onNext, onBack, formData }: { onNext: () => void, onBack: () => void, formData: any }) {
  // Create metadata array with only the requested fields
  const metadata = [
    {
      key: 'trip_type',
      value: formData?.tripType || '',
      keyDescription: 'Tipo de viagem'
    },
    {
      key: 'trip_goals',
      value: formData?.tripGoals?.join(',') || '',
      keyDescription: 'Objetivos da viagem'
    },
    {
      key: 'trip_profile',
      value: formData?.tripProfile || '',
      keyDescription: 'Perfil da viagem'
    },
    {
      key: 'trip_dates',
      value: formData?.startDate && formData?.endDate 
        ? `${formData.startDate} - ${formData.endDate}`
        : formData?.month 
          ? `Mês ${formData.month}`
          : '',
      keyDescription: 'Datas da viagem'
    },
    {
      key: 'source',
      value: 'discovery-wizard',
      keyDescription: 'Fonte do lead'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-baloo font-bold text-primary-600 mb-2">
          Quase lá!
        </h3>
        <p className="text-gray-600">
          Preencha seus dados para receber sugestões personalizadas de viagem.
        </p>
      </div>
      <LeadForm 
        onSuccess={onNext}
        submitButtonText="Enviar"
        additionalMetadata={metadata}
        showBackButton={true}
        onBack={onBack}
      />
    </div>
  )
}

function StepCreateTrip({ onNext }: { onNext: () => void }) {
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!hasCalledRef.current) {
      hasCalledRef.current = true;
      onNext();
    }
  }, [onNext]);
  
  return (
    <div className="p-6 space-y-6">
      <div className="inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-primary-600 font-medium">Estamos encontrando as melhores recomendações para sua viagem...</p>
      </div>
    </div>
  );
}

// Main component
export default function TripDiscoveryWizard({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [tripDates, setTripDates] = useState<TripDates | null>(null)
  const [tripGoals, setTripGoals] = useState<TripGoals | null>(null)
  const [tripProfile, setTripProfile] = useState<TripProfile | null>(null)
  const [tripType, setTripType] = useState<TripType | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [hasLeadId, setHasLeadId] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if traveler data exists in local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasTraveler = LocalStorageService.hasTraveler()
      setHasLeadId(hasTraveler)
    }
  }, [])

  // Create a combined form data object
  const formData = {
    tripType: tripType?.type || '',
    tripGoals: tripGoals?.goals || [],
    tripProfile: tripProfile?.profile || '',
    startDate: tripDates?.startDate || null,
    endDate: tripDates?.endDate || null,
    month: tripDates?.month || null
  }

  const handleDatesNext = (dates: TripDates) => {
    setTripDates(dates)
    setStep(2)
  }

  const handleGoalsNext = (goals: TripGoals) => {
    setTripGoals(goals)
    setStep(3)
  }

  const handleProfileNext = (profile: TripProfile) => {
    setTripProfile(profile)
    setStep(4)
  }

  const handleTypeNext = (type: TripType) => {
    setTripType(type)
    setStep(5)
  }

  const handleUserInfoNext = (info: UserInfo) => {
    setUserInfo(info)
    setStep(6)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  // Function to handle final step based on whether user has already submitted lead
  const handleFinalStep = (type: TripType) => {
    setTripType(type)
    if (hasLeadId) {
      // If user already has a lead ID, create trip and redirect to results
      setStep(6)
    } else {
      // Otherwise, proceed to contact form
      setStep(5)
    }
  }

  // Function to create a trip using the TripsApiService
  const handleCreateTrip = async () => {
    try {
      setError(null)

      // Get traveler data from LocalStorageService
      const traveler = LocalStorageService.getTraveler()
      if (!traveler) {
        throw new Error('Traveler data not found')
      }

      // Create trip request
      const tripRequest: CreateTripRequest = {
        travelerId: traveler.id,
        goals: tripGoals?.goals || [],
        travelerProfile: tripProfile?.profile || '',
        dates: {
          startDate: tripDates?.startDate || null,
          endDate: tripDates?.endDate || null,
          month: tripDates?.month?.toString() || null
        },
        travelers: {
          type: tripType?.type === 'casal' ? 'COUPLE' : 'INDIVIDUAL'
        } as TripTravelers
      }

      // Call the API to create the trip
      const { id } = await TripsApiService.createTrip(tripRequest)
      
      // Redirect to the results page with the trip ID
      router.push(`/resultados/${id}`)
    } catch (err) {
      console.error('Error creating trip:', err)
      router.push(`/resultados/?message=${"Houve um erro ao criar a viagem. Por favor, tente novamente."}`)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative">
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

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200 rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${(step / (hasLeadId ? 4 : 5)) * 100}%` }}
          ></div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 m-4 rounded-md">
            {error}
          </div>
        )}

        {/* Step content */}
        {step === 1 && <StepDates onNext={handleDatesNext} />}
        {step === 2 && <StepGoals onNext={handleGoalsNext} onBack={handleBack} />}
        {step === 3 && <StepProfile onNext={handleProfileNext} onBack={handleBack} />}
        {step === 4 && (
          <StepType 
            onNext={hasLeadId ? handleFinalStep : handleTypeNext} 
            onBack={handleBack} 
            buttonText={hasLeadId ? "Ver resultados" : "Próximo"}
          />
        )}
        {step === 5 && <StepContact onNext={() => handleUserInfoNext({ name: '', email: '', phone: '' })} onBack={handleBack} formData={formData} />}
        {step === 6 && <StepCreateTrip onNext={handleCreateTrip} />}
      </div>
    </div>
  )
} 