'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/core/store'
import { TripsApiService } from '@/clients/trips'
import { TravelerType } from '@/core/types/trip'
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
import { ProposalFlowPageLayout } from '@/components/app/ProposalFlowPageLayout'
import { AppMultiStepFlowShell } from '@/components/app/AppMultiStepFlowShell'

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
  | 'createTrip'

const STEP_META: Record<StepId, { label: string; title: string }> = {
  intro: { label: 'Início', title: 'Vamos começar sua jornada?' },
  dates: { label: 'Datas', title: 'Quando você pretende viajar?' },
  type: { label: 'Tipo', title: 'Com quem você viaja?' },
  familyTravelers: { label: 'Viajantes', title: 'Quem vai na viagem?' },
  familyRooms: { label: 'Quartos', title: 'Como dividir os quartos?' },
  goals: { label: 'Objetivos', title: 'O que você busca na viagem?' },
  profile: { label: 'Perfil', title: 'Qual o seu perfil de viagem?' },
  budget: { label: 'Orçamento', title: 'Qual o seu orçamento?' },
  description: { label: 'Comentários', title: 'Conte mais sobre a viagem' },
  createTrip: { label: 'Finalizar', title: 'Criando sua viagem' },
}

export default function PlanejarPage() {
  const router = useRouter()
  const travelerId = useAppStore((state) => state.travelerState?.id ?? '')
  const [stepIndex, setStepIndex] = useState(0)
  const [tripDates, setTripDates] = useState<TripDates | null>(null)
  const [tripGoals, setTripGoals] = useState<TripGoals | null>(null)
  const [tripProfile, setTripProfile] = useState<TripProfile | null>(null)
  const [tripType, setTripType] = useState<TripType | null>(null)
  const [tripBudget, setTripBudget] = useState<TripBudgetPayload>({ maxBudget: 25000, isFlexible: true })
  const [tripDescription, setTripDescription] = useState<string>('')
  const [familyTravellers, setFamilyTravellers] = useState<FamilyTravellers | null>(null)
  const [familyRooms, setFamilyRooms] = useState<FamilyRoom[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isFamilyTrip = tripType?.type === TravelerType.FAMILY

  const steps = useMemo<StepId[]>(() => {
    const base: StepId[] = ['intro', 'dates', 'type']
    if (isFamilyTrip) base.push('familyTravelers', 'familyRooms')
    base.push('goals', 'profile', 'budget', 'description', 'createTrip')
    return base
  }, [isFamilyTrip])

  const currentStep = steps[stepIndex] ?? 'intro'
  const stepNumber = stepIndex + 1
  const totalSteps = steps.length
  const stepperLabels = useMemo(() => steps.map((id) => STEP_META[id].label), [steps])
  const progressPercent = totalSteps > 1 ? (stepIndex / (totalSteps - 1)) * 100 : 0
  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0))

  const handleCreateTrip = async () => {
    try {
      setError(null)
      if (!travelerId) {
        throw new Error('Você precisa estar logado para criar a viagem.')
      }

      const tripRequest = buildCreateTripRequest({
        travelerId,
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
      router.push(`/app/viagens/${id}`)
    } catch (err) {
      console.error('Error creating trip:', err)
      setError(err instanceof Error ? err.message : 'Houve um erro ao criar a viagem. Por favor, tente novamente.')
    }
  }

  return (
    <ProposalFlowPageLayout showLeftColumn>
      <AppMultiStepFlowShell
        categoryLabel="Planejar viagem"
        title={STEP_META[currentStep].title}
        step={stepNumber}
        totalSteps={totalSteps}
        stepperLabels={stepperLabels}
        progressPercent={progressPercent}
        showBack={stepIndex > 0}
        onBack={goBack}
        exitHref="/app"
      >
        {error ? (
          <div className="mx-4 mt-4 p-4 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>
        ) : null}

        <div className="px-4 pb-8">
          {currentStep === 'intro' && <StepIntro onNext={goNext} />}

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
              buttonText="Criar minha jornada"
            />
          )}

          {currentStep === 'createTrip' && <StepCreateTrip onNext={handleCreateTrip} />}
        </div>
      </AppMultiStepFlowShell>
    </ProposalFlowPageLayout>
  )
}
