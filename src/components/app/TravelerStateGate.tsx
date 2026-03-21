'use client'

import { Suspense, useEffect, useState } from 'react'

import { useAppStore } from '@/core/store'

const FALLBACK_TIMEOUT_MS = 15_000

function TravelerStateLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div
        className="h-12 w-12 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"
        aria-hidden
      />
    </div>
  )
}

interface TravelerStateGateProps {
  children: React.ReactNode
}

/**
 * Gates rendering of children until travelerState is bootstrapped.
 * Shows a loading fallback until the state has an id, or until the fallback
 * timeout elapses (fail-open to avoid blocking the app indefinitely).
 * Wrapped in Suspense so route transitions also show the fallback.
 */
export function TravelerStateGate({ children }: TravelerStateGateProps) {
  const travelerState = useAppStore((state) => state.travelerState)
  const [timedOut, setTimedOut] = useState(false)

  const isReady = Boolean(travelerState?.id)
  const shouldRender = isReady || timedOut

  useEffect(() => {
    if (isReady) return

    const id = window.setTimeout(() => {
      setTimedOut(true)
    }, FALLBACK_TIMEOUT_MS)

    return () => window.clearTimeout(id)
  }, [isReady])

  if (!shouldRender) {
    return <TravelerStateLoadingFallback />
  }

  return (
    <Suspense fallback={<TravelerStateLoadingFallback />}>
      {children}
    </Suspense>
  )
}
