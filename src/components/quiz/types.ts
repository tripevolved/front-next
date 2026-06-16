import type { ReactNode } from 'react'

export type QuizAnswers = Record<string, QuizAnswerValue>

export type QuizAnswerValue =
  | SingleSelectAnswer
  | MultiSelectAnswer
  | DateRangeAnswer
  | NumberAnswer
  | RangeAnswer
  | RangeWithOptionsAnswer
  | TextAnswer
  | CounterAnswer
  | CountersAnswer
  | CustomAnswer
  | null

export type SingleSelectAnswer = { value: string }
export type MultiSelectAnswer = { values: string[] }
export type DateRangeAnswer = {
  startDate: string
  endDate: string
  extras?: Record<string, unknown>
}
export type NumberAnswer = { value: number }
export type RangeAnswer = { value: number }
export type RangeWithOptionsAnswer = { value: number; options: Record<string, boolean> }
export type TextAnswer = { value: string }
export type CounterAnswer = { value: number }
export type CountersAnswer = { values: Record<string, number> }
export type CustomAnswer = { value: unknown }

export type SelectOption = {
  id: string
  label: string
  icon?: string | ReactNode
  description?: string
  disabled?: boolean
  badge?: string
}

export type RangeOption = {
  key: string
  label: string
  defaultValue?: boolean
}

export type DateRangeField = {
  key: string
  kind: 'number'
  label: string
  min?: number
  defaultFromRange?: boolean
}

export type CounterItem = {
  key: string
  label: string
  min: number
  max: number
}

export type BaseQuestion = {
  id: string
  stepLabel: string
  title: string
  description?: string
  required?: boolean
  visibleWhen?: (answers: QuizAnswers) => boolean
  validate?: (value: QuizAnswerValue, answers: QuizAnswers) => string | null
}

export type IntroQuestion = BaseQuestion & {
  type: 'intro'
  paragraphs?: string[]
  buttonText?: string
}

export type SingleSelectQuestion = BaseQuestion & {
  type: 'single-select'
  options: SelectOption[] | (() => Promise<SelectOption[]>)
  layout?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4
}

export type MultiSelectQuestion = BaseQuestion & {
  type: 'multi-select'
  options?: SelectOption[]
  optionsLoader?: () => Promise<SelectOption[]>
  minSelections?: number
  maxSelections?: number
}

export type DateRangeQuestion = BaseQuestion & {
  type: 'date-range'
  restrictToFuture?: boolean
  fields?: DateRangeField[]
}

export type NumberQuestion = BaseQuestion & {
  type: 'number'
  min?: number
  max?: number
  placeholder?: string
  label?: string
}

export type RangeQuestion = BaseQuestion & {
  type: 'range'
  min: number
  max: number
  step?: number
  formatValue?: (value: number) => string
  valueLabel?: string
}

export type RangeWithOptionsQuestion = BaseQuestion & {
  type: 'range-with-options'
  min: number
  max: number
  step?: number
  formatValue?: (value: number) => string
  valueLabel?: string
  rangeOptions: RangeOption[]
}

export type TextQuestion = BaseQuestion & {
  type: 'text' | 'textarea'
  placeholder?: string
  rows?: number
  minLength?: number
}

export type CounterQuestion = BaseQuestion & {
  type: 'counter'
  min: number
  max: number
  fieldLabel?: string
}

export type CountersQuestion = BaseQuestion & {
  type: 'counters'
  items: CounterItem[]
  crossValidate?: (values: Record<string, number>) => string | null
}

export type CustomQuestionRenderProps = {
  value: QuizAnswerValue
  onChange: (value: QuizAnswerValue) => void
  answers: QuizAnswers
  onNext: () => void
  onBack: () => void
}

export type CustomQuestion = BaseQuestion & {
  type: 'custom'
  render: (props: CustomQuestionRenderProps) => ReactNode
}

export type ActionQuestion = BaseQuestion & {
  type: 'action'
  loadingText?: string
  onAction: (answers: QuizAnswers) => Promise<void>
  showBack?: false
}

export type QuizQuestion =
  | IntroQuestion
  | SingleSelectQuestion
  | MultiSelectQuestion
  | DateRangeQuestion
  | NumberQuestion
  | RangeQuestion
  | RangeWithOptionsQuestion
  | TextQuestion
  | CounterQuestion
  | CountersQuestion
  | CustomQuestion
  | ActionQuestion

export type QuizConfig = {
  id: string
  categoryLabel: string
  leftImage: { src: string; alt?: string }
  exitHref?: string
  onExit?: () => void
  /** When false, hides the shell top-right exit link. Default true. */
  showExit?: boolean
  initialAnswers?: Partial<QuizAnswers>
  questions: QuizQuestion[]
  onComplete: (answers: QuizAnswers) => void | Promise<void>
}

export type QuizQuestionRendererProps = {
  question: QuizQuestion
  value: QuizAnswerValue
  answers: QuizAnswers
  onChange: (value: QuizAnswerValue) => void
  onNext: () => void
  onBack: () => void
  canGoBack: boolean
  canGoNext: boolean
  error: string | null
  isSubmitting: boolean
}
