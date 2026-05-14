'use client'

import Link from 'next/link'
import { TripTimeline } from '@/components/trips/TripTimeline'

export default function ViagensPassadasPage() {
  return (
    <div className="max-w-4xl mx-auto my-2">
      <div className="flex items-center gap-4">
        <Link
          href="/app"
          className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao painel
        </Link>
      </div>
      <TripTimeline variant="past" />
    </div>
  )
}
