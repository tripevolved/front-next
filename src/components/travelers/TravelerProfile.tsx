'use client'

import { useState } from 'react'
import { updateTravelerState } from '@/services/user/update-traveler-state'
import { TravelerService } from '@/clients/travelers'

export function TravelerProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Create traveler information
      await TravelerService.createTraveler({
        name: formData.name,
        phone: formData.phone,
      })
      
      // Refresh traveler state
      await updateTravelerState()
    } catch (err) {
      console.error('Error creating traveler:', err)
      setError('Não foi possível salvar suas informações. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Complete suas informações
        </h1>
        <p className="text-gray-600 mb-6">
          Complete suas informações para ter acesso às suas viagens personalizadas
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome completo *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="(00) 00000-0000"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar informações'}
          </button>
        </form>
      </div>
    </div>
  )
}

