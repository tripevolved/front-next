'use client'

import Image from 'next/image'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import Button from '@/components/common/Button'

export default function CruzeirosExtraordinariosPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const cruiseDestinations = [
    'Mediterrâneo',
    'Caribe',
    'Alasca',
    'Norte da Europa',
    'Amazônia',
    'Antártida'
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/cruzeiros-extraordinarios.jpg"
            alt="Cruzeiros extraordinários com a Trip Evolved"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
              Cruzeiros extraordinários. Experiências únicas no mar.
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Descubra destinos incríveis a bordo dos melhores navios, com experiências exclusivas e roteiros personalizados.
            </p>
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Cruzeiros Extraordinários'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      {/* O que oferecemos Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
            O que oferecemos em <span className="text-accent-500">cruzeiros</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-secondary-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Navios Exclusivos
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Selecionamos as melhores embarcações com cabines de luxo, restaurantes gourmet e espaços exclusivos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-secondary-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Roteiros Únicos
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Itinerários personalizados que incluem portos exclusivos, excursões especiais e experiências locais autênticas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-secondary-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Experiências Premium
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Acesso VIP, jantares especiais, eventos exclusivos e serviços de concierge durante toda a viagem.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'O que oferecemos Section - Cruzeiros Extraordinários'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      {/* Destinos Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-white text-center">
            Destinos de <span className="text-accent-500">cruzeiro</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cruiseDestinations.map((destination) => (
              <div key={destination} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition-all">
                <h3 className="font-baloo text-lg font-bold text-white mb-2">
                  {destination}
                </h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Destinos Section - Cruzeiros Extraordinários'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Vamos embarcar em uma <span className="text-accent-500">aventura extraordinária?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e descubra os melhores cruzeiros para sua próxima aventura.
          </p>
          <Button
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Cruzeiros Extraordinários'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Começar minha jornada
          </Button>
        </div>
      </section>

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={cruiseDestinations}
        source="Cruzeiros Extraordinários"
      />
    </div>
  )
} 