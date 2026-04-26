'use client'

import { useEffect, useMemo, useState } from 'react'
import { getAccessToken } from '@auth0/nextjs-auth0/client'

import { CollectionsApiService } from '@/clients/collections'
import type { Collection, TravelerType } from '@/clients/collections'
import CollectionCard from '@/components/collections/CollectionCard'

const PAGE_SIZE = 6

interface CollectionsSectionProps {
  travelerType?: TravelerType
}

export default function CollectionsSection({ travelerType = 'COUPLE' }: CollectionsSectionProps) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const hasMore = useMemo(() => {
    if (totalCount == null) return false
    return collections.length < totalCount
  }, [collections.length, totalCount])

  useEffect(() => {
    let isMounted = true
    const fetchFirstPage = async () => {
      setIsLoading(true)
      try {
        const response = await CollectionsApiService.getCollections({
          travelerType,
          offset: 0,
          limit: PAGE_SIZE,
        })
        if (!isMounted) return
        setCollections(response.collections ?? [])
        setOffset((response.offset ?? 0) + (response.count ?? response.collections?.length ?? 0))
        setTotalCount(response.totalCount ?? 0)
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchFirstPage()
    return () => {
      isMounted = false
    }
  }, [travelerType])

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const token = await getAccessToken()
        if (!cancelled) setIsLoggedIn(Boolean(token))
      } catch {
        if (!cancelled) setIsLoggedIn(false)
      }
    }
    check()
    return () => {
      cancelled = true
    }
  }, [])

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    try {
      const response = await CollectionsApiService.getCollections({
        travelerType,
        offset,
        limit: PAGE_SIZE,
      })
      setCollections((prev) => [...prev, ...(response.collections ?? [])])
      setOffset((response.offset ?? offset) + (response.count ?? response.collections?.length ?? 0))
      setTotalCount(response.totalCount ?? totalCount ?? 0)
    } catch (error) {
      console.error('Error fetching more collections:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-500">
              Coleções para encontrar sua próxima jornada
            </h2>
            <p className="font-comfortaa text-gray-600 mt-2">
              Curadorias prontas para inspirar e facilitar seu planejamento.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-[360px]" />
                <div className="mt-4 h-6 bg-gray-200 rounded w-3/4" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : collections.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {collections.map((c) => (
                <CollectionCard
                  key={c.uniqueName}
                  uniqueName={c.uniqueName}
                  title={c.title}
                  subtitle={c.subtitle}
                  image={c.images?.[0]?.url}
                  travelerType={c.travelerType}
                  isAvailableForPublic={c.isAvailableForPublic}
                  isLoggedIn={isLoggedIn}
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
            <h3 className="font-baloo text-2xl font-bold text-gray-700 mb-3">Nenhuma coleção encontrada</h3>
            <p className="text-gray-600 font-comfortaa text-base max-w-md mx-auto">
              Em breve teremos novas coleções para inspirar sua próxima viagem.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

