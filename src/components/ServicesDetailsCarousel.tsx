import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/common/Button'

const services = [
  {
    id: 'jornada-evolved',
    title: 'Jornada Evolved',
    subtitle: 'Cuidamos de tudo, do início ao fim',
    description: 'Você entende que viagens extraordinárias não acontecem por acaso - elas são criadas com dedicação, conhecimento e paixão. Nossa Jornada Evolved é para quem quer viver uma experiência verdadeiramente premium, onde cada detalhe é pensado e executado com excelência.',
    details: [
      'Consultoria completa e personalizada',
      'Todos os detalhes cuidados por especialistas',
      'Suporte 24/7 durante toda a viagem',
      'Experiências exclusivas e únicas',
      'Concierge dedicado para suas necessidades'
    ],
    feeDescription: 'Taxa de consultoria',
    image: '/assets/home/yosemite-valley.jpg',
    color: 'from-secondary-500 to-secondary-600'
  },
  {
    id: 'plano-evolved',
    title: 'Plano Evolved',
    subtitle: 'Liberdade com expertise nos momentos certos',
    description: 'Você valoriza sua independência, mas sabe que alguns momentos merecem a expertise de quem realmente conhece o destino. Você mantém a liberdade de explorar, enquanto nós cuidamos do que realmente importa - hospedagens perfeitas, voos estratégicos e conexões que fazem a diferença.',
    details: [
      'Planejamento dos elementos essenciais',
      'Flexibilidade para explorar livremente',
      'Hospedagens e voos cuidadosamente selecionados',
      'Dicas exclusivas de especialistas',
      'Suporte quando você precisar'
    ],
    feeDescription: 'Adiantamento para planejamento',
    image: '/assets/home/sancho-praia.jpg',
    color: 'from-primary-500 to-primary-600'
  },
  {
    id: 'evolved-experiencias',
    title: 'Evolved Experiências',
    subtitle: 'Cada dia, uma experiência única',
    description: 'Você quer transformar cada momento da viagem em algo extraordinário. Nossos especialistas mergulham no seu destino e criam um roteiro diário que vai muito além do óbvio. Cada manhã, tarde e noite será uma descoberta, uma surpresa, uma experiência que você nunca esquecerá.',
    details: [
      'Roteiro detalhado dia a dia',
      'Experiências únicas e autênticas',
      'Restaurantes e atrações exclusivas',
      'Script personalizado para sua viagem',
      'Momentos que contam histórias'
    ],
    feeDescription: 'Taxa por dia de roteiro',
    image: '/assets/home/hero-praia.jpg',
    color: 'from-accent-500 to-accent-600'
  }
]

export default function ServicesDetailsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {services.map((service) => (
            <div 
              key={service.id}
              className="w-full flex-shrink-0 relative h-screen"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-white">
                      <h3 className="font-baloo text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        {service.title}
                      </h3>
                      <p className="font-baloo text-xl md:text-2xl text-accent-300 mb-6">
                        {service.subtitle}
                      </p>
                      <p className="font-comfortaa text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Details List */}
                      <div className="mb-8">
                        {service.details.map((detail, index) => (
                          <div key={index} className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 bg-accent-400 rounded-full flex-shrink-0"></div>
                            <span className="font-comfortaa text-white/90">{detail}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Fee and CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="text-accent-400 font-baloo font-semibold text-lg">
                          {service.feeDescription}
                        </div>
                        <Link 
                          href={`/${service.id}`}
                          className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
                        >
                          Conhecer mais
                        </Link>
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className="hidden lg:block">
                      <div className={`w-full h-96 rounded-2xl bg-gradient-to-br ${service.color} opacity-20`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6">
        {/* Previous Arrow */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)}
          className="text-white/70 hover:text-white transition-colors p-2"
          aria-label="Previous service"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex space-x-4">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentIndex ? 'bg-accent-400 w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to ${services[index].title}`}
            />
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % services.length)}
          className="text-white/70 hover:text-white transition-colors p-2"
          aria-label="Next service"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
} 