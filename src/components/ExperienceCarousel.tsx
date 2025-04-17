'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Experience {
  id: number
  title: string
  description: string
  image: string
  link: string
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Onde o Deserto Encontra o Mar",
    description: "Uma jornada única pelo Atacama, onde cada amanhecer conta uma história diferente e cada dunas esconde segredos milenares.",
    image: "/assets/experiences/atacama.jpg",
    link: "/experiencias/atacama"
  },
  {
    id: 2,
    title: "Entre Montanhas e Vinhedos",
    description: "Descubra a magia dos Andes argentinos, onde a natureza esculpiu paisagens que parecem saídas de um sonho.",
    image: "/assets/experiences/mendoza.jpg",
    link: "/experiencias/mendoza"
  },
  {
    id: 3,
    title: "O Ritmo do Caribe Colombiano",
    description: "De Cartagena a Tayrona, uma viagem que dança ao som do mar e respira a alegria caribenha em cada esquina.",
    image: "/assets/experiences/caribe.jpg",
    link: "/experiencias/caribe"
  }
]

export default function ExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length)
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
          {experiences.map((experience) => (
            <div 
              key={experience.id}
              className="w-full flex-shrink-0"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                {/* Content */}
                <div className="w-full lg:w-1/2 text-white">
                  <h3 className="font-baloo text-2xl md:text-3xl font-bold mb-4">
                    {experience.title}
                  </h3>
                  <p className="font-comfortaa text-lg mb-6 text-white/90">
                    {experience.description}
                  </p>
                  <Link 
                    href={experience.link}
                    className="inline-block font-baloo text-white border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-secondary-500 transition-all"
                  >
                    Conhecer esta experiência
                  </Link>
                </div>

                {/* Image */}
                <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {experiences.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 