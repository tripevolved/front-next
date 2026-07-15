'use client'

import type { QuizAnswers, QuizConfig } from '@/components/quiz'
import { isTextAnswer } from '@/components/quiz/answers'

export const CARIBBEAN_PHASE1_IDS = {
  intro: 'intro',
  feelingAfterTrip: 'feelingAfterTrip',
  practicePreference: 'practicePreference',
  lodgingRole: 'lodgingRole',
  mustHaves: 'mustHaves',
} as const

export const CARIBBEAN_PHASE2_IDS = {
  dates: 'dates',
  budget: 'budget',
  notes: 'notes',
} as const

/** Budget tier unique ids → maxBudget BRL used on trip create. */
export const CARIBBEAN_BUDGET_TIERS = {
  custo_beneficio: 15000,
  premium: 30000,
  luxo: 100000,
} as const

export type CaribbeanBudgetTierId = keyof typeof CARIBBEAN_BUDGET_TIERS

type BuildQuizParams = {
  onComplete: QuizConfig['onComplete']
  onExit?: () => void
}

function drawerQuizOptions(onExit?: () => void): Pick<QuizConfig, 'onExit' | 'showExit' | 'exitHref'> {
  if (onExit) {
    return { onExit, showExit: true }
  }
  return { exitHref: '/consultoria/caribe', showExit: false }
}

export function buildCaribbeanPhase1QuizConfig({ onComplete, onExit }: BuildQuizParams): QuizConfig {
  return {
    id: 'caribbean-discovery-phase1',
    categoryLabel: 'Viagem a dois · Caribe',
    leftImage: { src: '/assets/consultoria/caribe/hero.jpg', alt: 'Caribe' },
    ...drawerQuizOptions(onExit),
    questions: [
      {
        id: CARIBBEAN_PHASE1_IDS.intro,
        type: 'intro',
        stepLabel: 'Início',
        title: 'Planejem juntos a viagem ao Caribe',
        paragraphs: [
          'Em 4 perguntas rápidas vamos entender o que vocês buscam, antes de nos aprofundarmos para chegarmos nas recomendações para a jornada.',
          'Todas as recomendações que fazemos são direcionadas para casais e viagens a dois.',
        ],
        buttonText: 'Começar',
      },
      {
        id: CARIBBEAN_PHASE1_IDS.feelingAfterTrip,
        type: 'single-select',
        stepLabel: 'Objetivo',
        title: 'Quando vocês voltarem dessa viagem, querem sentir que...',
        options: [
          { id: 'true_rest', label: 'Descansaram de verdade', icon: '🌴' },
          { id: 'lived_different', label: 'Viveram algo diferente', icon: '✨' },
          { id: 'quality_time', label: 'Passaram tempo de qualidade juntos', icon: '❤️' },
          { id: 'amazing_places', label: 'Conheceram lugares incríveis', icon: '🗺️' },
        ],
      },
      {
        id: CARIBBEAN_PHASE1_IDS.practicePreference,
        type: 'single-select',
        stepLabel: 'Ritmo',
        title: 'Na prática, vocês preferem...',
        options: [
          { id: 'mostly_hotel', label: 'Ficar bastante no hotel', icon: '🏨' },
          { id: 'explore_beaches', label: 'Explorar praias diferentes', icon: '🏖️' },
          { id: 'balance', label: 'Equilibrar as duas coisas', icon: '⚖️' },
        ],
      },
      {
        id: CARIBBEAN_PHASE1_IDS.lodgingRole,
        type: 'single-select',
        stepLabel: 'Hospedagem',
        title: 'A hospedagem é...',
        options: [
          { id: 'comfortable_base', label: 'Uma base confortável', icon: '🛏️' },
          { id: 'important_experience', label: 'Parte importante da experiência', icon: '🌟' },
          { id: 'main_focus', label: 'O principal da viagem', icon: '💎' },
        ],
      },
      {
        id: CARIBBEAN_PHASE1_IDS.mustHaves,
        type: 'multi-select',
        stepLabel: 'Essencial',
        title: 'O que não pode faltar?',
        layout: 'image-cards',
        minSelections: 1,
        maxSelections: 6,
        options: [
          { id: 'beaches', label: 'Praias bonitas', imageSrc: '/assets/trip/quiz/praias-bonitas.jpg' },
          { id: 'gastronomy', label: 'Gastronomia', imageSrc: '/assets/trip/quiz/gastronomia.jpg' },
          { id: 'tranquility', label: 'Tranquilidade', imageSrc: '/assets/trip/quiz/tranquilidade.jpg' },
          { id: 'structure', label: 'Estrutura', imageSrc: '/assets/trip/quiz/estrutura.jpg' },
          { id: 'authenticity', label: 'Autenticidade', imageSrc: '/assets/trip/quiz/autenticidade.jpg' },
          { id: 'iconic_views', label: 'Vistas icônicas', imageSrc: '/assets/trip/quiz/vistas-iconicas.jpg' },
        ],
      },
    ],
    onComplete,
  }
}

export function buildCaribbeanPhase2QuizConfig({ onComplete, onExit }: BuildQuizParams): QuizConfig {
  return {
    id: 'caribbean-discovery-phase2',
    categoryLabel: 'Datas e orçamento · Caribe',
    leftImage: { src: '/assets/consultoria/caribe/hero.jpg', alt: 'Caribe' },
    ...drawerQuizOptions(onExit),
    questions: [
      {
        id: CARIBBEAN_PHASE2_IDS.dates,
        type: 'date-range',
        stepLabel: 'Datas',
        title: 'Quando vocês pretendem viajar?',
        description: 'Isso ajuda a calibrar duração e sazonalidade.',
        restrictToFuture: true,
        fields: [{ key: 'maxDays', kind: 'number', label: 'Quantos dias deve durar a viagem?', min: 3, defaultFromRange: true }],
      },
      {
        id: CARIBBEAN_PHASE2_IDS.budget,
        type: 'single-select',
        stepLabel: 'Orçamento',
        title: 'Qual o padrão de orçamento de vocês?',
        description: 'Escolham a faixa que melhor representa a experiência desejada no Caribe.',
        options: [
          { id: 'custo_beneficio', label: 'Custo-benefício', icon: '⚖️' },
          { id: 'premium', label: 'Premium', icon: '✨' },
          { id: 'luxo', label: 'Luxo', icon: '💎' },
        ],
      },
      {
        id: CARIBBEAN_PHASE2_IDS.notes,
        type: 'textarea',
        stepLabel: 'Comentários',
        title: 'Conte mais sobre a viagem',
        description: 'Se quiserem, descrevam detalhes como estilo, ritmo, preferências e expectativas.',
        required: false,
        placeholder: 'Ex.: queremos um resort all-inclusive tranquilo, com boa gastronomia...',
      },
    ],
    onComplete,
  }
}

export function extractOptionalFreeText(answers?: QuizAnswers | null): string | undefined {
  if (!answers) return undefined
  const raw = answers[CARIBBEAN_PHASE2_IDS.notes]
  if (isTextAnswer(raw) && raw.value.trim()) {
    return raw.value.trim()
  }
  return undefined
}
