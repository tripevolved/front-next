'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/core/store'
import { TripsApiService } from '@/clients/trips'
import { type CreateTripRequest, TravelerType } from '@/core/types/trip'
import { differenceInDays } from 'date-fns'
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

function formatCurrencyBR(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

type TripBudgetPayload = { maxBudget: number; isFlexible: boolean }

function toApiDates(d: TripDates): {
  startDate: string | null
  endDate: string | null
  month: number | null
  anyMonthFlexibility: boolean
  minDays: number
  maxDays: number
} {
  const start = d.startDate ? new Date(d.startDate) : null
  const end = d.endDate ? new Date(d.endDate) : null

  const isMonthMode = d.month != null
  const anyMonthFlexibility = isMonthMode

  const days =
    start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())
      ? Math.max(1, differenceInDays(end, start) + 1)
      : 1

  return {
    startDate: d.startDate ?? null,
    endDate: d.endDate ?? null,
    month: d.month ?? null,
    anyMonthFlexibility,
    minDays: days,
    maxDays: days,
  }
}

function StepIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Como funciona</h2>
      <p className="text-gray-600">
        Você vai responder a algumas perguntas rápidas sobre a sua viagem. No final, um especialista vai preparar uma recomendação de destino para você.
      </p>
      <p className="text-gray-600">
        Isso te dará uma direção clara para planejarmos sua próxima jornada.
      </p>

      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
        >
          Começar
        </button>
      </div>
    </div>
  )
}

function StepBudget({ onNext, onBack }: { onNext: (budget: TripBudgetPayload) => void; onBack: () => void }) {
  const [maxBudget, setMaxBudget] = useState<number>(25000)
  const [isFlexible, setIsFlexible] = useState<boolean>(true)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext({ maxBudget, isFlexible })
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Qual é o seu orçamento?</h2>
      <p className="text-gray-600">Defina um valor máximo para a experiência da sua viagem.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <input
            type="checkbox"
            checked={isFlexible}
            onChange={(e) => setIsFlexible(e.target.checked)}
          />
          Permitir que o especialista ajuste um pouco o valor dentro do planejamento
        </label>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Até</span>
            <span className="font-semibold text-secondary-900">
              {maxBudget >= 200000 ? `${formatCurrencyBR(200000)}+` : formatCurrencyBR(maxBudget)}
            </span>
          </div>
          <input
            type="range"
            min={3000}
            max={200000}
            step={500}
            value={maxBudget}
            onChange={(e) => setMaxBudget(Math.min(Number(e.target.value), 200000))}
            className="w-full accent-primary-600"
          />
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
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

function StepTripDescription({ onNext, onBack }: { onNext: (description: string) => void; onBack: () => void }) {
  const [description, setDescription] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext(description.trim())
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Conte um pouco sobre o que você quer viver</h2>
      <p className="text-gray-600">
        Se quiser, descreva detalhes como estilo, ritmo, preferências e expectativas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex.: queremos descansar, comer bem e conhecer lugares com clima romântico..."
          rows={7}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600 text-gray-900"
        />
        <p className="text-xs text-gray-500">{description.trim().length} caracteres</p>

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
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar minha jornada
          </button>
        </div>
      </form>
    </div>
  )
}

type FamilyTravellers = { adults: number; children: number; childrenAges: number[] }
type FamilyRoom = { adults: number; children: number; childrenAges: number[] }

function RoundAdjust({
  value,
  min,
  max,
  onChange,
}: {
  value: number
  min: number
  max: number
  onChange: (next: number) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-700"
        aria-label="Diminuir"
      >
        -
      </button>
      <span className="min-w-[2.5rem] text-center font-semibold text-secondary-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-700"
        aria-label="Aumentar"
      >
        +
      </button>
    </div>
  )
}

function StepFamilyTravelersCount({
  onNext,
  onBack,
  initial,
}: {
  onNext: (travelers: FamilyTravellers) => void
  onBack: () => void
  initial?: FamilyTravellers
}) {
  const BASE_CHILDREN_AGE = 6
  const [adults, setAdults] = useState<number>(initial?.adults ?? 2)
  const [children, setChildren] = useState<number>(initial?.children ?? 0)
  const [childrenAges, setChildrenAges] = useState<number[]>(initial?.childrenAges ?? [])

  const applyChildrenCount = (nextChildren: number) => {
    if (nextChildren <= 0) {
      setChildren(0)
      setChildrenAges([])
      return
    }

    if (nextChildren > children) {
      const diff = nextChildren - children
      setChildren(nextChildren)
      setChildrenAges((prev) => [...prev, ...Array.from({ length: diff }, () => BASE_CHILDREN_AGE)])
      return
    }

    setChildren(nextChildren)
    setChildrenAges(childrenAges.slice(0, nextChildren))
  }

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Quantas pessoas vão viajar?</h2>
      <p className="text-gray-600">Para montar os quartos ideais, precisamos saber adultos, crianças e a idade delas.</p>

      <div className="space-y-5">
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <span className="text-sm font-medium text-gray-800">Adultos</span>
          <RoundAdjust value={adults} min={1} max={8} onChange={setAdults} />
        </div>

        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <span className="text-sm font-medium text-gray-800">Crianças</span>
          <RoundAdjust value={children} min={0} max={8} onChange={applyChildrenCount} />
        </div>

        {children > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Idade das crianças</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {childrenAges.map((age, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
                >
                  <span className="text-sm text-gray-800">Criança {idx + 1}</span>
                  <RoundAdjust
                    value={age}
                    min={0}
                    max={17}
                    onChange={(nextAge) => {
                      setChildrenAges((prev) => prev.map((a, i) => (i === idx ? nextAge : a)))
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
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
          type="button"
          onClick={() =>
            onNext({
              adults,
              children,
              childrenAges: children > 0 ? childrenAges : [],
            })
          }
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}

function StepFamilyRoomsChoice({
  onNext,
  onBack,
  travelers,
}: {
  onNext: (rooms: FamilyRoom[]) => void
  onBack: () => void
  travelers: FamilyTravellers
}) {
  const { adults, children, childrenAges } = travelers
  const [roomsCount, setRoomsCount] = useState<number>(1)
  const [roomAdults, setRoomAdults] = useState<number[]>([adults])
  const [roomChildren, setRoomChildren] = useState<number[]>([children])

  const rebuildRooms = (nextRoomsCount: number) => {
    const nextAdults = Array.from({ length: nextRoomsCount }, (_, i) => (i === 0 ? adults - (nextRoomsCount - 1) : 1))
    const nextChildren = Array.from({ length: nextRoomsCount }, (_, i) => (i === 0 ? children : 0))
    setRoomsCount(nextRoomsCount)
    setRoomAdults(nextAdults)
    setRoomChildren(nextChildren)
  }

  const sumAdults = roomAdults.reduce((acc, v) => acc + v, 0)
  const sumChildren = roomChildren.reduce((acc, v) => acc + v, 0)
  const isValid = sumAdults === adults && sumChildren === children

  const roomsToSend: FamilyRoom[] = []
  let ageCursor = 0
  for (let i = 0; i < roomsCount; i += 1) {
    const roomChildCount = roomChildren[i] ?? 0
    const roomAges = childrenAges.slice(ageCursor, ageCursor + roomChildCount)
    ageCursor += roomChildCount
    roomsToSend.push({ adults: roomAdults[i] ?? 1, children: roomChildCount, childrenAges: roomAges })
  }

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Quantos quartos vocês vão precisar?</h2>
      <p className="text-gray-600">Vamos organizar os quartos com base nos adultos e nas crianças informadas.</p>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <span className="text-sm font-medium text-gray-800">Quartos</span>
        <RoundAdjust value={roomsCount} min={1} max={Math.max(1, adults)} onChange={(v) => rebuildRooms(v)} />
      </div>

      <div className="space-y-4">
        {Array.from({ length: roomsCount }).map((_, idx) => {
          const roomChildCount = roomChildren[idx] ?? 0
          const roomAges = roomsToSend[idx]?.childrenAges ?? []
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-800">Quarto {idx + 1}</h3>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Adultos</span>
                <RoundAdjust
                  value={roomAdults[idx] ?? 1}
                  min={1}
                  max={adults}
                  onChange={(next) => {
                    setRoomAdults((prev) => prev.map((a, i) => (i === idx ? next : a)))
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Crianças</span>
                <RoundAdjust
                  value={roomChildCount}
                  min={0}
                  max={children}
                  onChange={(next) => {
                    setRoomChildren((prev) => prev.map((c, i) => (i === idx ? next : c)))
                  }}
                />
              </div>

              <div className="text-xs text-gray-500">
                Idades: {roomAges.length ? roomAges.join(', ') : '—'}
              </div>
            </div>
          )
        })}
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
          type="button"
          onClick={() => onNext(roomsToSend)}
          disabled={!isValid}
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}

export default function PlanejarPage() {
  const router = useRouter()
  const travelerId = useAppStore((state) => state.travelerState?.id ?? '')
  const [step, setStep] = useState(1)
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
  const totalSteps = isFamilyTrip ? 10 : 8
  const progressPercent = (step / totalSteps) * 100

  const handleDatesNext = (dates: TripDates) => {
    setTripDates(dates)
    setStep(3)
  }

  const handleTypeNext = (type: TripType) => {
    setTripType(type)
    setStep(4)
  }

  const handleGoalsNext = (goals: TripGoals) => {
    setTripGoals(goals)
    setStep(isFamilyTrip ? 7 : 5)
  }

  const handleProfileNext = (profile: TripProfile) => {
    setTripProfile(profile)
    setStep(isFamilyTrip ? 8 : 6)
  }

  const handleBudgetNext = (budget: TripBudgetPayload) => {
    setTripBudget(budget)
    setStep(isFamilyTrip ? 9 : 7)
  }

  const handleTripDescriptionNext = (description: string) => {
    setTripDescription(description)
    setStep(isFamilyTrip ? 10 : 8)
  }

  const handleFamilyTravelersNext = (travelers: FamilyTravellers) => {
    setFamilyTravellers(travelers)
    setFamilyRooms(null)
    setStep(5)
  }

  const handleFamilyRoomsNext = (rooms: FamilyRoom[]) => {
    setFamilyRooms(rooms)
    setStep(6)
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
        tripDetails: {
          travelerProfile: tripProfile?.profile ?? '',
          tripDescription: tripDescription.trim() ? tripDescription.trim() : undefined,
        },
        budget: {
          maxBudget: tripBudget.maxBudget,
          isFlexible: tripBudget.isFlexible,
        },
        dates: toApiDates(tripDates ?? { startDate: null, endDate: null, month: null }),
        travelers: isFamilyTrip && familyTravellers
          ? {
              type: tripType?.type ?? TravelerType.FAMILY,
              adults: familyTravellers.adults,
              children: familyTravellers.children,
              childrenAges: familyTravellers.childrenAges,
              rooms: (familyRooms ?? []).map((r) => ({
                ...r,
                type: tripType?.type ?? TravelerType.FAMILY,
              })),
            }
          : {
              type: tripType?.type ?? TravelerType.INDIVIDUAL,
            },
        shouldRecommendDestinations: false,
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
              {step === 1 && <StepIntro onNext={() => setStep(2)} />}
              {step === 2 && (
                <StepDates
                  onNext={handleDatesNext}
                  onBack={handleBack}
                  hideMonthSelection
                  title="Quando você quer viajar?"
                  description="Selecione o período da sua viagem para continuarmos com a recomendação."
                />
              )}
              {step === 3 && (
                <StepType
                  onNext={handleTypeNext}
                  onBack={handleBack}
                  types={[
                    { id: TravelerType.COUPLE, name: 'Casal', icon: '❤️', available: true },
                    { id: TravelerType.FAMILY, name: 'Família', icon: '👨‍👩‍👧‍👦', available: true },
                  ]}
                  disclaimerText="Só cuidamos de viagens para casais e famílias."
                />
              )}
              {step === 4 && !isFamilyTrip && (
                <StepGoals
                  onNext={handleGoalsNext}
                  onBack={handleBack}
                  tripType={tripType?.type}
                />
              )}

              {step === 4 && isFamilyTrip && (
                <StepFamilyTravelersCount
                  onNext={handleFamilyTravelersNext}
                  onBack={handleBack}
                  initial={familyTravellers ?? undefined}
                />
              )}

              {step === 5 && isFamilyTrip && (
                <StepFamilyRoomsChoice
                  onNext={handleFamilyRoomsNext}
                  onBack={handleBack}
                  travelers={
                    familyTravellers ?? { adults: 2, children: 0, childrenAges: [] }
                  }
                />
              )}

              {step === 5 && !isFamilyTrip && (
                <StepProfile
                  onNext={handleProfileNext}
                  onBack={handleBack}
                  buttonText="Próximo"
                />
              )}

              {step === 6 && !isFamilyTrip && (
                <StepBudget
                  onNext={handleBudgetNext}
                  onBack={handleBack}
                />
              )}

              {step === 6 && isFamilyTrip && (
                <StepGoals
                  onNext={handleGoalsNext}
                  onBack={handleBack}
                  tripType={tripType?.type}
                />
              )}

              {step === 7 && isFamilyTrip && (
                <StepProfile
                  onNext={handleProfileNext}
                  onBack={handleBack}
                  buttonText="Próximo"
                />
              )}

              {step === 7 && !isFamilyTrip && (
                <StepTripDescription
                  onNext={handleTripDescriptionNext}
                  onBack={handleBack}
                />
              )}

              {step === 8 && isFamilyTrip && (
                <StepBudget
                  onNext={handleBudgetNext}
                  onBack={handleBack}
                />
              )}

              {step === 8 && !isFamilyTrip && (
                <StepCreateTrip onNext={handleCreateTrip} />
              )}

              {step === 9 && isFamilyTrip && (
                <StepTripDescription
                  onNext={handleTripDescriptionNext}
                  onBack={handleBack}
                />
              )}

              {step === 10 && isFamilyTrip && (
                <StepCreateTrip onNext={handleCreateTrip} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
