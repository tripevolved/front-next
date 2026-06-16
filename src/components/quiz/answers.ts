import type {
  CounterAnswer,
  CountersAnswer,
  CustomAnswer,
  DateRangeAnswer,
  MultiSelectAnswer,
  NumberAnswer,
  QuizAnswerValue,
  QuizAnswers,
  RangeAnswer,
  RangeWithOptionsAnswer,
  SingleSelectAnswer,
  TextAnswer,
} from './types'

export function getAnswer<T extends QuizAnswerValue>(answers: QuizAnswers, questionId: string): T | undefined {
  return answers[questionId] as T | undefined
}

export function isSingleSelectAnswer(value: QuizAnswerValue): value is SingleSelectAnswer {
  return value != null && typeof value === 'object' && 'value' in value && typeof value.value === 'string'
}

export function isMultiSelectAnswer(value: QuizAnswerValue): value is MultiSelectAnswer {
  return value != null && typeof value === 'object' && 'values' in value && Array.isArray(value.values)
}

export function isDateRangeAnswer(value: QuizAnswerValue): value is DateRangeAnswer {
  return (
    value != null &&
    typeof value === 'object' &&
    'startDate' in value &&
    'endDate' in value &&
    typeof value.startDate === 'string' &&
    typeof value.endDate === 'string'
  )
}

export function isNumberAnswer(value: QuizAnswerValue): value is NumberAnswer {
  return value != null && typeof value === 'object' && 'value' in value && typeof value.value === 'number' && !('options' in value) && !('values' in value)
}

export function isRangeAnswer(value: QuizAnswerValue): value is RangeAnswer {
  return isNumberAnswer(value)
}

export function isRangeWithOptionsAnswer(value: QuizAnswerValue): value is RangeWithOptionsAnswer {
  return (
    value != null &&
    typeof value === 'object' &&
    'value' in value &&
    typeof value.value === 'number' &&
    'options' in value &&
    typeof value.options === 'object'
  )
}

export function isTextAnswer(value: QuizAnswerValue): value is TextAnswer {
  return value != null && typeof value === 'object' && 'value' in value && typeof value.value === 'string'
}

export function isCounterAnswer(value: QuizAnswerValue): value is CounterAnswer {
  return isNumberAnswer(value)
}

export function isCountersAnswer(value: QuizAnswerValue): value is CountersAnswer {
  return value != null && typeof value === 'object' && 'values' in value && typeof value.values === 'object' && !Array.isArray(value.values)
}

export function isCustomAnswer(value: QuizAnswerValue): value is CustomAnswer {
  return value != null && typeof value === 'object' && 'value' in value
}
