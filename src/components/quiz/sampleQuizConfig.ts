import type { QuizConfig } from './types'

export const sampleQuizConfig: QuizConfig = {
  id: 'sample-quiz',
  categoryLabel: 'Quiz de demonstração',
  leftImage: { src: '/assets/trip/trip-cover.png', alt: 'Viagem' },
  exitHref: '/app',
  questions: [
    {
      id: 'intro',
      type: 'intro',
      stepLabel: 'Início',
      title: 'Bem-vindo ao quiz',
      paragraphs: [
        'Este é um fluxo de demonstração do componente Quiz genérico.',
        'Responda algumas perguntas rápidas para ver todos os tipos de questão em ação.',
      ],
      buttonText: 'Começar',
    },
    {
      id: 'traveler',
      type: 'single-select',
      stepLabel: 'Viajante',
      title: 'Com quem você viaja?',
      description: 'Escolha o tipo de viagem.',
      options: [
        { id: 'couple', label: 'Casal', icon: '❤️' },
        { id: 'family', label: 'Família', icon: '👨‍👩‍👧‍👦' },
        { id: 'solo', label: 'Sozinho(a)', icon: '👤' },
      ],
    },
    {
      id: 'family-size',
      type: 'counters',
      stepLabel: 'Família',
      title: 'Quem vai na viagem?',
      description: 'Informe adultos e crianças.',
      visibleWhen: (a) => {
        const t = a.traveler
        return t != null && typeof t === 'object' && 'value' in t && t.value === 'family'
      },
      items: [
        { key: 'adults', label: 'Adultos', min: 1, max: 8 },
        { key: 'children', label: 'Crianças', min: 0, max: 6 },
      ],
    },
    {
      id: 'goals',
      type: 'multi-select',
      stepLabel: 'Objetivos',
      title: 'O que você busca?',
      description: 'Selecione até 3 opções.',
      maxSelections: 3,
      minSelections: 1,
      options: [
        { id: 'relax', label: 'Descanso' },
        { id: 'food', label: 'Gastronomia' },
        { id: 'nature', label: 'Natureza' },
        { id: 'culture', label: 'Cultura' },
        { id: 'adventure', label: 'Aventura' },
      ],
    },
    {
      id: 'budget',
      type: 'range-with-options',
      stepLabel: 'Orçamento',
      title: 'Qual o seu orçamento?',
      description: 'Defina um valor máximo para a viagem.',
      min: 3000,
      max: 100000,
      step: 1000,
      valueLabel: 'Até',
      formatValue: (v) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(
          v >= 100000 ? 100000 : v,
        ) + (v >= 100000 ? '+' : ''),
      rangeOptions: [{ key: 'flexible', label: 'O orçamento tem alguma flexibilidade?', defaultValue: true }],
    },
    {
      id: 'notes',
      type: 'textarea',
      stepLabel: 'Comentários',
      title: 'Algo mais?',
      description: 'Opcional: conte detalhes sobre a viagem.',
      required: false,
      placeholder: 'Ex.: preferimos hotéis boutique e ritmo tranquilo...',
    },
    {
      id: 'submit',
      type: 'action',
      stepLabel: 'Finalizar',
      title: 'Concluindo',
      loadingText: 'Salvando suas respostas...',
      onAction: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      },
    },
  ],
  onComplete: async (answers) => {
    console.log('Quiz complete:', answers)
  },
}
