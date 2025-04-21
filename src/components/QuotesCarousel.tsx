'use client'

import { useState, useEffect } from 'react'
import QuoteCard from './QuoteCard'

interface Quote {
  id: number
  quote: string
  name: string
  avatar: string
  destination: string
}

const quotes: Quote[] = [
  {
    id: 1,
    quote: "Uma experiência única que superou todas as expectativas. Cada detalhe foi cuidadosamente planejado para proporcionar momentos inesquecíveis.",
    name: "Ana Silva",
    avatar: "/assets/avatars/ana.jpg",
    destination: "Bali"
  },
  {
    id: 2,
    quote: "A personalização do roteiro foi perfeita. Conseguiram captar exatamente o que eu queria viver naquela viagem.",
    name: "Carlos Mendes",
    avatar: "/assets/avatars/carlos.jpg",
    destination: "Santorini"
  },
  {
    id: 3,
    quote: "Cada momento foi uma surpresa agradável. A atenção aos detalhes fez toda a diferença na experiência.",
    name: "Mariana Costa",
    avatar: "/assets/avatars/mariana.jpg",
    destination: "Machu Picchu"
  },
  {
    id: 4,
    quote: "Uma viagem que transcendeu o turismo comum. Vivi experiências autênticas que me conectaram com a cultura local.",
    name: "Ricardo Santos",
    avatar: "/assets/avatars/ricardo.jpg",
    destination: "Maldivas"
  },
  {
    id: 5,
    quote: "O suporte durante toda a viagem foi excepcional. Me senti seguro e bem cuidado em cada etapa.",
    name: "Patrícia Lima",
    avatar: "/assets/avatars/patricia.jpg",
    destination: "Bali"
  },
  {
    id: 6,
    quote: "Uma jornada que mudou minha perspectiva sobre viagens. Agora entendo o verdadeiro significado de experiências personalizadas.",
    name: "Lucas Oliveira",
    avatar: "/assets/avatars/lucas.jpg",
    destination: "Santorini"
  }
]

export default function QuotesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 1

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + itemsPerPage
        return nextIndex >= quotes.length ? 0 : nextIndex
      })
    }, 8000)

    return () => clearInterval(timer)
  }, [itemsPerPage])

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ 
            transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * 2}rem))` 
          }}
        >
          {quotes.map((quote) => (
            <div 
              key={quote.id}
              className="w-full lg:w-1/3 flex-shrink-0 px-2"
            >
              <QuoteCard {...quote} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 mt-8">
        {Array.from({ length: Math.ceil(quotes.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.floor(currentIndex / itemsPerPage) === index ? 'bg-accent-500 w-4' : 'bg-accent-500/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 