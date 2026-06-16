'use client'

import { QuizQuestionShell } from '../QuizQuestionShell'
import type { CustomQuestion, QuizQuestionRendererProps } from '../types'

type Props = QuizQuestionRendererProps & { question: CustomQuestion }

export function CustomQuestionComponent({
  question,
  value,
  answers,
  onChange,
  onNext,
  onBack,
}: Props) {
  return (
    <QuizQuestionShell description={question.description} showFooter={false}>
      {question.render({ value, onChange, answers, onNext, onBack })}
    </QuizQuestionShell>
  )
}
