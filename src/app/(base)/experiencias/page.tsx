'use client'

import Link from 'next/link'
import ExperienceCarousel from '@/components/ExperienceCarousel'

export default function ExperienciasPage() {
  return (
    <div className="flex flex-col">
      {/* Experiences Carousel Section */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h1 className="font-baloo text-4xl md:text-5xl font-bold mb-12 text-white">
            Viagens incríveis para sua inspiração
          </h1>
          <ExperienceCarousel />
        </div>
      </section>

      {/* Círculo Evolved CTA Section */}
      <section className="py-20 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            Quer conhecer o Círculo Evolved para ter acesso a experiências como essas?
          </h2>
          <Link
            href="/circulo-evolved"
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Conhecer o Círculo Evolved
          </Link>
        </div>
      </section>
    </div>
  )
}
