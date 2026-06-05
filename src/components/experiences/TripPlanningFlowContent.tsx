'use client'

import { useEffect, useMemo, useState } from 'react'
import { TripsApiService } from '@/clients/trips'
import { LocalStorageService } from '@/clients/local'
import { TravelerType } from '@/core/types/trip'
import LeadForm from '@/components/LeadForm'
import { AppMultiStepFlowShell } from '@/components/app/AppMultiStepFlowShell'
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
  type FamilyRoom,
  type FamilyTravellers,
  type TripDates,
  type TripGoals,
  type TripProfile,
  type TripType,
} from '@/components/trip-planning'
import type { TripBudgetPayload } from '@/components/trip-planning/StepBudget'
import type { InspirationSelection } from './AccommodationRecommendationFlowDrawer'

export const TRIP_PLANNING_FLOW_SOURCE = 'Experiencias - Recomendacao Hospedagem'

function inspirationToCreateTripFields(selection: InspirationSelection | null | undefined): {
  collection: string | null
  destination: string | null
} {
  if (!selection) return { collection: null, destination: null }
  if (selection.kind === 'collection') {
    return { collection: selection.uniqueName, destination: null }
  }
  return { collection: null, destination: selection.destination.uniqueName }
}

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

const STEP_META: Record<StepId, { label: string; title: string }> = {
  intro: { label: 'Início', title: 'Vamos planejar sua viagem' },
  dates: { label: 'Datas', title: 'Quando você pretende viajar?' },
  type: { label: 'Tipo', title: 'Com quem você viaja?' },
  familyTravelers: { label: 'Viajantes', title: 'Quem vai na viagem?' },
  familyRooms: { label: 'Quartos', title: 'Como dividir os quartos?' },
  goals: { label: 'Objetivos', title: 'O que você busca na viagem?' },
  profile: { label: 'Perfil', title: 'Qual o seu perfil de viagem?' },
  budget: { label: 'Orçamento', title: 'Qual o seu orçamento?' },
  description: { label: 'Comentários', title: 'Conte mais sobre a viagem' },
  contact: { label: 'Contato', title: 'Quase lá!' },
  createTrip: { label: 'Finalizar', title: 'Criando sua viagem' },
}

function StepContact({
  onNext,
  onBack,
  formData,
}: {
  onNext: () => void
  onBack: () => void
  formData: {
    tripType: string
    tripGoals: string[]
    tripProfile: string
    startDate: string | null
    endDate: string | null
    month: number | null
  }
}) {
  const metadata = [
    { key: 'trip_type', value: formData.tripType, keyDescription: 'Tipo de viagem' },
    { key: 'trip_goals', value: formData.tripGoals.join(','), keyDescription: 'Objetivos da viagem' },
    { key: 'trip_profile', value: formData.tripProfile, keyDescription: 'Perfil da viagem' },
    {
      key: 'trip_dates',
      value:
        formData.startDate && formData.endDate
          ? `${formData.startDate} - ${formData.endDate}`
          : formData.month
            ? `Mês ${formData.month}`
            : '',
      keyDescription: 'Datas da viagem',
    },
    { key: 'source', value: TRIP_PLANNING_FLOW_SOURCE, keyDescription: 'Fonte do lead' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <p className="text-gray-600">
          Preencha seus dados para receber a recomendação de hospedagens personalizada para sua jornada.
        </p>
      </div>
      <LeadForm
        onSuccess={onNext}
        submitButtonText="Continuar"
        event="descobrir_viagem"
        eventOptions={{ source: TRIP_PLANNING_FLOW_SOURCE }}
        additionalMetadata={metadata}
        showBackButton
        onBack={onBack}
      />
    </div>
  )
}

export type TripPlanningFlowContentProps = {
  onTripCreated: (tripId: string) => void
  onBackFromFirstStep: () => void
  onExit: () => void
  resetKey: number
  inspirationSelection?: InspirationSelection | null
}

export function TripPlanningFlowContent({
  onTripCreated,
  onBackFromFirstStep,
  onExit,
  resetKey,
  inspirationSelection = null,
}: TripPlanningFlowContentProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [tripDates, setTripDates] = useState<TripDates | null>(null)
  const [tripGoals, setTripGoals] = useState<TripGoals | null>(null)
  const [tripProfile, setTripProfile] = useState<TripProfile | null>(null)
  const [tripType, setTripType] = useState<TripType | null>(null)
  const [tripBudget, setTripBudget] = useState<TripBudgetPayload>({ maxBudget: 25000, isFlexible: true })
  const [tripDescription, setTripDescription] = useState('')
  const [familyTravellers, setFamilyTravellers] = useState<FamilyTravellers | null>(null)
  const [familyRooms, setFamilyRooms] = useState<FamilyRoom[] | null>(null)
  const [hasTraveler, setHasTraveler] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStepIndex(0)
    setTripDates(null)
    setTripGoals(null)
    setTripProfile(null)
    setTripType(null)
    setTripBudget({ maxBudget: 25000, isFlexible: true })
    setTripDescription('')
    setFamilyTravellers(null)
    setFamilyRooms(null)
    setError(null)
    if (typeof window !== 'undefined') {
      setHasTraveler(LocalStorageService.hasTraveler())
    }
  }, [resetKey])

  const isFamilyTrip = tripType?.type === TravelerType.FAMILY

  const steps = useMemo<StepId[]>(() => {
    const base: StepId[] = ['intro', 'dates', 'type']
    if (isFamilyTrip) base.push('familyTravelers', 'familyRooms')
    base.push('goals', 'profile', 'budget', 'description')
    if (!hasTraveler) base.push('contact')
    base.push('createTrip')
    return base
  }, [hasTraveler, isFamilyTrip])

  useEffect(() => {
    setStepIndex((prev) => Math.min(prev, Math.max(0, steps.length - 1)))
  }, [steps.length])

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  const goBack = () => {
    if (stepIndex === 0) {
      onBackFromFirstStep()
      return
    }
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  const formData = {
    tripType: tripType?.type ?? '',
    tripGoals: tripGoals?.goals ?? [],
    tripProfile: tripProfile?.profile ?? '',
    startDate: tripDates?.startDate ?? null,
    endDate: tripDates?.endDate ?? null,
    month: tripDates?.month ?? null,
  }

  const handleCreateTrip = async () => {
    try {
      setError(null)
      const traveler = LocalStorageService.getTraveler()
      if (!traveler) {
        throw new Error('Preencha seus dados de contato para continuar.')
      }

      const { collection, destination } = inspirationToCreateTripFields(inspirationSelection)

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
        collection,
        destination,
      })

      const { id } = await TripsApiService.createTrip(tripRequest)
      onTripCreated(id)
    } catch (err) {
      console.error('Error creating trip:', err)
      setError(err instanceof Error ? err.message : 'Houve um erro ao criar a viagem. Por favor, tente novamente.')
      const descriptionIndex = steps.indexOf('description')
      if (descriptionIndex >= 0) setStepIndex(descriptionIndex)
    }
  }

  const currentStep = steps[stepIndex] ?? 'intro'
  const stepNumber = stepIndex + 1
  const totalSteps = steps.length
  const stepperLabels = steps.map((id) => STEP_META[id].label)
  const progressPercent = totalSteps > 1 ? (stepIndex / (totalSteps - 1)) * 100 : 0

  return (
    <AppMultiStepFlowShell
      categoryLabel="Sua viagem"
      title={STEP_META[currentStep].title}
      step={stepNumber}
      totalSteps={totalSteps}
      stepperLabels={stepperLabels}
      progressPercent={progressPercent}
      showBack
      onBack={goBack}
      onExit={onExit}
      exitLabel="Fechar"
    >
      {error ? (
        <div className="mx-4 mt-4 rounded-md bg-red-50 p-4 text-sm text-red-600">{error}</div>
      ) : null}

      <div className="px-4 pb-8">
        {currentStep === 'intro' && (
          <StepIntro
            onNext={goNext}
            title="Vamos planejar sua viagem"
            paragraphs={[
              'Responda algumas perguntas rápidas sobre a sua viagem — leva cerca de 5 minutos.',
              'Com isso criamos sua jornada e preparamos recomendações de hospedagem alinhadas ao seu perfil e objetivos.',
            ]}
            buttonText="Começar"
          />
        )}

        {currentStep === 'dates' && (
          <StepDates
            onNext={(d) => {
              setTripDates(d)
              goNext()
            }}
            onBack={goBack}
            title="Quando você pretende viajar?"
            description="Selecione a janela de datas em que você pode viajar e a duração desejada para a sua viagem."
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
            initial={tripBudget}
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
            buttonText="Continuar"
          />
        )}

        {currentStep === 'contact' && (
          <StepContact
            onNext={() => {
              setHasTraveler(true)
              goNext()
            }}
            onBack={goBack}
            formData={formData}
          />
        )}

        {currentStep === 'createTrip' && <StepCreateTrip onNext={handleCreateTrip} />}
      </div>
    </AppMultiStepFlowShell>
  )
}
