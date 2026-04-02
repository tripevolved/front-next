'use client'

import { useState } from 'react'
import { RoundAdjust } from './RoundAdjust'
import type { FamilyTravellers } from './familyTypes'

export function StepFamilyTravelersCount({
  onNext,
  onBack,
  initial,
}: {
  onNext: (travelers: FamilyTravellers) => void
  onBack: () => void
  initial?: FamilyTravellers
}) {
  const BASE_CHILDREN_AGE = 6
  const [adults, setAdults] = useState<number>(initial?.adults ?? 2)
  const [children, setChildren] = useState<number>(initial?.children ?? 0)
  const [childrenAges, setChildrenAges] = useState<number[]>(initial?.childrenAges ?? [])

  const applyChildrenCount = (nextChildren: number) => {
    if (nextChildren <= 0) {
      setChildren(0)
      setChildrenAges([])
      return
    }

    if (nextChildren > children) {
      const diff = nextChildren - children
      setChildren(nextChildren)
      setChildrenAges((prev) => [...prev, ...Array.from({ length: diff }, () => BASE_CHILDREN_AGE)])
      return
    }

    setChildren(nextChildren)
    setChildrenAges(childrenAges.slice(0, nextChildren))
  }

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Quantas pessoas vão viajar?</h2>
      <p className="text-gray-600">Para montar os quartos ideais, precisamos saber adultos, crianças e a idade delas.</p>

      <div className="space-y-5">
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <span className="text-sm font-medium text-gray-800">Adultos</span>
          <RoundAdjust value={adults} min={1} max={8} onChange={setAdults} />
        </div>

        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <span className="text-sm font-medium text-gray-800">Crianças</span>
          <RoundAdjust value={children} min={0} max={8} onChange={applyChildrenCount} />
        </div>

        {children > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Idade das crianças</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {childrenAges.map((age, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
                >
                  <span className="text-sm text-gray-800">Criança {idx + 1}</span>
                  <RoundAdjust
                    value={age}
                    min={0}
                    max={17}
                    onChange={(nextAge) => setChildrenAges((prev) => prev.map((a, i) => (i === idx ? nextAge : a)))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() =>
            onNext({
              adults,
              children,
              childrenAges: children > 0 ? childrenAges : [],
            })
          }
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}

