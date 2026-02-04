import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 'cruzeiros-extraordinarios',
    title: 'Cruzeiros Extraordinários',
    description: 'Descubra destinos incríveis a bordo dos melhores navios, com experiências exclusivas e concierge que você só recebe na Trip Evolved.',
    image: '/assets/home/cruzeiros-extraordinarios.jpg',
    link: '/cruzeiros-extraordinarios'
  }
]

export default function ProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const hasMultiple = products.length > 1

  useEffect(() => {
    if (!hasMultiple) return
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [hasMultiple])

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="w-full flex-shrink-0 relative h-screen"
            >
              {/* Background Image */}
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-8">
                  <h3 className="font-baloo text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8">
                    {product.title}
                  </h3>
                  <p className="font-comfortaa text-xl md:text-2xl lg:text-3xl mb-12 text-white/90 leading-relaxed">
                    {product.description}
                  </p>
                  <Link 
                    href={product.link}
                    className="inline-block font-baloo bg-accent-500 text-white px-16 py-6 rounded-full text-xl md:text-2xl font-semibold hover:bg-accent-600 transition-all min-w-[200px] md:min-w-[250px]"
                  >
                    Conhecer mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators - only when more than one product */}
      {hasMultiple && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {products.map((_, index) => (
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
      )}
    </div>
  )
} 