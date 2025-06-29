'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQTripPlanningSection from '@/components/consultancy/FAQTripPlanningSection'
import TripEvolvedSection from '@/components/consultancy/TripEvolvedSection'
import ComoFuncionaSection from '@/components/consultancy/ComoFuncionaSection'
import QuotesCarousel from '@/components/QuotesCarousel'
import Button from '@/components/common/Button'

export default function ItaliaPage() {
  const [isLeadFlowModalOpen, setIsLeadFlowModalOpen] = useState(false)

  const italianDestinations = [
    'Roma',
    'Florença',
    'Veneza',
    'Milão',
    'Nápoles',
    'Sicília',
    'Toscana',
    'Amalfi',
    'Cinque Terre',
    'Puglia'
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/italia/hero.jpg"
            alt="Itália - Terra da arte e cultura"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Column */}
            <div className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <MuxVideoPlayer 
                  playbackId="fEowTECBZ92miTlmxw5Nj00OalTd4n01MnrbI4A7pPUmI"
                  isMuted={false}
                  loop={false}
                  placeholderImage="/assets/consultoria/italia/vsl_poster.jpg"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2">
              <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Sua viagem para a <span className="text-accent-500">Itália</span> dos sonhos
              </h1>
              <p className="text-white/90 font-comfortaa text-xl mb-8">
                Descubra a arte, história, gastronomia e paisagens deslumbrantes que fazem da Itália um destino único no mundo.
              </p>
              <Button 
                onClick={() => setIsLeadFlowModalOpen(true)}
                event="pre_agendar"
                eventOptions={{
                  source: 'Hero Section - Itália'
                }}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Conversar com um especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Planning Challenges Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[600px]">
              <Image
                src="/assets/consultoria/italia/mirabelle_rome.jpg"
                alt="Pessoa confusa com muitas opções de viagem na Itália"
                fill
                className="object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Planejar uma viagem para a Itália pode ser <span className="text-accent-500">desafiador</span>
              </h2>
              <div className="space-y-6 text-secondary-600 font-comfortaa text-lg mb-8">
                <p>
                  Com tantas cidades históricas, regiões únicas e experiências gastronômicas, é fácil se sentir sobrecarregado. Qual cidade visitar primeiro? Como organizar os traslados entre regiões? Onde encontrar os melhores restaurantes autênticos?
                </p>
                <p>
                  A pesquisa pode levar semanas, e mesmo assim você pode acabar perdendo experiências incríveis ou escolhendo opções que não são ideais para o seu perfil de viajante.
                </p>
                <p>
                  <span className="text-accent-500 font-bold">Nós resolvemos isso para você.</span> Nossa equipe de especialistas conhece cada detalhe da Itália e vai criar uma viagem personalizada que supera suas expectativas, sem que você precise se preocupar com a complexidade do planejamento.
                </p>
              </div>
              <Button 
                onClick={() => setIsLeadFlowModalOpen(true)}
                event="pre_agendar"
                eventOptions={{
                  source: 'Planning Challenges Section - Itália'
                }}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Conversar com um especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Moments Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
            Qual é o <span className="text-accent-500">objetivo de vocês</span> nessa viagem?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/italia/galeria_umberto.jpg"
                  alt="Arte e cultura italiana"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-2xl font-bold mb-2">
                    Arte e Cultura
                  </h3>
                  <p className="text-white/90 font-comfortaa text-lg">
                    Museus renascentistas, arquitetura histórica e experiências culturais únicas em cada cidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/italia/castiglion_del_bosco.jpg"
                  alt="Gastronomia italiana"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-2xl font-bold mb-2">
                    Gastronomia Autêntica
                  </h3>
                  <p className="text-white/90 font-comfortaa text-lg">
                    Restaurantes familiares, vinhos regionais e experiências culinárias que contam a história da Itália.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/italia/capri.jpg"
                  alt="Paisagens italianas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-2xl font-bold mb-2">
                    Paisagens Deslumbrantes
                  </h3>
                  <p className="text-white/90 font-comfortaa text-lg">
                    Costa Amalfitana, Toscana rural e cenários que parecem saídos de um filme.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsLeadFlowModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Unique Moments Section - Itália'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com um especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona Section */}
      <ComoFuncionaSection 
        source="Itália" 
        onContactClick={() => setIsLeadFlowModalOpen(true)} 
      />

      {/* Trip Evolved Section */}
      <TripEvolvedSection />

      {/* Customer Quotes Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
              O que nossos viajantes dizem
            </h2>
            <p className="text-lg text-secondary-600 font-comfortaa max-w-2xl mx-auto">
              Descubra as experiências reais de quem já viveu momentos únicos conosco
            </p>
          </div>
          <QuotesCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQTripPlanningSection source="Itália" />

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Vamos transformar sua viagem em uma <span className="text-accent-500">experiência única?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e comece a planejar a viagem dos seus sonhos hoje mesmo.
          </p>
          <Button
            onClick={() => setIsLeadFlowModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Itália'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com um especialista
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Itália" />

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadFlowModalOpen}
        onClose={() => setIsLeadFlowModalOpen(false)}
        destinations={italianDestinations}
        source="Itália"
      />
    </div>
  )
} 