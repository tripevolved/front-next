'use client'

import { useState } from 'react'
import {
  PublicAccommodationRoom,
  PublicAccommodationRoomAvailability,
  PublicAccommodationImage
} from '@/core/types/accommodations'
import { ImageGrid } from '@/components/common/ImageGrid'
import { RoomAvailabilityPrice } from '@/components/accommodation/RoomAvailabilityPrice'
import Image from 'next/image'

const PROSE_CONTAINED =
  'prose prose-lg max-w-none text-gray-700 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full'

interface AccommodationRoomDetailModalProps {
  room: PublicAccommodationRoom | PublicAccommodationRoomAvailability
  isOpen: boolean
  onClose: () => void
}

const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/amenities/${iconName}.svg`
}

export function AccommodationRoomDetailModal({
  room,
  isOpen,
  onClose
}: AccommodationRoomDetailModalProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  if (!isOpen) return null

  const roomImageUrls = room.images.map((image: PublicAccommodationImage) => image.url)
  const isAvailabilityRoom = 'price' in room
  const availabilityRoom = isAvailabilityRoom
    ? (room as PublicAccommodationRoomAvailability)
    : null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] my-8 relative flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {roomImageUrls.length > 0 && (
            <div className="w-full">
              <ImageGrid
                images={roomImageUrls}
                title={room.title}
                edgeToEdge
              />
            </div>
          )}

          <div className="px-8 pb-8 pt-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">{room.title}</h2>
          {room.subtitle && (
            <div className="min-w-0 mb-6">
              <div
                className={`${PROSE_CONTAINED} text-gray-600 ${isDescriptionExpanded ? '' : 'max-h-[28vh] overflow-hidden'}`}
                dangerouslySetInnerHTML={{ __html: room.subtitle }}
              />
              <button
                type="button"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
              </button>
            </div>
          )}

          {availabilityRoom && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <div className="mb-4">
                  <RoomAvailabilityPrice room={availabilityRoom} size="modal" />
                </div>
                {availabilityRoom.taxes && availabilityRoom.taxes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Taxas adicionais:
                    </p>
                    <ul className="space-y-1">
                      {availabilityRoom.taxes.map((tax, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex justify-between"
                        >
                          <span>{tax.description}</span>
                          <span className="font-medium">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: availabilityRoom.currency || 'BRL'
                            }).format(tax.amount)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {availabilityRoom.cancellationPolicy && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Política de Cancelamento
                  </h4>
                  <p className="text-sm text-gray-600">
                    {availabilityRoom.cancellationPolicy}
                  </p>
                </div>
              )}
            </div>
          )}

          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Comodidades do quarto
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {room.amenities.map((amenity, index) => {
                  const amenityIconPath = getAmenityIconPath(amenity.icon)

                  return (
                    <div
                      key={index}
                      className={`flex items-center bg-gray-50 border border-gray-100 px-2 py-1.5 rounded-md ${amenityIconPath ? 'gap-2' : ''}`}
                    >
                      {amenityIconPath ? (
                        <div className="w-4 h-4 flex-shrink-0 text-primary-600">
                          <Image
                            src={amenityIconPath}
                            alt={amenity.title}
                            width={16}
                            height={16}
                            className="w-full h-full"
                          />
                        </div>
                      ) : null}
                      <span className="text-gray-700 text-xs leading-snug line-clamp-2">
                        {amenity.title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
