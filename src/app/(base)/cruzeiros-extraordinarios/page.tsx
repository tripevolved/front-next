'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import CruiseSearchForm from '@/components/consultancy/CruiseSearchForm'
import CruiseLeadModal from '@/components/consultancy/CruiseLeadModal'
import Button from '@/components/common/Button'
import { MuxVideoPlayer } from '@/components/MuxVideoPlayer'
import JornadaGuidingCards from '@/components/cruises/JornadaGuidingCards'
import WhatsAppGroupButton from '@/components/cruises/WhatsAppGroupButton'

export default function CruzeirosExtraordinariosPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [isCruiseModalOpen, setIsCruiseModalOpen] = useState(false)
  const [searchData, setSearchData] = useState({
    destination: '',
    month: '',
    duration: ''
  })

  const cruiseDestinations = [
    'Mediterrâneo',
    'Caribe',
    'Alasca',
    'Norte da Europa',
    'Amazônia',
    'Antártida'
  ]

  const handleCruiseSearch = (data: { destination: string; month: string; duration: string }) => {
    setSearchData(data)
    setIsCruiseModalOpen(true)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="block md:hidden absolute inset-0">
            <MuxVideoPlayer
              playbackId="V00bvDGWfGlEibHGx8olVEj9NHxPylaTVu02Lhinuh9DQ"
              autoplay={true}
              loop={true}
              isMuted={true}
              className="w-full h-full object-cover rounded-none mx-0"
            />
          </div>
          <div className="hidden md:block absolute inset-0">
            <MuxVideoPlayer
              playbackId="wGJb3Kl017IvIuwXsAaRJvSLhxkdivTWfyvr61usw01Jw"
              autoplay={true}
              loop={true}
              isMuted={true}
              className="w-full h-full object-cover rounded-none mx-0"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="w-full px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Cruzeiros extraordinários,<br /> experiências únicas,<br /> exclusividade em cada detalhe.
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Descubra destinos incríveis a bordo dos melhores navios, com experiências exclusivas e detalhes que você só recebe na Trip Evolved.
            </p>
            </div>

            {/* Full Width Search Form */}
            <div className="w-full">
              <CruiseSearchForm onSearch={handleCruiseSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Companies Section */}
      <section className="py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Os cruzeiros mais <span className="text-accent-500">exclusivos</span>
            </h2>
            <p className="text-secondary-600 font-comfortaa text-lg max-w-3xl mx-auto">
              Nós selecionamos as melhores companhias de cruzeiros do mundo para oferecer experiências únicas e inesquecíveis.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/explora-logo.png"
                alt="Explora Journeys"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/azamara-logo.png"
                alt="Azamara"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/celebrity-logo.svg"
                alt="Celebrity Cruises"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/logo-princess.png"
                alt="Princess Cruises"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/logo-oceania-cruises.svg"
                alt="Oceania Cruises"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center h-20 w-full">
              <Image
                src="/assets/home/cruzeiros/ncl-logo.svg"
                alt="Norwegian Cruise Line"
                width={120}
                height={60}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 bg-secondary-200 py-16 px-4 md:px-0">
        <div className="w-full md:w-[80%] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              O Círculo Evolved nasceu para te guiar, com toda a expertise e transparência que você precisa.
            </h2>
          </div>
          <div className="flex flex-col gap-9 justify-center items-center px-6 text-secondary-900">
            <JornadaGuidingCards />
            <div className="text-center mt-8">
              <Link
                href="/circulo-evolved"
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl"
              >
                Quero saber mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Group Section */}
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <p className="font-comfortaa text-lg text-secondary-600 mb-6 max-w-2xl mx-auto">
            Não é o momento ideal para uma conversa? Entre em nosso grupo exclusivo, com a melhor curadoria de cruzeiros de luxo.
          </p>
          <WhatsAppGroupButton
            href="https://chat.whatsapp.com/DQCBgshaX0DFoiBetEm4dI"
            size="compact"
          />
        </div>
      </section>

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={cruiseDestinations}
        source="Cruzeiros Extraordinários"
      />

      {/* Cruise Lead Modal */}
      <CruiseLeadModal
        isOpen={isCruiseModalOpen}
        onClose={() => setIsCruiseModalOpen(false)}
        searchData={searchData}
      />
    </div>
  )
} 