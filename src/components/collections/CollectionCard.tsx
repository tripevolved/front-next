'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { TravelerType } from '@/clients/collections'

interface CollectionCardProps {
  uniqueName: string
  title: string
  subtitle?: string
  image?: string
  travelerType?: TravelerType
  isAvailableForPublic?: boolean
  isLoggedIn?: boolean
  /** Skip login/public gating — card is always interactive (e.g. experiencias drawer). */
  treatAsAccessible?: boolean
  /** Hide the footer CTA chip (Explorar / login prompt). */
  hideFooterAction?: boolean
  /** When set (e.g. painel drawer), the card acts as a button instead of linking to `/colecoes/...`. */
  onSelect?: () => void
}

const travelerTypeLabel = (travelerType?: TravelerType) => {
  if (travelerType === 'FAMILY') return 'Família'
  return 'Casal'
}

export default function CollectionCard({
  uniqueName,
  title,
  subtitle,
  image,
  travelerType,
  isAvailableForPublic,
  isLoggedIn,
  treatAsAccessible = false,
  hideFooterAction = false,
  onSelect,
}: CollectionCardProps) {
  const isPublic = isAvailableForPublic !== false
  const canAccess = treatAsAccessible || isPublic || Boolean(isLoggedIn)
  const targetHref = canAccess
    ? `/colecoes/${uniqueName}`
    : `/auth/login?returnTo=${encodeURIComponent(`/colecoes/${uniqueName}`)}`

  const inner = (
    <>
      <Image
        src={image || '/assets/blank-image.png'}
        alt={title}
        fill
        className={[
          'object-cover transition-transform duration-500',
          canAccess ? 'group-hover:scale-110' : 'grayscale',
        ].join(' ')}
      />

      <div
        className={[
          'absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent',
          canAccess ? '' : 'bg-black/25',
        ].join(' ')}
      />

      <div className="absolute top-4 left-4 bg-accent-500/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-baloo">
        {travelerTypeLabel(travelerType)}
      </div>

      <div
        className={[
          'absolute bottom-0 left-0 right-0 p-6 text-white',
          hideFooterAction ? 'pb-6 pr-6' : 'pr-32 pb-16',
        ].join(' ')}
      >
        <h3 className="font-baloo text-2xl font-bold leading-tight">{title}</h3>
        {subtitle ? <p className="mt-2 font-comfortaa text-sm text-white/90">{subtitle}</p> : null}
      </div>

      {!hideFooterAction ? (
        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center gap-2 font-baloo text-white/95 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm transition-all group-hover:bg-white/20">
            {!canAccess ? (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            ) : null}
            {canAccess ? 'Explorar' : 'Crie sua conta no Círculo Evolved para explorar'} <span aria-hidden>→</span>
          </span>
        </div>
      ) : null}
    </>
  )

  const shellClass =
    'group relative block h-[360px] rounded-xl overflow-hidden w-full text-left border-0 p-0 cursor-pointer'

  if (onSelect && canAccess) {
    return (
      <button type="button" onClick={onSelect} className={shellClass}>
        {inner}
      </button>
    )
  }

  return (
    <Link href={targetHref} className={shellClass}>
      {inner}
    </Link>
  )
}

