'use client'

import Image from 'next/image'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import JornadaEvolvedSection from '@/components/consultancy/JornadaEvolvedSection'
import FAQSection from '@/components/consultancy/FAQSection'
import Button from '@/components/common/Button'

export default function JornadaEvolvedPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const consultancyDestinations = [
    'Cruzeiro pelo Mediterrâneo',
    'Caribe',
    'Cruzeiro pelo Norte da Europa',
    'Patagônia',
  ]

  const faqQuestions = [
    {
      question: 'Quais cruzeiros vocês oferecem?',
      answer: 'Trabalhamos com cruzeiros premium e de luxo, que entendemos que fornecem as melhores experiências a bordo e também na imersão em cada destino. São companhias diversas e com diferentes níveis de serviço, como Explora Journeys, Azamara, Celebrity e Norwegian Cruise Line.'
    },
    {
      question: 'Vocês não são comissionados? Como funciona?',
      answer: 'Como toda a indústria de viagens, em alguns casos recebemos comissão dos produtos. Para garantir nosso total alinhamento à você e sua viagem, escolhemos trabalhar com valores net (sem comissão) ou devolver as comissões recebidas como cashback. Isso significa dinheiro de volta no seu bolso e um cuidado total para que sua viagem seja especial.'
    },
    {
      question: 'Quais destinos vocês atendem?',
      answer: 'Nossa curadoria está em constante evolução. Nesse momento, trabalhamos com cruzeiros pelo Mediterrâneo, Caribe e Norte da Europa, além de alguns outros destinos terrestres focados na natureza. Para mais informações, entre em contato com nossos especialistas. Vamos fazer o possível para atender a todas as suas necessidades.'
    },
    {
      question: 'Como começo a planejar minha viagem?',
      answer: 'Clique em "Começar minha jornada" aqui no site. Nesse processo, você responderá algumas perguntas sobre sua viagem, que vão nos ajudar a recomendar as melhores opções para seu objetivo e perfil. Esse processo leva menos de 5 minutos e nossos especialistas entrarão em contato logo em seguida para planejar sua viagem.'
    },
    {
      question: 'O que recebo na Jornada Evolved?',
      answer: 'Como parte do nosso serviço de Travel Design, vamos construir toda a logística da viagem e reservar voos, hotéis, cruzeiros e o que mais for necessário. Você recebe tudo isso organizado, em casa e online, para só se preocupar em aproveitar cada momento. Além disso, você tem acesso ao nosso suporte para qualquer necessidade.'
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/cruzeiros-unicos/hero-cruise.jpg"
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
              Começar minha jornada
            </Button>
          </div>
        </div>
      </section>

      <JornadaEvolvedSection
        onCtaClick={() => setIsLeadModalOpen(true)}
        eventSource="Jornada Evolved Section - Jornada Evolved Page"
        event="pre_agendar"
      />

      {/* Por que escolher Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-secondary-900">
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
                Por que escolher a <span className="text-accent-400">Jornada Evolved</span>?
              </h2>
              <div className="space-y-6 text-secondary-600 font-comfortaa text-lg">
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
                  Começar minha jornada
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

      {/* FAQ Section */}
      <FAQSection source="Jornada Evolved" questions={faqQuestions} />

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
            Começar minha jornada
          </Button>
        </div>
      </section>

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