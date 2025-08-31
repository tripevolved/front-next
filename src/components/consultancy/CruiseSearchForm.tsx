'use client'

import { useState } from 'react'
import Button from '@/components/common/Button'

interface CruiseSearchFormProps {
  onSearch: (data: {
    destination: string
    month: string
    duration: string
  }) => void
}

const destinations = [
  'Caribe',
  'Mediterrâneo', 
  'Brasil',
  'América do Sul',
  'Antártida',
  'Norte da Europa',
  'Pacífico Sul',
  'Oceania',
  'Mar Vermelho',
  'Alasca'
]

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const durations = [
  '3-5 dias',
  '6-8 dias',
  '9-12 dias',
  '13-16 dias',
  '17+ dias'
]

export default function CruiseSearchForm({ onSearch }: CruiseSearchFormProps) {
  const [destination, setDestination] = useState('')
  const [month, setMonth] = useState('')
  const [duration, setDuration] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (destination && month && duration) {
      onSearch({ destination, month, duration })
    }
  }

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Destination Selector */}
          <div>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-secondary-900 font-comfortaa"
              required
            >
              <option value="">Destino</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Month Selector */}
          <div>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-secondary-900 font-comfortaa"
              required
            >
              <option value="">Mês</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Selector */}
          <div>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-secondary-900 font-comfortaa"
              required
            >
              <option value="">Duração</option>
              {durations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* CTA Button */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={!destination || !month || !duration}
              className="w-full font-baloo bg-accent-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Começar minha jornada
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
