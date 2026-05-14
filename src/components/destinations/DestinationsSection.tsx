'use client'

import { useEffect, useMemo, useState } from 'react'

import DestinationCard from '@/components/destinations/DestinationCard'
import { SuggestDestinationForCuratorship } from '@/components/destinations/SuggestDestinationForCuratorship'
import { DestinationsApiService } from '@/clients/destinations'
import type { Destination } from '@/clients/destinations/destinations'

const PAGE_SIZE = 6

export default function DestinationsSection() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const hasMore = useMemo(() => page < totalPages, [page, totalPages])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    let isMounted = true
    const fetchFirstPage = async () => {
      setIsLoading(true)
      try {
        const response = await DestinationsApiService.getDestinations({
          profile: 'all',
          limit: PAGE_SIZE,
          page: 1,
          search: debouncedSearchTerm,
        })
        if (!isMounted) return
        setDestinations(response.destinations)
        setTotalPages(response.totalPages)
        setPage(1)
      } catch (error) {
        console.error('Error fetching destinations:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchFirstPage()
    return () => {
      isMounted = false
    }
  }, [debouncedSearchTerm])

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return
    const nextPage = page + 1
    setIsLoadingMore(true)
    try {
      const response = await DestinationsApiService.getDestinations({
        profile: 'all',
        limit: PAGE_SIZE,
        page: nextPage,
        search: debouncedSearchTerm,
      })
      setDestinations((prev) => [...prev, ...response.destinations])
      setPage(nextPage)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error('Error fetching more destinations:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <section id="destinos" className="py-20 bg-gray-50">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="mb-12">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-4 text-secondary-500">
            Destinos para inspirar
          </h2>
          <p className="font-comfortaa text-lg text-gray-600 mb-8">
            Descubra lugares feitos para o seu jeito de viajar
          </p>

          <form onSubmit={handleSearch} className="max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar destinos..."
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent font-comfortaa"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-[400px]" />
                <div className="mt-4 h-6 bg-gray-200 rounded w-3/4" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : destinations && destinations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.destinationId}
                  title={destination.name}
                  image={destination.coverImage?.url || '/assets/destino/no-image-background.jpg'}
                  profile={destination.travelerProfile}
                  link={`/destinos/${destination.uniqueName}`}
                />
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="font-baloo text-2xl font-bold text-gray-700 mb-4">Nenhum destino encontrado</h3>
            <p className="text-gray-600 font-comfortaa text-lg mb-8 max-w-md mx-auto">
              {searchTerm
                ? `Não encontramos destinos para "${searchTerm}". Tente uma busca diferente ou explore todos os nossos destinos.`
                : 'Não há destinos disponíveis no momento.'}
            </p>
            {debouncedSearchTerm.trim() ? (
              <div className="max-w-md mx-auto text-left">
                <SuggestDestinationForCuratorship
                  destinationQuery={debouncedSearchTerm}
                  anonymousContactMode="modal"
                />
              </div>
            ) : null}
            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="inline-block font-baloo bg-accent-500 text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-accent-600 transition-all mt-4"
              >
                Limpar busca
              </button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
