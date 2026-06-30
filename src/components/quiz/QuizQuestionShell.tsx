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
  const hasIntroText = Boolean(description) || Boolean(paragraphs?.length)

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {hasIntroText ? (
        <div className="shrink-0 px-6 text-left space-y-2 mb-3">
          {description ? (
            <p className="font-comfortaa text-sm text-secondary-600 leading-relaxed">{description}</p>
          ) : null}
          {paragraphs?.map((text) => (
            <p key={text} className="font-comfortaa text-sm text-secondary-600 leading-relaxed">
              {text}
            </p>
          ))}
        </div>
      ) : null}

      <div className="flex-1 min-h-0 overflow-y-auto px-6">{children}</div>

      {showFooter && (
        <div
          className={`shrink-0 flex gap-3 px-6 py-4 border-t border-secondary-200 bg-white ${
            footerCentered ? 'justify-center' : 'justify-between'
          }`}
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
