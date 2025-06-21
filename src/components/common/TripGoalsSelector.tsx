'use client'

import { useState, useEffect } from 'react'
import { TripsApiService } from '@/clients/trips'
import { TripGoal } from '@/clients/trips/goals'

interface TripGoalsSelectorProps {
  selectedGoals: string[]
  onGoalsChange: (goals: string[]) => void
  tripType?: string
  maxSelections?: number
  className?: string
}

export default function TripGoalsSelector({ 
  selectedGoals, 
  onGoalsChange, 
  tripType,
  maxSelections = 5,
  className = '' 
}: TripGoalsSelectorProps) {
  const [availableGoals, setAvailableGoals] = useState<TripGoal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const goals = await TripsApiService.getGoals(tripType === 'casal' ? 'COUPLE' : 'INDIVIDUAL')
        setAvailableGoals(goals)
      } catch (err) {
        console.error('Error fetching goals:', err)
        setError('Não foi possível carregar os objetivos. Por favor, tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGoals()
  }, [tripType])

  const handleGoalClick = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      onGoalsChange(selectedGoals.filter(g => g !== goal))
    } else if (selectedGoals.length < maxSelections) {
      onGoalsChange([...selectedGoals, goal])
    }
  }

  if (isLoading) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-primary-600 font-medium">Carregando objetivos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className={`bg-gray-100 sm:bg-white px-1 py-2 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-3 overflow-y-auto max-h-[50vh] pr-2 ${className}`}>
      {availableGoals.map((goal) => (
        <button
          key={goal.uniqueName}
          type="button"
          onClick={() => handleGoalClick(goal.uniqueName)}
          disabled={!selectedGoals.includes(goal.uniqueName) && selectedGoals.length >= maxSelections}
          className={`py-1.5 px-1.5 sm:p-3 border rounded-full text-center transition-all min-h-[30px] sm:min-h-[56px] flex items-center justify-center ${
            selectedGoals.includes(goal.uniqueName)
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-300 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          <span className="text-sm leading-tight">{goal.name}</span>
        </button>
      ))}
    </div>
  )
} 