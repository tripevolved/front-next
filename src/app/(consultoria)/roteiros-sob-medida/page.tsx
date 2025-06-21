'use client'

import { useState } from 'react'
import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'
import ContactExpertModal from '@/components/ContactExpertModal'
import Button from '@/components/common/Button'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import TripEvolvedSection from '@/components/consultancy/TripEvolvedSection'
import FAQSection from '@/components/consultancy/FAQSection'
import ScriptFlowModal from '@/components/consultancy/ScriptFlowModal'
import Image from 'next/image'

const scriptFAQs = [
  {
    question: "Como funciona o processo de criação do roteiro?",
    answer: "Após você nos informar o destino, responder algumas perguntas sobre seus objetivos e datas, calculamos o preço (R$300 por dia) e, após o pagamento, criamos um roteiro exclusivo em até 48 horas úteis."
  },
  {
    question: "O que está incluído no roteiro?",
    answer: "O roteiro inclui sugestão de hotéis, experiências autênticas, horários organizados, reservas indicadas, mapas, links úteis e alertas para evitar problemas. Tudo pensado para criar momentos únicos."
  },
  {
    question: "Posso fazer alterações no roteiro?",
    answer: "Sim! Após a entrega, você pode solicitar ajustes e refinamentos para garantir que o roteiro atenda perfeitamente às suas expectativas."
  },
  {
    question: "O roteiro inclui reservas de hotéis e restaurantes?",
    answer: "Incluímos sugestões detalhadas com links diretos para reservas, mas as reservas em si são feitas por você para maior flexibilidade e controle."
  },
  {
    question: "E se eu não gostar do roteiro?",
    answer: "Nosso compromisso é criar um roteiro que você ame. Se não estiver satisfeito, trabalhamos com você para fazer os ajustes necessários até ficar perfeito."
  }
]

export default function RoteirosSobMedidaPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isScriptFlowModalOpen, setIsScriptFlowModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/roteiros-sob-medida/hero-scripts.jpg"
            alt="Roteiros personalizados"
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
                  playbackId="YOUR_SCRIPT_VIDEO_PLAYBACK_ID"
                  title="Roteiros Sob Medida"
                  isMuted={false}
                  loop={false}
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Roteiros <span className="text-accent-500">sob medida</span> para sua viagem perfeita
              </h1>
              <p className="text-white/90 font-comfortaa text-xl mb-8">
                Descubra como criamos roteiros personalizados que transformam suas viagens em experiências únicas e memoráveis.
              </p>
              <Button 
                onClick={() => setIsScriptFlowModalOpen(true)}
                event="pre_agendar"
                eventOptions={{
                  source: 'Hero Section - Roteiros Sob Medida'
                }}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Quero meu roteiro personalizado
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona Section */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
              Do seu sonho ao roteiro pronto, tudo pensado <span className="text-accent-500">com carinho e estratégia</span>
            </h2>
            <h3 className="font-baloo text-xl md:text-2xl font-semibold text-primary-500">
              Um processo simples e eficiente para criar o roteiro perfeito para sua viagem
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white font-baloo text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    Conte-nos sobre sua viagem
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Você nos diz o destino, responde algumas perguntas sobre seu objetivo nessa viagem e perfil e quais são as suas datas.
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
                    Preço transparente
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Com base nisso, vamos te passar o preço desse roteiro. A cobrança é muito simples: R$300,00 para cada dia da sua viagem, com todos os detalhes e, claro, um pensamento orientado a criar momentos únicos para vocês.
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
                    Pagamento seguro
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    A partir disso, você será redirecionado para o nosso pagamento seguro. Depois do pagamento, vamos entrar em contato com você para organizar a entrega do roteiro e tirar eventuais dúvidas.
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
                    Criação do roteiro
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Com tudo isso em mãos, criamos um roteiro exclusivo em até 48 horas úteis, com sugestão de hotéis, experiências autênticas, tempo para pausas e equilíbrio entre o que fazer e o que sentir.
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
                    Entrega completa
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-lg">
                    Você recebe um material completo, claro e bonito, com todos os dias organizados, sugestões de horários, reservas indicadas, mapas, links úteis e alertas para evitar problemas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bonus Section */}
          <div className="bg-primary-50 p-8 rounded-xl mb-16">
            <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-8 text-center">
              E você também tem:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Suporte durante a viagem
                </h4>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Estamos disponíveis para tirar dúvidas e fazer ajustes durante sua viagem, garantindo que tudo saia conforme planejado.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  Roteiro digital e impresso
                </h4>
                <p className="text-secondary-600 font-comfortaa text-lg">
                  Você recebe o roteiro em formato digital para usar no celular e também uma versão impressa para levar na viagem.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button 
              onClick={() => setIsScriptFlowModalOpen(true)}
              event="pre_agendar"
              eventOptions={{
                source: 'Como funciona Section - Roteiros Sob Medida'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero meu roteiro personalizado
            </Button>
          </div>
        </div>
      </section>

      {/* Trip Evolved Section */}
      <TripEvolvedSection />

      {/* FAQ Section */}
      <FAQSection questions={scriptFAQs} source="Roteiros Sob Medida" />

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
            onClick={() => setIsScriptFlowModalOpen(true)}
            event="pre_agendar"
            eventOptions={{
              source: 'Final CTA Section - Roteiros Sob Medida'
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero meu roteiro personalizado
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Roteiros Sob Medida" />

      {/* Contact Expert Modal */}
      <ContactExpertModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        additionalMetadata={[
          {
            key: 'source',
            value: 'Roteiros Sob Medida',
            keyDescription: 'Fonte do lead'
          }
        ]}
      />

      {/* Script Flow Modal */}
      <ScriptFlowModal
        isOpen={isScriptFlowModalOpen}
        onClose={() => setIsScriptFlowModalOpen(false)}
      />
    </div>
  )
} 