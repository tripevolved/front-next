'use client'

import Image from 'next/image'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import ComoFuncionaSection from '@/components/consultancy/ComoFuncionaSection'
import Button from '@/components/common/Button'
import FAQTripPlanningSection from '@/components/consultancy/FAQTripPlanningSection'

export default function ParaRelaxarPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const relaxationDestinations = [
    'Maldivas',
    'Aruba',
    'Bahamas',
    'Dolomitas, Itália',
    'Torres del Paine, Chile',
    'Anguilla'
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/para-relaxar/hero.jpg"
            alt="Casal relaxando com vista"
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
              Sua viagem a dois. Um momento para relaxar e se reconectar.
            </h1>
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Para casais que Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="text-accent-500">Não é pacote</span>. Tudo começa por vocês e o que desejam viver.
          </h2>
          <h3 className="font-baloo text-xl md:text-2xl font-semibold mb-8 text-white">
            Para casais que...
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Bem-estar</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Buscam momentos de relaxamento e cuidados com o corpo e a mente.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Qualidade de Vida</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Valorizam conforto e luxo em cada detalhe da experiência.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Tempo de Qualidade</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Querem aproveitar cada momento juntos, sem pressões ou compromissos.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Tranquilidade</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Buscam destinos que ofereçam paz e sossego, longe do estresse.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Experiências Exclusivas</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Desejam momentos únicos, como jantares românticos e spas privativos.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-white">Facilidade</h3>
              </div>
              <p className="text-white/90 font-comfortaa text-lg">
                Preferem que tudo seja organizado, para poderem apenas relaxar.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Para casais que Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-primary-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Viagem Personalizada Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="relative h-[600px]">
              <div className="absolute top-0 left-0 w-[65%] h-[65%] z-10">
                <Image
                  src="/assets/consultoria/para-relaxar/relax-paisagem.jpg"
                  alt="Praia para relaxar"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[65%] h-[65%]">
                <Image
                  src="/assets/consultoria/para-relaxar/four-seasons-bahamas.jpg"
                  alt="Resort nas Bahamas"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-right">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Viajar é sobre buscar momentos de relaxamento únicos a dois
              </h2>
              <h3 className="font-baloo text-xl md:text-2xl font-semibold mb-8 text-primary-500">
                A gente entende o que vocês querem viver
              </h3>
              <div className="space-y-6 text-secondary-600 font-comfortaa text-lg">
                <p>
                  Vocês têm uma rotina intensa e merecem momentos de verdadeiro descanso. Entendemos que cada casal tem sua forma de relaxar, seja em um spa de luxo, em uma praia paradisíaca ou em um resort exclusivo. É por isso que, antes de sugerir qualquer destino, ouvimos. Descobrimos juntos o que traz paz, o que renova as energias, o que faz cada momento valer a pena.
                </p>
                <p>
                  Com esse entendimento, construímos uma viagem que prioriza o bem-estar. Desde a escolha do resort perfeito até as experiências mais relaxantes — como aquele jantar à beira-mar ou um tratamento de spa a dois — tudo é pensado para que vocês possam se desconectar do mundo e reconectar um com o outro, sem preocupações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Momentos únicos Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900">
            Sua viagem merece <span className="text-accent-500">momentos únicos</span> como...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/para-relaxar/velassaru-maldivas.jpg"
                  alt="Bangalô sobre as águas nas Maldivas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Bangalô sobre as águas nas Maldivas
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/para-relaxar/aruba-jantar.jpg"
                  alt="Pôr do sol em Aruba"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Jantar romântico ao pôr do sol em Aruba
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/para-relaxar/redlane-spa.jpg"
                  alt="Spa nas Bahamas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Tratamento de spa nas Bahamas
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Momentos únicos Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona Section */}
      <ComoFuncionaSection 
        source="Para Relaxar" 
        onContactClick={() => setIsLeadModalOpen(true)} 
      />

      {/* Por que agendar agora Section */}
      <section className="py-24 bg-secondary-500 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-center">
            Por que agendar sua reunião agora?
          </h2>
          <div className="grid gap-12 mb-12">
            <div>
              <p className="text-white/90 font-comfortaa text-lg">
                Quanto antes começarmos a planejar sua viagem, <span className="text-accent-500 font-bold">melhores opções</span> teremos disponíveis. Agende sua reunião agora e garanta as melhores experiências.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Por que agendar agora Section - Para Relaxar'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Trip Evolved Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Por que existimos
              </h2>
              <p className="text-secondary-600 font-comfortaa text-lg">
                A Trip Evolved nasceu através da inquietude de seus membros quanto à falta de personalização do mercado de viagens.
              </p>
              <p className="text-secondary-600 font-comfortaa text-lg mt-4">
                Assim como milhares de viajantes ao redor do mundo, acreditamos que viagens são experiências únicas, frutos de sonhos individuais, e que merecem ser tratadas dessa maneira.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/brand/logo-principal.svg"
                alt="Trip Evolved Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQTripPlanningSection source="Para Relaxar" />

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
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Para Relaxar'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com especialista
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Para Relaxar" />

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={relaxationDestinations}
        source="Para Relaxar"
      />
    </div>
  )
} 