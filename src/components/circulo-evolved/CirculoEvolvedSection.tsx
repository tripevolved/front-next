'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import { EventType } from '@/components/basic/FacebookPixel'
import { CustomersService } from '@/clients/customers'
import type { SubscriptionsResponse } from '@/clients/customers'
import { formatCurrency } from '@/utils/helpers/currency.helper'
import LimitedSpotsNotice from './LimitedSpotsNotice'

interface CirculoEvolvedSectionProps {
  onCtaClick: () => void
  showPrice?: boolean
  eventSource?: string
  event?: EventType
  ctaText?: string
  id?: string
  className?: string
  /**
   * When true (default), loads customers/subscriptions inside this section.
   * Set to false to pass data from a parent that already fetched (one request per page).
   */
  manageSubscriptionsLocally?: boolean
  /** Used when manageSubscriptionsLocally is false. */
  subscriptionsSnapshot?: SubscriptionsResponse | null
  /** Used when manageSubscriptionsLocally is false. */
  subscriptionsSnapshotLoading?: boolean
}

export default function CirculoEvolvedSection({
  onCtaClick,
  showPrice = false,
  eventSource = 'Círculo Evolved Section',
  event = 'pre_descobrir_viagem',
  ctaText = 'Conhecer o Círculo Evolved',
  id,
  className = '',
  manageSubscriptionsLocally = true,
  subscriptionsSnapshot = null,
  subscriptionsSnapshotLoading = false,
}: CirculoEvolvedSectionProps) {
  const [internalSubscriptions, setInternalSubscriptions] = useState<SubscriptionsResponse | null>(null)
  const [internalLoading, setInternalLoading] = useState(true)

  useEffect(() => {
    if (!manageSubscriptionsLocally) {
      return
    }
    let cancelled = false

    const load = async () => {
      try {
        const data = await CustomersService.getSubscriptions()
        if (!cancelled) {
          setInternalSubscriptions(data)
        }
      } catch {
        if (!cancelled) {
          setInternalSubscriptions(null)
        }
      } finally {
        if (!cancelled) {
          setInternalLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [manageSubscriptionsLocally])

  const subscriptions = manageSubscriptionsLocally ? internalSubscriptions : subscriptionsSnapshot
  const subscriptionsLoading = manageSubscriptionsLocally ? internalLoading : subscriptionsSnapshotLoading

  return (
    <section id={id} className={`py-20 bg-secondary-500 ${className}`}>
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="text-center mb-12">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-4">
            Círculo Evolved
          </h2>
          <p className="font-comfortaa text-lg text-white/90 max-w-2xl mx-auto">
            Viajar bem também significa investir melhor. Um pagamento anual te dá acesso a curadoria única e valores sem comissão para suas viagens, que você <span className="text-accent-500 font-semibold">não encontra em outro lugar</span>.
          </p>
        </div>

        <ul className="max-w-2xl mx-auto space-y-4 mb-10">
          <li className="flex gap-4 font-comfortaa text-white/90 items-start">
            <Image
              src="/assets/icons/icon-check-gold.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0 mt-0.5 w-6 h-6"
            />
            <span><strong className="font-baloo text-white">Curadoria</strong> — Seleção de destinos, cruzeiros e experiências alinhados ao que você busca.</span>
          </li>
          <li className="flex gap-4 font-comfortaa text-white/90 items-start">
            <Image
              src="/assets/icons/icon-check-gold.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0 mt-0.5 w-6 h-6"
            />
            <span><strong className="font-baloo text-white">Desenho de viagem</strong> — Serviço completo de planejamento e desenho da sua jornada sob medida.</span>
          </li>
          <li className="flex gap-4 font-comfortaa text-white/90 items-start">
            <Image
              src="/assets/icons/icon-check-gold.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0 mt-0.5 w-6 h-6"
            />
            <span><strong className="font-baloo text-white">Valores sem comissão ou cashback</strong> — Comissões revertidas em descontos ou cashback para você: você vê o valor real.</span>
          </li>
        </ul>

        {showPrice && (
          <div className="text-center mb-6 min-h-[3rem] flex items-center justify-center">
            {subscriptionsLoading ? (
              <span className="inline-flex gap-1.5" aria-busy="true" aria-label="Carregando preço">
                <span className="inline-block w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                <span className="inline-block w-2 h-2 rounded-full bg-white/80 animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="inline-block w-2 h-2 rounded-full bg-white/80 animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
            ) : subscriptions != null ? (
              <span className="font-baloo text-4xl md:text-5xl font-bold text-accent-400">
                {formatCurrency(subscriptions.priceWithTravelAdvisor)}
              </span>
            ) : null}
          </div>
        )}

        <div className="bg-white/15 border-2 border-accent-400/60 rounded-2xl p-6 max-w-2xl mx-auto mb-4 text-center">
          <p className="font-comfortaa text-white leading-relaxed">
            Você recupera o valor do serviço em descontos ou cashback ao fechar sua viagem — ou recebe a diferença de volta.
          </p>
        </div>

        <LimitedSpotsNotice subscriptions={subscriptions} isLoading={subscriptionsLoading} />

        <div className="text-center">
          <Button
            onClick={onCtaClick}
            event={event}
            eventOptions={{ source: eventSource }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}
