'use client'

import LeadForm from '@/components/LeadForm'
import type { EventType } from '@/components/basic/FacebookPixel'

type Props = {
  error: string | null
  isCreating: boolean
  funnelMetadata: { key: string; value: string; keyDescription: string }[]
  onSuccess: () => void
  event?: EventType
  eventOptions?: Record<string, unknown>
}

export function LeadCaptureStep({
  error,
  isCreating,
  funnelMetadata,
  onSuccess,
  event,
  eventOptions,
}: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      <div className="shrink-0 border-b border-secondary-200 p-5 text-center">
        <p className="font-comfortaa text-xs text-secondary-500">Quase lá</p>
        <h1 className="font-baloo text-xl font-bold text-secondary-900 mt-1">Salve sua jornada</h1>
        <p className="font-comfortaa text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Deixe seus dados para criar sua viagem e acessar as recomendações de hospedagem na plataforma.
        </p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-6 max-w-lg mx-auto w-full">
        {isCreating ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500" />
            <p className="font-comfortaa text-secondary-600">Criando sua viagem...</p>
          </div>
        ) : (
          <>
            {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}
            <LeadForm
              submitButtonText="Criar minha viagem"
              additionalMetadata={funnelMetadata}
              onSuccess={onSuccess}
              event={event}
              eventOptions={eventOptions}
            />
          </>
        )}
      </div>
    </div>
  )
}
