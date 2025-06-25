import FAQSection from './FAQSection'

interface FAQTripPlanningSectionProps {
  source: string
}

export default function FAQTripPlanningSection({ source }: FAQTripPlanningSectionProps) {
  const tripPlanningQuestions = [
    {
      question: "Por que eu devo contratar vocês?",
      answer: "Se você se frustra e não quer perder horas procurando por voos, hospedagens e atividades, estamos aqui para te ajudar. Nossa equipe de especialistas está pronta para criar uma viagem única e personalizada para vocês, pensando em momentos especiais."
    },
    {
      question: "Vocês reservam os meus voos e hospedagens?",
      answer: "Sim! Nós cuidamos de toda a parte operacional da sua viagem, incluindo voos, hospedagens, traslados e experiências. Mas vamos muito além disso, com experiência local nos destinos, um concierge de viagens e auxílio pré-viagem. Vocês só precisam se preocupar em aproveitar cada momento."
    },
    {
      question: "Quais destinos vocês oferecem?",
      answer: "Trabalhamos com destinos em todo o mundo, sempre focando naqueles que melhor se encaixam no perfil e nos desejos de cada casal. Nossa expertise inclui desde destinos românticos na Europa até experiências únicas no Caribe, Estados Unidos e América do Sul."
    },
    {
      question: "E se eu tiver um problema com minha viagem?",
      answer: "Oferecemos suporte 24/7 durante toda a sua viagem. Nossa equipe está sempre pronta para ajudar com qualquer situação, desde mudanças de reservas até emergências. Você nunca estará sozinho."
    },
    {
      question: "Por que vocês cobram para apresentar a proposta?",
      answer: "Não trabalhamos com pacotes prontos. Cada viagem que construímos é unica e merece um planejamento especial. O valor de R$500,00 é um investimento que garante essa proposta detalhada e personalizada, fruto de horas de pesquisa e planejamento. E, ao final, esse valor retorna para você. Nós também temos outros serviços, como a consultoria completa da sua viagem com diversos benefícios, além da criação de roteiros personalizados e concierge em diversos destinos. Consulte nossos especialistas para entender melhor."
    }
  ]

  return (
    <FAQSection source={source} questions={tripPlanningQuestions} />
  )
} 