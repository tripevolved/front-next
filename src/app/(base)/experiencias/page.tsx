import Image from 'next/image'
import Link from 'next/link'

import ExperienceCarousel from '@/components/ExperienceCarousel'
import CollectionsSection from '@/components/collections/CollectionsSection'
import DestinationsSection from '@/components/destinations/DestinationsSection'

export default function ExperienciasPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary-900">
        <div className="absolute inset-0">
          <Image
            src="/assets/experiences/california/lake-tahoe-2.png"
            alt="Lago Tahoe"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/85 via-secondary-900/55 to-secondary-900/10" />
        </div>

        <div className="relative w-full md:w-[80%] mx-auto px-4 md:px-0 py-24 md:py-32">
          <div className="max-w-2xl text-white">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold leading-tight">
              Encontre a próxima jornada que vocês vão lembrar para sempre
            </h1>
            <p className="font-comfortaa text-lg md:text-xl text-white/90 mt-6">
              Explore coleções curadas, experiências reais ou simplesmente busque um destino que vive na sua imaginação. Sempre com a curadoria que nos é característica.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#colecoes"
                className="inline-flex items-center justify-center font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Ver coleções
              </a>
              <a
                href="#destinos"
                className="inline-flex items-center justify-center font-baloo bg-white/10 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Explorar destinos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Collections (first) */}
      <div id="colecoes">
        <CollectionsSection />
      </div>

      {/* Destinations (second) */}
      <DestinationsSection />

      {/* Experiences (third) */}
      <section className="py-24 text-secondary-700 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-10 text-secondary-500">
            Experiências para sua inspiração
          </h2>
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
