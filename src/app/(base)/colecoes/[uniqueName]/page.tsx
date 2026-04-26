'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { CollectionsApiService } from '@/clients/collections'
import type { Collection } from '@/clients/collections'
import CollectionAccommodationsSection from '@/components/accommodation/CollectionAccommodationsSection'

const travelerTypeLabel = (travelerType: Collection['travelerType']) => {
  if (travelerType === 'FAMILY') return 'Família'
  return 'Casal'
}

export default function ColecaoPage() {
  const params = useParams<{ uniqueName: string }>()
  const uniqueName = params?.uniqueName

  const [collection, setCollection] = useState<Collection | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const heroImageUrl = useMemo(() => collection?.images?.[0]?.url ?? null, [collection])

  useEffect(() => {
    let cancelled = false
    const fetchCollection = async () => {
      if (!uniqueName) return
      setIsLoading(true)
      try {
        const data = await CollectionsApiService.getCollectionByUniqueName(uniqueName)
        if (!cancelled) setCollection(data)
      } catch (error) {
        console.error('Error fetching collection:', error)
        if (!cancelled) setCollection(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetchCollection()
    return () => {
      cancelled = true
    }
  }, [uniqueName])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative overflow-hidden bg-secondary-900">
          <div className="relative w-full md:w-[80%] mx-auto px-4 md:px-0 py-24 md:py-28">
            <div className="animate-pulse">
              <div className="h-10 bg-white/20 rounded w-2/3" />
              <div className="mt-4 h-6 bg-white/15 rounded w-1/2" />
              <div className="mt-10 h-24 bg-white/10 rounded w-full max-w-2xl" />
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="py-24">
          <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
            <h1 className="font-baloo text-4xl md:text-5xl font-bold text-secondary-700">
              Coleção não encontrada
            </h1>
            <p className="font-comfortaa text-gray-600 mt-4">
              Não conseguimos encontrar essa coleção. Tente novamente ou explore outras inspirações.
            </p>
            <div className="mt-10">
              <Link
                href="/experiencias"
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Ir para inspirações
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary-900">
        {heroImageUrl ? (
          <div className="absolute inset-0">
            <Image src={heroImageUrl} alt={collection.title} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/85 via-secondary-900/55 to-secondary-900/10" />
          </div>
        ) : null}

        <div className="relative w-full md:w-[80%] mx-auto px-4 md:px-0 py-24 md:py-32">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-accent-500/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-baloo">
              {travelerTypeLabel(collection.travelerType)}
            </div>
            <h1 className="font-baloo text-4xl md:text-6xl font-bold leading-tight mt-5">
              {collection.title}
            </h1>
            {collection.subtitle ? (
              <p className="font-comfortaa text-lg md:text-xl text-white/90 mt-4">{collection.subtitle}</p>
            ) : null}
            {collection.description ? (
              <p className="font-comfortaa text-base md:text-lg text-white/85 mt-8 max-w-xl">
                {collection.description}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Accommodations */}
      <CollectionAccommodationsSection
        collectionUniqueName={collection.uniqueName}
        travelerType={collection.travelerType}
      />

      {/* Circulo Evolved highlight */}
      <section className="py-20 bg-primary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-primary-900">
            Tenha acesso à nossa curadoria completa no Círculo Evolved
          </h2>
          <p className="text-primary-700 font-comfortaa text-lg mb-10 max-w-3xl mx-auto">
            Além de tarifas exclusivas e sem comissão, que só as agências de viagem têm acesso.
          </p>
          <Link
            href="/app/circulo-evolved/checkout"
            className="inline-block font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
          >
            Quero fazer parte
          </Link>
        </div>
      </section>
    </div>
  )
}

