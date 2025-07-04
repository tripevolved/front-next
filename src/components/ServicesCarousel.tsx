import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    id: 'jornadas-a-dois',
    title: 'Jornadas a dois',
    description: 'Viagens românticas e experiências exclusivas criadas especialmente para casais que buscam momentos especiais juntos.',
    image: '/assets/home/sancho-praia.jpg',
    link: '/jornadas-a-dois'
  },
  {
    id: 'cruzeiros-extraordinarios',
    title: 'Cruzeiros Extraordinários',
    description: 'Descubra destinos incríveis a bordo dos melhores navios, com experiências exclusivas e roteiros personalizados.',
    image: '/assets/home/yosemite-valley.jpg',
    link: '/cruzeiros-extraordinarios'
  }
]

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
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
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-8">
                  <h3 className="font-baloo text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    {service.title}
                  </h3>
                  <p className="font-comfortaa text-lg md:text-xl mb-8 text-white/90">
                    {service.description}
                  </p>
                  <Link 
                    href={service.link}
                    className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
                  >
                    Conhecer mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 