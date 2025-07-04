'use client'

import Image from 'next/image'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import ComoFuncionaSection from '@/components/consultancy/ComoFuncionaSection'
import FAQTripPlanningSection from '@/components/consultancy/FAQTripPlanningSection'
import Button from '@/components/common/Button'

export default function PlanoEvolvedPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const planningDestinations = [
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
            src="/assets/home/resort-piscina.jpg"
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
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Plano Evolved'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <ComoFuncionaSection 
        source="Plano Evolved" 
        onContactClick={() => setIsLeadModalOpen(true)} 
      />

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
              <Image
                src="/assets/home/casal-sicilia.jpg"
                alt="Casal na Sicília"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Investimento no seu <span className="text-accent-500">Plano Evolved</span>
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            O adiantamento para planejamento garante que sua viagem tenha uma base sólida, permitindo que você aproveite ao máximo sua liberdade de exploração.
          </p>
          <div className="bg-secondary-50 p-8 rounded-2xl max-w-md mx-auto mb-8">
            <div className="text-accent-500 font-baloo font-semibold text-xl mb-2">
              Adiantamento para Planejamento
            </div>
            <div className="text-3xl font-baloo font-bold text-secondary-900 mb-2">
              R$ 500,00
            </div>
            <p className="text-secondary-600 font-comfortaa">
              Valor de adiantamento para iniciar o planejamento
            </p>
          </div>
          <Button
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Investment Section - Plano Evolved'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com especialista
          </Button>
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
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Plano Evolved'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com especialista
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Plano Evolved" />

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={planningDestinations}
        source="Plano Evolved"
      />
    </div>
  )
} 