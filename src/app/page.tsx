import HomeContent from '@/components/HomeContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trip Evolved - Viagens Exclusivas e Personalizadas',
  description: 'Descubra viagens únicas e personalizadas com a Trip Evolved. Roteiros exclusivos, experiências autênticas e atendimento premium para sua próxima aventura.',
  alternates: {
    canonical: 'https://tripevolved.com.br',
  },
}

const faqQuestions = [
  {
    question: 'O que é a Trip Evolved?',
    answer: 'A Trip Evolved é uma agência de viagens especializada em criar experiências únicas e personalizadas. Nossa missão é transformar sonhos em realidade, oferecendo roteiros exclusivos que se adaptam ao seu estilo de viajante.'
  },
  {
    question: 'Como funciona o processo de planejamento?',
    answer: 'Nosso processo começa com uma análise detalhada do seu perfil de viajante. A partir daí, desenvolvemos um roteiro personalizado que atende às suas expectativas e preferências. Todo o planejamento é feito em conjunto, garantindo que cada detalhe da sua viagem seja perfeito.'
  },
  {
    question: 'Quais destinos vocês atendem?',
    answer: 'Atendemos diversos destinos nacionais e internacionais. Nossa expertise inclui destinos populares e também lugares menos explorados, sempre com foco em oferecer experiências autênticas e memoráveis.'
  },
  {
    question: 'Como posso começar a planejar minha viagem?',
    answer: 'Você pode começar preenchendo nosso formulário de contato ou agendando uma consulta com nossos especialistas. Também oferecemos um teste de perfil de viajante que nos ajuda a entender melhor suas preferências e criar um roteiro mais adequado.'
  }
]

export default function Home() {
  return <HomeContent faqQuestions={faqQuestions} />
} 