'use client'

import { ActionQuestion } from './questions/ActionQuestion'
import { CounterQuestionComponent } from './questions/CounterQuestion'
import { CountersQuestionComponent } from './questions/CountersQuestion'
import { CustomQuestionComponent } from './questions/CustomQuestion'
import { DateRangeQuestionComponent } from './questions/DateRangeQuestion'
import { IntroQuestion } from './questions/IntroQuestion'
import { MultiSelectQuestion } from './questions/MultiSelectQuestion'
import { NumberQuestionComponent } from './questions/NumberQuestion'
import { RangeQuestionComponent } from './questions/RangeQuestion'
import { SingleSelectQuestion } from './questions/SingleSelectQuestion'
import { TextQuestionComponent } from './questions/TextQuestion'
import type { QuizQuestionRendererProps } from './types'

type Props = QuizQuestionRendererProps & {
  setError?: (error: string | null) => void
}

export function QuizQuestionRenderer({ question, setError, ...props }: Props) {
  switch (question.type) {
    case 'intro':
      return <IntroQuestion question={question} {...props} />
    case 'single-select':
      return <SingleSelectQuestion question={question} {...props} />
    case 'multi-select':
      return <MultiSelectQuestion question={question} {...props} />
    case 'date-range':
      return <DateRangeQuestionComponent question={question} {...props} />
    case 'number':
      return <NumberQuestionComponent question={question} {...props} />
    case 'range':
    case 'range-with-options':
      return <RangeQuestionComponent question={question} {...props} />
    case 'text':
    case 'textarea':
      return <TextQuestionComponent question={question} {...props} />
    case 'counter':
      return <CounterQuestionComponent question={question} {...props} />
    case 'counters':
      return <CountersQuestionComponent question={question} {...props} />
    case 'custom':
      return <CustomQuestionComponent question={question} {...props} />
    case 'action':
      return <ActionQuestion question={question} setError={setError} {...props} />
    default:
      return null
  }
}
