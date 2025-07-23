import FAQ from '@/components/FAQ'

interface FAQQuestion {
  question: string
  answer: string
}

interface FAQSectionProps {
  source: string
  questions?: FAQQuestion[]
}

export default function FAQSection({ source, questions }: FAQSectionProps) {
  const defaultQuestions = [
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
      question: "Por que vocês cobram para cuidar da minha viagem?",
      answer: "Não trabalhamos com pacotes prontos. Cada viagem que construímos é unica e merece um planejamento especial. O valor de R$1.200,00 é um investimento que garante essa proposta detalhada e personalizada, fruto de horas de pesquisa e planejamento."
    }
  ]

  const faqQuestions = questions || defaultQuestions

  return (
    <section className="py-24 bg-secondary-50">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-12 text-secondary-900 text-center">
          Perguntas Frequentes
        </h2>
        <FAQ questions={faqQuestions} />
      </div>
    </section>
  )
} 