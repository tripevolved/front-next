'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AccommodationsApiService } from '@/clients/accommodations'
import { toDateOnlyString } from '@/clients/accommodations/availability'
import type { AccommodationAvailabilityQuery } from '@/clients/accommodations/availability'
import { TripsApiService } from '@/clients/trips'
import { AccommodationDrawerDetailPanel } from '@/components/accommodation/AccommodationDrawerDetailPanel'
import { AccommodationAvailabilityRoomsGrid } from '@/components/accommodation/AccommodationAvailabilityRoomsGrid'
import { EmptyOrErrorState } from '@/components/common/EmptyOrErrorState'
import type { PublicAccommodation, PublicAccommodationRoomAvailability } from '@/core/types/accommodations'
import type { TripAccommodationProposalView } from '@/core/types/recommendations'
import { AccommodationProposalCard } from './AccommodationProposalCard'

type Step = 1 | 2 | 3

type Props = {
  isOpen: boolean
  onClose: () => void
  tripId: string
  proposals: TripAccommodationProposalView[]
  isLoading?: boolean
  loadError?: boolean
  travelerQuery: AccommodationAvailabilityQuery
  stayStartDate: Date | null
  stayEndDate: Date | null
  onBrowseOther: () => void
  onTripAccommodationsChanged?: () => void | Promise<void>
}

const ROLE_ORDER = { primary: 0, alternative: 1, fallback: 2 } as const

export function AccommodationProposalsDrawer({
  isOpen,
  onClose,
  tripId,
  proposals,
  isLoading,
  loadError,
  travelerQuery,
  stayStartDate,
  stayEndDate,
  onBrowseOther,
  onTripAccommodationsChanged,
}: Props) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>(1)
  const [selectedProposal, setSelectedProposal] = useState<TripAccommodationProposalView | null>(null)
  const alternativesRef = useRef<HTMLDivElement>(null)

  const [availabilityLoading, setAvailabilityLoading] = useState(false)
  const [availabilityError, setAvailabilityError] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [validUntil, setValidUntil] = useState<Date | null>(null)
  const [rooms, setRooms] = useState<PublicAccommodationRoomAvailability[]>([])
  const [selectedRateIdByRoomId, setSelectedRateIdByRoomId] = useState<Record<string, string>>({})
  const [accommodation, setAccommodation] = useState<PublicAccommodation | null>(null)
  const [accommodationLoading, setAccommodationLoading] = useState(false)
  const [accommodationError, setAccommodationError] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const sortedProposals = useMemo(
    () =>
      [...proposals].sort(
        (a, b) => (ROLE_ORDER[a.role] ?? 9) - (ROLE_ORDER[b.role] ?? 9),
      ),
    [proposals],
  )

  const primary = sortedProposals.find((p) => p.role === 'primary')
  const alternatives = sortedProposals.filter((p) => p.role !== 'primary')

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setSelectedProposal(null)
      setCreateError(null)
      setCreating(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || step !== 2 || !selectedProposal?.uniqueName) return
    if (!stayStartDate || !stayEndDate) return

    let cancelled = false
    setAvailabilityLoading(true)
    setAvailabilityError(false)
    setTransactionId(null)
    setValidUntil(null)
    setRooms([])
    setSelectedRateIdByRoomId({})
    setAccommodationLoading(true)
    setAccommodationError(false)
    setAccommodation(null)

    const uniqueName = selectedProposal.uniqueName

    Promise.all([
      AccommodationsApiService.getAccommodationAvailability(
        uniqueName,
        stayStartDate,
        stayEndDate,
        travelerQuery,
      ),
      AccommodationsApiService.getAccommodationByUniqueName(uniqueName).catch(() => null),
    ])
      .then(([availabilityRes, accommodationRes]) => {
        if (cancelled) return
        setTransactionId(availabilityRes.transactionId)
        setValidUntil(availabilityRes.uniqueTransactionValidUntil ?? null)
        setRooms((availabilityRes.rooms ?? []) as PublicAccommodationRoomAvailability[])
        if (accommodationRes) setAccommodation(accommodationRes as PublicAccommodation)
      })
      .catch(() => {
        if (cancelled) return
        setAvailabilityError(true)
        setAccommodationError(true)
      })
      .finally(() => {
        if (cancelled) return
        setAvailabilityLoading(false)
        setAccommodationLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isOpen, step, selectedProposal?.uniqueName, stayStartDate, stayEndDate, travelerQuery])

  const handleSelectProposal = useCallback((proposal: TripAccommodationProposalView) => {
    if (!proposal.hasAvailability) return
    setSelectedProposal(proposal)
    setStep(2)
    setCreateError(null)
  }, [])

  const scrollToAlternatives = useCallback(() => {
    alternativesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleRoomAction = useCallback(
    async (room: PublicAccommodationRoomAvailability, selectedRate: { id: string; vendor: string }) => {
      if (!selectedProposal?.uniqueName || !stayStartDate || !stayEndDate || !transactionId) {
        setCreateError('Transação de disponibilidade inválida. Tente novamente.')
        return
      }

      setCreating(true)
      setCreateError(null)

      try {
        const firstTravelerRoom = travelerQuery.travelerInput.rooms?.[0]
        const adults = firstTravelerRoom?.adults ?? travelerQuery.travelerInput.adults ?? 2
        const children = firstTravelerRoom?.children ?? travelerQuery.travelerInput.children ?? 0
        const childrenAges = firstTravelerRoom?.childrenAges ?? travelerQuery.travelerInput.childrenAges ?? []

        const created = await TripsApiService.postTripAccommodationCreate(tripId, {
          travelerType: travelerQuery.travelerInput.type,
          accommodationUniqueName: selectedProposal.uniqueName,
          uniqueTransactionId: transactionId,
          uniqueTransactionValidUntil: validUntil,
          startDate: toDateOnlyString(stayStartDate),
          endDate: toDateOnlyString(stayEndDate),
          rooms: [
            {
              adults,
              children,
              childrenAges,
              rateId: selectedRate.id,
              accommodationRoomId: room.id,
              vendor: selectedRate.vendor,
            },
          ],
        })

        if (!created?.id) throw new Error('missing-created-id')

        await onTripAccommodationsChanged?.()
        setStep(3)
      } catch {
        setCreateError('Não foi possível adicionar a hospedagem à viagem. Tente novamente.')
      } finally {
        setCreating(false)
      }
    },
    [
      onTripAccommodationsChanged,
      selectedProposal?.uniqueName,
      stayEndDate,
      stayStartDate,
      transactionId,
      travelerQuery,
      tripId,
      validUntil,
    ],
  )

  if (!isOpen || !mounted) return null

  const stepTitle =
    step === 1 ? 'Hospedagens recomendadas' : step === 2 ? 'Escolha o quarto' : 'Hospedagem adicionada'

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
            <div className="min-w-[96px]">
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => {
                    setStep(1)
                    setSelectedProposal(null)
                  }}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  {'< Voltar'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  Fechar
                </button>
              )}
            </div>
            <div className="min-w-0 text-center">
              <p className="font-comfortaa text-xs text-secondary-500">Curadoria Trip Evolved</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">{stepTitle}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 inline-flex items-center justify-center shrink-0"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto p-5 md:p-6">
          {step === 1 && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="font-comfortaa text-sm text-secondary-600 text-center">
                Selecionamos as melhores opções com base no seu perfil de viagem e nas datas da jornada.
              </p>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500" />
                </div>
              ) : loadError ? (
                <EmptyOrErrorState
                  status="error"
                  title="Não foi possível carregar as recomendações"
                  description="Tente novamente em instantes ou explore outras hospedagens."
                />
              ) : sortedProposals.length === 0 ? (
                <EmptyOrErrorState
                  status="empty"
                  title="Ainda não há recomendações"
                  description="Estamos preparando sugestões para a sua viagem."
                />
              ) : (
                <>
                  {primary && (
                    <AccommodationProposalCard
                      proposal={primary}
                      isHero
                      onSelect={() => handleSelectProposal(primary)}
                      onViewAlternatives={scrollToAlternatives}
                    />
                  )}

                  {alternatives.length > 0 && (
                    <div ref={alternativesRef} className="space-y-4">
                      <h3 className="font-baloo text-lg font-bold text-secondary-900">Alternativas com disponibilidade</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {alternatives.map((proposal) => (
                          <AccommodationProposalCard
                            key={proposal.id}
                            proposal={proposal}
                            onSelect={() => handleSelectProposal(proposal)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {step === 2 && selectedProposal && (
            <div className="space-y-5 max-w-3xl mx-auto">
              <AccommodationDrawerDetailPanel
                accommodation={accommodation}
                loading={accommodationLoading}
                error={accommodationError}
                fallbackTitle={selectedProposal.name}
              />

              {!stayStartDate || !stayEndDate ? (
                <EmptyOrErrorState
                  status="error"
                  title="Datas da viagem não definidas"
                  description="Complete as datas da viagem para ver quartos disponíveis."
                />
              ) : (
                <AccommodationAvailabilityRoomsGrid
                  availabilityLoading={availabilityLoading}
                  availabilityError={availabilityError}
                  rooms={rooms}
                  selectedRateIdByRoomId={selectedRateIdByRoomId}
                  onSelectedRateIdChange={(roomId, rateId) =>
                    setSelectedRateIdByRoomId((prev) => ({ ...prev, [roomId]: rateId }))
                  }
                  transactionId={transactionId}
                  actionLabel="Confirmar hospedagem"
                  isActionLoading={creating}
                  actionError={createError}
                  onRoomAction={handleRoomAction}
                />
              )}
            </div>
          )}

          {step === 3 && (
            <div className="max-w-lg mx-auto text-center py-12 space-y-4">
              <div className="text-4xl">✓</div>
              <h3 className="font-baloo text-2xl font-bold text-secondary-900">Hospedagem adicionada!</h3>
              <p className="font-comfortaa text-secondary-600">
                Sua escolha foi salva na viagem. Você pode revisar os detalhes na jornada.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="font-baloo bg-accent-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-600"
              >
                Voltar para a viagem
              </button>
            </div>
          )}
        </div>

        {step === 1 && (
          <footer className="shrink-0 border-t border-secondary-200 p-5">
            <button
              type="button"
              onClick={() => {
                onClose()
                onBrowseOther()
              }}
              className="w-full font-comfortaa text-sm font-semibold text-accent-700 hover:text-accent-800 py-2"
            >
              Explorar outras hospedagens
            </button>
          </footer>
        )}
      </aside>
    </div>,
    document.body,
  )
}
