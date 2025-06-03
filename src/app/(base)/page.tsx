import HomeContent from '@/components/HomeContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trip Evolved - Viagens Personalizadas',
  description: 'Descubra viagens únicas e personalizadas com a Trip Evolved. Roteiros exclusivos, experiências autênticas e atendimento premium para sua próxima aventura.',
  alternates: {
    canonical: 'https://tripevolved.com.br',
  },
}

const faqQuestions = [
  {
    question: 'O que é a Trip Evolved?',
    answer: 'A Trip Evolved é uma agência de viagens especializada em criar experiências únicas e personalizadas. Nossa missão é transformar os seus objetivos de viagem em realidade, com roteiros únicos e personalizados que se adaptam ao seu estilo de viajante.'
  },
  {
    question: 'Como funciona o processo de planejamento?',
    answer: 'Nosso processo começa com uma análise detalhada do seu perfil de viajante e dos seus objetivos de viagem. A partir daí, você receberá uma proposta de viagem, desenvolvida por especialistas, com um itinerário pensado para oferecer momentos únicos na sua viagem. A partir daí, podemos realizar todos os ajustes necessários para que a viagem fique do jeito que vocês desejam, garantindo que cada detalhe da sua viagem seja perfeito. Então, você realiza o pagamento e cuidamos de todas as reservas para vocês.'
  },
  {
    question: 'Aceitei uma proposta de viagem. E agora?',
    answer: 'Muito obrigado pela confiança! A partir desse momento, você receberá um contrato com as condições gerais da viagem, que deverá ser assinado online. Isso garante segurança para você e para nós. Então, uma vez que o pagamento seja realizado, vamos realizar todas as reservas para vocês.'
  },
  {
    question: 'Como funciona o suporte da minha viagem?',
    answer: 'Cuidamos da sua viagem desde a ideia até depois de quando você retorna para casa. Isso significa que vamos te ajudar com todas as necessidades de documentos, organização, o que levar na mala, como se preparar, lembretes importantes ao longo da viagem. Além disso, você terá seu roteiro personalizado e acesso a um concierge durante a viagem, que vai te ajudar com restaurantes, atrações, ingressos e o que mais for necessário para que sua experiência seja perfeita e livre de estresse. E claro: em caso de imprevistos, você tem acesso a um suporte 24h por dia, 7 dias por semana.'
  },
  {
    question: 'Quais destinos vocês atendem?',
    answer: 'Nossa curadoria é extensa e inclui diversos destinos nacionais e internacionais. São lugares como Maragogi, Aruba, Nova York e Paris e também lugares menos explorados, como Curaçao, Yosemite e a Costa Amalfitana, sempre com foco em oferecer experiências autênticas e memoráveis.'
  },
  {
    question: 'Como começo a planejar minha viagem?',
    answer: 'Você pode começar clicando em "Descobrir minha viagem" aqui na nossa página inicial. Nesse processo, você responderá algumas perguntas sobre sua viagem e já vamos recomendar alguns destinos que combinam com seus objetivos e perfil. Você também pode deixar seu contato clicando em "Falar com especialista" ou pelo botão do WhatsApp no canto inferior direito da página. Em qualquer dos casos, nossos especialistas vão entrar em contato com você para começar a construir sua viagem ideal.'
  }
]

export default function Home() {
  return <HomeContent faqQuestions={faqQuestions} />
} 