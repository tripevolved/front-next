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
    question: 'Quais cruzeiros vocês oferecem?',
    answer: 'Trabalhamos cruzeiros premium e de luxo, que entendemos que fornecem as melhores experiências a bordo e também na imersão em cada destino. São companhias diversas e com diferentes níveis de serviço, como Explora Journeys, Azamara, Celebrity e Norwegian Cruise Line.'
  },
  {
    question: 'Vocês não são comissionados? Como funciona?',
    answer: 'Como toda a indústria de viagens, em alguns casos recebemos comissão dos produtos. Para garantir nosso total alinhamento à você e sua viagem, escolhemos trabalhar com valores net (sem comissão) ou devolver as comissões recebidas como cashback. Isso significa dinheiro de volta no seu bolso e um cuidado total para que sua viagem seja especial.'
  },
  {
    question: 'Quais destinos vocês atendem?',
    answer: 'Nossa curadoria está em constante evolução. Nesse momento, trabalhamos com cruzeiros pelo Mediterrâneo, Caribe e Norte da Europa, além de alguns outros destinos terrestres focados na natureza. Para mais informações, entre em contato com nossos especialistas. Vamos fazer o possível para atender a todas as suas necessidades.'
  },
  {
    question: 'Como começo a planejar minha viagem?',
    answer: 'Clique em "Começar minha jornada" aqui na nossa página inicial. Nesse processo, você responderá algumas perguntas sobre sua viagem, que vão nos ajudar a recomendar as melhores opções para seu objetivo e perfil. Esse processo leva menos de 5 minutos e nossos especialistas entrarão em contato logo em seguida para planejar sua viagem.'
  }
]

export default function Home() {
  return <HomeContent faqQuestions={faqQuestions} />
} 