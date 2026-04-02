'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TripsApiService } from '@/clients/trips'
import { LocalStorageService } from '@/clients/local'
import { TravelerType } from '@/core/types/trip'
import * as fpixel from '@/utils/libs/fpixel'
import LeadForm from '../LeadForm'
import {
  buildCreateTripRequest,
  StepBudget,
  StepCreateTrip,
  StepDates,
  StepFamilyRoomsChoice,
  StepFamilyTravelersCount,
  StepGoals,
  StepIntro,
  StepProfile,
  StepTripDescription,
  StepType,
} from './index'
import type { FamilyRoom, FamilyTravellers, TripDates, TripGoals, TripProfile, TripType } from './index'
import type { TripBudgetPayload } from './StepBudget'

type StepId =
  | 'intro'
  | 'dates'
  | 'type'
  | 'familyTravelers'
  | 'familyRooms'
  | 'goals'
  | 'profile'
  | 'budget'
  | 'description'
  | 'contact'
  | 'createTrip'

function StepContact({ onNext, onBack, formData }: { onNext: () => void; onBack: () => void; formData: any }) {
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

export default function TripDiscoveryWizard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()

  const [stepIndex, setStepIndex] = useState(0)
  const [tripDates, setTripDates] = useState<TripDates | null>(null)
  const [tripGoals, setTripGoals] = useState<TripGoals | null>(null)
  const [tripProfile, setTripProfile] = useState<TripProfile | null>(null)
  const [tripType, setTripType] = useState<TripType | null>(null)
  const [tripBudget, setTripBudget] = useState<TripBudgetPayload | null>(null)
  const [tripDescription, setTripDescription] = useState<string>('')
  const [familyTravellers, setFamilyTravellers] = useState<FamilyTravellers | null>(null)
  const [familyRooms, setFamilyRooms] = useState<FamilyRoom[] | null>(null)
  const [hasLeadId, setHasLeadId] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasTraveler = LocalStorageService.hasTraveler()
      setHasLeadId(hasTraveler)
    }
  }, [])

  const isFamilyTrip = tripType?.type === TravelerType.FAMILY

  const steps = useMemo<StepId[]>(() => {
    const base: StepId[] = ['intro', 'dates', 'type']
    if (isFamilyTrip) base.push('familyTravelers', 'familyRooms')
    base.push('goals', 'profile', 'budget', 'description')
    if (!hasLeadId) base.push('contact')
    base.push('createTrip')
    return base
  }, [hasLeadId, isFamilyTrip])

  useEffect(() => {
    setStepIndex((prev) => Math.min(prev, Math.max(0, steps.length - 1)))
  }, [steps.length])

  const formData = {
    tripType: tripType?.type ?? '',
    tripGoals: tripGoals?.goals || [],
    tripProfile: tripProfile?.profile || '',
    startDate: tripDates?.startDate || null,
    endDate: tripDates?.endDate || null,
    month: tripDates?.month || null,
  }

  const handleOnClose = () => {
    onClose()
    setStepIndex(0)
    setTripDates(null)
    setTripGoals(null)
    setTripProfile(null)
    setTripType(null)
    setTripBudget(null)
    setTripDescription('')
    setFamilyTravellers(null)
    setFamilyRooms(null)
    setError(null)
  }

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0))

  const handleCreateTrip = async () => {
    try {
      setError(null)

      const traveler = LocalStorageService.getTraveler()
      if (!traveler) throw new Error('Traveler data not found')

      const tripRequest = buildCreateTripRequest({
        travelerId: traveler.id,
        tripDates,
        tripGoals,
        tripProfile,
        tripType,
        tripBudget,
        tripDescription,
        familyTravellers,
        familyRooms,
      })

      const { id } = await TripsApiService.createTrip(tripRequest)
      router.push(`/resultados/${id}`)
      handleOnClose()
    } catch (err) {
      console.error('Error creating trip:', err)
      router.push(`/resultados/?message=${'Houve um erro ao criar a viagem. Por favor, tente novamente.'}`)
      handleOnClose()
    }
  }

  if (!isOpen) return null

  const currentStep = steps[stepIndex] ?? 'intro'
  const progressPercent = ((stepIndex + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative">
        <button
          onClick={handleOnClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Fechar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="h-1.5 bg-gray-200 rounded-t-lg overflow-hidden">
          <div className="h-full bg-primary-600 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 m-4 rounded-md">{error}</div>}

        {currentStep === 'intro' && <StepIntro onNext={goNext} />}

        {currentStep === 'dates' && (
          <StepDates
            onNext={(d) => {
              setTripDates(d)
              goNext()
            }}
            onBack={goBack}
          />
        )}

        {currentStep === 'type' && (
          <StepType
            onNext={(t) => {
              setTripType(t)
              if (t.type !== TravelerType.FAMILY) {
                setFamilyTravellers(null)
                setFamilyRooms(null)
              }
              goNext()
            }}
            onBack={goBack}
          />
        )}

        {currentStep === 'familyTravelers' && (
          <StepFamilyTravelersCount
            onNext={(t) => {
              setFamilyTravellers(t)
              setFamilyRooms(null)
              goNext()
            }}
            onBack={goBack}
            initial={familyTravellers ?? undefined}
          />
        )}

        {currentStep === 'familyRooms' && (
          <StepFamilyRoomsChoice
            onNext={(rooms) => {
              setFamilyRooms(rooms)
              goNext()
            }}
            onBack={goBack}
            travelers={familyTravellers ?? { adults: 2, children: 0, childrenAges: [] }}
          />
        )}

        {currentStep === 'goals' && (
          <StepGoals
            onNext={(g) => {
              setTripGoals(g)
              goNext()
            }}
            onBack={goBack}
            tripType={tripType?.type}
          />
        )}

        {currentStep === 'profile' && (
          <StepProfile
            onNext={(p) => {
              setTripProfile(p)
              goNext()
            }}
            onBack={goBack}
          />
        )}

        {currentStep === 'budget' && (
          <StepBudget
            onNext={(b) => {
              setTripBudget(b)
              goNext()
            }}
            onBack={goBack}
            initial={tripBudget ?? undefined}
          />
        )}

        {currentStep === 'description' && (
          <StepTripDescription
            onNext={(d) => {
              setTripDescription(d)
              goNext()
            }}
            onBack={goBack}
            initial={tripDescription}
          />
        )}

        {currentStep === 'contact' && (
          <StepContact
            onNext={() => {
              setHasLeadId(true)
              goNext()
            }}
            onBack={goBack}
            formData={formData}
          />
        )}

        {currentStep === 'createTrip' && (
          <StepCreateTrip
            onNext={() => {
              fpixel.event('descobrir_viagem', { source: 'Trip Discovery Wizard' })
              void handleCreateTrip()
            }}
          />
        )}
      </div>
    </div>
  )
}