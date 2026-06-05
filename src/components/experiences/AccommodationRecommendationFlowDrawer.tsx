'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

import type { Destination } from '@/clients/destinations/destinations'
import { CollectionsBrowseList } from '@/components/collections/CollectionsBrowseList'
import { DestinationsBrowseList } from '@/components/destinations/DestinationsBrowseList'
import { TripPlanningFlowContent } from './TripPlanningFlowContent'

const MAJOR_STEPPER = ['Inspiração', 'Sua viagem'] as const

type MajorPhase = 'inspiration' | 'planTrip' | 'success'
type InspirationPath = 'collections' | 'destination'
type InspirationSubStep = 'choosePath' | 'pick'

export type InspirationSelection =
  | { kind: 'collection'; uniqueName: string }
  | { kind: 'destination'; destination: Destination }

type Props = {
  isOpen: boolean
  onClose: () => void
}

function MajorStepper({ phase }: { phase: MajorPhase }) {
  const activeIndex = phase === 'inspiration' ? 0 : phase === 'planTrip' ? 1 : MAJOR_STEPPER.length
  return (
    <div className="flex justify-between gap-2 border-b border-secondary-100 bg-secondary-50/80 px-5 py-3">
      {MAJOR_STEPPER.map((name, i) => {
        const isActive = phase !== 'success' && i === activeIndex
        const isCompleted = phase === 'success' || i < activeIndex
        return (
          <div
            key={name}
            className={`flex flex-col items-center flex-1 min-w-0 ${
              isActive ? 'text-secondary-900' : isCompleted ? 'text-secondary-600' : 'text-secondary-400'
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-baloo font-semibold shrink-0 mb-1 ${
                isActive
                  ? 'bg-accent-500 text-secondary-900'
                  : isCompleted
                    ? 'bg-accent-400/80 text-secondary-900'
                    : 'bg-secondary-200 text-secondary-500'
              }`}
            >
              {isCompleted ? '✓' : i + 1}
            </span>
            <span className="font-comfortaa text-[10px] md:text-xs text-center truncate w-full">{name}</span>
          </div>
        )
      })}
    </div>
  )
}

function InspirationPathChoice({
  onSelectCollections,
  onSelectDestination,
}: {
  onSelectCollections: () => void
  onSelectDestination: () => void
}) {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="font-baloo text-2xl font-bold text-secondary-900">Por onde você quer começar?</h2>
        <p className="font-comfortaa text-secondary-600">
          Busque inspiração em coleções curadas ou vá direto ao destino que você já tem em mente.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onSelectCollections}
          className="group flex flex-col overflow-hidden rounded-2xl border-2 border-secondary-200 bg-white text-left transition-all hover:border-accent-500 hover:shadow-md"
        >
          <div className="relative h-36 bg-secondary-100">
            <Image
              src="/assets/experiences/california/lake-tahoe-2.png"
              alt=""
              fill
              className="object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent" />
          </div>
          <div className="p-5 space-y-2">
            <span className="inline-block font-baloo text-xs font-semibold uppercase tracking-wide text-accent-600">
              Coleções
            </span>
            <h3 className="font-baloo text-lg font-bold text-secondary-900">Quero inspiração em coleções</h3>
            <p className="font-comfortaa text-sm text-secondary-600">
              Explore as coleções de nossa curadoria e escolha a que combina com o momento da sua viagem.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={onSelectDestination}
          className="group flex flex-col overflow-hidden rounded-2xl border-2 border-secondary-200 bg-white text-left transition-all hover:border-accent-500 hover:shadow-md"
        >
          <div className="relative h-36 bg-secondary-100">
            <Image
              src="/assets/consultoria/viagens-cenicas/casal-sicilia.jpg"
              alt=""
              fill
              className="object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent" />
          </div>
          <div className="p-5 space-y-2">
            <span className="inline-block font-baloo text-xs font-semibold uppercase tracking-wide text-accent-600">
              Destino
            </span>
            <h3 className="font-baloo text-lg font-bold text-secondary-900">Já tenho um destino</h3>
            <p className="font-comfortaa text-sm text-secondary-600">
              Selecione o destino que deseja visitar e siga para planejar a viagem.
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export function AccommodationRecommendationFlowDrawer({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [browseResetKey, setBrowseResetKey] = useState(0)

  const [majorPhase, setMajorPhase] = useState<MajorPhase>('inspiration')
  const [inspirationPath, setInspirationPath] = useState<InspirationPath | null>(null)
  const [inspirationSubStep, setInspirationSubStep] = useState<InspirationSubStep>('choosePath')
  const [inspirationSelection, setInspirationSelection] = useState<InspirationSelection | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resetFlow = useCallback(() => {
    setMajorPhase('inspiration')
    setInspirationPath(null)
    setInspirationSubStep('choosePath')
    setInspirationSelection(null)
    setResetKey((k) => k + 1)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    resetFlow()
    setBrowseResetKey((k) => k + 1)
  }, [isOpen, resetFlow])

  const handleClose = useCallback(() => {
    onClose()
    resetFlow()
  }, [onClose, resetFlow])

  const goToPlanTrip = useCallback((selection: InspirationSelection) => {
    setInspirationSelection(selection)
    setMajorPhase('planTrip')
  }, [])

  const inspirationHeaderTitle = useMemo(() => {
    if (inspirationSubStep === 'choosePath') return 'Por onde você quer começar?'
    if (inspirationPath === 'collections') return 'Escolha uma coleção'
    return 'Qual o seu próximo destino?'
  }, [inspirationPath, inspirationSubStep])

  const majorProgressPercent = useMemo(() => {
    if (majorPhase === 'success') return 100
    if (majorPhase === 'planTrip') return 50
    return inspirationSubStep === 'choosePath' ? 12 : 40
  }, [majorPhase, inspirationSubStep])

  const goBackInspiration = () => {
    if (inspirationSubStep === 'pick') {
      setInspirationSubStep('choosePath')
      setInspirationPath(null)
      setInspirationSelection(null)
      return
    }
    handleClose()
  }

  const showInspirationBack = inspirationSubStep === 'pick'

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        {majorPhase !== 'planTrip' ? (
          <>
            <MajorStepper phase={majorPhase} />

            <header className="shrink-0 border-b border-secondary-200 p-5">
              <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
                <div className="min-w-[96px]">
                  {showInspirationBack ? (
                    <button
                      type="button"
                      onClick={goBackInspiration}
                      className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                    >
                      {'< Voltar'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                    >
                      Fechar
                    </button>
                  )}
                </div>
                <div className="min-w-0 text-center">
                  <p className="font-comfortaa text-xs text-secondary-500">Recomendação de hospedagem</p>
                  <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">
                    {majorPhase === 'success' ? 'Sua viagem foi criada' : inspirationHeaderTitle}
                  </h2>
                  <p className="font-comfortaa text-xs text-secondary-500 mt-1">Etapa 1 de 2 — Inspiração</p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 inline-flex items-center justify-center shrink-0"
                  aria-label="Fechar"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 h-2 bg-secondary-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-500 rounded-full transition-all duration-300"
                  style={{ width: `${majorProgressPercent}%` }}
                />
              </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto">
              {majorPhase === 'success' ? (
                <div className="flex flex-col items-center justify-center gap-6 p-10 text-center min-h-[50vh]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-100 text-2xl text-accent-600">
                    ✓
                  </div>
                  <div className="space-y-2 max-w-md">
                    <p className="font-comfortaa text-secondary-600">
                      Em breve você poderá ver recomendações de hospedagem curadas para o seu perfil. Por agora, sua
                      jornada está registrada e pronta para os próximos passos.
                    </p>
                    {inspirationSelection?.kind === 'collection' ? (
                      <p className="font-comfortaa text-sm text-secondary-500">
                        Coleção selecionada para inspirar sua viagem.
                      </p>
                    ) : inspirationSelection?.kind === 'destination' ? (
                      <p className="font-comfortaa text-sm text-secondary-500">
                        Destino: {inspirationSelection.destination.name}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="font-baloo rounded-full bg-accent-500 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-accent-600"
                  >
                    Fechar
                  </button>
                </div>
              ) : inspirationSubStep === 'choosePath' ? (
                <InspirationPathChoice
                  onSelectCollections={() => {
                    setInspirationPath('collections')
                    setInspirationSubStep('pick')
                  }}
                  onSelectDestination={() => {
                    setInspirationPath('destination')
                    setInspirationSubStep('pick')
                  }}
                />
              ) : inspirationPath === 'collections' ? (
                <CollectionsBrowseList
                  compact
                  title="Coleções para inspirar sua viagem"
                  subtitle="Escolha uma curadoria para seguir ao planejamento."
                  treatAllAsAccessible
                  minimalCards
                  onSelectCollection={(uniqueName) => {
                    goToPlanTrip({ kind: 'collection', uniqueName })
                  }}
                />
              ) : inspirationPath === 'destination' ? (
                <DestinationsBrowseList
                  compact
                  resetNonce={browseResetKey}
                  onSelectDestination={(destination) => {
                    goToPlanTrip({ kind: 'destination', destination })
                  }}
                />
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex flex-1 min-h-0 flex-col">
            <MajorStepper phase="planTrip" />
            <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
              <TripPlanningFlowContent
                resetKey={resetKey}
                inspirationSelection={inspirationSelection}
                onExit={handleClose}
                onTripCreated={() => {
                  setMajorPhase('success')
                }}
                onBackFromFirstStep={() => {
                  setMajorPhase('inspiration')
                  setInspirationSubStep('pick')
                }}
              />
            </div>
          </div>
        )}
      </aside>
    </div>,
    document.body
  )
}
