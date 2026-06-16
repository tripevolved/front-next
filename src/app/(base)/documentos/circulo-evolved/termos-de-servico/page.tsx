import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Serviço — Círculo Evolved',
  description:
    'Termos de serviço dos planos Círculo Evolved Essencial e Total — benefícios, valor, garantia e condições.',
}

const PLAIN_TERMS = [
  {
    title: 'O que é o Círculo Evolved?',
    content:
      'São planos de assinatura anual (pagamento único) oferecidos pela Trip Evolved nas modalidades Essencial e Total. Por 12 meses, o assinante e a família direta cadastrada têm acesso a curadoria de viagens e a valores sem comissões nas reservas feitas pela plataforma. Estes Termos complementam os Termos de Uso da Trip Evolved.',
  },
  {
    title: 'Essencial ou Total?',
    content:
      'No Círculo Evolved Total, você conta com Travel Designer dedicado para planejar, desenhar e acompanhar suas viagens, com suporte personalizado antes, durante e após cada viagem. No Círculo Evolved Essencial, o atendimento é 100% online — sem Travel Designer dedicado — com foco em curadoria de hospedagens e valores sem comissões. As viagens podem ser organizadas para qualquer membro da família cadastrada, mesmo sem a presença do assinante titular.',
  },
  {
    title: 'O que está incluso?',
    content:
      'Dependendo da modalidade: design completo de viagens (Total), curadoria de destinos e parceiros, preços líquidos ou com cashback (comissões revertidas para você) e suporte conforme o plano contratado. Todas as viagens reservadas integralmente pela Trip Evolved durante a vigência entram no plano, inclusive viagens curtas. Os benefícios aplicam-se a cada serviço reservado pela Trip Evolved — trechos reservados diretamente com terceiros não são elegíveis.',
  },
  {
    title: 'Valor e vigência',
    content:
      'Os valores das assinaturas Essencial e Total estão na página do Círculo Evolved (tripevolved.com.br/circulo-evolved). A vigência começa na confirmação do pagamento e dura 12 meses, sem renovação automática. Condições promocionais de lançamento: os primeiros 8 assinantes do Total pagam R$ 6.700,00; os primeiros 30 do Essencial pagam R$ 970,00 e recebem 1 sessão de consultoria com Travel Designer no primeiro ano — benefícios mantidos enquanto renovarem sem interrupção.',
  },
  {
    title: 'Quem pode usar os benefícios?',
    content:
      'O assinante e a família direta (cônjuge ou companheiro(a) e dependentes) cadastrados na plataforma, sem limite de membros, desde que o cadastro seja feito antes da viagem. Cashback e valores sem comissão valem apenas para serviços reservados exclusivamente pela Trip Evolved. Viagens organizadas durante a vigência podem ser realizadas após o fim do plano, com suporte até a conclusão.',
  },
  {
    title: 'Garantia de valor',
    content:
      'Você recebe em descontos e/ou cashback, durante a vigência do plano, o equivalente ao valor pago na assinatura. Se ao final dos 12 meses o total de benefícios for menor que o valor da assinatura, a Trip Evolved devolve a diferença via Pix, em até 30 dias úteis após o encerramento, mediante solicitação. Trata-se de benefício comercial vinculado ao plano — não é investimento nem rendimento financeiro.',
  },
  {
    title: 'Cancelamento e arrependimento',
    content:
      'Você pode desistir em até 7 dias a partir da confirmação do pagamento e receber reembolso integral (direito do consumidor). Se já tiver reservado viagens nesse período, o reembolso depende do cancelamento dessas reservas conforme as regras de cada fornecedor. Após 7 dias, em caso de cancelamento, você mantém direito à devolução proporcional da garantia de valor. O cancelamento do plano não cancela viagens já reservadas — essas seguem as regras de cada fornecedor. Solicite pelo e-mail info@tripevolved.com.br ou pela plataforma.',
  },
]

export default function TermosDeServicoCirculoPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-secondary-500 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-baloo text-3xl md:text-4xl font-bold mb-4">
            Termos de Serviço
          </h1>
          <p className="text-white/90 font-comfortaa text-lg">
            Círculo Evolved — Versão 1.0 · 16/06/2026
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <h2 className="font-baloo text-2xl font-bold text-gray-900 mb-6">
          Em resumo
        </h2>
        <p className="text-gray-700 mb-10 font-comfortaa">
          Abaixo explicamos em linguagem simples os pontos principais dos Termos de Serviço do Círculo Evolved. 
          Eles complementam os Termos de Uso da plataforma. Para dúvidas:{' '}
          <a href="mailto:info@tripevolved.com.br" className="text-accent-600 hover:underline">info@tripevolved.com.br</a>
          {' '}ou (51) 99358-2462, de segunda a sexta, 9h às 18h (Brasília).
        </p>

        <div className="space-y-8">
          {PLAIN_TERMS.map((item) => (
            <div key={item.title}>
              <h3 className="font-baloo text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 font-comfortaa leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-baloo text-xl font-bold text-gray-900 mb-4">
            Documento completo
          </h2>
          <p className="text-gray-700 mb-8 font-comfortaa">
            Para ler o texto integral dos Termos de Serviço do Círculo Evolved, 
            incluindo definições, regras de cashback, responsabilidades e foro, 
            acesse o documento completo.
          </p>
          <Link
            href="https://drive.google.com/file/d/1MG5BQn624e-8xO1XMa-hYUU4vMu8J8JI/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-baloo font-semibold bg-accent-500 text-white px-8 py-3 rounded-full hover:bg-accent-600 transition-colors"
          >
            Ver documento completo (PDF)
          </Link>
        </div>
      </section>
    </div>
  )
}
