'use client'

import { TripsApiService } from '@/clients/trips'
import { buildCreateTripRequest } from '@/components/trip-planning'
import type { QuizAnswers, QuizConfig } from '@/components/quiz'
import { TravelerType } from '@/core/types/trip'
import { familyRoomsQuestion, familyTravelersQuestion } from './customSteps'
import { mapAnswersToTripState } from './mapAnswersToTripState'
import { getTravelerType, TRIP_PLANNING_QUESTION_IDS } from './types'

const BUDGET_MIN = 3000
const BUDGET_MAX = 100000
const BUDGET_STEP = 1000

const TYPE_DISCLAIMER = 'Estamos focados em construir as melhores jornadas a dois.'

const PROFILE_OPTIONS = [
  { id: 'relax', label: 'Relax', icon: '🌴' },
  { id: 'alternativo', label: 'Alternativo', icon: '🎨' },
  { id: 'aventureiro', label: 'Aventureiro', icon: '🏃' },
  { id: 'gastronomico', label: 'Gastronômico', icon: '🍽️' },
  { id: 'garantido', label: 'Garantido', icon: '✅' },
  { id: 'intelectual', label: 'Intelectual', icon: '📚' },
]

function formatCurrencyBR(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(
    value,
  )
}

function formatMaxBudgetDisplay(value: number) {
  if (value >= BUDGET_MAX) return `${formatCurrencyBR(BUDGET_MAX)}+`
  return formatCurrencyBR(value)
}

type BuildParams = {
  onQuizComplete: (answers: Parameters<typeof mapAnswersToTripState>[0]) => Promise<void>
}

export function buildTripPlanningQuizConfig({ onQuizComplete }: BuildParams): QuizConfig {
  return {
    id: 'trip-planning',
    categoryLabel: 'Planejar viagem',
    leftImage: { src: '/assets/trip/trip-cover.png', alt: '' },
    exitHref: '/app',
    showExit: true,
    questions: [
      {
        id: TRIP_PLANNING_QUESTION_IDS.intro,
        type: 'intro',
        stepLabel: 'Início',
        title: 'Vamos começar sua jornada?',
        paragraphs: [
          'Você vai responder a algumas perguntas rápidas sobre a sua viagem - em torno de 5 minutos. Ao final, você poderá construir sua jornada com acesso à nossa curadoria única.',
          'Isso te dará uma direção clara para sua próxima jornada, sem precisar procurar entre milhares de opções.',
        ],
        buttonText: 'Começar',
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.dates,
        type: 'date-range',
        stepLabel: 'Datas',
        title: 'Quando você pretende viajar?',
        description:
          'Selecione a janela de datas em que você pode viajar e a duração desejada para a sua viagem.',
        restrictToFuture: true,
        fields: [{ key: 'maxDays', kind: 'number', label: 'Quantos dias deve durar a sua viagem?', min: 1, defaultFromRange: true }],
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.type,
        type: 'single-select',
        stepLabel: 'Tipo',
        title: 'Com quem você viaja?',
        description: `Selecione o tipo de viagem que melhor se adequa à sua jornada. ${TYPE_DISCLAIMER}`,
        options: [{ id: TravelerType.COUPLE, label: 'Casal', icon: '❤️' }],
      },
      familyTravelersQuestion,
      familyRoomsQuestion,
      {
        id: TRIP_PLANNING_QUESTION_IDS.goals,
        type: 'multi-select',
        stepLabel: 'Objetivos',
        title: 'O que você busca na viagem?',
        description: 'Selecione até 5 expressões que melhor definem a viagem dos seus sonhos.',
        maxSelections: 5,
        minSelections: 1,
        optionsLoader: async (answers) => {
          const travelerType = getTravelerType(answers)
          const goals = await TripsApiService.getGoals(travelerType)
          return goals.map((g) => ({ id: g.uniqueName, label: g.name }))
        },
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.profile,
        type: 'single-select',
        stepLabel: 'Perfil',
        title: 'Qual o seu perfil de viagem?',
        description: 'Escolha o perfil que melhor combina com seu estilo de viagem.',
        columns: 2,
        options: PROFILE_OPTIONS,
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.budget,
        type: 'range-with-options',
        stepLabel: 'Orçamento',
        title: 'Qual o seu orçamento?',
        description: 'Defina um valor máximo para a experiência da sua viagem.',
        min: BUDGET_MIN,
        max: BUDGET_MAX,
        step: BUDGET_STEP,
        valueLabel: 'Até',
        formatValue: formatMaxBudgetDisplay,
        rangeOptions: [
          {
            key: 'flexible',
            label: 'O orçamento tem alguma flexibilidade?',
            defaultValue: true,
          },
        ],
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.description,
        type: 'textarea',
        stepLabel: 'Comentários',
        title: 'Conte mais sobre a viagem',
        description: 'Se quiser, descreva detalhes como estilo, ritmo, preferências e expectativas.',
        required: false,
        placeholder: 'Ex.: queremos descansar, comer bem e conhecer lugares com clima romântico...',
      },
    ],
    onComplete: onQuizComplete,
  }
}

type TravelIntentQuizParams = {
  travelerType: TravelerType
  onQuizComplete: (answers: QuizAnswers) => void | Promise<void>
  onExit?: () => void
}

/** Short preference quiz for attaching travel-intent to an existing trip (skips dates/type). */
export function buildTripTravelIntentQuizConfig({
  travelerType,
  onQuizComplete,
  onExit,
}: TravelIntentQuizParams): QuizConfig {
  return {
    id: 'trip-travel-intent',
    categoryLabel: 'Recomendações',
    leftImage: { src: '/assets/trip/trip-cover.png', alt: '' },
    showExit: true,
    onExit,
    initialAnswers: {
      [TRIP_PLANNING_QUESTION_IDS.type]: { value: travelerType },
    },
    questions: [
      {
        id: TRIP_PLANNING_QUESTION_IDS.goals,
        type: 'multi-select',
        stepLabel: 'Objetivos',
        title: 'O que você busca na viagem?',
        description: 'Selecione até 5 expressões que melhor definem a viagem dos seus sonhos.',
        maxSelections: 5,
        minSelections: 1,
        optionsLoader: async (answers) => {
          const type = getTravelerType(answers) || travelerType
          const goals = await TripsApiService.getGoals(type)
          return goals.map((g) => ({ id: g.uniqueName, label: g.name }))
        },
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.profile,
        type: 'single-select',
        stepLabel: 'Perfil',
        title: 'Qual o seu perfil de viagem?',
        description: 'Escolha o perfil que melhor combina com seu estilo de viagem.',
        columns: 2,
        options: PROFILE_OPTIONS,
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.budget,
        type: 'range-with-options',
        stepLabel: 'Orçamento',
        title: 'Qual o seu orçamento?',
        description: 'Defina um valor máximo para a experiência da sua viagem.',
        min: BUDGET_MIN,
        max: BUDGET_MAX,
        step: BUDGET_STEP,
        valueLabel: 'Até',
        formatValue: formatMaxBudgetDisplay,
        rangeOptions: [
          {
            key: 'flexible',
            label: 'O orçamento tem alguma flexibilidade?',
            defaultValue: true,
          },
        ],
      },
      {
        id: TRIP_PLANNING_QUESTION_IDS.description,
        type: 'textarea',
        stepLabel: 'Comentários',
        title: 'Conte mais sobre a viagem',
        description: 'Se quiser, descreva detalhes como estilo, ritmo, preferências e expectativas.',
        required: false,
        placeholder: 'Ex.: queremos descansar, comer bem e conhecer lugares com clima romântico...',
      },
    ],
    onComplete: onQuizComplete,
  }
}

export async function createTripFromQuizAnswers(
  answers: Parameters<typeof mapAnswersToTripState>[0],
  travelerId: string,
): Promise<string> {
  const state = mapAnswersToTripState(answers)
  const request = buildCreateTripRequest({
    travelerId,
    ...state,
  })
  const { id } = await TripsApiService.createTrip(request)
  return id
}
