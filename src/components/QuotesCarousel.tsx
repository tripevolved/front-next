'use client'

import { useState, useEffect } from 'react'
import QuoteCard from './QuoteCard'

interface Quote {
  text: string
  footer: string
  footerSub: string
}

const quotes: Quote[] = [
  {
    text: "Foi tudo perfeito, amamos tudo e já pretendemos voltar ano que vem. Transfer, voo, estadia, passeios, tudo maravilhoso. Minha esposa ficou apaixonada por tudo naquele lugar. Agradeço pela atenção e cuidado que tiveram com nosso momento especial.",
    footer: "Leandro M",
    footerSub: "Viajou para Porto de Galinhas, PE"
  },
  {
    text: "Gostaria de elogiar o excelente serviço prestado, suprindo além do esperado as necessidades em viagem, hospedagem e locação de veículos. Auxílio que superou qualquer atendimento de outras agências. Só gratidão.",
    footer: "Alexandra A",
    footerSub: "Viajou para Roma, Itália"
  },
  {
    text: "Foi perfeito, tudo perfeito. Obrigadaaaa",
    footer: "Cassiane O",
    footerSub: "Viajou para Dubai, Emirados Árabes Unidos"
  },
  {
    text: "Passando para agradecer pela viagem, estava tudo maravilhoso e muito bem pensado. Vocês entenderam bem nosso perfil e o que a gente gosta. Desde passagem aérea, locação de carro, hotéis... os hotéis estavam maravilhosos!",
    footer: "Suzimara G",
    footerSub: "Viajou para El Calafate e Ushuaia, Argentina"
  }
]

export default function QuotesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 3 : 1)
    }

    // Initial update
    updateItemsPerPage()

    // Update on resize
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + itemsPerPage
        return nextIndex >= quotes.length ? 0 : nextIndex
      })
    }, 8000)

    return () => clearInterval(timer)
  }, [itemsPerPage, mounted])

  // Don't render anything until after hydration
  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ 
            transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * 2}rem))` 
          }}
        >
          {quotes.map((quote, index) => (
            <div 
              key={index}
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