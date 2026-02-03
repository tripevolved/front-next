'use client'

import Image from 'next/image'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import ProductsCarousel from '@/components/ProductsCarousel'
import QuotesCarousel from '@/components/QuotesCarousel'
import FAQ from '@/components/FAQ'
import Button from '@/components/common/Button'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import { useState } from 'react'

const VALUE_CARDS = [
  {
    title: 'Curadoria',
    description: 'Cruzeiros, hospedagens e experiências únicas: cada destino e produto que passa por nós só é vendido se entendemos bem e se é a melhor escolha para você',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Transparência',
    description: 'Zero comissões e taxas escondidas. Isso significa valor sempre claro, nenhuma surpresa e 10%, em média, de volta no seu bolso em descontos ou cashback.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Qualidade',
    description: 'Não realizamos qualquer viagem. Todos os produtos e destinos que passam por nós são cuidadosamente selecionados para garantir a melhor experiência para você.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
] as const

interface HomeContentProps {
  faqQuestions: Array<{
    question: string;
    answer: string | { html: string };
  }>;
}

export default function HomeContent({ faqQuestions }: HomeContentProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/cruzeiros-unicos/destinos.jpg"
            alt="Hero background"
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
            <h1 className="font-baloo text-5xl md:text-7xl font-bold mb-6 text-white">
              A sua viagem cuidada do começo ao fim
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Cruzeiros extraordinários e jornadas sob medida, com o cuidado e a <span className="font-bold">transparência</span> que você merece.
            </p>
            <Button 
              onClick={() => {
                const comoFuncionaSection = document.getElementById('como-funciona-section');
                if (comoFuncionaSection) {
                  comoFuncionaSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Hero Section - Home'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section - 3 pillars */}
      <section id="como-funciona-section" className="py-16 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Os 3 pilares da Trip Evolved
            </h2>
            <p className="font-comfortaa text-lg text-secondary-600 max-w-2xl mx-auto">
              Nossa forma de trabalhar é guiada por princípios que colocamos em prática em cada viagem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUE_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col"
              >
                <div className="text-accent-500 mb-4">
                  {card.icon}
                </div>
                <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
                  {card.title}
                </h3>
                <p className="font-comfortaa text-secondary-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Pillars Section - Home',
              }}
              className="font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section className="py-12 bg-white">
        <div className="w-full md:w-[90%] mx-auto px-4 md:px-0">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <ProductsCarousel />
          </div>
        </div>
      </section>

      {/* Experiences Carousel */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-12 text-white">
            Viagens incríveis para sua inspiração
          </h2>
          <ExperienceCarousel />
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 bg-secondary-50">
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
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
              O que é a Trip Evolved?
            </h2>
            <p className="text-lg text-secondary-600 font-comfortaa max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossa agência e como trabalhamos
            </p>
          </div>
          <FAQ questions={faqQuestions} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-primary-900">
            Vamos começar sua jornada?
          </h2>
          <Button 
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Final CTA Section - Home'
            }}
            className="font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
          >
            Começar minha jornada
          </Button>
        </div>
      </section>

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={[
          'Cruzeiro pelo Mediterrâneo',
          'Caribe',
          'Cruzeiro pelo Norte da Europa',
          'Patagônia',
        ]}
        source="Home"
      />
    </div>
  )
} 