'use client'

import { useState } from 'react'
import { RoundAdjust } from './RoundAdjust'
import type { FamilyRoom, FamilyTravellers } from './familyTypes'

function roomSplitMatchesTravelers(rooms: FamilyRoom[], t: FamilyTravellers): boolean {
  if (!rooms.length) return false
  const sumAdults = rooms.reduce((a, r) => a + r.adults, 0)
  const sumChildren = rooms.reduce((a, r) => a + r.children, 0)
  if (sumAdults !== t.adults || sumChildren !== t.children) return false
  for (const r of rooms) {
    if (r.childrenAges.length !== r.children) return false
  }
  const flatAges = rooms.flatMap((r) => r.childrenAges)
  if (flatAges.length !== t.childrenAges.length) return false
  return flatAges.every((age, i) => age === t.childrenAges[i])
}

export function StepFamilyRoomsChoice({
  onNext,
  onBack,
  travelers,
  initialRooms,
}: {
  onNext: (rooms: FamilyRoom[]) => void
  onBack: () => void
  travelers: FamilyTravellers
  /** When editing, restore a previous split if it still matches travelers. */
  initialRooms?: FamilyRoom[]
}) {
  const { adults, children, childrenAges } = travelers

  const [roomsCount, setRoomsCount] = useState<number>(() => {
    if (initialRooms?.length && roomSplitMatchesTravelers(initialRooms, travelers)) {
      return initialRooms.length
    }
    return 1
  })
  const [roomAdults, setRoomAdults] = useState<number[]>(() => {
    if (initialRooms?.length && roomSplitMatchesTravelers(initialRooms, travelers)) {
      return initialRooms.map((r) => r.adults)
    }
    return [adults]
  })
  const [roomChildren, setRoomChildren] = useState<number[]>(() => {
    if (initialRooms?.length && roomSplitMatchesTravelers(initialRooms, travelers)) {
      return initialRooms.map((r) => r.children)
    }
    return [children]
  })

  const rebuildRooms = (nextRoomsCount: number) => {
    const nextAdults = Array.from({ length: nextRoomsCount }, (_, i) => (i === 0 ? adults - (nextRoomsCount - 1) : 1))
    const nextChildren = Array.from({ length: nextRoomsCount }, (_, i) => (i === 0 ? children : 0))
    setRoomsCount(nextRoomsCount)
    setRoomAdults(nextAdults)
    setRoomChildren(nextChildren)
  }

  const sumAdults = roomAdults.reduce((acc, v) => acc + v, 0)
  const sumChildren = roomChildren.reduce((acc, v) => acc + v, 0)
  const isValid = sumAdults === adults && sumChildren === children

  const roomsToSend: FamilyRoom[] = []
  let ageCursor = 0
  for (let i = 0; i < roomsCount; i += 1) {
    const roomChildCount = roomChildren[i] ?? 0
    const roomAges = childrenAges.slice(ageCursor, ageCursor + roomChildCount)
    ageCursor += roomChildCount
    roomsToSend.push({ adults: roomAdults[i] ?? 1, children: roomChildCount, childrenAges: roomAges })
  }

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Quantos quartos vocês vão precisar?</h2>
      <p className="text-gray-600">Vamos organizar os quartos com base nos adultos e nas crianças informadas.</p>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <span className="text-sm font-medium text-gray-800">Quartos</span>
        <RoundAdjust value={roomsCount} min={1} max={Math.max(1, adults)} onChange={(v) => rebuildRooms(v)} />
      </div>

      <div className="space-y-4">
        {Array.from({ length: roomsCount }).map((_, idx) => {
          const roomChildCount = roomChildren[idx] ?? 0
          const roomAges = roomsToSend[idx]?.childrenAges ?? []
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-800">Quarto {idx + 1}</h3>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Adultos</span>
                <RoundAdjust
                  value={roomAdults[idx] ?? 1}
                  min={1}
                  max={adults}
                  onChange={(next) => setRoomAdults((prev) => prev.map((a, i) => (i === idx ? next : a)))}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Crianças</span>
                <RoundAdjust
                  value={roomChildCount}
                  min={0}
                  max={children}
                  onChange={(next) => setRoomChildren((prev) => prev.map((c, i) => (i === idx ? next : c)))}
                />
              </div>

              <div className="text-xs text-gray-500">Idades: {roomAges.length ? roomAges.join(', ') : '—'}</div>
            </div>
          )
        })}
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
          onClick={() => onNext(roomsToSend)}
          disabled={!isValid}
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}

