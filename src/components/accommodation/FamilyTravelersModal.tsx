'use client'

import { useEffect, useState } from 'react'
import { StepFamilyTravelersCount } from '@/components/trip-planning/StepFamilyTravelersCount'
import { StepFamilyRoomsChoice } from '@/components/trip-planning/StepFamilyRoomsChoice'
import type { FamilyRoom, FamilyTravellers } from '@/components/trip-planning/familyTypes'

type Step = 'count' | 'rooms'

interface FamilyTravelersModalProps {
  isOpen: boolean
  initial?: { travelers: FamilyTravellers; rooms: FamilyRoom[] }
  onConfirm: (travelers: FamilyTravellers, rooms: FamilyRoom[]) => void
  onCancel: () => void
}

export function FamilyTravelersModal({
  isOpen,
  initial,
  onConfirm,
  onCancel,
}: FamilyTravelersModalProps) {
  const [step, setStep] = useState<Step>('count')
  const [pendingTravelers, setPendingTravelers] = useState<FamilyTravellers | null>(null)
  const [roomsStepKey, setRoomsStepKey] = useState(0)

  useEffect(() => {
    if (!isOpen) return
    setStep('count')
    setPendingTravelers(null)
    setRoomsStepKey((k) => k + 1)
  }, [isOpen])

  if (!isOpen) return null

  const countInitial = pendingTravelers ?? initial?.travelers

  const handleCountNext = (travelers: FamilyTravellers) => {
    setPendingTravelers(travelers)
    setRoomsStepKey((k) => k + 1)
    setStep('rooms')
  }

  const handleRoomsNext = (rooms: FamilyRoom[]) => {
    if (!pendingTravelers) return
    onConfirm(pendingTravelers, rooms)
  }

  const handleRoomsBack = () => {
    setStep('count')
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="family-travelers-title"
      >
        <div id="family-travelers-title" className="sr-only">
          Composição da família
        </div>
        {step === 'count' && (
          <StepFamilyTravelersCount
            initial={countInitial}
            onNext={handleCountNext}
            onBack={onCancel}
          />
        )}
        {step === 'rooms' && pendingTravelers && (
          <StepFamilyRoomsChoice
            key={roomsStepKey}
            travelers={pendingTravelers}
            initialRooms={initial?.rooms}
            onNext={handleRoomsNext}
            onBack={handleRoomsBack}
          />
        )}
      </div>
    </div>
  )
}
