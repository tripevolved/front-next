'use client'

import { useEffect, useRef } from 'react'

export function StepCreateTrip({ onNext }: { onNext: () => void }) {
  const hasCalledRef = useRef(false)

  useEffect(() => {
    if (!hasCalledRef.current) {
      hasCalledRef.current = true
      onNext()
    }
  }, [onNext])

  return (
    <div className="p-6 space-y-6">
      <div className="inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-primary-600 font-medium">Vamos encontrar as melhores jornadas para o seu perfil...</p>
      </div>
    </div>
  )
}

