import type { QuizConfig, QuizAnswers } from '@/components/quiz'
import { isSingleSelectAnswer } from '@/components/quiz/answers'
import type { CollectionQuestionId, CollectionSlug, ScoredOption, ScoredQuestion } from './types'
import { toSelectOptions } from './types'

export type QuizLeadMetadataItem = {
  key: string
  value: string
  keyDescription: string
}

export const SCORED_QUESTIONS: ScoredQuestion[] = [
  {
    id: 'q1_today',
    stepLabel: 'Momento',
    title: 'Qual frase descreve melhor vocês hoje?',
    description: 'Pensem no dia a dia de vocês, não na viagem em si.',
    options: [
      {
        id: 'q1-a',
        label: 'Precisamos de um tempo só nosso, longe da rotina',
        scores: {
          'para-desacelerar-a-dois': 3,
          'para-respirar-novos-ares': 2,
          'para-redescobrir-um-pedaco-do-brasil': 3,
          'para-brindar-a-jornada': 1,
        },
      },
      {
        id: 'q1-b',
        label: 'Estamos comemorando um momento especial na vida',
        scores: {
          'para-brindar-a-jornada': 3,
          'para-aproveitar-a-dois': 2,
        },
      },
      {
        id: 'q1-c',
        label: 'Sentimos falta de novidade e de sair da bolha',
        scores: {
          'para-respirar-novos-ares': 3,
          'para-desacelerar-a-dois': 2,
          'para-viver-a-historia': 1,
        },
      },
      {
        id: 'q1-d',
        label: 'Queremos reconectar com raízes e com o que importa',
        scores: {
          'para-redescobrir-um-pedaco-do-brasil': 3,
          'para-viver-a-historia': 2,
        },
      },
      {
        id: 'q1-e',
        label: 'Precisamos desacelerar de verdade',
        scores: {
          'para-desacelerar-a-dois': 3,
          'para-respirar-novos-ares': 1,
          'para-redescobrir-um-pedaco-do-brasil': 2,
        },
      },
    ],
  },
  {
    id: 'q2_vision',
    stepLabel: 'Cenário',
    title: 'Quando vocês imaginam a próxima viagem, ela parece...',
    description: 'Escolham a cena que mais combina com o que vocês pensam sobre sua próxima jornada.',
    columns: 2,
    options: [
      {
        id: 'q2-areia',
        label: 'Pé na areia',
        icon: '🏖️',
        scores: {
          'para-desacelerar-a-dois': 2,
          'para-redescobrir-um-pedaco-do-brasil': 2,
        },
      },
      {
        id: 'q2-montanhas',
        label: 'Montanhas e natureza',
        icon: '🏔️',
        scores: {
          'para-respirar-novos-ares': 3,
          'para-brindar-a-jornada': 1,
        },
      },
      {
        id: 'q2-ruas',
        label: 'Ruas históricas',
        icon: '🏛️',
        scores: {
          'para-viver-a-historia': 3,
        },
      },
      {
        id: 'q2-resort',
        label: 'Resort onde dá vontade de ficar mais',
        icon: '🏨',
        scores: {
          'para-aproveitar-a-dois': 3,
          'para-desacelerar-a-dois': 2,
          'para-brindar-a-jornada': 1,
        },
      },
      {
        id: 'q2-vinicolas',
        label: 'Em meio à vinícolas',
        icon: '🍷',
        scores: {
          'para-brindar-a-jornada': 3,
        },
      },
    ],
  },
  {
    id: 'q3_pain',
    stepLabel: 'Planejamento',
    title: 'O que mais incomoda vocês ao planejar uma viagem?',
    description: 'Não existe resposta certa — queremos entender o que mais tira o sono de vocês.',
    options: [
      {
        id: 'q3-a',
        label: 'Não conseguir desligar do trabalho e da correria',
        scores: {
          'para-desacelerar-a-dois': 3,
          'para-aproveitar-a-dois': 1,
        },
      },
      {
        id: 'q3-b',
        label: 'Medo de que a viagem não seja especial o suficiente',
        scores: {
          'para-brindar-a-jornada': 3,
          'para-aproveitar-a-dois': 2,
        },
      },
      {
        id: 'q3-c',
        label: 'Escolher entre mil opções e não saber por onde começar',
        scores: {
          'para-respirar-novos-ares': 2,
          'para-desacelerar-a-dois': 1,
          'para-brindar-a-jornada': 1,
          'para-viver-a-historia': 1,
          'para-redescobrir-um-pedaco-do-brasil': 1,
        },
      },
      {
        id: 'q3-d',
        label: 'Parecer turista em vez de viver o lugar de verdade',
        scores: {
          'para-viver-a-historia': 3,
          'para-redescobrir-um-pedaco-do-brasil': 2,
        },
      },
      {
        id: 'q3-e',
        label: 'Falta de tempo para pesquisar e montar um roteiro à altura',
        scores: {
          'para-aproveitar-a-dois': 2,
          'para-brindar-a-jornada': 2,
          'para-respirar-novos-ares': 1,
          'para-desacelerar-a-dois': 1,
        },
      },
    ],
  },
  {
    id: 'q4_value',
    stepLabel: 'Valor',
    title: 'O que faria vocês dizerem "valeu cada centavo" ao final da viagem?',
    description:
      'Pensem na sua chegada em casa: o que aconteceu na viagem para vocês se sentirem realizados?',
    options: [
      {
        id: 'q4-a',
        label: 'Tempo de qualidade juntos, sem distrações',
        scores: {
          'para-desacelerar-a-dois': 2,
          'para-redescobrir-um-pedaco-do-brasil': 1,
        },
      },
      {
        id: 'q4-b',
        label: 'Uma experiência memorável que marca a vida',
        scores: {
          'para-brindar-a-jornada': 3,
          'para-respirar-novos-ares': 2,
          'para-aproveitar-a-dois': 2,
        },
      },
      {
        id: 'q4-c',
        label: 'Ter vivido algo que não existe em casa',
        scores: {
          'para-respirar-novos-ares': 3,
          'para-brindar-a-jornada': 1,
        },
      },
      {
        id: 'q4-d',
        label: 'Ter aprendido e sentido conexão com o lugar',
        scores: {
          'para-viver-a-historia': 3,
          'para-redescobrir-um-pedaco-do-brasil': 2,
        },
      },
      {
        id: 'q4-e',
        label: 'Ter visto o destino com outros olhos',
        scores: {
          'para-redescobrir-um-pedaco-do-brasil': 3,
          'para-viver-a-historia': 2,
          'para-desacelerar-a-dois': 1,
        },
      },
    ],
  },
]

const ANSWER_WEIGHT_MAP = new Map<string, Partial<Record<string, number>>>()

for (const question of SCORED_QUESTIONS) {
  for (const option of question.options) {
    ANSWER_WEIGHT_MAP.set(option.id, option.scores)
  }
}

export function getAnswerWeights(answerId: string) {
  return ANSWER_WEIGHT_MAP.get(answerId) ?? {}
}

export function getScoredQuestion(id: CollectionQuestionId): ScoredQuestion | undefined {
  return SCORED_QUESTIONS.find((q) => q.id === id)
}

export function buildQuizLeadMetadata(
  answers: QuizAnswers,
  winningSlug: CollectionSlug,
): QuizLeadMetadataItem[] {
  const items: QuizLeadMetadataItem[] = [
    { key: 'source', value: 'consultoria/colecoes', keyDescription: 'Origem' },
    { key: 'collection_quiz_result', value: winningSlug, keyDescription: 'Coleção recomendada' },
  ]

  for (const question of SCORED_QUESTIONS) {
    const raw = answers[question.id]
    const answerId = isSingleSelectAnswer(raw) ? raw.value : null
    const option = answerId ? question.options.find((o) => o.id === answerId) : undefined
    if (option) {
      items.push({
        key: `quiz_${question.id}`,
        keyDescription: question.title,
        value: option.label,
      })
    }
  }

  return items
}

export function buildCollectionQuizConfig(handlers: {
  onComplete: (answers: QuizAnswers) => void | Promise<void>
}): QuizConfig {
  return {
    id: 'consultoria-colecoes',
    categoryLabel: 'Coleções Trip Evolved',
    leftImage: { src: '/assets/trip/trip-cover.png', alt: 'Coleções Trip Evolved' },
    exitHref: '/',
    showExit: false,
    questions: [
      {
        id: 'intro',
        type: 'intro',
        stepLabel: 'Início',
        title: 'Descubra a coleção ideal para vocês',
        paragraphs: [
          'Por favor, responda algumas perguntas rápidas sobre o momento de vocês como casal — leva menos de 2 minutos. No final, vamos escolher a coleção de hospedagens da Trip Evolved que mais se encaixa com o que vocês buscam agora.',
        ],
        buttonText: 'Começar',
      },
      ...SCORED_QUESTIONS.map((q) => ({
        id: q.id,
        type: 'single-select' as const,
        stepLabel: q.stepLabel,
        title: q.title,
        description: q.description,
        columns: q.columns,
        options: toSelectOptions(q.options),
      })),
    ],
    onComplete: handlers.onComplete,
  }
}
