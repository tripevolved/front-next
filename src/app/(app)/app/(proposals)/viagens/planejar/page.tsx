'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/core/store'
import { TripsApiService } from '@/clients/trips'
import { type CreateTripRequest, TravelerType } from '@/core/types/trip'
import {
  StepDates,
  StepType,
  StepGoals,
  StepProfile,
  StepCreateTrip,
  type TripDates,
  type TripGoals,
  type TripProfile,
  type TripType,
} from '@/components/TripDiscoveryWizard'

function toApiDates(d: TripDates): { startDate: string | null; endDate: string | null; month: string | null } {
  return {
    startDate: d.startDate,
    endDate: d.endDate,
    month: d.month != null ? String(d.month) : null,
  }
}

export default function PlanejarPage() {
  const router = useRouter()
  const travelerId = useAppStore((state) => state.travelerState?.id ?? '')
  const [step, setStep] = useState(1)
  const [tripDates, setTripDates] = useState<TripDates | null>(null)
  const [tripGoals, setTripGoals] = useState<TripGoals | null>(null)
  const [tripProfile, setTripProfile] = useState<TripProfile | null>(null)
  const [tripType, setTripType] = useState<TripType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = 5
  const progressPercent = (step / totalSteps) * 100

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

  const handleCreateTrip = async () => {
    try {
      setError(null)
      if (!travelerId) {
        throw new Error('Você precisa estar logado para criar a viagem.')
      }
      const tripRequest: CreateTripRequest = {
        travelerId,
        goals: tripGoals?.goals ?? [],
        travelerProfile: tripProfile?.profile ?? '',
        dates: toApiDates(tripDates ?? { startDate: null, endDate: null, month: null }),
        travelers: {
          type: tripType?.type ?? TravelerType.INDIVIDUAL,
        },
        mode: 'PROPOSAL',
      }
      const { id } = await TripsApiService.createTrip(tripRequest)
      router.push(`/app/viagens/planejar/${id}`)
    } catch (err) {
      console.error('Error creating trip:', err)
      setError(err instanceof Error ? err.message : 'Houve um erro ao criar a viagem. Por favor, tente novamente.')
    }
  }

  const handleBack = () => setStep(step - 1)

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
              {step === 1 && <StepDates onNext={handleDatesNext} />}
              {step === 2 && <StepType onNext={handleTypeNext} onBack={handleBack} />}
              {step === 3 && (
                <StepGoals
                  onNext={handleGoalsNext}
                  onBack={handleBack}
                  tripType={tripType?.type}
                />
              )}
              {step === 4 && (
                <StepProfile
                  onNext={handleProfileNext}
                  onBack={handleBack}
                  buttonText="Ver recomendação"
                />
              )}
              {step === 5 && <StepCreateTrip onNext={handleCreateTrip} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
