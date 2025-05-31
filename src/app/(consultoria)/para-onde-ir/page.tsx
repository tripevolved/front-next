'use client'

import Image from 'next/image'
import { useState } from 'react'
import ContactExpertModal from '@/components/ContactExpertModal'
import TripEvolvedSection from '@/components/consultancy/TripEvolvedSection'
import Button from '@/components/common/Button'
import DestinoPerfeitoWizard from '@/components/consultancy/DestinoPerfeitoWizard'

export default function ParaOndeIrPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/para-onde-ir/miamihero.jpg"
            alt="Casal em viagem romântica"
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
              Descubra seu próximo destino perfeito, feito sob medida para vocês.
            </h1>
            <p className="text-white/90 font-comfortaa text-xl mb-8">
              Um guia personalizado com 3 destinos ideais para sua próxima viagem, baseado no seu perfil, objetivos e sonhos.
            </p>
            <Button 
              onClick={() => setIsWizardOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Destino Perfeito'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero descobrir meu destino
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
              Em apenas 3 passos, você descobre <span className="text-accent-500">seu próximo destino</span>
            </h2>
            <h3 className="font-baloo text-xl md:text-2xl font-semibold text-primary-500">
              Um processo simples e personalizado para encontrar o lugar ideal para vocês
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white font-baloo text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    Responda algumas perguntas
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Um questionário online rápido e intuitivo para traçarmos o perfil ideal da sua viagem, considerando seus gostos, orçamento, objetivos e sonhos.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white font-baloo text-2xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    Realize o pagamento
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    De <span className="line-through">R$499,00</span> por apenas <span className="text-accent-500 font-bold">R$197,00</span>. Um investimento pequeno para uma grande descoberta.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white font-baloo text-2xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    Receba seu guia
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    3 destinos personalizados, com 3 lugares diferenciados para conhecer em cada um deles, além da nossa indicação de hotel ideal para vocês curtirem o destino da melhor forma.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bonus Section */}
          <div className="bg-primary-50 p-8 rounded-xl mb-16">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-8 text-center">
              Bônus exclusivos para sua experiência ser ainda mais especial
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-accent-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h4 className="font-baloo text-xl font-bold text-secondary-900">
                    Sessão de orientação
                  </h4>
                </div>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  30 minutos com um de nossos especialistas para revisar seu guia e explicar cada decisão tomada, garantindo que você entenda perfeitamente por que cada destino foi escolhido para vocês. É a nossa experiência a seu favor para tomar a melhor decisão para a viagem.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-accent-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="font-baloo text-xl font-bold text-secondary-900">
                    Dicas gastronômicas exclusivas
                  </h4>
                </div>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  3 dicas gastronômicas, com restaurantes e experiências locais para você explorar. Descubra os sabores autênticos de cada destino e viva experiências únicas na gastronomia local.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button 
              onClick={() => setIsWizardOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Como funciona Section - Destino Perfeito'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero descobrir meu destino
            </Button>
          </div>
        </div>
      </section>

      {/* Guide Preview Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Images Grid */}
            <div className="lg:col-span-2 relative">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Image 1 */}
                <div className="relative h-[400px] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/assets/consultoria/para-onde-ir/guide_1.jpg"
                    alt="Preview do guia de destinos"
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
                {/* Image 2 */}
                <div className="relative h-[400px] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/assets/consultoria/para-onde-ir/guide_2.jpg"
                    alt="Preview do guia de destinos"
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
                {/* Image 3 */}
                <div className="relative h-[400px] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/assets/consultoria/para-onde-ir/guide_3.jpg"
                    alt="Preview do guia de destinos"
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
                {/* Image 4 */}
                <div className="relative h-[400px] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/assets/consultoria/para-onde-ir/guide_4.jpg"
                    alt="Preview do guia de destinos"
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Um guia completo e <span className="text-accent-500">personalizado</span>
              </h2>
              <p className="text-secondary-600 font-comfortaa text-lg mb-6">
                Receba um guia detalhado com 3 destinos cuidadosamente selecionados para vocês. Cada destino inclui:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    3 experiências únicas que combinam com você
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Recomendação de hotel ideal para o seu perfil
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Informações práticas sobre cada destino
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Dicas exclusivas para aproveitar ao máximo
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    3 dicas gastronômicas, com restaurantes e experiências locais para você explorar
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Evolved Section */}
      <TripEvolvedSection />

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Vamos descobrir juntos seu <span className="text-accent-500">próximo destino?</span>
          </h2>
          <p className="font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e comece a planejar sua próxima aventura hoje mesmo.
          </p>
          <Button
            onClick={() => setIsWizardOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Destino Perfeito'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero descobrir meu destino
          </Button>
        </div>
      </section>

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        additionalMetadata={[
          {
            key: 'source',
            value: 'Destino Perfeito',
            keyDescription: 'Fonte do lead'
          }
        ]}
      />

      {/* Destino Perfeito Wizard */}
      <DestinoPerfeitoWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </div>
  )
} 