'use client'

import { useEffect } from 'react'

import { getAccessToken } from '@auth0/nextjs-auth0/client'
import { useAppStore } from '@/core/store'
import { updateTravelerState } from '@/services/user/update-traveler-state'

declare global {
  interface Window {
    __traveler_state_bootstrap_inflight__?: boolean
  }
}

function isExpiredAuthError(error: unknown): boolean {
  const anyErr = error as any
  const msg = String(anyErr?.message ?? anyErr?.error_description ?? anyErr?.error ?? '')
  return (
    msg.toLowerCase().includes('access token has expired') ||
    msg.toLowerCase().includes('refresh token was not provided') ||
    msg.toLowerCase().includes('needs to re-authenticate')
  )
}

function redirectToLogin(): void {
  if (typeof window === 'undefined') return
  const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`
  window.location.assign(`/auth/login?returnTo=${encodeURIComponent(returnTo)}`)
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
          let credentials: string | null = null
          try {
            credentials = await getAccessToken()
          } catch (error) {
            if (isExpiredAuthError(error)) {
              redirectToLogin()
              return
            }
            // other auth errors: keep retrying for a short period
          }
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

