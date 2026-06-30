'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { QuizAnswers } from '@/components/quiz'
import type { Destination } from '@/clients/destinations/destinations'
import { DestinationsBrowseList } from '@/components/destinations/DestinationsBrowseList'
import { ProposalFlowPageLayout } from '@/components/app/ProposalFlowPageLayout'
import { AppMultiStepFlowShell } from '@/components/app/AppMultiStepFlowShell'

export const DESTINATION_PREFERENCE_ID = 'destinationPreference' as const

const OPEN_SUGGESTIONS_IMAGE =
  'https://res.cloudinary.com/tripevolved/image/upload/v1778575971/122491_jgga9b.jpg'
const SEARCH_IMAGE = '/assets/trip/trip-cover.png'

type View = 'choose' | 'search'

type Props = {
  onComplete: (answers: QuizAnswers) => void | Promise<void>
  isLoading?: boolean
}

function PreferenceOptionCard({
  title,
  description,
  imageSrc,
  onClick,
  disabled,
}: {
  title: string
  description: string
  imageSrc: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group relative h-48 md:h-56 w-full rounded-xl overflow-hidden text-left shadow-md transition-all hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Image src={imageSrc} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="font-baloo text-xl font-bold">{title}</h3>
        <p className="font-comfortaa text-sm text-white/90 mt-1">{description}</p>
      </div>
    </button>
  )
}

export function DestinationPreferenceStep({ onComplete, isLoading = false }: Props) {
  const [view, setView] = useState<View>('choose')
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const busy = isSubmitting || isLoading

  const submitPreference = async (values: string[]) => {
    if (busy) return
    setIsSubmitting(true)
    try {
      await onComplete({
        [DESTINATION_PREFERENCE_ID]: { values },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const title = view === 'choose' ? 'Já tem algum destino em mente?' : 'Buscar destino'

  return (
    <ProposalFlowPageLayout showLeftColumn leftImage={{ src: '/assets/trip/trip-cover.png', alt: '' }}>
      <AppMultiStepFlowShell
        categoryLabel="Planejar viagem"
        title={title}
        step={1}
        totalSteps={1}
        stepperLabels={['Destinos']}
        progressPercent={100}
        showBack={view === 'search'}
        onBack={() => {
          setSelectedDestination(null)
          setView('choose')
        }}
        exitHref="/app"
        showExit
      >
        {view === 'choose' ? (
          <div className="p-6 space-y-6 max-w-3xl mx-auto w-full">
            <p className="font-comfortaa text-sm text-secondary-600 text-center">
              Escolham se preferem receber sugestões da nossa curadoria ou buscar um destino específico.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PreferenceOptionCard
                title="Aceitamos sugestões"
                description="Deixem que a gente indique os melhores destinos para vocês."
                imageSrc={OPEN_SUGGESTIONS_IMAGE}
                onClick={() => void submitPreference(['open_suggestions'])}
                disabled={busy}
              />
              <PreferenceOptionCard
                title="Buscar um destino"
                description="Pesquisem na nossa curadoria e escolham um destino."
                imageSrc={SEARCH_IMAGE}
                onClick={() => setView('search')}
                disabled={busy}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <DestinationsBrowseList
              compact
              selectedUniqueName={selectedDestination?.uniqueName ?? null}
              onSelectDestination={setSelectedDestination}
            />
            <div className="shrink-0 border-t border-secondary-200 bg-white px-6 py-4">
              {selectedDestination ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 max-w-4xl mx-auto w-full">
                  <p className="font-comfortaa text-sm text-secondary-700">
                    Selecionado:{' '}
                    <span className="font-semibold text-secondary-900">{selectedDestination.name}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => void submitPreference([selectedDestination.uniqueName])}
                    disabled={busy}
                    className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {busy ? 'Processando...' : 'Continuar'}
                  </button>
                </div>
              ) : (
                <p className="font-comfortaa text-sm text-secondary-500 text-center">
                  Selecione um destino na lista acima para continuar.
                </p>
              )}
            </div>
          </div>
        )}
      </AppMultiStepFlowShell>
    </ProposalFlowPageLayout>
  )
}
