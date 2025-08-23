'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { mockExperiences } from '@/core/types/experiences'

export default function ExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mockExperiences.length)
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
          {mockExperiences.map((experience) => (
            <div 
              key={experience.name}
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
                    href={`/experiencias/${experience.name}`}
                    className="inline-block font-baloo text-white border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-secondary-500 transition-all"
                  >
                    Conhecer esta experiência
                  </Link>
                </div>

                {/* Image */}
                <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={experience.images[0]}
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
        {mockExperiences.map((_, index) => (
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