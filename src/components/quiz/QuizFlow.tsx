'use client'

import { ProposalFlowPageLayout } from '@/components/app/ProposalFlowPageLayout'
import { AppMultiStepFlowShell } from '@/components/app/AppMultiStepFlowShell'
import { QuizQuestionRenderer } from './QuizQuestionRenderer'
import type { QuizConfig } from './types'
import { useQuizFlow } from './useQuizFlow'

type Props = {
  config: QuizConfig
  className?: string
}

export function QuizFlow({ config, className }: Props) {
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

  return (
    <div className={className}>
      <ProposalFlowPageLayout showLeftColumn leftImage={config.leftImage}>
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
      </ProposalFlowPageLayout>
    </div>
  )
}
