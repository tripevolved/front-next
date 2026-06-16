'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CollectionsApiService } from '@/clients/collections'
import type { Collection } from '@/clients/collections'
import type { CollectionSlug } from './types'

type Props = {
  collectionSlug: CollectionSlug
  onRetry: () => void
}

const travelerTypeLabel = (travelerType: Collection['travelerType']) => {
  if (travelerType === 'FAMILY') return 'Família'
  return 'Casal'
}

export function CollectionQuizResult({ collectionSlug, onRetry }: Props) {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await CollectionsApiService.getCollectionByUniqueName(collectionSlug)
        if (!cancelled) setCollection(data)
      } catch {
        if (!cancelled) {
          setCollection(null)
          setError('Não conseguimos carregar os detalhes da coleção. Tente novamente.')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [collectionSlug])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600 mb-4" />
        <p className="text-gray-600 font-comfortaa text-sm">Preparando sua coleção...</p>
      </div>
    )
  }

  if (error || !collection) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <p className="text-red-600 mb-6">{error ?? 'Coleção não encontrada.'}</p>
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 font-baloo"
        >
          Refazer quiz
        </button>
      </div>
    )
  }

  const imageUrl = collection.images?.[0]?.url ?? '/assets/blank-image.png'

  return (
    <div className="max-w-lg mx-auto py-12 px-6">
      <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 text-center mb-8">
        Sua coleção é...
      </h2>

      <Link
        href={`/colecoes/${collection.uniqueName}`}
        className="group relative block aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg"
      >
        <Image
          src={imageUrl}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 512px) 100vw, 512px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute top-4 left-4 bg-accent-500/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-baloo">
          {travelerTypeLabel(collection.travelerType)}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="font-baloo text-2xl md:text-3xl font-bold leading-tight">{collection.title}</h3>
          {collection.subtitle ? (
            <p className="mt-2 font-comfortaa text-sm text-white/90">{collection.subtitle}</p>
          ) : null}
        </div>
      </Link>

      {collection.description ? (
        <p className="mt-6 text-gray-600 font-comfortaa text-center line-clamp-3">{collection.description}</p>
      ) : null}

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          href={`/colecoes/${collection.uniqueName}`}
          className="inline-block font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
        >
          Explorar coleção →
        </Link>
        <button
          type="button"
          onClick={onRetry}
          className="font-comfortaa text-sm text-secondary-600 hover:text-secondary-900 underline-offset-2 hover:underline"
        >
          Refazer quiz
        </button>
      </div>
    </div>
  )
}
