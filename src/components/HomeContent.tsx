'use client'

import Image from 'next/image'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import ProductsCarousel from '@/components/ProductsCarousel'
import ServicesDetailsCarousel from '@/components/ServicesDetailsCarousel'
import QuotesCarousel from '@/components/QuotesCarousel'
import FAQ from '@/components/FAQ'
import DestinationsSection from '@/components/DestinationsSection'
import NewsletterSection from '@/components/consultancy/NewsletterSection'
import Button from '@/components/common/Button'
import LeadFlowModal from '@/components/consultancy/LeadFlowModal'
import { useState } from 'react'

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
            src="/assets/home/hero.jpg"
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
              A viagem perfeita não se encontra. Ela é criada.
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Jornadas sob medida, pensadas para seu estilo. Porque <span className="font-bold">exclusividade</span> começa com personalização.
            </p>
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Hero Section - Home'
              }}
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Conversar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Second Section - Products Carousel */}
      <section className="py-12 bg-white">
        <div className="w-full md:w-[90%] mx-auto px-4 md:px-0">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <ProductsCarousel />
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="bg-secondary-500 h-screen">
        <ServicesDetailsCarousel />
      </section>

      {/* Third Section - Destinations */}
      <DestinationsSection />

      {/* Fourth Section - Experiences Carousel */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-12 text-white">
            Viagens que não saem da nossa mente
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
            Conversar com especialista
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection source="Home" />

      {/* Lead Flow Modal */}
      <LeadFlowModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        destinations={[
          'Costa Amafitana, Itália',
          'Aruba',
          'Curaçao',
          'Dolomitas, Itália',
          'Torres del Paine, Chile',
          'Bariloche, Argentina'
        ]}
        source="Home"
      />
    </div>
  )
} 