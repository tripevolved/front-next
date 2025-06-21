'use client'

import { useState, useEffect, useRef } from 'react'
import { TripsApiService } from '@/clients/trips'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import DateRangePicker from './DateRangePicker'
import LeadForm from './LeadForm'
import { CreateTripRequest, TripTravelers } from '@/core/types/trip'
import { LocalStorageService } from '@/clients/local'
import * as fpixel from '@/utils/libs/fpixel'
import { TripGoal } from '@/clients/trips/goals'
import MonthSelector from './common/MonthSelector'
import DateRangeSelector from './common/DateRangeSelector'
import TripTypeSelector from './common/TripTypeSelector'
import TripProfileSelector from './common/TripProfileSelector'
import TripGoalsSelector from './common/TripGoalsSelector'

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
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthSelect={setSelectedMonth}
            className="mb-4"
          />
        )}

        {/* Date range selection */}
        {selectionMode === 'range' && (
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={(update) => setDateRange(update)}
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

const StepGoals = ({ onNext, onBack, tripType }: { onNext: (goals: TripGoals) => void, onBack: () => void, tripType?: string }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ goals: selectedGoals })
  }

  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Defina sua viagem</h2>
      <p className="text-gray-600 mb-6">Selecione até 5 palavras que melhor definem a viagem dos seus sonhos.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <TripGoalsSelector
          selectedGoals={selectedGoals}
          onGoalsChange={setSelectedGoals}
          tripType={tripType}
          maxSelections={5}
          className="flex-grow"
        />

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

const StepProfile = ({ onNext, onBack, buttonText = "Próximo" }: { onNext: (profile: TripProfile) => void, onBack: () => void, buttonText?: string }) => {
  const [profile, setProfile] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ profile })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Qual é o seu perfil de viajante?</h2>
      <p className="text-gray-600 mb-6">Escolha o perfil que melhor combina com seu estilo de viagem.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <TripProfileSelector
          selectedProfile={profile}
          onProfileSelect={setProfile}
        />

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
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

const StepType = ({ onNext, onBack, buttonText = "Próximo" }: { onNext: (type: TripType) => void, onBack: () => void, buttonText?: string }) => {
  const [type, setType] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ type })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Com quem você vai viajar?</h2>
      <p className="text-gray-600 mb-6">Selecione o tipo de viagem que melhor se adequa ao seu grupo.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <TripTypeSelector
          selectedType={type}
          onTypeSelect={setType}
        />

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
      value: 'Trip Discovery Wizard',
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
        event='descobrir_viagem'
        eventOptions={{
          source: metadata.find(item => item.key === 'source')?.value || 'Trip Discovery Wizard'
        }}
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

  const handleOnClose = () => {
    onClose()
    setStep(1)
    setTripDates(null)
    setTripGoals(null)
    setTripProfile(null)
    setTripType(null)
    setUserInfo(null)
  }

  const handleDatesNext = (dates: TripDates) => {
    setTripDates(dates)
    setStep(2)
  }

  const handleTypeNext = (type: TripType) => {
    setTripType(type)
    setStep(3)
  }

  const handleGoalsNext = (goals: TripGoals) => {
    setTripGoals(goals)
    setStep(4)
  }

  const handleProfileNext = (profile: TripProfile) => {
    setTripProfile(profile)
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
  const handleFinalStep = (profile: TripProfile) => {
    setTripProfile(profile)
    if (hasLeadId) {
      // If user already has a lead ID, create trip and redirect to results, sending facebook event
      fpixel.event('descobrir_viagem', {
        source: 'Trip Discovery Wizard'
      })
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
      handleOnClose();
    } catch (err) {
      console.error('Error creating trip:', err)
      router.push(`/resultados/?message=${"Houve um erro ao criar a viagem. Por favor, tente novamente."}`)
      handleOnClose();
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative">
        {/* Close button */}
        <button 
          onClick={handleOnClose}
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
        {step === 2 && <StepType onNext={handleTypeNext} onBack={handleBack} />}
        {step === 3 && <StepGoals onNext={handleGoalsNext} onBack={handleBack} tripType={tripType?.type} />}
        {step === 4 && (
          <StepProfile 
            onNext={hasLeadId ? handleFinalStep : handleProfileNext} 
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