'use client'

interface TripProfile {
  id: string
  name: string
  icon: string
}

interface TripProfileSelectorProps {
  selectedProfile: string
  onProfileSelect: (profile: string) => void
  profiles?: TripProfile[]
  className?: string
}

export default function TripProfileSelector({ 
  selectedProfile, 
  onProfileSelect, 
  profiles = [
    { id: 'relax', name: 'Relax', icon: '🌴' },
    { id: 'alternativo', name: 'Alternativo', icon: '🎨' },
    { id: 'aventureiro', name: 'Aventureiro', icon: '🏃' },
    { id: 'gastronomico', name: 'Gastronômico', icon: '🍽️' },
    { id: 'garantido', name: 'Garantido', icon: '✅' },
    { id: 'intelectual', name: 'Intelectual', icon: '📚' }
  ],
  className = '' 
}: TripProfileSelectorProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {profiles.map((profile) => (
        <button
          key={profile.id}
          type="button"
          onClick={() => onProfileSelect(profile.id)}
          className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 ${
            selectedProfile === profile.id
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-300 hover:border-primary-300'
          }`}
        >
          <span className="text-2xl">{profile.icon}</span>
          <span>{profile.name}</span>
        </button>
      ))}
    </div>
  )
} 