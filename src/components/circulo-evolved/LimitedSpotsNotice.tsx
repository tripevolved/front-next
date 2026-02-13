'use client'

import { useEffect, useState } from 'react'
import { CustomersService } from '@/clients/customers'
import type { SubscriptionsResponse } from '@/clients/customers'

export default function LimitedSpotsNotice() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await CustomersService.getSubscriptions()
        console.log(data);
        if (!cancelled) {
          setSubscriptions(data)
        }
      } catch {
        if (!cancelled) {
          setSubscriptions(null)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="bg-white/10 border-2 border-accent-400/50 rounded-2xl p-6 max-w-2xl mx-auto mb-10 text-center">
      {isLoading && (
        <div className="flex items-center justify-center gap-2 mb-3" aria-busy="true" aria-label="Carregando vagas">
          <span className="inline-block w-2 h-2 rounded-full bg-white/80 animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="inline-block w-2 h-2 rounded-full bg-white/80 animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="inline-block w-2 h-2 rounded-full bg-white/80 animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      )}
      {!isLoading && subscriptions != null ? (
        <p className="font-baloo text-xl font-semibold text-white mb-2">
          Restam <strong className="text-accent-400">apenas {subscriptions.available}</strong> vagas das <strong className="text-white">{subscriptions.max}</strong> que liberamos no momento.
        </p>
      ) : (
        <p className="font-baloo text-xl font-semibold text-white mb-2">
          Vagas limitadas
        </p>
      )}
      <p className="font-comfortaa text-white/90 leading-relaxed">
        O Círculo Evolved tem um número limitado de vagas para que você tenha o cuidado que você precisa e a melhor experiência em cada viagem.
      </p>
    </div>
  )
}
