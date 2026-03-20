'use client'

import { useEffect } from 'react'

import { useAppStore } from '@/core/store'
import { updateTravelerState } from '@/services/user/update-traveler-state'
import { auth0 } from '@/lib/auth0'

declare global {
  interface Window {
    __traveler_state_bootstrap_inflight__?: boolean
  }
}

/**
 * Fetches traveler state and persists it into the Zustand app store.
 * No UI; mounted in the authenticated layout so it runs for all protected areas.
 */
export function TravelerStateBootstrap() {
  const travelerState = useAppStore((state) => state.travelerState)

  useEffect(() => {
    const shouldBootstrap = !travelerState || travelerState.id === ''
    if (!shouldBootstrap) return

    const w = window as any
    if (w.__traveler_state_bootstrap_inflight__) return
    w.__traveler_state_bootstrap_inflight__ = true

    const bootstrap = async () => {
      try {
        const maxAttempts = 5

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          // Don't call the backend until Auth0 access token is available.
          const credentials = await auth0.getAccessToken()
          if (credentials) {
            await updateTravelerState()
          }

          const currentId = useAppStore.getState().travelerState?.id
          if (currentId) return

          const waitMs = 300 * (attempt + 1) // 300ms, 600ms, 900ms...
          await new Promise<void>((resolve) => setTimeout(resolve, waitMs))
        }
      } finally {
        w.__traveler_state_bootstrap_inflight__ = false
      }
    }

    void bootstrap()
  }, [travelerState?.id])

  return null
}

