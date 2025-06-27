'use client'

interface TripType {
  id: string
  name: string
  icon: string
  available: boolean
}

interface TripTypeSelectorProps {
  selectedType: string
  onTypeSelect: (type: string) => void
  types?: TripType[]
  className?: string
}

export default function TripTypeSelector({ 
  selectedType, 
  onTypeSelect, 
  types = [
    { id: 'casal', name: 'Casal', icon: '❤️', available: true },
    { id: 'individual', name: 'Individual', icon: '👤', available: true },
    { id: 'familia', name: 'Família', icon: '👨‍👩‍👧‍👦', available: false },
    { id: 'amigos', name: 'Amigos', icon: '👥', available: false }
  ],
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