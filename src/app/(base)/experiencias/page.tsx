import Link from 'next/link'

import ExperienceCarousel from '@/components/ExperienceCarousel'
import CollectionsSection from '@/components/collections/CollectionsSection'
import DestinationsSection from '@/components/destinations/DestinationsSection'
import { ExperienciasHero } from '@/components/experiences/ExperienciasHero'

export default function ExperienciasPage() {
  return (
    <div className="flex flex-col">
      <ExperienciasHero />

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
          <h2 className="font-baloo text-3xl font-bold text-secondary-900 mb-2">
            Quer conhecer o Círculo Evolved para ter acesso a experiências como essas?
          </h2>
          <h6 className="font-comfortaa text-secondary-600 text-sm mb-6">
            Ao se tornar membro do Círculo Evolved, você tem acesso a experiências como essas e a reservas de hospedagens sem comissões, o que significa até 30% de volta no seu bolso, sem descontos artificiais.
          </h6>
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
