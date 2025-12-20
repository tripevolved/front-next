'use client'

import { PublicStayRoom, PublicStayRoomAvailability, PublicStayImage } from '@/core/types/stay'
import { ImageGrid } from '@/components/common/ImageGrid'
import Image from 'next/image'

interface StayRoomDetailModalProps {
  room: PublicStayRoom | PublicStayRoomAvailability
  isOpen: boolean
  onClose: () => void
}

// Helper function to get amenity icon path
const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/amenities/${iconName}.svg`
}

export function StayRoomDetailModal({ room, isOpen, onClose }: StayRoomDetailModalProps) {
  if (!isOpen) return null

  const roomImageUrls = room.images.map((image: PublicStayImage) => image.url)
  const isAvailabilityRoom = 'price' in room
  const availabilityRoom = isAvailabilityRoom ? room as PublicStayRoomAvailability : null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Room Images */}
        {roomImageUrls.length > 0 && (
          <div className="w-full">
            <ImageGrid
              images={roomImageUrls}
              title={room.title}
            />
          </div>
        )}

        {/* Room Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            {room.title}
          </h2>
          {room.subtitle && (
            <p className="text-xl text-gray-600 mb-6">
              {room.subtitle}
            </p>
          )}

          {/* Price and Cancellation Policy - Only show if availability data is loaded */}
          {availabilityRoom && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary-600">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: availabilityRoom.currency || 'BRL'
                    }).format(availabilityRoom.price)}
                  </span>
                  <span className="text-lg text-gray-600">por noite</span>
                </div>
                {availabilityRoom.taxes && availabilityRoom.taxes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Taxas adicionais:</p>
                    <ul className="space-y-1">
                      {availabilityRoom.taxes.map((tax, index) => (
                        <li key={index} className="text-sm text-gray-600 flex justify-between">
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
          
          {/* All Room Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Comodidades do quarto
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => {
                  const amenityIconPath = getAmenityIconPath(amenity.icon)
                  
                  return (
                    <div key={index} className={`flex items-center bg-gray-50 p-3 rounded-lg ${amenityIconPath ? 'gap-3' : ''}`}>
                      {amenityIconPath ? (
                        <div className="w-6 h-6 flex-shrink-0 text-primary-600">
                          <Image
                            src={amenityIconPath}
                            alt={amenity.title}
                            width={24}
                            height={24}
                            className="w-full h-full"
                          />
                        </div>
                      ) : null}
                      <span className="text-gray-700">{amenity.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

