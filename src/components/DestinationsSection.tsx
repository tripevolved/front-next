'use client'

import Link from 'next/link'
import DestinationCard from '@/components/DestinationCard'
import { DestinationsApiService } from '@/clients/destinations'
import { useEffect, useState } from 'react'
import { Destination } from '@/clients/destinations/destinations'

export default function DestinationsSection() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await DestinationsApiService.getDestinations({
          uniqueName: 'all',
          limit: 4,
          page: 1
        })
        setDestinations(response.destinations)
      } catch (error) {
        console.error('Error fetching destinations:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  if (isLoading) {
    return (
      <section className="py-24">
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
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
                <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24">
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
          {destinations && destinations.map((destination) => (
            <DestinationCard
              key={destination.destinationId}
              title={destination.name}
              image={destination.coverImage?.sources.find(source => source.type === 'md')?.url || '/assets/destino/no-image-background.jpg'}
              profile={destination.travelerProfile}
              link={`/destinos/${destination.uniqueName}`}
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
  )
} 