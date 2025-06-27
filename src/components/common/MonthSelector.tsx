'use client'

import { useState } from 'react'

interface MonthSelectorProps {
  selectedMonth: string | null
  onMonthSelect: (month: string) => void
  className?: string
}

export default function MonthSelector({ selectedMonth, onMonthSelect, className = '' }: MonthSelectorProps) {
  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ]

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {months.map((month) => (
        <button
          key={month.value}
          type="button"
          onClick={() => onMonthSelect(month.value)}
          className={`p-3 border rounded-lg text-center transition-all ${
            selectedMonth === month.value
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-300 hover:border-primary-300'
          }`}
        >
          {month.label}
        </button>
      ))}
    </div>
  )
} 