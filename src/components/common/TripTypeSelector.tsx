'use client'

import { TravelerType } from '@/core/types/trip'

interface TripTypeOption {
  id: TravelerType
  name: string
  icon: string
  available: boolean
}

interface TripTypeSelectorProps {
  selectedType: TravelerType | string
  onTypeSelect: (type: TravelerType) => void
  types?: TripTypeOption[]
  className?: string
}

const DEFAULT_TYPES: TripTypeOption[] = [
  { id: TravelerType.COUPLE, name: 'Casal', icon: '❤️', available: true },
  { id: TravelerType.INDIVIDUAL, name: 'Sozinho(a)', icon: '👤', available: true },
  { id: TravelerType.FRIENDS, name: 'Amigos', icon: '👥', available: true },
  { id: TravelerType.FAMILY, name: 'Família', icon: '👨‍👩‍👧‍👦', available: true },
]

export default function TripTypeSelector({ 
  selectedType, 
  onTypeSelect, 
  types = DEFAULT_TYPES,
  className = '' 
}: TripTypeSelectorProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {types.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => t.available && onTypeSelect(t.id)}
          disabled={!t.available}
          className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 relative ${
            selectedType === t.id
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-300 hover:border-primary-300'
          } ${!t.available && 'opacity-50 cursor-not-allowed'}`}
        >
          <span className="text-2xl">{t.icon}</span>
          <span>{t.name}</span>
          {!t.available && (
            <span className="absolute top-2 right-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              Em breve
            </span>
          )}
        </button>
      ))}
    </div>
  )
} 