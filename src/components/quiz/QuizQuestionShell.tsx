'use client'

import type { ReactNode } from 'react'

type Props = {
  description?: string
  paragraphs?: string[]
  children: ReactNode
  showFooter?: boolean
  canGoBack?: boolean
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  footerCentered?: boolean
  isSubmitting?: boolean
}

export function QuizQuestionShell({
  description,
  paragraphs,
  children,
  showFooter = true,
  canGoBack = false,
  onBack,
  onNext,
  nextLabel = 'Próximo',
  nextDisabled = false,
  footerCentered = false,
  isSubmitting = false,
}: Props) {
  return (
    <div className="p-6 flex flex-col h-full">
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      {paragraphs?.map((text) => (
        <p key={text} className="text-gray-600 mb-4">
          {text}
        </p>
      ))}

      <div className="flex flex-col flex-grow space-y-4">{children}</div>

      {showFooter && (
        <div
          className={`flex pt-4 mt-4 ${footerCentered ? 'justify-center' : 'justify-between'}`}
        >
          {!footerCentered && canGoBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50"
            >
              Voltar
            </button>
          ) : (
            !footerCentered && <span />
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled || isSubmitting}
              className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {nextLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
