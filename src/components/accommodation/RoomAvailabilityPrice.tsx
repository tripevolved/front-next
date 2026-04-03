'use client'

import { PublicAccommodationRoomAvailability } from '@/core/types/accommodations'

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency || 'BRL'
  }).format(amount)
}

interface RoomAvailabilityPriceProps {
  room: PublicAccommodationRoomAvailability
  size?: 'card' | 'modal'
}

export function RoomAvailabilityPrice({
  room,
  size = 'card'
}: RoomAvailabilityPriceProps) {
  const currency = room.currency || 'BRL'
  const showOriginal =
    room.originalPrice != null && room.originalPrice > room.price

  const priceClass = size === 'modal' ? 'text-4xl' : 'text-3xl'
  const originalClass = size === 'modal' ? 'text-2xl' : 'text-xl'

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      {showOriginal && (
        <span className={`${originalClass} font-medium text-gray-400 line-through`}>
          {formatCurrency(room.originalPrice!, currency)}
        </span>
      )}
      <span className={`${priceClass} font-bold text-primary-600`}>
        {formatCurrency(room.price, currency)}
      </span>
      <span className={size === 'modal' ? 'text-lg text-gray-600' : 'text-sm text-gray-600'}>
        por noite
      </span>
    </div>
  )
}
