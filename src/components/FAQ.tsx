'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string | { html: string }
}

interface FAQProps {
  questions: FAQItem[]
}

export const basicFAQQuestions = [
  {
    question: 'O que é a Trip Evolved?',
    answer: {
      html: "<p>A Trip Evolved Viagens LTDA é uma agência de viagens online, presente no Cadastur com CNPJ 47.875.077/0001-79. Nos últimos 4 anos, construímos experiências únicas e personalizadas para dezenas de clientes, e entendemos que o modelo que forma a indústria de viagens não é o melhor para você, viajante.</p><br/><p>A partir disso, nasce o Círculo Evolved, nossa forma de transformar os seus objetivos de viagem em realidade, com uma assinatura anual única que te dá acesso à nossa curadoria e à valores que só as agências tem acesso e que o mercado mantém escondidos de você - até hoje.</p>"
    }
  },
  {
    question: "O que é o Círculo Evolved e por que é diferente de outros programas de viagens?",
    answer: {
      html: "<p>O Círculo Evolved é um programa de viagens online que te dá acesso à valores net (sem comissão) em hospedagens e outros produtos, que só agências de viagem, grupos fechados e clientes corporativos tem acesso e entrega tudo em torno de uma curadoria única, que escolhe o que há de melhor em cada destino. Ao invés de cobrar uma comissão escondida em cada reserva, o Círculo Evolved te entrega as tarifas sem comissão e cobra uma simples taxa de assinatura anual.</p><br/><p>A maior parte dos sites de viagem ganham dinheiro ao adicionar 10-50% em cima do que o hotel ou produto cobra deles, mesmo quando é uma promoção especial ou um \"preço para membros\". O Círculo Evolved é o oposto disso: nós recebemos <span className='font-bold'>zero</span> comissões e passamos a tarifa net diretamente para você. Nós só ganhamos dinheiro através da taxa de assinatura, então nossos interesses estão alinhados para te oferecer o melhor negócio possível.</p>"
    }
  },
  {
    question: 'Vocês só trabalham com viagens de lazer?',
    answer: 'Sim! Nossa expertise é em viagens de lazer e isso garante que nossa curadoria seja sempre alinhada ao que você busca.'
  },
  {
    question: 'Quanto eu posso economizar com o Círculo Evolved?',
    answer: {
      html: "<p>A economia depende do destino, datas e hotel, mas membros do Círculo Evolved tipicamente obtém valores entre 10 e 30% menores que as tarifas públicas. Em uma única viagem a dois, de 7 dias para Curaçao em um resort beira-mar 4 estrelas, por exemplo:</p><br/><ul><li>Tarifa pública: R$7.347,00</li><li>Tarifa \"membro\" em site famoso: R$6.681,00</li><li>Tarifa no Círculo Evolved: R$6.186,30</li></ul><br/><p>O caso do exemplo é um caso típico no Círculo Evolved. Em muitos outros casos, a economia de uma única reserva mais do que cobre o valor inteiro da assinatura anual.</p>"
    }
  },
  {
    question: 'Posso viajar para qualquer lugar do mundo?',
    answer:  "Sim e não. No momento, focamos nossa curadoria em destinos no Caribe e América do Sul, mas em algum momento estaremos em todos os lugares do mundo. Como estamos em constante evolução, se você tiver interesse em algum destino específico, entre em contato conosco. Vamos avançar esse destino em nossa lista de curadoria e fazer o possível para atender suas necessidades."
  },
  {
    question: 'Por que há vagas limitadas no Círculo Evolved?',
    answer: {
      html: "<p>O Círculo Evolved tem um número limitado de vagas para que possamos dar o cuidado e a atenção que cada pessoa merece. Essa limitação garante que sua viagem seja acompanhada com a dedicação que você espera, sem comprometer a qualidade do atendimento.</p>"
    }
  },
  {
    question: 'Como começo a planejar minha viagem?',
    answer: {
      html: "<p>O primeiro passo para isso é fazer parte do Círculo Evolved. Clique em <a href='/app/circulo-evolved/checkout' class='text-primary-500' target='_blank'>Contratar o Círculo Evolved</a> para começar o processo de assinatura. Após o pagamento, você será redirecionado para cadastrar as pessoas que viajam com você.</p><br/><p>Em seguida, você poderá reservar sua viagem clicando em \"Planejar nova viagem\" no painel inicialdo Círculo Evolved, garantindo os melhores valores e experiências para sua jornada.</p>"
    }
  }
]

export const detailedFAQQuestions = [
  {
    question: "O que é o Círculo Evolved e por que é diferente de outros programas de viagens?",
    answer: {
      html: "<p>O Círculo Evolved é um programa de viagens online que te dá acesso à valores net (sem comissão) em hospedagens e outros produtos, que só agências de viagem, grupos fechados e clientes corporativos tem acesso e entrega tudo em torno de uma curadoria única, que escolhe o que há de melhor em cada destino. Ao invés de cobrar uma comissão escondida em cada reserva, o Círculo Evolved te entrega as tarifas sem comissão e cobra uma simples taxa de assinatura anual.</p><br/><p>A maior parte dos sites de viagem ganham dinheiro ao adicionar 10-50% em cima do que o hotel ou produto cobra deles, mesmo quando é uma promoção especial ou um \"preço para membros\". O Círculo Evolved é o oposto disso: nós recebemos <span className='font-bold'>zero</span> comissões e passamos a tarifa net diretamente para você. Nós só ganhamos dinheiro através da taxa de assinatura, então nossos interesses estão alinhados para te oferecer o melhor negócio possível.</p>"
    }
  },
  {
    question: 'Quanto eu posso economizar com o Círculo Evolved?',
    answer: {
      html: "<p>A economia depende do destino, datas e hotel, mas membros do Círculo Evolved tipicamente obtém valores entre 10 e 30% menores que as tarifas públicas. Em uma única viagem a dois, de 7 dias para Curaçao em um resort beira-mar 4 estrelas, por exemplo:</p><br/><ul><li>Tarifa pública: R$7.347,00</li><li>Tarifa \"membro\" em site famoso: R$6.681,00</li><li>Tarifa no Círculo Evolved: R$6.186,30</li></ul><br/><p>O caso do exemplo é um caso típico no Círculo Evolved. Em muitos outros casos, a economia de uma única reserva mais do que cobre o valor inteiro da assinatura anual.</p>"
    }
  },
  {
    question: 'Posso viajar para qualquer lugar do mundo?',
    answer:  "Sim e não. No momento, focamos nossa curadoria em destinos no Caribe e América do Sul, mas em algum momento estaremos em todos os lugares do mundo. Como estamos em constante evolução, se você tiver interesse em algum destino específico, entre em contato conosco. Vamos avançar esse destino em nossa lista de curadoria e fazer o possível para atender suas necessidades."
  },
  {
    question: 'O Círculo Evolved tem algum risco? E se eu não economizar o suficiente?',
    answer: "Não! O Círculo Evolved foi cuidadosamente desenhado para que você receba um valor igual ou superior ao valor da assinatura anual. Se durante a vigência do plano, sua economia for menor que o valor da assinatura, você pode nos contatar em produto@tripevolved.com.br e te devolvemos a diferença."
  },
  {
    question: 'Por que outros sites de viagens não exibem esses valores se eles existem?',
    answer: {
      html: "<p>A maior parte dos sites de viagens é construída em um modelo simples:</p><br/><ul><li>Eles recebem uma tarifa net (líquida) do hotel ou operadora</li><li>Eles adicionam uma margem de 10-40% ou mais em cima</li><li>Aquela margem é a receita deles para marketing, operações e lucro</li><li>Mesmo quando você vê \"ofertas de última hora\" ou \"preço para membro\", o modelo ainda é o mesmo, com uma margem em cima. O Círculo Evolved altera esse modelo, com uma assinatura anual transparente. Isso também garante que nossa curadoria não tenha conflito de interesses entre oferecer um hotel que pague 30 versus o hotel que paga 10<li></ul>"
    }
  },
  {
    question: 'Quando o Círculo Evolved vai se pagar?',
    answer: {
      html: "<p>Construímos o Círculo Evolved para que ele se pague sozinho. Para a maioria dos casais que realizam uma ou duas viagens por ano, normalmente isso acontece já na primeira reserva de hotel. Se você está reservando uma jornada pelo Caribe ou América do Sul de sete a 10 dias, você normalmente vai ver uma economia de R$1.200,00 ou mais já nesta viagem.</p><br/><p>Se você viaja mais frequentemente, as economias se somam rapidamente. Quatro ou cinco viagens ao longo do ano representam milhares de reais de economia.</p>"
    }
  },
  {
    question: 'Há alguma taxa escondida de reserva com o Círculo Evolved?',
    answer: "Não! O Círculo Evolved não adiciona nenhuma taxa escondida ou margens extras nas reservas. Taxas locais, taxas de resort e outras cobranças obrigatórias pela hospedagem ou autoridades locais ainda podem ser aplicadas e estarão mostradas no momento da reserva. Nosso modelo é simples: sua assinatura anual é como ganhamos dinheiro, garantindo alinhamento para nossa curadoria e as melhores tarifas para você."
  },
  {
    question: 'Posso usar minha assinatura para reservar para amigos e família?',
    answer: {
      html: "<p>Não, o Círculo Evolved é um programa desenvolvido para casais. Após a assinatura, você deve cadastrar quem viaja com você e, após isso, poderá reservar para eles.</p><p>Você pode conferir os termos de serviço do Círculo Evolved <a href='/documentos/circulo-evolved/termos-de-servico' class='text-primary-500' target='_blank'>aqui</a>.</p>"
    }
  },
  {
    question: 'Os valores no Círculo Evolved mudam com o tempo?',
    answer: "Sim. Preços de hospedagens e outros itens são dinâmicos em todos os lugares e podem mudar com o passar do tempo. As tarifas podem aumentar ou diminuir dependendo do destino, datas e hotel. Nosso sistema está passando as tarifas net (sem comissões) diretamente para você, então você está sempre vendo os valores conforme eles são atualizados pelas hospedagens e seus sistemas. Se você vê um valor que claramente está abaixo dos sites públicos, é uma boa ideia reservar o quanto antes para evitar perdê-lo."
  },
  {
    question: 'Por que há vagas limitadas no Círculo Evolved?',
    answer: {
      html: "<p>O Círculo Evolved tem um número limitado de vagas para que possamos dar o cuidado e a atenção que cada pessoa merece. Essa limitação garante que sua viagem seja acompanhada com a dedicação que você espera, sem comprometer a qualidade do atendimento.</p>"
    }
  },
  {
    question: 'Como começo a planejar minha viagem?',
    answer: {
      html: "<p>O primeiro passo para isso é fazer parte do Círculo Evolved. Clique em <a href='/app/circulo-evolved/checkout' class='text-primary-500' target='_blank'>Contratar o Círculo Evolved</a> para começar o processo de assinatura. Após o pagamento, você será redirecionado para cadastrar as pessoas que viajam com você.</p><br/><p>Em seguida, você poderá reservar sua viagem clicando em \"Planejar nova viagem\" no painel inicialdo Círculo Evolved, garantindo os melhores valores e experiências para sua jornada.</p>"
    }
  }
]

export default function FAQ({ questions }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {questions.map((item, index) => (
        <div 
          key={index}
          className="border-b border-secondary-200 last:border-b-0"
        >
          <button
            className="w-full py-6 flex justify-between items-center text-left"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-xl font-baloo font-semibold text-secondary-900 pr-4">
              {item.question}
            </h3>
            <span className="flex-shrink-0">
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="pb-6 text-secondary-600 font-comfortaa">
              {typeof item.answer === 'string' ? (
                <p>{item.answer}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.answer.html }} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 