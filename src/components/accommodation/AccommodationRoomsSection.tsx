'use client'

import { useState, useEffect, useRef } from 'react'
import {
  PublicAccommodationRoom,
  PublicAccommodationImage,
  PublicAccommodationRoomAvailability
} from '@/core/types/accommodations'
import { AccommodationRoomDetailModal } from './AccommodationRoomDetailModal'
import { FamilyTravelersModal } from './FamilyTravelersModal'
import { RoomAvailabilityPrice } from '@/components/accommodation/RoomAvailabilityPrice'
import {
  AccommodationsApiService,
  type AvailabilityTravelerType,
  type TravelerInput
} from '@/clients/accommodations'
import type { FamilyTravellers } from '@/components/trip-planning/familyTypes'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface AccommodationRoomsSectionProps {
  rooms?: PublicAccommodationRoom[]
  uniqueName: string
}

// Helper function to get amenity icon path
const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/amenities/${iconName}.svg`
}

const DEFAULT_TRAVELER_ROOMS = 1

function buildTravelerInput(
  type: AvailabilityTravelerType,
  family: FamilyTravellers | null
): TravelerInput {
  if (type === 'COUPLE') {
    return {
      type: 'COUPLE',
      adults: 2,
      children: 0,
      childrenAges: [],
      rooms: DEFAULT_TRAVELER_ROOMS
    }
  }
  const f = family ?? {
    adults: 2,
    children: 0,
    childrenAges: [] as number[]
  }
  return {
    type: 'FAMILY',
    adults: f.adults,
    children: f.children,
    childrenAges: f.childrenAges,
    rooms: DEFAULT_TRAVELER_ROOMS
  }
}

export function AccommodationRoomsSection({
  rooms,
  uniqueName
}: AccommodationRoomsSectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<
    PublicAccommodationRoom | PublicAccommodationRoomAvailability | null
  >(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [availabilityRooms, setAvailabilityRooms] = useState<
    PublicAccommodationRoomAvailability[]
  >([])
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [travelerType, setTravelerType] = useState<AvailabilityTravelerType>('COUPLE')
  const [familyTravellers, setFamilyTravellers] = useState<FamilyTravellers | null>(null)
  const [familyModalOpen, setFamilyModalOpen] = useState(false)
  const [hasFreeCancellation, setHasFreeCancellation] = useState(true)
  const [includesBreakfast, setIncludesBreakfast] = useState(true)
  const dateRangeRef = useRef<HTMLDivElement>(null)

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false)
      }
    }

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCalendarOpen])

  // Fetch availability when dates and filters allow it
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!startDate || !endDate || !uniqueName) {
        setAvailabilityRooms([])
        setTransactionId(null)
        setIsLoadingAvailability(false)
        return
      }

      if (travelerType === 'FAMILY' && !familyTravellers) {
        setAvailabilityRooms([])
        setTransactionId(null)
        setAvailabilityError(null)
        setIsLoadingAvailability(false)
        return
      }

      setIsLoadingAvailability(true)
      setAvailabilityError(null)
      try {
        const availability = await AccommodationsApiService.getAccommodationAvailability(
          uniqueName,
          startDate,
          endDate,
          {
            includesBreakfast,
            hasFreeCancellation,
            travelerInput: buildTravelerInput(
              travelerType,
              travelerType === 'FAMILY' ? familyTravellers : null
            )
          }
        )
        setAvailabilityRooms(availability.rooms)
        setTransactionId(availability.transactionId)
      } catch (error) {
        setAvailabilityError('Erro ao buscar disponibilidade. Tente novamente.')
        setAvailabilityRooms([])
        console.error('Error fetching availability:', error)
      } finally {
        setIsLoadingAvailability(false)
      }
    }

    fetchAvailability()
  }, [
    startDate,
    endDate,
    uniqueName,
    travelerType,
    familyTravellers,
    hasFreeCancellation,
    includesBreakfast
  ])

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setStartDate(update[0])
    setEndDate(update[1])
    if (update[0] && update[1]) {
      setIsCalendarOpen(false)
    }
  }

  const hasDateRange = Boolean(startDate && endDate)

  /** Baseline catalog from accommodation before dates; after a successful availability fetch, only API data. */
  const displayRooms: (
    | PublicAccommodationRoom
    | PublicAccommodationRoomAvailability
  )[] = (() => {
    if (!hasDateRange) {
      return rooms ?? []
    }
    if (travelerType === 'FAMILY' && !familyTravellers) {
      return rooms ?? []
    }
    if (isLoadingAvailability) {
      return []
    }
    if (availabilityError) {
      return []
    }
    return availabilityRooms
  })()

  const showBaselineEmpty = !hasDateRange && (!rooms || rooms.length === 0)
  const showNoRoomsForSelectedDates =
    hasDateRange &&
    !(travelerType === 'FAMILY' && !familyTravellers) &&
    !isLoadingAvailability &&
    !availabilityError &&
    availabilityRooms.length === 0

  const formatDateRange = () => {
    if (!startDate && !endDate) return 'Selecione as datas'
    if (startDate && !endDate) return format(startDate, 'dd/MM/yyyy', { locale: ptBR })
    if (startDate && endDate) {
      return `${format(startDate, 'dd/MM/yyyy', { locale: ptBR })} - ${format(endDate, 'dd/MM/yyyy', { locale: ptBR })}`
    }
    return 'Selecione as datas'
  }

  const handleCoupleClick = () => {
    setTravelerType('COUPLE')
    setFamilyTravellers(null)
    setFamilyModalOpen(false)
  }

  const handleFamilyClick = () => {
    if (travelerType !== 'FAMILY') {
      setTravelerType('FAMILY')
    }
    setFamilyModalOpen(true)
  }

  const handleFamilyModalConfirm = (next: FamilyTravellers) => {
    setFamilyTravellers(next)
    setFamilyModalOpen(false)
  }

  const handleFamilyModalCancel = () => {
    setFamilyModalOpen(false)
    if (familyTravellers === null) {
      setTravelerType('COUPLE')
    }
  }

  return (
    <>
      <section
        id="accommodation-rooms"
        className="bg-white py-8 scroll-mt-6 md:scroll-mt-8"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Os quartos</h2>
              {!hasDateRange && (rooms?.length ?? 0) > 0 && (
                <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                  Confira as opções abaixo. Ao selecionar as datas da estadia, mostramos preços e
                  disponibilidade retornados em tempo real.
                </p>
              )}
              {hasDateRange && (
                <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                  Preços e informações dos quartos refletem a disponibilidade para o período
                  selecionado.
                </p>
              )}
            </div>
            {/* Date Range Selector */}
            <div className="mb-8" ref={dateRangeRef}>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
                Selecione as datas da sua jornada para verificar a disponibilidade
              </label>
              <div className="relative inline-block w-full max-w-md">
                <input
                  type="text"
                  id="dateRange"
                  value={formatDateRange()}
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  readOnly
                  placeholder="Selecione as datas"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-baloo cursor-pointer bg-white"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                {isCalendarOpen && (
                  <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 left-0">
                    <DateRangeSelector
                      startDate={startDate}
                      endDate={endDate}
                      onDateRangeChange={handleDateRangeChange}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Traveler type & filters (availability) */}
            <div className="mb-8 space-y-5">
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de viagem
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCoupleClick}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors border-2 ${
                      travelerType === 'COUPLE'
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Casal
                  </button>
                  <button
                    type="button"
                    onClick={handleFamilyClick}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors border-2 ${
                      travelerType === 'FAMILY'
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Família
                  </button>
                </div>
                {travelerType === 'FAMILY' && familyTravellers && (
                  <p className="text-sm text-gray-600 mt-2">
                    {familyTravellers.adults} adulto(s)
                    {familyTravellers.children > 0 &&
                      `, ${familyTravellers.children} criança(s)`}
                    .{' '}
                    <button
                      type="button"
                      onClick={() => setFamilyModalOpen(true)}
                      className="text-primary-600 font-medium hover:underline"
                    >
                      Editar composição
                    </button>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={hasFreeCancellation}
                  onClick={() => setHasFreeCancellation((v) => !v)}
                  className={`flex items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 text-left max-w-md w-full sm:w-auto sm:min-w-[220px] ${
                    hasFreeCancellation
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-800">
                    Cancelamento grátis
                  </span>
                  <span
                    className={`h-6 w-11 shrink-0 rounded-full relative transition-colors ${
                      hasFreeCancellation ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        hasFreeCancellation ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </span>
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includesBreakfast}
                  onClick={() => setIncludesBreakfast((v) => !v)}
                  className={`flex items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 text-left max-w-md w-full sm:w-auto sm:min-w-[220px] ${
                    includesBreakfast
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-800">
                    Café da manhã incluído
                  </span>
                  <span
                    className={`h-6 w-11 shrink-0 rounded-full relative transition-colors ${
                      includesBreakfast ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        includesBreakfast ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            {hasDateRange && travelerType === 'FAMILY' && !familyTravellers && (
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Escolha quantas pessoas viajam para buscarmos quartos e preços adequados. Use o botão{' '}
                <strong>Família</strong> e confirme no modal.
              </div>
            )}

            {/* Loading State */}
            {isLoadingAvailability && startDate && endDate && (
              <div className="text-center py-8">
                <p className="text-gray-600">Verificando disponibilidade...</p>
              </div>
            )}

            {/* Error State */}
            {availabilityError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{availabilityError}</p>
              </div>
            )}

            {/* Rooms Grid */}
            {displayRooms.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {displayRooms.map((room) => {
                  const roomImageUrls = room.images.map(
                    (image: PublicAccommodationImage) => image.url
                  )
                  const displayedAmenities = room.amenities?.slice(0, 3) || []
                  const remainingAmenitiesCount =
                    (room.amenities?.length || 0) - displayedAmenities.length
                  const isAvailabilityRoom = 'price' in room
                  const availabilityRoom = isAvailabilityRoom
                    ? (room as PublicAccommodationRoomAvailability)
                    : null

                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                      {roomImageUrls.length > 0 && (
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={roomImageUrls[0]}
                            alt={room.title}
                            fill
                            className="object-cover"
                          />
                          {roomImageUrls.length > 1 && (
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                              +{roomImageUrls.length - 1} fotos
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">
                          {room.title}
                        </h3>
                        {room.subtitle && (
                          <div
                            className="prose prose-lg max-w-none text-gray-600 mb-4 min-w-0 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: room.subtitle }}
                          />
                        )}

                        {availabilityRoom && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <RoomAvailabilityPrice room={availabilityRoom} size="card" />
                            {availabilityRoom.taxes &&
                              availabilityRoom.taxes.length > 0 && (
                                <p className="text-xs text-gray-500 mt-2">
                                  +{' '}
                                  {availabilityRoom.taxes
                                    .map((tax) => tax.description)
                                    .join(', ')}
                                </p>
                              )}
                          </div>
                        )}

                        {displayedAmenities.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                              Comodidades do quarto
                            </h4>
                            <div className="space-y-2">
                              {displayedAmenities.map((amenity, index) => {
                                const amenityIconPath = getAmenityIconPath(
                                  amenity.icon
                                )

                                return (
                                  <div
                                    key={index}
                                    className={`flex items-center ${amenityIconPath ? 'gap-2' : ''}`}
                                  >
                                    {amenityIconPath ? (
                                      <div className="w-5 h-5 flex-shrink-0 text-primary-600">
                                        <Image
                                          src={amenityIconPath}
                                          alt={amenity.title}
                                          width={20}
                                          height={20}
                                          className="w-full h-full"
                                        />
                                      </div>
                                    ) : null}
                                    <span className="text-gray-700 text-sm">
                                      {amenity.title}
                                    </span>
                                  </div>
                                )
                              })}
                              {remainingAmenitiesCount > 0 && (
                                <p className="text-sm text-primary-600 font-medium mt-2">
                                  +{remainingAmenitiesCount} comodidades
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {showBaselineEmpty && (
              <p className="text-gray-600 text-center py-8">
                Nenhum quarto disponível no momento.
              </p>
            )}

            {showNoRoomsForSelectedDates && (
              <p className="text-gray-600 text-center py-8">
                Nenhum quarto disponível para as datas selecionadas. Tente outro período.
              </p>
            )}
          </div>
        </div>
      </section>

      {selectedRoom && (
        <AccommodationRoomDetailModal
          room={selectedRoom}
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      <FamilyTravelersModal
        isOpen={familyModalOpen}
        initial={familyTravellers ?? undefined}
        onConfirm={handleFamilyModalConfirm}
        onCancel={handleFamilyModalCancel}
      />
    </>
  )
}
