'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useWizard } from '@/contexts/WizardContext'
import Button from '@/components/common/Button'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQTripPlanningSection from '@/components/consultancy/FAQTripPlanningSection'

export default function PlanoEvolvedPage() {
  const { openWizard } = useWizard()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/sancho-praia.jpg"
            alt="Plano Evolved - Liberdade com Expertise"
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
              Plano Evolved
            </h1>
            <p className="font-baloo text-xl md:text-2xl text-accent-300 mb-6">
              Liberdade com expertise nos momentos certos
            </p>
            <p className="font-comfortaa text-lg md:text-xl mb-8 text-white/90">
              Você valoriza sua independência, mas sabe que alguns momentos merecem a expertise de quem realmente conhece o destino. Você mantém a liberdade de explorar, enquanto nós cuidamos do que realmente importa - hospedagens perfeitas, voos estratégicos e conexões que fazem a diferença.
            </p>
            <Button 
              onClick={openWizard}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Hero Section - Plano Evolved'
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
            O que está incluído no seu <span className="text-accent-500">Plano Evolved</span>
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
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Planejamento Essencial</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Cuidamos dos elementos fundamentais: hospedagens, voos e transferências.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Flexibilidade Total</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Liberdade para explorar e descobrir por conta própria durante a viagem.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Hospedagens Selecionadas</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Hotéis e acomodações cuidadosamente escolhidos para sua comodidade.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Voos Estratégicos</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Conexões otimizadas para maximizar seu tempo no destino.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Dicas Exclusivas</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Recomendações de especialistas para aproveitar ao máximo o destino.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Suporte Quando Precisar</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Assistência disponível sempre que você precisar durante a viagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher Section */}
      <section className="py-24 bg-primary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
                Por que escolher o <span className="text-accent-400">Plano Evolved</span>?
              </h2>
              <div className="space-y-6 text-white/90 font-comfortaa text-lg">
                <p>
                  O Plano Evolved é perfeito para viajantes independentes que valorizam a liberdade de explorar, mas reconhecem a importância de ter uma base sólida e bem planejada.
                </p>
                <p>
                  Nós cuidamos dos elementos essenciais que podem ser complexos e demorados para organizar - como encontrar as melhores hospedagens, otimizar voos e garantir transferências confiáveis. Isso permite que você foque no que realmente importa: viver experiências incríveis.
                </p>
                <p>
                  Você mantém total controle sobre seu roteiro diário, mas tem a segurança de saber que os fundamentos estão bem estruturados por especialistas.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Investimento Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Investimento no seu <span className="text-accent-500">Plano Evolved</span>
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            O adiantamento para planejamento garante que sua viagem tenha uma base sólida, permitindo que você aproveite ao máximo sua liberdade de exploração.
          </p>
          <div className="bg-secondary-50 p-8 rounded-2xl max-w-md mx-auto">
            <div className="text-accent-500 font-baloo font-semibold text-xl mb-2">
              Adiantamento para Planejamento
            </div>
            <p className="text-secondary-600 font-comfortaa">
              Valor único que garante a estrutura perfeita para sua viagem
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQTripPlanningSection source="Plano Evolved" />

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Pronto para criar seu <span className="text-accent-500">Plano Evolved</span>?
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e descubra como podemos estruturar a base perfeita para sua viagem.
          </p>
          <Button
            onClick={openWizard}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Final CTA Section - Plano Evolved'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Descobrir minha viagem
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Plano Evolved" />
    </div>
  )
} 