import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type TripType = 'romantico' | 'aventura' | 'cultura' | 'gastronomico' | 'natureza' | 'cidade'
type TripGoal = 'descanso' | 'aventura' | 'cultura' | 'gastronomia' | 'compras' | 'natureza'
type Profile = 'aventureiro' | 'cultural' | 'gastronomico' | 'romantico' | 'natureza' | 'cidade'
type TravelStyle = 'praia' | 'serra' | 'montanha' | 'neve' | 'cultura' | 'historia' | 'gastronomia' | 'compras' | 'aventura' | 'cidade' | 'agito'
type GastronomicExperience = 'premiados' | 'local' | 'mercados' | 'alta'
type DietaryRestriction = 'vegetariano' | 'vegano' | 'sem_gluten' | 'sem_lactose' | 'outra'

interface WizardProps {
  isOpen: boolean
  onClose: () => void
}

export default function DestinoPerfeitoWizard({ isOpen, onClose }: WizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    tripType: null as TripType | null,
    tripGoals: [] as TripGoal[],
    profile: null as Profile | null,
    lastTrip: {
      destination: '',
      accommodation: '',
      experience: ''
    },
    desiredTrip: {
      destination: '',
      styles: [] as TravelStyle[]
    },
    gastronomicPreferences: {
      experience: null as GastronomicExperience | null,
      restrictions: [] as DietaryRestriction[],
      otherRestriction: ''
    },
    companions: ''
  })

  const handleNext = () => {
    if (currentStep === 8) {
      // Create trip in backend and proceed to payment
      handleCreateTrip()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleCreateTrip = async () => {
    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'destino_perfeito',
          status: 'pending_payment'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create trip')
      }

      const data = await response.json()
      router.push(`/payment?tripId=${data.id}&amount=19700`)
    } catch (error) {
      console.error('Error creating trip:', error)
      // Handle error appropriately
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Como funciona o processo
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Vamos te fazer algumas perguntas para entender seu perfil e objetivo de viagem. Elas vão nos ajudar a entender com profundidade o que vocês preferem, para que possamos recomendar os destinos com o máximo de assertividade possível. Esse processo deve levar entre 5 e 10 minutos e deve ser feito com calma.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Depois, você vai realizar o pagamento do seu guia personalizado de destinos: R$197,00. Antes do pagamento, vamos te perguntar quem vai viajar com você. Essa pergunta é opcional, caso você prefira manter sua privacidade, mas muito importante porque nos ajuda a conversar com vocês da forma que preferimos: com um toque pessoal.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Após o pagamento, você recebe seu guia em até 24h e nossos especialistas vão entrar em contato para marcar o sua sessão de orientação.
                </p>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Quando você pretende viajar?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-2">
                  Data de início
                </label>
                <input
                  type="date"
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  value={formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    startDate: e.target.value ? new Date(e.target.value) : null
                  }))}
                />
              </div>
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-2">
                  Data de fim
                </label>
                <input
                  type="date"
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  value={formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    endDate: e.target.value ? new Date(e.target.value) : null
                  }))}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Qual o tipo de viagem você está planejando?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: 'romantico', label: 'Romântico' },
                { value: 'aventura', label: 'Aventura' },
                { value: 'cultura', label: 'Cultura' },
                { value: 'gastronomico', label: 'Gastronômico' },
                { value: 'natureza', label: 'Natureza' },
                { value: 'cidade', label: 'Cidade' }
              ].map((type) => (
                <button
                  key={type.value}
                  className={`p-4 rounded-lg border-2 text-center font-comfortaa text-lg transition-all ${
                    formData.tripType === type.value
                      ? 'border-accent-500 bg-accent-50 text-accent-500'
                      : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, tripType: type.value as TripType }))}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Quais são seus objetivos para essa viagem?
            </h3>
            <p className="text-secondary-600 font-comfortaa text-lg mb-4">
              Selecione até 3 objetivos principais
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: 'descanso', label: 'Descanso' },
                { value: 'aventura', label: 'Aventura' },
                { value: 'cultura', label: 'Cultura' },
                { value: 'gastronomia', label: 'Gastronomia' },
                { value: 'compras', label: 'Compras' },
                { value: 'natureza', label: 'Natureza' }
              ].map((goal) => (
                <button
                  key={goal.value}
                  className={`p-4 rounded-lg border-2 text-center font-comfortaa text-lg transition-all ${
                    formData.tripGoals.includes(goal.value as TripGoal)
                      ? 'border-accent-500 bg-accent-50 text-accent-500'
                      : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                  }`}
                  onClick={() => {
                    const newGoals = formData.tripGoals.includes(goal.value as TripGoal)
                      ? formData.tripGoals.filter(g => g !== goal.value)
                      : formData.tripGoals.length < 3
                        ? [...formData.tripGoals, goal.value as TripGoal]
                        : formData.tripGoals
                    setFormData(prev => ({ ...prev, tripGoals: newGoals }))
                  }}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Qual perfil melhor descreve você?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: 'aventureiro', label: 'Aventureiro' },
                { value: 'cultural', label: 'Cultural' },
                { value: 'gastronomico', label: 'Gastronômico' },
                { value: 'romantico', label: 'Romântico' },
                { value: 'natureza', label: 'Natureza' },
                { value: 'cidade', label: 'Cidade' }
              ].map((profile) => (
                <button
                  key={profile.value}
                  className={`p-4 rounded-lg border-2 text-center font-comfortaa text-lg transition-all ${
                    formData.profile === profile.value
                      ? 'border-accent-500 bg-accent-50 text-accent-500'
                      : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, profile: profile.value as Profile }))}
                >
                  {profile.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Conte-nos sobre sua última viagem
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-2">
                  Para onde foi?
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  value={formData.lastTrip.destination}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    lastTrip: { ...prev.lastTrip, destination: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-2">
                  Onde se hospedaram?
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  value={formData.lastTrip.accommodation}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    lastTrip: { ...prev.lastTrip, accommodation: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-2">
                  Qual foi a experiência mais marcante, positiva ou negativa?
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  rows={4}
                  value={formData.lastTrip.experience}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    lastTrip: { ...prev.lastTrip, experience: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Sobre o destino desejado
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-2">
                  Você tem algum destino em mente?
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  value={formData.desiredTrip.destination}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    desiredTrip: { ...prev.desiredTrip, destination: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-2">
                  Qual o estilo de viagem você deseja? (Selecione até 3)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { value: 'praia', label: 'Praia' },
                    { value: 'serra', label: 'Serra' },
                    { value: 'montanha', label: 'Montanha' },
                    { value: 'neve', label: 'Neve' },
                    { value: 'cultura', label: 'Cultura' },
                    { value: 'historia', label: 'História' },
                    { value: 'gastronomia', label: 'Gastronomia' },
                    { value: 'compras', label: 'Compras' },
                    { value: 'aventura', label: 'Aventura' },
                    { value: 'cidade', label: 'Cidade' },
                    { value: 'agito', label: 'Agito' }
                  ].map((style) => (
                    <button
                      key={style.value}
                      className={`p-4 rounded-lg border-2 text-center font-comfortaa text-lg transition-all ${
                        formData.desiredTrip.styles.includes(style.value as TravelStyle)
                          ? 'border-accent-500 bg-accent-50 text-accent-500'
                          : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                      }`}
                      onClick={() => {
                        const newStyles = formData.desiredTrip.styles.includes(style.value as TravelStyle)
                          ? formData.desiredTrip.styles.filter(s => s !== style.value)
                          : formData.desiredTrip.styles.length < 3
                            ? [...formData.desiredTrip.styles, style.value as TravelStyle]
                            : formData.desiredTrip.styles
                        setFormData(prev => ({
                          ...prev,
                          desiredTrip: { ...prev.desiredTrip, styles: newStyles }
                        }))
                      }}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Estamos quase lá! Qual tipo de experiência gastronômica você deseja nessa viagem?
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'premiados', label: 'Restaurantes Premiados' },
                  { value: 'local', label: 'Comida local autêntica' },
                  { value: 'mercados', label: 'Mercados de rua' },
                  { value: 'alta', label: 'Alta gastronomia' }
                ].map((exp) => (
                  <button
                    key={exp.value}
                    className={`p-4 rounded-lg border-2 text-center font-comfortaa text-lg transition-all ${
                      formData.gastronomicPreferences.experience === exp.value
                        ? 'border-accent-500 bg-accent-50 text-accent-500'
                        : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                    }`}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      gastronomicPreferences: {
                        ...prev.gastronomicPreferences,
                        experience: exp.value as GastronomicExperience
                      }
                    }))}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-secondary-600 font-comfortaa text-lg mb-4">
                  Vocês têm alguma restrição alimentar?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: 'vegetariano', label: 'Vegetariano' },
                    { value: 'vegano', label: 'Vegano' },
                    { value: 'sem_gluten', label: 'Sem glúten' },
                    { value: 'sem_lactose', label: 'Sem lactose' }
                  ].map((restriction) => (
                    <button
                      key={restriction.value}
                      className={`p-4 rounded-lg border-2 text-center font-comfortaa text-lg transition-all ${
                        formData.gastronomicPreferences.restrictions.includes(restriction.value as DietaryRestriction)
                          ? 'border-accent-500 bg-accent-50 text-accent-500'
                          : 'border-secondary-200 text-secondary-600 hover:border-accent-500'
                      }`}
                      onClick={() => {
                        const newRestrictions = formData.gastronomicPreferences.restrictions.includes(restriction.value as DietaryRestriction)
                          ? formData.gastronomicPreferences.restrictions.filter(r => r !== restriction.value)
                          : [...formData.gastronomicPreferences.restrictions, restriction.value as DietaryRestriction]
                        setFormData(prev => ({
                          ...prev,
                          gastronomicPreferences: {
                            ...prev.gastronomicPreferences,
                            restrictions: newRestrictions
                          }
                        }))
                      }}
                    >
                      {restriction.label}
                    </button>
                  ))}
                </div>
                {formData.gastronomicPreferences.restrictions.includes('outra') && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Qual restrição?"
                      className="w-full p-3 rounded-lg border border-secondary-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                      value={formData.gastronomicPreferences.otherRestriction}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        gastronomicPreferences: {
                          ...prev.gastronomicPreferences,
                          otherRestriction: e.target.value
                        }
                      }))}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
              Investimento no seu guia personalizado
            </h3>
            <div className="text-center space-y-4">
              <p className="text-secondary-600 font-comfortaa text-lg">
                De
              </p>
              <p className="text-secondary-400 font-baloo text-3xl line-through">
                R$ 499,00
              </p>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Por apenas
              </p>
              <p className="text-accent-500 font-baloo text-5xl font-bold">
                R$ 197,00
              </p>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Um investimento pequeno para uma grande descoberta
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              className="font-baloo bg-secondary-200 text-secondary-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-secondary-300 transition-all"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="font-baloo bg-accent-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all ml-auto"
          >
            {currentStep === 0 ? 'Começar' : currentStep === 8 ? 'Ir para pagamento' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  )
} 