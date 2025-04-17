import Image from 'next/image'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import DestinationCard from '@/components/DestinationCard'
import Link from 'next/link'
import QuotesCarousel from '@/components/QuotesCarousel'

const destinations = [
  {
    title: "Bali, Indonésia",
    image: "/assets/destinations/bali.jpg",
    profile: "Aventureiro Cultural",
    link: "/destinos/bali"
  },
  {
    title: "Santorini, Grécia",
    image: "/assets/destinations/santorini.jpg",
    profile: "Romântico",
    link: "/destinos/santorini"
  },
  {
    title: "Machu Picchu, Peru",
    image: "/assets/destinations/machu-picchu.jpg",
    profile: "Explorador",
    link: "/destinos/machu-picchu"
  },
  {
    title: "Maldivas",
    image: "/assets/destinations/maldives.jpg",
    profile: "Relaxado",
    link: "/destinos/maldives"
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-bg.jpg"
            alt="Beautiful travel destination"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-baloo text-5xl md:text-7xl font-bold mb-6 text-white">
              A viagem perfeita não se encontra. Ela se cria
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              Jornadas sob medida, pensadas para seu estilo. Porque <span className="font-bold">exclusividade</span> começa com personalização.
            </p>
            <button className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all">
              Descobrir minha viagem
            </button>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-24 bg-gray-100">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content Column */}
            <div className="w-full lg:w-[70%]">
              <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-6 text-secondary-500">
                Sua viagem única começa aqui
              </h2>
              <p className="font-comfortaa text-xl text-gray-600 mb-8">
                Roteiros exclusivos e personalizados para você viver experiências autênticas que combinam com seu estilo de viajante.
              </p>
              <button className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all">
                Descobrir minha viagem
              </button>
            </div>

            {/* Images Column */}
            <div className="relative w-full lg:w-[30%] h-[400px]">
              <div className="absolute right-0 top-0 w-4/5 h-72 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/scenery1.jpg"
                  alt="Beautiful travel destination"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute right-8 top-48 w-4/5 h-72 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/scenery2.jpg"
                  alt="Amazing landscape"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Destinations */}
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-4 text-secondary-500">
              Descubra lugares feitos para o seu jeito de viajar
            </h2>
            <p className="font-comfortaa text-xl text-gray-600">
              Experiências únicas em destinos selecionados por nossos especialistas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={index}
                {...destination}
              />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/destinos"
              className="inline-block font-baloo text-primary-600 hover:text-primary-700 text-lg font-semibold transition-colors"
            >
              Ver todos os destinos →
            </Link>
          </div>
        </div>
      </section>

      {/* Fourth Section - Experiences Carousel */}
      <section className="py-24 bg-secondary-500">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-4xl md:text-5xl font-bold mb-12 text-white">
            Viagens que não saem da nossa mente
          </h2>
          <ExperienceCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-center mb-12 text-primary-900">
            Por Que Nos Escolher
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Experiências Personalizadas',
                description: 'Planos de viagem adaptados aos seus gostos e estilo'
              },
              {
                title: 'Orientação Especializada',
                description: 'Especialistas em viagens para guiá-lo em cada etapa'
              },
              {
                title: 'Planejamento Simplificado',
                description: 'Organização de viagem sem complicações do início ao fim'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white border border-primary-100">
                <h3 className="font-baloo text-xl font-semibold mb-4 text-primary-700">{feature.title}</h3>
                <p className="font-comfortaa text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-primary-900">
            Pronto para Começar Sua Aventura?
          </h2>
          <p className="font-comfortaa text-xl text-primary-700 mb-8">
            Deixe-nos ajudar a criar memórias inesquecíveis
          </p>
          <button className="font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all">
            Começar Agora
          </button>
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
    </div>
  )
} 