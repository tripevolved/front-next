'use client'

import Image from 'next/image'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import ComoFuncionaSection from '@/components/consultancy/ComoFuncionaSection'
import FAQSection from '@/components/consultancy/FAQSection'
import Button from '@/components/common/Button'

export default function JornadaEvolvedPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const consultancyDestinations = [
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
            src="/assets/home/iguacu-cataratas.jpg"
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
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Hero Section - Jornada Evolved'
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
        source="Jornada Evolved" 
        onContactClick={() => setIsLeadModalOpen(true)}
        mode="consultancy"
      />

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
              <div className="mt-8">
                <Button
                  onClick={() => setIsLeadModalOpen(true)}
                  event="pre_agendar"
                  eventOptions={{
                    source: 'Por que escolher Section - Jornada Evolved'
                  }}
                  className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                  Conversar com especialista
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[500px]">
              <Image
                src="/assets/consultoria/casal-jantar.png"
                alt="Casal em jantar romântico"
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
            Investimento na sua <span className="text-accent-500">Jornada Evolved</span>
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            A taxa de consultoria da Jornada Evolved é um investimento na qualidade e exclusividade da sua experiência. Cada real investido se traduz em momentos únicos e memórias inesquecíveis.
          </p>
          <div className="bg-secondary-50 p-8 rounded-2xl max-w-md mx-auto mb-8">
            <div className="text-accent-500 font-baloo font-semibold text-xl mb-2">
              Taxa de Consultoria
            </div>
            <div className="text-3xl font-baloo font-bold text-secondary-900 mb-2">
              R$ 1.200,00
            </div>
            <p className="text-secondary-600 font-comfortaa">
              Valor único para consultoria completa
            </p>
          </div>
          <Button
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Investment Section - Jornada Evolved'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com especialista
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection source="Jornada Evolved" />

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
            onClick={() => setIsLeadModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Jornada Evolved'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conversar com especialista
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Jornada Evolved" />

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={consultancyDestinations}
        source="Jornada Evolved"
      />
    </div>
  )
} 