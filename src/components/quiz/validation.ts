import {
  isCounterAnswer,
  isCountersAnswer,
  isCustomAnswer,
  isDateRangeAnswer,
  isMultiSelectAnswer,
  isNumberAnswer,
  isRangeWithOptionsAnswer,
  isSingleSelectAnswer,
  isTextAnswer,
} from './answers'
import type { QuizAnswerValue, QuizAnswers, QuizQuestion } from './types'

export function validateQuestion(question: QuizQuestion, value: QuizAnswerValue, answers: QuizAnswers): string | null {
  if (question.validate) {
    const customError = question.validate(value, answers)
    if (customError) return customError
  }

  const required = question.required ?? (question.type !== 'intro' && question.type !== 'action' && question.type !== 'textarea')

  switch (question.type) {
    case 'intro':
    case 'action':
      return null

    case 'single-select': {
      if (!required) return null
      if (!isSingleSelectAnswer(value) || !value.value.trim()) {
        return 'Selecione uma opção para continuar.'
      }
      return null
    }

    case 'multi-select': {
      const min = question.minSelections ?? (required ? 1 : 0)
      const max = question.maxSelections ?? Infinity
      const count = isMultiSelectAnswer(value) ? value.values.length : 0
      if (count < min) {
        return min === 1 ? 'Selecione pelo menos uma opção.' : `Selecione pelo menos ${min} opções.`
      }
      if (count > max) {
        return `Selecione no máximo ${max} opções.`
      }
      return null
    }

    case 'date-range': {
      if (!required) return null
      if (!isDateRangeAnswer(value) || !value.startDate || !value.endDate) {
        return 'Selecione as datas de início e fim.'
      }
      if (question.fields) {
        for (const field of question.fields) {
          const extra = value.extras?.[field.key]
          if (field.kind === 'number' && (extra == null || Number(extra) < (field.min ?? 1))) {
            return `Informe ${field.label.toLowerCase()}.`
          }
        }
      }
      return null
    }

    case 'number': {
      if (!required && (value == null || !isNumberAnswer(value))) return null
      if (!isNumberAnswer(value)) return 'Informe um valor válido.'
      if (question.min != null && value.value < question.min) {
        return `O valor mínimo é ${question.min}.`
      }
      if (question.max != null && value.value > question.max) {
        return `O valor máximo é ${question.max}.`
      }
      return null
    }

    case 'range':
    case 'range-with-options': {
      if (!isNumberAnswer(value) && !isRangeWithOptionsAnswer(value)) {
        return required ? 'Defina um valor.' : null
      }
      const num = isRangeWithOptionsAnswer(value) ? value.value : (value as { value: number }).value
      if (num < question.min || num > question.max) {
        return `O valor deve estar entre ${question.min} e ${question.max}.`
      }
      return null
    }

    case 'text':
    case 'textarea': {
      const minLength = question.minLength ?? (required ? 1 : 0)
      const text = isTextAnswer(value) ? value.value.trim() : ''
      if (text.length < minLength) {
        return required ? 'Preencha este campo para continuar.' : null
      }
      return null
    }

    case 'counter': {
      if (!isCounterAnswer(value)) {
        return required ? 'Informe um valor.' : null
      }
      if (value.value < question.min || value.value > question.max) {
        return `O valor deve estar entre ${question.min} e ${question.max}.`
      }
      return null
    }

    case 'counters': {
      if (!isCountersAnswer(value)) {
        return required ? 'Preencha todos os campos.' : null
      }
      for (const item of question.items) {
        const v = value.values[item.key]
        if (v == null || v < item.min || v > item.max) {
          return `Verifique o valor de ${item.label.toLowerCase()}.`
        }
      }
      if (question.crossValidate) {
        const crossError = question.crossValidate(value.values)
        if (crossError) return crossError
      }
      return null
    }

    case 'custom': {
      if (!required) return null
      if (!isCustomAnswer(value) || value.value == null || value.value === '') {
        return 'Complete esta etapa para continuar.'
      }
      return null
    }

    default:
      return null
  }
}

export function isQuestionValid(question: QuizQuestion, value: QuizAnswerValue, answers: QuizAnswers): boolean {
  return validateQuestion(question, value, answers) == null
}
