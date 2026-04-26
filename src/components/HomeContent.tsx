'use client'

import Image from 'next/image'
import Link from 'next/link'
import ProductsCarousel from '@/components/ProductsCarousel'
import QuotesCarousel from '@/components/QuotesCarousel'
import FAQ from '@/components/FAQ'
import Button from '@/components/common/Button'
import CirculoEvolvedSection from '@/components/circulo-evolved/CirculoEvolvedSection'
import WhyTripEvolvedCards from '@/components/cruises/WhyTripEvolvedCards'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAccessToken } from '@auth0/nextjs-auth0/client'

import { CollectionsApiService } from '@/clients/collections'
import type { Collection } from '@/clients/collections'
import CollectionCard from '@/components/collections/CollectionCard'

interface HomeContentProps {
  faqQuestions: Array<{
    question: string;
    answer: string | { html: string };
  }>;
}

export default function HomeContent({ faqQuestions }: HomeContentProps) {
  const router = useRouter()
  const [collections, setCollections] = useState<Collection[]>([])
  const [isCollectionsLoading, setIsCollectionsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchCollections = async () => {
      setIsCollectionsLoading(true)
      try {
        const response = await CollectionsApiService.getCollections({
          travelerType: 'COUPLE',
          offset: 0,
          limit: 3,
        })
        if (!isMounted) return
        setCollections(response.collections ?? [])
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        if (isMounted) setIsCollectionsLoading(false)
      }
    }
    fetchCollections()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const token = await getAccessToken()
        if (!cancelled) setIsLoggedIn(Boolean(token))
      } catch {
        if (!cancelled) setIsLoggedIn(false)
      }
    }
    check()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/italia/capri.jpg"
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
              Viaje melhor, com valores que você não encontra sozinho
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              <span className="font-bold italic">Abolimos as comissões</span> para você acessar tarifas que só agências de viagens possuem. Com a <span className="font-bold italic">curadoria</span> que nos é característica, para você viajar melhor gastando menos.
            </p>
            <Button 
              onClick={() => {
                const circuloEvolvedSection = document.getElementById('circulo-evolved-section');
                if (circuloEvolvedSection) {
                  circuloEvolvedSection.scrollIntoView({ behavior: 'smooth' });
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
      <section className="py-16 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Os 3 pilares da Trip Evolved
            </h2>
            <p className="font-comfortaa text-lg text-secondary-600 max-w-2xl mx-auto">
              Nossa forma de trabalhar é guiada por princípios que colocamos em prática em cada viagem
            </p>
          </div>
          <WhyTripEvolvedCards />
          <div className="text-center mt-12">
            <Link
              href="/circulo-evolved"
              className="inline-block font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
            >
              Quero saber mais
            </Link>
          </div>
        </div>
      </section>

      <CirculoEvolvedSection
        onCtaClick={() => router.push('/circulo-evolved')}
        eventSource="Circulo Evolved Section - Home"
        event="pre_descobrir_viagem"
        ctaText="Quero saber mais"
        id="circulo-evolved-section"
      />

      {/* Products Carousel */}
      {/*<section className="py-12 bg-white">
        <div className="w-full md:w-[90%] mx-auto px-4 md:px-0">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <ProductsCarousel />
          </div>
        </div>
      </section>*/}

      {/* Collections Preview */}
      <section className="py-24 bg-white text-secondary-700">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-4xl md:text-5xl font-bold text-secondary-700">
              Encontre sua próxima jornada
            </h2>
            <p className="font-comfortaa text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              Coleções curadas para inspirar e facilitar seu planejamento.
            </p>
          </div>

          {isCollectionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-[360px]" />
                  <div className="mt-4 h-6 bg-gray-200 rounded w-3/4" />
                  <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collections.map((c) => (
                <CollectionCard
                  key={c.uniqueName}
                  uniqueName={c.uniqueName}
                  title={c.title}
                  subtitle={c.subtitle}
                  image={c.images?.[0]?.url}
                  travelerType={c.travelerType}
                  isAvailableForPublic={c.isAvailableForPublic}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="font-comfortaa text-gray-600">
                Em breve teremos novas coleções para inspirar sua próxima viagem.
              </p>
              <div className="mt-6">
                <Link
                  href="/experiencias"
                  className="inline-flex items-center justify-center font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                  Explorar experiências
                </Link>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/experiencias"
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Ver todas as inspirações
            </Link>
          </div>
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
            Sua próxima jornada merece ser melhor. Vamos começar?
          </h2>
          <Link
            href="/circulo-evolved"
            className="inline-block font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
          >
            Quero saber mais
          </Link>
        </div>
      </section>
    </div>
  )
} 