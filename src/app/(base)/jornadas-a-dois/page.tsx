'use client'

import Image from 'next/image'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import Button from '@/components/common/Button'

export default function JornadasADoisPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const coupleDestinations = [
    'Maldivas',
    'Aruba',
    'Bahamas',
    'Dolomitas, Itália',
    'Torres del Paine, Chile',
    'Anguilla',
    'Santorini, Grécia',
    'Bali, Indonésia'
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/hero-praia.jpg"
            alt="Jornadas a dois com a Trip Evolved"
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
              Jornadas a dois. Momentos únicos para casais.
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Viagens românticas e experiências exclusivas criadas especialmente para casais que buscam momentos especiais juntos.
            </p>
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Jornadas a Dois'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* O que oferecemos Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
            O que oferecemos para <span className="text-accent-500">casais</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-secondary-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Experiências Românticas
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Jantares à beira-mar, spas privativos, passeios de barco ao pôr do sol e momentos únicos criados especialmente para vocês.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-secondary-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Hospedagens Exclusivas
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Resorts de luxo, bangalôs sobre as águas, hotéis boutique e acomodações que fazem cada momento ser especial.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-secondary-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Tempo de Qualidade
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Roteiros que priorizam momentos a dois, sem pressões ou compromissos, para que vocês possam se reconectar.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'O que oferecemos Section - Jornadas a Dois'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Destinos Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-white text-center">
            Destinos perfeitos para <span className="text-accent-500">casais</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {coupleDestinations.map((destination) => (
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
                source: 'Destinos Section - Jornadas a Dois'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Vamos criar sua <span className="text-accent-500">jornada a dois?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e comece a planejar a viagem romântica dos seus sonhos.
          </p>
          <Button
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Jornadas a Dois'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com especialista
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Jornadas a Dois" />

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={coupleDestinations}
        source="Jornadas a Dois"
      />
    </div>
  )
} 