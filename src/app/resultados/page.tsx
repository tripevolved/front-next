'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ContactExpertModal from '@/components/ContactExpertModal'

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: 'Bali, Indonésia',
    image: '/assets/destinations/bali.jpg',
    description: 'Um paraíso tropical com praias deslumbrantes, templos antigos e uma rica cultura.',
    aspects: [
      {
        title: 'Cultura',
        description: 'Templos budistas e hinduístas, cerimônias tradicionais e artesanato local.',
        icon: '🏛️'
      },
      {
        title: 'Natureza',
        description: 'Praias paradisíacas, arrozais em terraços e vulcões ativos.',
        icon: '🌴'
      },
      {
        title: 'Gastronomia',
        description: 'Culinária local rica em especiarias, frutos do mar frescos e café de alta qualidade.',
        icon: '🍜'
      }
    ],
    price: 'A partir de R$ 5.990'
  },
  {
    id: 2,
    name: 'Santorini, Grécia',
    image: '/assets/destinations/santorini.jpg',
    description: 'Ilha grega famosa por suas casas brancas com telhados azuis e vistas deslumbrantes do Mediterrâneo.',
    aspects: [
      {
        title: 'Paisagem',
        description: 'Casas brancas com telhados azuis, vistas panorâmicas do mar e pôr do sol deslumbrante.',
        icon: '🏠'
      },
      {
        title: 'História',
        description: 'Ruínas antigas, museus arqueológicos e sítios históricos da civilização minoica.',
        icon: '🏺'
      },
      {
        title: 'Gastronomia',
        description: 'Vinhos locais, azeite de oliva, queijos e pratos tradicionais da culinária mediterrânea.',
        icon: '🍷'
      }
    ],
    price: 'A partir de R$ 7.290'
  },
  {
    id: 3,
    name: 'Tóquio, Japão',
    image: '/assets/destinations/tokyo.jpg',
    description: 'Uma metrópole futurista que combina tecnologia de ponta com tradições milenares.',
    aspects: [
      {
        title: 'Tecnologia',
        description: 'Distritos eletrônicos, robôs, realidade virtual e inovações tecnológicas de ponta.',
        icon: '🤖'
      },
      {
        title: 'Tradição',
        description: 'Templos budistas, jardins zen, cerimônia do chá e festivais tradicionais.',
        icon: '⛩️'
      },
      {
        title: 'Gastronomia',
        description: 'Sushi de alta qualidade, ramen, tempura e uma variedade de pratos locais.',
        icon: '🍱'
      }
    ],
    price: 'A partir de R$ 8.990'
  }
]

export default function ResultsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null)

  const handleContactExpert = (destinationId: number) => {
    setSelectedDestination(destinationId)
    setIsContactModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
            Destinos Perfeitos para Você
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Com base nas suas preferências, selecionamos estes destinos incríveis que combinam com o seu perfil de viagem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-2">
                  {destination.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {destination.description}
                </p>
                
                <div className="space-y-4 mb-6">
                  {destination.aspects.map((aspect, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-2xl mr-3">{aspect.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-900">{aspect.title}</h3>
                        <p className="text-sm text-gray-600">{aspect.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-primary-600 font-bold mb-4">
                  {destination.price}
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Link 
                    href={`/destinos/${destination.id}`}
                    className="w-full bg-primary-600 text-white text-center py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Planejar minha viagem
                  </Link>
                  <button
                    onClick={() => handleContactExpert(destination.id)}
                    className="w-full bg-white text-primary-600 border border-primary-600 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                  >
                    Falar com especialista
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Não encontrou o destino ideal? Nossos especialistas podem ajudar a encontrar a viagem perfeita para você.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-secondary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary-700 transition-colors"
          >
            Falar com especialista
          </button>
        </div>
      </div>
      
      <ContactExpertModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        phoneNumber="5511999999999"
      />
    </div>
  )
} 