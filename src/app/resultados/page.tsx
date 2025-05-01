'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useWizard } from '@/contexts/WizardContext'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const message = searchParams?.get('message') || null
  const { openWizard } = useWizard()
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-6">
            {message || "Descubra seu destino ideal"}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Responda algumas perguntas rápidas e encontre a viagem perfeita para você.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={openWizard}
              className="bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
            >
              Começar agora
            </button>
            <Link
              href="/destinos"
              className="bg-white text-secondary-600 border border-secondary-600 px-8 py-3 rounded-full font-medium hover:bg-secondary-50 transition-colors"
            >
              Explorar destinos
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-6">
              Como funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="font-medium text-secondary-900 mb-2">Responda perguntas</h3>
                <p className="text-gray-600 text-sm">
                  Conte-nos sobre suas preferências de viagem
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="font-medium text-secondary-900 mb-2">Receba sugestões</h3>
                <p className="text-gray-600 text-sm">
                  Encontre destinos personalizados para você
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="font-medium text-secondary-900 mb-2">Planeje sua viagem</h3>
                <p className="text-gray-600 text-sm">
                  Conecte-se com especialistas para organizar tudo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 