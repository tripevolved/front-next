'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useWizard } from '@/contexts/WizardContext'
import Button from '@/components/common/Button'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import FAQTripPlanningSection from '@/components/consultancy/FAQTripPlanningSection'

export default function JornadaEvolvedPage() {
  const { openWizard } = useWizard()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/yosemite-valley.jpg"
            alt="Jornada Evolved - Consultoria Premium"
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
              Jornada Evolved
            </h1>
            <p className="font-baloo text-xl md:text-2xl text-accent-300 mb-6">
              Cuidamos de tudo, do início ao fim
            </p>
            <p className="font-comfortaa text-lg md:text-xl mb-8 text-white/90">
              Você entende que viagens extraordinárias não acontecem por acaso - elas são criadas com dedicação, conhecimento e paixão. Nossa Jornada Evolved é para quem quer viver uma experiência verdadeiramente premium, onde cada detalhe é pensado e executado com excelência.
            </p>
            <Button 
              onClick={openWizard}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Hero Section - Jornada Evolved'
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
            O que está incluído na sua <span className="text-accent-500">Jornada Evolved</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Consultoria Completa</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Planejamento personalizado desde o primeiro contato até o retorno da viagem.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Detalhes Cuidados</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Todos os aspectos da viagem são cuidados por especialistas experientes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Suporte 24/7</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Assistência completa durante toda a viagem, sempre que precisar.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Experiências Exclusivas</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Acesso a experiências únicas e autênticas que poucos conhecem.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Concierge Dedicado</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Atendimento personalizado para todas as suas necessidades e desejos.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-secondary-50 p-8 rounded-xl hover:bg-secondary-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-baloo text-xl font-bold text-secondary-900">Garantia de Qualidade</h3>
              </div>
              <p className="text-secondary-600 font-comfortaa text-lg">
                Compromisso com a excelência em cada detalhe da sua experiência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que escolher Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
                Por que escolher a <span className="text-accent-400">Jornada Evolved</span>?
              </h2>
              <div className="space-y-6 text-white/90 font-comfortaa text-lg">
                <p>
                  Quando você escolhe a Jornada Evolved, está escolhendo mais do que um serviço de viagem - está escolhendo uma parceria com especialistas apaixonados que entendem que cada viagem é única.
                </p>
                <p>
                  Nossa equipe mergulha fundo no seu perfil, seus desejos e suas expectativas para criar uma experiência que vai muito além do que você poderia imaginar. Desde a seleção dos melhores hotéis até a criação de experiências exclusivas, tudo é pensado com cuidado e atenção aos detalhes.
                </p>
                <p>
                  Durante a viagem, você tem a tranquilidade de saber que estamos sempre disponíveis para qualquer necessidade, garantindo que cada momento seja perfeito.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Taxa Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Investimento na sua <span className="text-accent-500">Jornada Evolved</span>
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            A taxa de consultoria da Jornada Evolved é um investimento na qualidade e exclusividade da sua experiência. Cada real investido se traduz em momentos únicos e memórias inesquecíveis.
          </p>
          <div className="bg-secondary-50 p-8 rounded-2xl max-w-md mx-auto">
            <div className="text-accent-500 font-baloo font-semibold text-xl mb-2">
              Taxa de Consultoria
            </div>
            <p className="text-secondary-600 font-comfortaa">
              Valor personalizado baseado na complexidade e duração da sua viagem
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQTripPlanningSection source="Jornada Evolved" />

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Pronto para viver sua <span className="text-accent-500">Jornada Evolved</span>?
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos especialistas e descubra como podemos transformar seus sonhos em realidade.
          </p>
          <Button
            onClick={openWizard}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Final CTA Section - Jornada Evolved'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Descobrir minha viagem
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Jornada Evolved" />
    </div>
  )
} 