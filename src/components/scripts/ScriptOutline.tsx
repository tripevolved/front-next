'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageCarousel } from '@/components/common/ImageCarousel'
import { Action, Day, Script } from './types'

interface ScriptOutlineProps {
  script: Script
  title?: string
  subtitle?: string
  showModal?: boolean
  onActionClick?: (action: Action) => void
}

export function ScriptOutline({
  script,
  title = "Roteiro da Viagem",
  subtitle = "Um cronograma perfeito para aproveitar ao máximo sua experiência",
  showModal = true,
  onActionClick
}: ScriptOutlineProps) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentDay = script.days.find(day => day.dayNumber === selectedDay)

  const openModal = (action: Action) => {
    if (showModal) {
      setSelectedAction(action)
      setIsModalOpen(true)
    } else if (onActionClick) {
      onActionClick(action)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAction(null)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Day Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {script.days.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => day.isAvailable && setSelectedDay(day.dayNumber)}
              disabled={!day.isAvailable}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                day.isAvailable
                  ? selectedDay === day.dayNumber
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Dia {day.dayNumber}</span>
            </button>
          ))}
        </div>

        {/* Day Content */}
        {currentDay && currentDay.dayActions.length > 0 && (
          <div className="relative">
            {/* Progressive Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-500">
              {currentDay.dayActions.map((_, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full"
                  style={{ top: `${(index / (currentDay.dayActions.length - 1)) * 100}%` }}
                />
              ))}
            </div>

            <div className="space-y-6 ml-16">
              {currentDay.dayActions.map((action, index) => (
                <div
                  key={action.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer max-h-[200px]"
                  onClick={() => openModal(action)}
                >
                  <div className="flex h-full">
                    {/* Image */}
                    <div className="w-32 flex-shrink-0">
                      <Image
                        src={action.image}
                        alt={action.title}
                        width={128}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col justify-center">
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-primary-600 font-medium mb-2">
                          {action.subtitle}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{action.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Content Message for Unavailable Days */}
        {currentDay && currentDay.dayActions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Dia {currentDay.dayNumber} - Conteúdo Bloqueado
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Este dia está disponível apenas no roteiro completo. Entre em contato com nossos especialistas para desbloquear todo o conteúdo.
            </p>
          </div>
        )}
      </div>

      {/* Action Details Modal */}
      {showModal && isModalOpen && selectedAction && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedAction.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-lg text-primary-600 font-medium mt-2">
                {selectedAction.subtitle}
              </p>
            </div>

            {/* Image Carousel */}
            <ImageCarousel
              images={selectedAction.gallery}
              title={selectedAction.title}
              height="h-64"
            />

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Sobre esta experiência
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedAction.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Destaques
                  </h3>
                  <ul className="space-y-2">
                    {selectedAction.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Time and Location */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{selectedAction.time}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{selectedAction.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
} 