'use client'

import Image from 'next/image'
import { useState } from 'react'
import FAQ, { basicFAQQuestions } from '@/components/FAQ'
import TripEvolvedSection from '@/components/consultancy/TripEvolvedSection'
import QuotesCarousel from '@/components/QuotesCarousel'
import Button from '@/components/common/Button'
import { CaribbeanDiscoveryDrawer } from '@/components/caribbean-discovery/CaribbeanDiscoveryDrawer'

const PLANEJADOR_STEPS = [
  {
    number: '1',
    title: 'Responda as perguntas',
    description:
      'Em poucos minutos, conte o ritmo, o estilo e o que importa para a viagem a dois de vocês no Caribe.',
  },
  {
    number: '2',
    title: 'Receba a recomendação de hospedagem',
    description:
      'O Planejador Evolved analisa o perfil de vocês e indica o hotel mais alinhado — com clareza, sem listas infinitas.',
  },
  {
    number: '3',
    title: 'Assine o Círculo Evolved e reserve sem comissão',
    description:
      'Com o Círculo Evolved, vocês reservam a hospedagem sem comissões embutidas — 10 a 30% abaixo das tarifas públicas.',
  },
] as const

export default function CaribePage() {
  const [isDiscoveryDrawerOpen, setIsDiscoveryDrawerOpen] = useState(false)

  const openDiscoveryDrawer = () => setIsDiscoveryDrawerOpen(true)

  return (
    <div className="flex flex-col">
      {/* Hero — Planejador Evolved */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/caribe/hero.jpg"
            alt="Resort no Caribe"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10 py-24">
          <p className="font-comfortaa text-sm md:text-base uppercase tracking-[0.2em] text-accent-400 mb-4">
            Planejador Evolved
          </p>
          <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white max-w-3xl leading-tight">
            Encontre o resort <span className="text-accent-500">certo</span> para vocês no Caribe
          </h1>
          <p className="text-white/90 font-comfortaa text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
            Responda algumas perguntas e receba a recomendação certa para sua hospedagem no Caribe. Em
            menos de 5 minutos.
          </p>
          <Button
            onClick={openDiscoveryDrawer}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Hero Section - Caribe',
            }}
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Planejar viagem
          </Button>
        </div>
      </section>

      {/* How it works — 3 steps */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Como funciona o <span className="text-accent-500">Planejador Evolved</span>
            </h2>
            <p className="font-comfortaa text-lg text-secondary-600">
              Três passos simples até a hospedagem certa — e tarifas sem comissão quando vocês
              reservam pelo Círculo Evolved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {PLANEJADOR_STEPS.map((step) => (
              <div key={step.number} className="relative text-center md:text-left">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 mb-5">
                  <span className="font-baloo text-2xl font-bold text-secondary-900">{step.number}</span>
                </div>
                <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-3">
                  {step.title}
                </h3>
                <p className="font-comfortaa text-secondary-600 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={openDiscoveryDrawer}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'How it works Section - Caribe',
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Planejar viagem
            </Button>
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
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/caribe/relaxamento.jpg"
                  alt="Casal relaxando em praia caribenha"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-2xl font-bold mb-2">Relaxamento Total</h3>
                  <p className="text-white/90 font-comfortaa text-lg">
                    Se você quer curtir spas, praias privativas e momentos de paz absoluta em resorts
                    exclusivos.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/caribe/aventura.jpg"
                  alt="Atividades aquáticas no Caribe"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-2xl font-bold mb-2">Aventura e Exploração</h3>
                  <p className="text-white/90 font-comfortaa text-lg">
                    Para você mergulhar em águas cristalinas, ver recifes de coral e explorar ilhas
                    desertas.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/consultoria/caribe/cultura.jpg"
                  alt="Cultura caribenha e gastronomia"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-2xl font-bold mb-2">Cultura e Gastronomia</h3>
                  <p className="text-white/90 font-comfortaa text-lg">
                    Se você quer experiências gastronômicas únicas, festivais locais e imersão na
                    cultura caribenha.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={openDiscoveryDrawer}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Unique Moments Section - Caribe',
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Planejar viagem
            </Button>
          </div>
        </div>
      </section>

      <TripEvolvedSection />

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

      <section className="py-16 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-4">
              O que é a Trip Evolved?
            </h2>
            <p className="text-lg text-secondary-600 font-comfortaa max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossa agência e como trabalhamos
            </p>
          </div>
          <FAQ questions={basicFAQQuestions} />
        </div>
      </section>

      <section className="py-24 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Pronto para receber a recomendação{' '}
            <span className="text-accent-500">certa de hospedagem?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Responda algumas perguntas e receba a recomendação certa para sua hospedagem no Caribe.
            Em menos de 5 minutos.
          </p>
          <Button
            onClick={openDiscoveryDrawer}
            event="pre_descobrir_viagem"
            eventOptions={{
              source: 'Final CTA Section - Caribe',
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Planejar viagem
          </Button>
        </div>
      </section>

      <CaribbeanDiscoveryDrawer
        isOpen={isDiscoveryDrawerOpen}
        onClose={() => setIsDiscoveryDrawerOpen(false)}
      />
    </div>
  )
}
