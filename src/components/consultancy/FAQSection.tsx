import FAQ from '@/components/FAQ'

interface FAQSectionProps {
  source: string
}

export default function FAQSection({ source }: FAQSectionProps) {
  const faqQuestions = [
    {
      question: "Por que vocês só fazem 6 viagens por mês?",
      answer: "Limitamos nosso número de viagens para garantir que cada casal receba atenção personalizada e dedicada. Isso nos permite criar experiências verdadeiramente únicas e cuidar de cada detalhe com o carinho que merecem."
    },
    {
      question: "Vocês reservam os meus voos e hospedagem?",
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
      question: "Por que vocês cobram para realizar a proposta?",
      answer: "Não trabalhamos com pacotes prontos. Cada viagem que construímos é unica e merece um planejamento especial. O valor de R$500,00 é um investimento que garante essa proposta detalhada e personalizada, fruto de horas de pesquisa e planejamento. Este valor é totalmente abatido no fechamento da viagem, demonstrando nosso compromisso com a qualidade do serviço."
    }
  ]

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