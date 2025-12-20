'use client'

import { useState, useEffect, useRef } from 'react'
import { PublicStayRoom, PublicStayImage, PublicStayRoomAvailability } from '@/core/types/stay'
import { StayRoomDetailModal } from './StayRoomDetailModal'
import { StaysApiClient } from '@/clients/stays'
import DateRangeSelector from '@/components/common/DateRangeSelector'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface StayRoomsSectionProps {
  rooms?: PublicStayRoom[]
  uniqueName: string
}

// Helper function to get amenity icon path
const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/amenities/${iconName}.svg`
}

export function StayRoomsSection({ rooms, uniqueName }: StayRoomsSectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<PublicStayRoom | PublicStayRoomAvailability | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [availabilityRooms, setAvailabilityRooms] = useState<PublicStayRoomAvailability[]>([])
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)
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

  // Fetch availability when both dates are selected
  useEffect(() => {
    const fetchAvailability = async () => {
      if (startDate && endDate && uniqueName) {
        setIsLoadingAvailability(true)
        setAvailabilityError(null)
        try {
          const availability = await StaysApiClient.getStayAvailability(
            uniqueName,
            startDate,
            endDate
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
      } else {
        // Reset availability when dates are cleared
        setAvailabilityRooms([])
        setTransactionId(null)
      }
    }

    fetchAvailability()
  }, [startDate, endDate, uniqueName])

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setStartDate(update[0])
    setEndDate(update[1])
    // Close calendar when both dates are selected
    if (update[0] && update[1]) {
      setIsCalendarOpen(false)
    }
  }

  // Use availability rooms if available, otherwise use initial rooms
  const displayRooms: (PublicStayRoom | PublicStayRoomAvailability)[] = 
    availabilityRooms.length > 0 ? availabilityRooms : (rooms || [])

  const formatDateRange = () => {
    if (!startDate && !endDate) return 'Selecione as datas'
    if (startDate && !endDate) return format(startDate, 'dd/MM/yyyy', { locale: ptBR })
    if (startDate && endDate) {
      return `${format(startDate, 'dd/MM/yyyy', { locale: ptBR })} - ${format(endDate, 'dd/MM/yyyy', { locale: ptBR })}`
    }
    return 'Selecione as datas'
  }

  return (
    <>
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            Os quartos
          </h2>
          <div className="max-w-7xl mx-auto">
            {/* Date Range Selector */}
            <div className="mb-8" ref={dateRangeRef}>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-2">
                Selecione as datas da sua jornada para verificar a disponibilidade
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="dateRange"
                  value={formatDateRange()}
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  readOnly
                  placeholder="Selecione as datas"
                  className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-baloo cursor-pointer bg-white"
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
                  <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
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
                  const roomImageUrls = room.images.map((image: PublicStayImage) => image.url)
                  const displayedAmenities = room.amenities?.slice(0, 3) || []
                  const remainingAmenitiesCount = (room.amenities?.length || 0) - displayedAmenities.length
                  const isAvailabilityRoom = 'price' in room
                  const availabilityRoom = isAvailabilityRoom ? room as PublicStayRoomAvailability : null
                  
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                      {/* Room Image - Only first one */}
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
                      
                      {/* Room Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">
                          {room.title}
                        </h3>
                        {room.subtitle && (
                          <p className="text-lg text-gray-600 mb-4">
                            {room.subtitle}
                          </p>
                        )}

                        {/* Price - Only show if availability data is loaded */}
                        {availabilityRoom && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-primary-600">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: availabilityRoom.currency || 'BRL'
                                }).format(availabilityRoom.price)}
                              </span>
                              <span className="text-sm text-gray-600">por noite</span>
                            </div>
                            {availabilityRoom.taxes && availabilityRoom.taxes.length > 0 && (
                              <p className="text-xs text-gray-500 mt-1">
                                + {availabilityRoom.taxes.map((tax) => tax.description).join(', ')}
                              </p>
                            )}
                          </div>
                        )}
                        
                        {/* Room Amenities - Max 3 */}
                        {displayedAmenities.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                              Comodidades do quarto
                            </h4>
                            <div className="space-y-2">
                              {displayedAmenities.map((amenity, index) => {
                                const amenityIconPath = getAmenityIconPath(amenity.icon)
                                
                                return (
                                  <div key={index} className={`flex items-center ${amenityIconPath ? 'gap-2' : ''}`}>
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
                                    <span className="text-gray-700 text-sm">{amenity.title}</span>
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

            {/* No rooms message */}
            {!isLoadingAvailability && !availabilityError && displayRooms.length === 0 && rooms && rooms.length === 0 && (
              <p className="text-gray-600 text-center py-8">
                Nenhum quarto disponível no momento.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Room Modal */}
      {selectedRoom && (
        <StayRoomDetailModal
          room={selectedRoom}
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </>
  )
}

