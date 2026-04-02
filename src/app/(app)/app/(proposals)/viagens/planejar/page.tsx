'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  const steps = useMemo<StepId[]>(() => {
    const base: StepId[] = ['intro', 'dates', 'type']
    if (isFamilyTrip) base.push('familyTravelers', 'familyRooms')
    base.push('goals', 'profile', 'budget', 'description', 'createTrip')
    return base
  }, [isFamilyTrip])

  const currentStep = steps[stepIndex] ?? 'intro'
  const progressPercent = ((stepIndex + 1) / steps.length) * 100
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
      router.push(`/app/viagens/${id}/pre-proposta`)
    } catch (err) {
      console.error('Error creating trip:', err)
      setError(err instanceof Error ? err.message : 'Houve um erro ao criar a viagem. Por favor, tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left: primary box with centered image (desktop only) */}
        <div className="hidden lg:flex lg:w-[45%] lg:min-h-screen lg:shrink-0 bg-primary-600 items-center justify-center p-8">
          <div className="relative w-full max-w-md aspect-[4/3]">
            <Image
              src="/assets/trip/trip-cover.png"
              alt=""
              fill
              className="object-contain object-center"
              priority
              sizes="(min-width: 1024px) 45vw, 0px"
            />
          </div>
        </div>

        {/* Right: wizard centered in column */}
        <div className="flex-1 flex flex-col min-h-screen lg:min-h-0 lg:items-center lg:justify-center lg:py-8">
          <div className="w-full max-w-2xl flex flex-col lg:bg-white lg:rounded-lg lg:shadow-sm">
            <div className="bg-white shadow-sm lg:rounded-t-lg">
              <div className="max-w-2xl mx-auto lg:max-w-none px-6 lg:px-8">
                <div className="flex items-center gap-4 py-4">
                  <Link
                    href="/app"
                    className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar ao painel
                  </Link>
                </div>
                <div className="h-1.5 bg-gray-200 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-accent-600 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mx-4 mt-4 p-4 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-sm min-h-[400px] w-full px-4 pb-8 lg:mx-0 lg:mt-8 lg:shadow-none lg:rounded-b-lg lg:rounded-t-none lg:flex-1">
              {currentStep === 'intro' && <StepIntro onNext={goNext} />}

              {currentStep === 'dates' && (
                <StepDates
                  onNext={(d) => {
                    setTripDates(d)
                    goNext()
                  }}
                  onBack={goBack}
                  hideMonthSelection
                  title="Quando você quer viajar?"
                  description="Selecione o período da sua viagem para continuarmos com a recomendação."
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
                  types={[
                    { id: TravelerType.COUPLE, name: 'Casal', icon: '❤️', available: true },
                    { id: TravelerType.FAMILY, name: 'Família', icon: '👨‍👩‍👧‍👦', available: true },
                  ]}
                  disclaimerText="Só cuidamos de viagens para casais e famílias."
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
          </div>
        </div>
      </div>
    </div>
  )
}
