'use client'

import type { QuizConfig } from '@/components/quiz'

export const CARIBBEAN_PHASE1_IDS = {
  intro: 'intro',
  feelingAfterTrip: 'feelingAfterTrip',
  practicePreference: 'practicePreference',
  lodgingRole: 'lodgingRole',
  mustHaves: 'mustHaves',
} as const

export const CARIBBEAN_PHASE2_IDS = {
  dates: 'dates',
  destinationPreference: 'destinationPreference',
} as const

const CARIBBEAN_DESTINATION_OPTIONS = [
  {
    id: 'open_suggestions',
    label: 'Aceitamos sugestões',
    imageSrc:
      'https://res.cloudinary.com/tripevolved/image/upload/v1778575971/122491_jgga9b.jpg',
  },
  {
    id: 'aruba',
    label: 'Aruba',
    imageSrc: 'https://res.cloudinary.com/tripevolved/image/upload/v1777498841/2012_kc3vve.jpg',
  },
  {
    id: 'curacao',
    label: 'Curaçao',
    imageSrc: 'https://res.cloudinary.com/tripevolved/image/upload/v1780750781/1988_wxw4ru.jpg',
  },
  {
    id: 'punta-cana',
    label: 'Punta Cana',
    imageSrc: 'https://res.cloudinary.com/tripevolved/image/upload/v1777500634/7935_wif537.jpg',
  },
  {
    id: 'st-barth',
    label: 'St. Barth',
    imageSrc: 'https://res.cloudinary.com/tripevolved/image/upload/v1777540985/1857_le1bhw.jpg',
  },
  {
    id: 'cancun',
    label: 'Cancún',
    imageSrc: 'https://res.cloudinary.com/tripevolved/image/upload/v1777499437/766_urgfmu.jpg',
  },
  {
    id: 'bahamas',
    label: 'Bahamas',
    imageSrc: 'https://res.cloudinary.com/tripevolved/image/upload/v1782826392/8084_nwmswn.jpg',
  },
  {
    id: 'anguilla',
    label: 'Anguilla',
    imageSrc:
      'https://res.cloudinary.com/tripevolved/image/upload/v1777540554/vimdVAjhx-tElxakZxhUU9jhpsU9e9vUXBItUnHUK7mibwFtNqbC9ERiArkpZeHLtCctz7OCVCO-hpM12eiOTYdP1PkA-TcHTrjnyYc49l6sqm6ArIQ0Z4L53CcCiUzUdD4nxNvwLdjirFxQk3dJBUZJB_JqZIa-rhonkBMDK5-2v8duP6JGLpTMtHtiw65l_yt9r9i.jpg',
  },
] as const

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
    categoryLabel: 'Destinos · Caribe',
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
        id: CARIBBEAN_PHASE2_IDS.destinationPreference,
        type: 'multi-select',
        stepLabel: 'Destinos',
        title: 'Quais destinos do Caribe interessam vocês?',
        description: 'Selecione um ou mais — ou deixem que a gente sugira.',
        layout: 'image-cards',
        minSelections: 1,
        maxSelections: 7,
        exclusiveOptionId: 'open_suggestions',
        options: CARIBBEAN_DESTINATION_OPTIONS.map((destination) => ({
          id: destination.id,
          label: destination.label,
          imageSrc: destination.imageSrc,
        })),
      },
    ],
    onComplete,
  }
}

export function extractOptionalFreeText(): string | undefined {
  return undefined
}
