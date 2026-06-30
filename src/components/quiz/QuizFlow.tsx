'use client'

import { ProposalFlowPageLayout } from '@/components/app/ProposalFlowPageLayout'
import { AppMultiStepFlowShell } from '@/components/app/AppMultiStepFlowShell'
import { QuizQuestionRenderer } from './QuizQuestionRenderer'
import type { QuizConfig } from './types'
import { useQuizFlow } from './useQuizFlow'

type Props = {
  config: QuizConfig
  className?: string
  /** When true, renders without the split left-image column (e.g. inside a drawer). */
  embedded?: boolean
}

export function QuizFlow({ config, className, embedded = false }: Props) {
  const {
    stepIndex,
    currentQuestion,
    activeQuestions,
    answers,
    currentValue,
    setAnswer,
    goNext,
    goBack,
    canGoNext,
    canGoBack,
    error,
    setError,
    isSubmitting,
    progressPercent,
  } = useQuizFlow(config)

  if (!currentQuestion) return null

  const shell = (
    <AppMultiStepFlowShell
      categoryLabel={config.categoryLabel}
      title={currentQuestion.title}
      step={stepIndex + 1}
      totalSteps={activeQuestions.length}
      stepperLabels={activeQuestions.map((q) => q.stepLabel)}
      progressPercent={progressPercent}
      showBack={canGoBack}
      onBack={goBack}
      exitHref={config.exitHref}
      onExit={config.onExit}
      showExit={config.showExit}
      exitLabel={config.onExit ? 'Fechar' : undefined}
    >
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>
      )}
      <QuizQuestionRenderer
        question={currentQuestion}
        value={currentValue}
        answers={answers}
        onChange={setAnswer}
        onNext={goNext}
        onBack={goBack}
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        error={error}
        isSubmitting={isSubmitting}
        setError={setError}
      />
    </AppMultiStepFlowShell>
  )

  if (embedded) {
    return <div className={`flex flex-col flex-1 min-h-0 ${className ?? ''}`}>{shell}</div>
  }

  return (
    <div className={className}>
      <ProposalFlowPageLayout showLeftColumn leftImage={config.leftImage}>
        {shell}
      </ProposalFlowPageLayout>
    </div>
  )
}
