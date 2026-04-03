'use client'

import { StepFamilyTravelersCount } from '@/components/trip-planning/StepFamilyTravelersCount'
import type { FamilyTravellers } from '@/components/trip-planning/familyTypes'

interface FamilyTravelersModalProps {
  isOpen: boolean
  initial?: FamilyTravellers
  onConfirm: (travelers: FamilyTravellers) => void
  onCancel: () => void
}

export function FamilyTravelersModal({
  isOpen,
  initial,
  onConfirm,
  onCancel
}: FamilyTravelersModalProps) {
  if (!isOpen) return null

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
        <StepFamilyTravelersCount
          initial={initial}
          onNext={onConfirm}
          onBack={onCancel}
        />
      </div>
    </div>
  )
}
