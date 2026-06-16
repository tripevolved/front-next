'use client'

import { QuizQuestionShell } from '../QuizQuestionShell'
import type { IntroQuestion } from '../types'
import type { QuizQuestionRendererProps } from '../types'

type Props = QuizQuestionRendererProps & { question: IntroQuestion }

export function IntroQuestion({ question, onNext }: Props) {
  return (
    <QuizQuestionShell
      paragraphs={question.paragraphs}
      description={question.description}
      showFooter
      footerCentered
      onNext={onNext}
      nextLabel={question.buttonText ?? 'Começar'}
    >
      <span />
    </QuizQuestionShell>
  )
}
