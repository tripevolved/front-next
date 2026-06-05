import Image from 'next/image'

export function ExperienciasHero() {
  return (
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
            Receba recomendações de hospedagens, explore coleções, experiências reais ou simplesmente busque um destino
            que vive na sua imaginação. Sempre com a curadoria que nos é característica.
          </p>
          {/* TODO: Finish accommodation recommendation flow — wire ExperienciasHero CTA to AccommodationRecommendationFlowDrawer */}
          <div className="mt-10">
            <a
              href="#colecoes"
              className="inline-flex items-center justify-center font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explorar coleções
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
