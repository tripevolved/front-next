'use client'

import { useState } from 'react'
import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'
import ContactExpertModal from '@/components/ContactExpertModal'
import Button from '@/components/common/Button'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import TripEvolvedSection from '@/components/consultancy/TripEvolvedSection'
import FAQSection from '@/components/consultancy/FAQSection'
import Image from 'next/image'

const cruiseFAQs = [
  {
    question: "Quais documentos são necessários para embarcar?",
    answer: "Para cruzeiros internacionais, você precisará de passaporte válido por pelo menos 6 meses após o retorno. O restante varia de acordo com o cruzeiro e vamos te avisar o que é necessário."
  },
  {
    question: "O que está incluído no valor do cruzeiro?",
    answer: "Em geral, os cruzeiros que oferecemos são All Inclusive, incluindo bebidas como vinhos e cerveja. Mas fique tranquila: tudo estará explicado na sua proposta personalizada."
  },
  {
    question: "Quanto custam esses cruzeiros?",
    answer: "Os preços variam de acordo com o cruzeiro e o tipo de suíte que você escolher. Mas fique tranquila: vamos te oferecer a melhor opção de acordo com o seu orçamento."
  },
  {
    question: "E se eu enjoar no navio?",
    answer: "Navios modernos têm estabilizadores que minimizam o balanço, o que minimiza bastante o risco de enjoo. De qualquer forma, é importante consultar seu médico caso você tenha propensão a enjoo."
  },
  {
    question: "Como funciona o seguro de viagem?",
    answer: "Vamos analisar a melhor cobertura para o seu perfil e necessidade e te oferecer a melhor opção."
  }
]

export default function CruzeirosUnicosPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/cruzeiros-unicos/hero-cruise.jpg"
            alt="Cruzeiro luxuoso no mar"
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
            {/* Video */}
            <div className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <MuxVideoPlayer 
                  playbackId="YOUR_HERO_VIDEO_PLAYBACK_ID"
                  title="Cruzeiros Únicos"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Cruzeiros únicos para <span className="text-accent-500">momentos inesquecíveis</span>
              </h1>
              <p className="text-white/90 font-comfortaa text-xl mb-8">
                Descubra experiências exclusivas a bordo dos navios mais luxuosos do mundo, com roteiros personalizados que vão além do comum.
              </p>
              <Button 
                onClick={() => setIsContactModalOpen(true)}
                event="pre_agendar"
                eventOptions={{
                  source: 'Hero Section - Cruzeiros Únicos'
                }}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Quero conhecer os cruzeiros
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
              Conheça alguns dos navios e suas <span className="text-accent-500">experiências exclusivas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video">
                <MuxVideoPlayer 
                  playbackId="uJZI1AGknXpXWng8000157cUFHuyziX6JNurpoBQ3NEqA"
                  autoplay={false}
                  loop={false}
                />
              </div>
              <div className="p-6">
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-2">
                  Experiência do viajante
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Entenda a sua experiência a bordo e os serviços de primeira classe que tornam sua viagem verdadeiramente especial.
                </p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video">
                <MuxVideoPlayer 
                  playbackId="XS9UP7x5XDFCkX778aYqW1bZ9fYY9SQcajaY7ACz9bQ"
                  autoplay={false}
                  loop={false}
                />
              </div>
              <div className="p-6">
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-2">
                  Ocean Penthouse
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Para o conforto em alto-mar que você merece, nada melhor que a Ocean Penthouse.
                </p>
              </div>
            </div>

            {/* Video 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video">
                <MuxVideoPlayer 
                  playbackId="DA1Zq5xS3TYKS6QgI4C01xBTdjoIabIiolcUwospdxgE"
                  autoplay={false}
                  loop={false}
                />
              </div>
              <div className="p-6">
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-2">
                  Gastronomia de Excelência
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Restaurantes premiados, chefs renomados e experiências gastronômicas que elevam sua viagem a outro patamar.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Videos Section - Cruzeiros Únicos'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero conhecer os cruzeiros
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
              Do primeiro contato ao último brinde da viagem, tudo pensado <span className="text-accent-500">com carinho e estratégia</span>
            </h2>
            <h3 className="font-baloo text-xl md:text-2xl font-semibold text-primary-500">
              Um processo sob medida para criar a viagem mais especial da vida de vocês
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
                    Consulta inicial
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Sessão de uma hora para entender as preferências, necessidades e orçamento de vocês.
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
                    Confirmação da jornada
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Com o pagamento da nossa taxa de consultoria, de R$1200,00, criamos uma proposta sob medida, com a jornada mais adequada para vocês.{' '}
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
                    Proposta personalizada da jornada
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Documento detalhado incluindo voos, como você vai chegar no porto, hospedagens necessárias e, claro, tudo sobre o seu cruzeiro.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white font-baloo text-2xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    Ajustes da proposta
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    A proposta pode ser ajustada quantas vezes for necessário, para garantir que cada detalhe reflita perfeitamente o que vocês desejam e imaginam.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white font-baloo text-2xl font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    Reserva e coordenação
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Com o pagamento da viagem realizado, realizamos todas as reservas de voos, hospedagens e garantimos o seu cruzeiro.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white font-baloo text-2xl font-bold">
                  6
                </div>
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    Kit de viagem personalizado
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Vocês recebem em casa um kit de viagem personalizado, com guia, mapa, recomendações personalizadas e tudo que vocês precisam saber para aproveitar ao máximo a viagem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bonus Section */}
          <div className="bg-primary-50 p-8 rounded-xl mb-16">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-8 text-center">
              E vocês também tem:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Nosso suporte 24/7
                </h4>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Estamos disponíveis para garantir que vocês tenham uma viagem perfeita e qualquer problema seja resolvido rapidamente.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Dossiê da Jornada
                </h4>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Que vocês recebem em casa, com tudo que precisam saber, como a burocracia necessária, o que levar na mala e vários outros detalhes.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Como funciona Section - Cruzeiros Únicos'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero conhecer os cruzeiros
            </Button>
          </div>
        </div>
      </section>

      {/* Trip Evolved Section */}
      <TripEvolvedSection />

      {/* FAQ Section */}
      <FAQSection questions={cruiseFAQs} source="Cruzeiros Únicos" />

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
            onClick={() => setIsContactModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Consultoria'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero agendar minha sessão
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Consultoria" />

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        additionalMetadata={[
          {
            key: 'source',
            value: 'Cruzeiros Únicos',
            keyDescription: 'Fonte do lead'
          }
        ]}
      />
    </div>
  )
} 