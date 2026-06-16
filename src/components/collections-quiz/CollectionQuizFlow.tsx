'use client'

import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProposalFlowPageLayout } from '@/components/app/ProposalFlowPageLayout'
import LeadForm from '@/components/LeadForm'
import { QuizFlow } from '@/components/quiz'
import type { QuizAnswers } from '@/components/quiz'
import { CollectionQuizResult } from './CollectionQuizResult'
import { buildCollectionQuizConfig, buildQuizLeadMetadata } from './questions'
import { computeWinningCollection } from './scoring'
import { submitCollectionQuizLead } from './submitCollectionQuizLead'
import type { CollectionSlug } from './types'

type Phase = 'quiz' | 'lead' | 'result'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email: string | null): email is string {
  return Boolean(email?.trim() && EMAIL_REGEX.test(email.trim()))
}

export function CollectionQuizFlow() {
  const searchParams = useSearchParams()
  const emailFromUrl = searchParams?.get('email') ?? null

  const [phase, setPhase] = useState<Phase>('quiz')
  const [quizKey, setQuizKey] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers | null>(null)
  const [winningSlug, setWinningSlug] = useState<CollectionSlug | null>(null)
  const [knownEmail] = useState(() => (isValidEmail(emailFromUrl) ? emailFromUrl.trim() : null))

  const handleQuizComplete = useCallback(
    async (quizAnswers: QuizAnswers) => {
      const slug = computeWinningCollection(quizAnswers)
      setAnswers(quizAnswers)
      setWinningSlug(slug)

      if (knownEmail) {
        await submitCollectionQuizLead({
          email: knownEmail,
          answers: quizAnswers,
          winningSlug: slug,
        })
        setPhase('result')
        return
      }

      setPhase('lead')
    },
    [knownEmail],
  )

  const quizConfig = useMemo(
    () => buildCollectionQuizConfig({ onComplete: handleQuizComplete }),
    [handleQuizComplete],
  )

  const leadMetadata = useMemo(() => {
    if (!winningSlug || !answers) return []
    return buildQuizLeadMetadata(answers, winningSlug)
  }, [winningSlug, answers])

  const handleLeadSuccess = useCallback(() => {
    setPhase('result')
  }, [])

  const handleRetry = useCallback(() => {
    setPhase('quiz')
    setAnswers(null)
    setWinningSlug(null)
    setQuizKey((k) => k + 1)
  }, [])

  if (phase === 'quiz') {
    return <QuizFlow key={quizKey} config={quizConfig} />
  }

  if (phase === 'lead' && winningSlug) {
    return (
      <ProposalFlowPageLayout
        showLeftColumn
        leftImage={{ src: '/assets/trip/trip-cover.png', alt: 'Coleções Trip Evolved' }}
      >
        <div className="flex flex-col flex-1 min-h-screen bg-white">
          <div className="shrink-0 border-b border-secondary-200 p-5 text-center">
            <p className="font-comfortaa text-xs text-secondary-500">Coleções Trip Evolved</p>
            <h1 className="font-baloo text-xl font-bold text-secondary-900 leading-tight mt-1">
              Quase lá!
            </h1>
            <p className="font-comfortaa text-sm text-gray-600 mt-2 max-w-md mx-auto">
              Deixe seus dados para ver a coleção recomendada para vocês.
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 max-w-lg mx-auto w-full">
            <LeadForm
              submitButtonText="Ver minha coleção"
              additionalMetadata={leadMetadata}
              onSuccess={handleLeadSuccess}
            />
          </div>
        </div>
      </ProposalFlowPageLayout>
    )
  }

  if (phase === 'result' && winningSlug) {
    return (
      <ProposalFlowPageLayout
        showLeftColumn
        leftImage={{ src: '/assets/trip/trip-cover.png', alt: 'Coleções Trip Evolved' }}
      >
        <div className="flex flex-col flex-1 min-h-screen bg-white overflow-y-auto">
          <CollectionQuizResult collectionSlug={winningSlug} onRetry={handleRetry} />
        </div>
      </ProposalFlowPageLayout>
    )
  }

  return null
}

export function CollectionQuizLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600" />
    </div>
  )
}
