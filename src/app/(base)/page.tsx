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
    answer: 'Trabalhamos com cruzeiros premium e de luxo, que entendemos que fornecem as melhores experiências a bordo e também na imersão em cada destino. São companhias diversas e com diferentes níveis de serviço, como Explora Journeys, Azamara, Celebrity e Norwegian Cruise Line.'
  },
  {
    question: 'Quais destinos vocês atendem?',
    answer: 'Nossa curadoria está em constante evolução. Nesse momento, trabalhamos com cruzeiros pelo Mediterrâneo, Caribe e Norte da Europa, além de alguns outros destinos terrestres focados na natureza. Para mais informações, entre em contato com nossos especialistas. Vamos fazer o possível para atender a todas as suas necessidades.'
  },
  {
    question: 'Vocês não são comissionados? Como funciona?',
    answer: 'Como toda a indústria de viagens, em alguns casos recebemos comissão dos produtos. Para garantir nosso total alinhamento à você e sua viagem, escolhemos trabalhar com valores totalmente sem comissão ou devolver as comissões recebidas como cashback. Isso significa dinheiro de volta no seu bolso e um cuidado total para que sua viagem seja especial.'
  },
  {
    question: 'O que recebo no Círculo Evolved?',
    answer: {
      html: 'Você recebe acesso a experiências exclusivas, viagens curadas e um travel designer para cuidar de todas as suas viagens ao longo do ano. Além disso, você recupera o valor do serviço em descontos ou cashback ao fechar sua viagem — ou recebe a diferença de volta. <a href="/circulo-evolved" class="text-accent-600 font-semibold hover:underline">Conheça o Círculo Evolved</a>.'
    }
  },
  {
    question: 'Como começo a planejar minha viagem?',
    answer: 'Para isso, você precisa fazer parte do Círculo Evolved. Clique em "Conhecer o Círculo Evolved" no menu inicial ou nos chame no WhatsApp - vai ser um prazer conversar com você.'
  }
]

export default function Home() {
  return <HomeContent faqQuestions={faqQuestions} />
} 