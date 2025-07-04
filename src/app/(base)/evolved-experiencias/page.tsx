'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useWizard } from '@/contexts/WizardContext'
import Button from '@/components/common/Button'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQTripPlanningSection from '@/components/consultancy/FAQTripPlanningSection'
import { ScriptOutline } from '@/components/scripts/ScriptOutline'
import { Script } from '@/components/scripts/types'

export default function EvolvedExperienciasPage() {
  const { openWizard } = useWizard()

  // Sample script data for demonstration
  const sampleScript: Script = {
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    days: [
      {
        dayNumber: 1,
        isAvailable: true,
        dayActions: [
          {
            id: '1-1',
            image: '/assets/experiences/curacao/willemstad.jpg',
            title: 'Chegada em Willemstad',
            subtitle: 'Capital colorida de Curaçao',
            description: 'Bem-vindo à vibrante capital de Curaçao! Willemstad é conhecida por suas casas coloridas no estilo holandês e pela ponte flutuante Queen Emma Bridge. Comece sua jornada explorando o centro histórico, declarado Patrimônio Mundial da UNESCO.',
            time: '14:00 - 18:00',
            location: 'Willemstad, Curaçao',
            highlights: [
              'Ponte Queen Emma Bridge',
              'Casas coloridas do centro histórico',
              'Mercado flutuante',
              'Fotografias panorâmicas'
            ],
            gallery: [
              '/assets/experiences/curacao/willemstad.jpg',
              '/assets/experiences/curacao/queen-emma-bridge.jpg',
              '/assets/experiences/curacao/colorful-houses.jpg'
            ]
          },
          {
            id: '1-2',
            image: '/assets/experiences/curacao/sunset-dinner.jpg',
            title: 'Jantar ao Pôr do Sol',
            subtitle: 'Restaurante à beira-mar',
            description: 'Encerre seu primeiro dia com um jantar romântico em um dos melhores restaurantes à beira-mar de Curaçao. Saboreie pratos locais enquanto observa o pôr do sol sobre o mar do Caribe.',
            time: '19:00 - 21:00',
            location: 'Restaurante à beira-mar',
            highlights: [
              'Vista panorâmica do mar',
              'Culinária local autêntica',
              'Ambiente romântico',
              'Cocktails tropicais'
            ],
            gallery: [
              '/assets/experiences/curacao/sunset-dinner.jpg',
              '/assets/experiences/curacao/local-cuisine.jpg'
            ]
          }
        ]
      },
      {
        dayNumber: 2,
        isAvailable: true,
        dayActions: [
          {
            id: '2-1',
            image: '/assets/experiences/curacao/beach-morning.jpg',
            title: 'Manhã na Praia',
            subtitle: 'Praia de Cas Abou',
            description: 'Comece o dia relaxando em uma das praias mais bonitas de Curaçao. Cas Abou oferece águas cristalinas e areia branca, perfeitas para um mergulho matinal ou simplesmente relaxar ao som das ondas.',
            time: '08:00 - 12:00',
            location: 'Praia de Cas Abou',
            highlights: [
              'Águas cristalinas',
              'Areia branca',
              'Mergulho matinal',
              'Relaxamento total'
            ],
            gallery: [
              '/assets/experiences/curacao/beach-morning.jpg',
              '/assets/experiences/curacao/crystal-waters.jpg'
            ]
          },
          {
            id: '2-2',
            image: '/assets/experiences/curacao/snorkeling.jpg',
            title: 'Snorkeling na Barreira',
            subtitle: 'Exploração marinha',
            description: 'Explore a rica vida marinha de Curaçao com uma sessão de snorkeling na barreira de coral. Descubra peixes coloridos, corais vibrantes e talvez até algumas tartarugas marinhas.',
            time: '14:00 - 17:00',
            location: 'Barreira de Coral',
            highlights: [
              'Vida marinha colorida',
              'Corais vibrantes',
              'Possível encontro com tartarugas',
              'Equipamento incluído'
            ],
            gallery: [
              '/assets/experiences/curacao/snorkeling.jpg',
              '/assets/experiences/curacao/coral-reef.jpg'
            ]
          }
        ]
      },
      {
        dayNumber: 3,
        isAvailable: false,
        dayActions: []
      }
    ]
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/hero-praia.jpg"
            alt="Evolved Experiências - Cada dia, uma experiência única"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
              Evolved Experiências
            </h1>
            <p className="font-baloo text-xl md:text-2xl text-accent-300 mb-6">
              Cada dia, uma experiência única
            </p>
            <p className="font-comfortaa text-lg md:text-xl mb-8 text-white/90">
              Você quer transformar cada momento da viagem em algo extraordinário. Nossos especialistas mergulham no seu destino e criam um roteiro diário que vai muito além do óbvio. Cada manhã, tarde e noite será uma descoberta, uma surpresa, uma experiência que você nunca esquecerá.
            </p>
            <Button 
              onClick={openWizard}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Hero Section - Evolved Experiências'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Descobrir minha viagem
            </Button>
          </div>
        </div>
      </section>

      {/* O que está incluído Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
            O que está incluído nas <span className="text-accent-500">Evolved Experiências</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Roteiro Detalhado</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Cronograma completo dia a dia com horários e locais específicos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Experiências Únicas</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Momentos autênticos que vão além dos roteiros turísticos tradicionais.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Restaurantes Exclusivos</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Lugares especiais para saborear a culinária local autêntica.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Script Personalizado</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Roteiro criado especificamente para seu perfil e interesses.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Momentos Memoráveis</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Experiências que se transformam em histórias para contar.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Atrações Especiais</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Lugares e atividades que poucos turistas conhecem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Script Preview Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-secondary-900">
              Veja como seu <span className="text-accent-500">script personalizado</span> ficará
            </h2>
            <p className="text-secondary-600 font-comfortaa text-lg max-w-2xl mx-auto">
              Cada script é criado exclusivamente para você, com experiências únicas e momentos inesquecíveis
            </p>
          </div>
          <ScriptOutline 
            script={sampleScript}
            title="Exemplo de Script Personalizado"
            subtitle="Curaçao - 7 dias de experiências únicas"
            showModal={true}
          />
        </div>
      </section>

      {/* Por que escolher Section */}
      <section className="py-24 bg-accent-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
                Por que escolher as <span className="text-accent-300">Evolved Experiências</span>?
              </h2>
              <div className="space-y-6 text-white/90 font-comfortaa text-lg">
                <p>
                  As Evolved Experiências são para quem quer transformar cada momento da viagem em algo extraordinário. Nossos especialistas mergulham fundo no seu destino e criam um roteiro que vai muito além do óbvio.
                </p>
                <p>
                  Cada dia é cuidadosamente planejado para incluir experiências únicas, restaurantes autênticos e momentos que se transformam em histórias para contar. Não são apenas atividades - são memórias que você levará para sempre.
                </p>
                <p>
                  O script é personalizado para seu perfil, interesses e estilo de viagem, garantindo que cada experiência seja perfeita para você.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-accent-700 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-white to-white/10 rounded-xl opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Investimento Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Investimento nas <span className="text-accent-500">Evolved Experiências</span>
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            A taxa por dia de roteiro garante que cada momento da sua viagem seja uma experiência única e memorável, criada especialmente para você.
          </p>
          <div className="bg-secondary-50 p-8 rounded-2xl max-w-md mx-auto">
            <div className="text-accent-500 font-baloo font-semibold text-xl mb-2">
              Taxa por Dia de Roteiro
            </div>
            <p className="text-secondary-600 font-comfortaa">
              Valor por dia que inclui todas as experiências e recomendações
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQTripPlanningSection source="Evolved Experiências" />

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Pronto para criar suas <span className="text-accent-500">Evolved Experiências</span>?
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e descubra como podemos transformar cada dia da sua viagem em uma experiência única.
          </p>
          <Button
            onClick={openWizard}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Final CTA Section - Evolved Experiências'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Descobrir minha viagem
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Evolved Experiências" />
    </div>
  )
} 