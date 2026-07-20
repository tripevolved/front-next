'use client'

import { useState } from 'react'
import Image from 'next/image'
import CruzeirosExtraordinariosHero from '@/components/cruises/CruzeirosExtraordinariosHero'
import FeaturedExtraordinaryCruises from '@/components/cruises/FeaturedExtraordinaryCruises'
import WhatsAppGroupButton from '@/components/cruises/WhatsAppGroupButton'
import { DetailsCard } from '@/components/cruises/DetailsCard'
import CruiseLeadModal from '@/components/consultancy/CruiseLeadModal'

const PARTNER_LOGOS = [
  {
    src: '/assets/home/cruzeiros/explora-logo.png',
    alt: 'Explora Journeys',
  },
  {
    src: '/assets/home/cruzeiros/azamara-logo.png',
    alt: 'Azamara',
  },
  {
    src: 'https://res.cloudinary.com/tripevolved/image/upload/v1774956421/Monochrome_Black_rgb_sh5i3n.png',
    alt: 'Silversea',
  },
] as const

const HOW_IT_WORKS = [
  {
    message: 'Você solicita nosso atendimento respondendo algumas perguntas em menos de 5 minutos.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    message: 'Te encaminhamos o melhor roteiro - e você entende porque',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    message:
      'Você realiza sua reserva com nossa consultoria, te ajudamos a escolher os passeios e também no pré e pós-cruzeiro',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
] as const

export default function CruzeirosExtraordinariosPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <CruzeirosExtraordinariosHero />
      <FeaturedExtraordinaryCruises />

      {/* Partner Companies Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Os cruzeiros mais <span className="text-accent-500">exclusivos</span>
            </h2>
            <p className="text-secondary-600 font-comfortaa text-lg max-w-3xl mx-auto">
              Nós selecionamos as melhores companhias de cruzeiros do mundo para oferecer
              experiências únicas e inesquecíveis.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-3xl mx-auto">
            {PARTNER_LOGOS.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center h-20 w-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            <div className="flex items-center justify-center h-20 w-full">
              <span className="font-baloo text-4xl font-bold text-secondary-400 tracking-widest">
                ...
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 bg-secondary-200 py-16 px-4 md:px-0">
        <div className="w-full md:w-[80%] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Como funciona nosso atendimento
            </h2>
          </div>
          <div className="flex flex-col gap-9 justify-center items-center px-6 text-secondary-900">
            <div className="flex md:grid md:grid-cols-3 flex-col items-center gap-10 md:max-w-5xl mx-auto w-full">
              {HOW_IT_WORKS.map((step) => (
                <DetailsCard key={step.message} message={step.message} icon={step.icon} />
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
              >
                Solicitar atendimento
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Group Section */}
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <p className="font-comfortaa text-lg text-secondary-600 mb-6 max-w-2xl mx-auto">
            Não é o momento ideal para uma conversa? Entre em nosso grupo exclusivo, com a
            melhor curadoria de cruzeiros de luxo.
          </p>
          <WhatsAppGroupButton
            href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
            size="compact"
          />
        </div>
      </section>

      <CruiseLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false)
          window.location.href = '/obrigado'
        }}
        onBack={() => setIsLeadModalOpen(false)}
      />
    </div>
  )
}
