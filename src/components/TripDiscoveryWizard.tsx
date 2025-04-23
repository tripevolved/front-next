'use client'

import { useState } from 'react'
import { LeadsApiService } from '@/clients/leads'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import DateRangePicker from './DateRangePicker'

// Types for the wizard
interface TripDates {
  startDate: string
  endDate: string
}

interface TripGoals {
  goals: string[]
}

interface TripProfile {
  profile: string
}

interface TripType {
  type: string
}

interface UserInfo {
  name: string
  email: string
  phone: string
}

// Step components
const StepDates = ({ onNext, onBack }: { onNext: (dates: TripDates) => void, onBack?: () => void }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (startDate && endDate) {
      onNext({
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd')
      })
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Quando você quer viajar?</h2>
      <p className="text-gray-600 mb-6">Selecione as datas da sua viagem para encontrarmos os melhores destinos para você.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          minDate={new Date()}
        />

        <div className="flex justify-between pt-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Voltar
            </button>
          )}
          <button
            type="submit"
            disabled={!startDate || !endDate}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

const StepGoals = ({ onNext, onBack }: { onNext: (goals: TripGoals) => void, onBack: () => void }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  
  const tripGoals = [
    'Aventura', 'Relax', 'Cultura', 'Gastronomia', 'Natureza', 'Praia', 'Montanha', 
    'Cidade', 'História', 'Arte', 'Música', 'Esporte', 'Luxo', 'Econômico', 
    'Romântico', 'Familiar', 'Solo', 'Grupo', 'Fotografia', 'Vida noturna'
  ]

  const handleGoalClick = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal))
    } else if (selectedGoals.length < 5) {
      setSelectedGoals([...selectedGoals, goal])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ goals: selectedGoals })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Defina sua viagem</h2>
      <p className="text-gray-600 mb-6">Selecione até 5 palavras que melhor definem a viagem dos seus sonhos.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {tripGoals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleGoalClick(goal)}
              disabled={!selectedGoals.includes(goal) && selectedGoals.length >= 5}
              className={`px-3 py-1.5 border rounded-full text-center text-sm transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                selectedGoals.includes(goal)
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={selectedGoals.length === 0}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

const StepProfile = ({ onNext, onBack }: { onNext: (profile: TripProfile) => void, onBack: () => void }) => {
  const [profile, setProfile] = useState('')

  const profiles = [
    { id: 'relax', name: 'Relax', icon: '🌴' },
    { id: 'alternativo', name: 'Alternativo', icon: '🎨' },
    { id: 'aventureiro', name: 'Aventureiro', icon: '🏃' },
    { id: 'gastronomico', name: 'Gastronômico', icon: '🍽️' },
    { id: 'garantido', name: 'Garantido', icon: '✅' },
    { id: 'intelectual', name: 'Intelectual', icon: '📚' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ profile })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Qual é o seu perfil de viajante?</h2>
      <p className="text-gray-600 mb-6">Escolha o perfil que melhor combina com seu estilo de viagem.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {profiles.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProfile(p.id)}
              className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 ${
                profile === p.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300'
              }`}
            >
              <span className="text-2xl">{p.icon}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!profile}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

const StepType = ({ onNext, onBack }: { onNext: (type: TripType) => void, onBack: () => void }) => {
  const [type, setType] = useState('')

  const types = [
    { id: 'casal', name: 'Casal', icon: '❤️', available: true },
    { id: 'individual', name: 'Individual', icon: '👤', available: true },
    { id: 'familia', name: 'Família', icon: '👨‍👩‍👧‍👦', available: false },
    { id: 'amigos', name: 'Amigos', icon: '👥', available: false }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ type })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Com quem você vai viajar?</h2>
      <p className="text-gray-600 mb-6">Selecione o tipo de viagem que melhor se adequa ao seu grupo.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {types.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => t.available && setType(t.id)}
              disabled={!t.available}
              className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 relative ${
                type === t.id
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

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!type}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

const StepUserInfo = ({ onNext, onBack }: { onNext: (userInfo: UserInfo) => void, onBack: () => void }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const maskPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '')
    
    // Apply mask based on length
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 7) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`
    } else if (numbers.length <= 11) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`
    } else {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskPhoneNumber(e.target.value)
    setPhone(maskedValue)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Add Brazilian country code (+55) to the phone number
      const phoneWithCountryCode = `+55${phone.replace(/\D/g, '')}`

      await LeadsApiService.createLead({
        name,
        email,
        phone: phoneWithCountryCode,
        metadata: [
          {
            key: 'trip_discovery',
            value: 'true',
            keyDescription: 'Trip Discovery'
          }
        ]
      })
      
      onNext({ name, email, phone })
    } catch (err) {
      console.error('Error creating lead:', err)
      setError('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Quase lá!</h2>
      <p className="text-gray-600 mb-6">Preencha seus dados para recebermos suas sugestões de destinos personalizadas.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Concluir'}
          </button>
        </div>
      </form>
    </div>
  )
}

// Main component
export default function TripDiscoveryWizard({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [tripDates, setTripDates] = useState<TripDates | null>(null)
  const [tripGoals, setTripGoals] = useState<TripGoals | null>(null)
  const [tripProfile, setTripProfile] = useState<TripProfile | null>(null)
  const [tripType, setTripType] = useState<TripType | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const handleDatesNext = (dates: TripDates) => {
    setTripDates(dates)
    setStep(2)
  }

  const handleGoalsNext = (goals: TripGoals) => {
    setTripGoals(goals)
    setStep(3)
  }

  const handleProfileNext = (profile: TripProfile) => {
    setTripProfile(profile)
    setStep(4)
  }

  const handleTypeNext = (type: TripType) => {
    setTripType(type)
    setStep(5)
  }

  const handleUserInfoNext = (info: UserInfo) => {
    setUserInfo(info)
    // Redirect to results page
    router.push('/resultados')
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200 rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

        {/* Step content */}
        {step === 1 && <StepDates onNext={handleDatesNext} />}
        {step === 2 && <StepGoals onNext={handleGoalsNext} onBack={handleBack} />}
        {step === 3 && <StepProfile onNext={handleProfileNext} onBack={handleBack} />}
        {step === 4 && <StepType onNext={handleTypeNext} onBack={handleBack} />}
        {step === 5 && <StepUserInfo onNext={handleUserInfoNext} onBack={handleBack} />}
      </div>
    </div>
  )
} 