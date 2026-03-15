import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Serviço — Círculo Evolved',
  description: 'Termos de serviço do plano de assinatura Círculo Evolved — benefícios, valor, garantia e condições.',
}

const PLAIN_TERMS = [
  {
    title: 'O que é o Círculo Evolved?',
    content: 'É um plano de assinatura anual (pagamento único) que dá a você e à sua família direta acesso a curadoria especializada, desenho personalizado de viagens e política de valores sem comissões por 12 meses. Você tem um Travel Designer dedicado para planejar e acompanhar suas viagens.',
  },
  {
    title: 'O que está incluso?',
    content: 'Design de viagens sob medida (roteiro e reservas pela Trip Evolved), curadoria de destinos e parceiros (incluindo cruzeiros e hospedagens), preços líquidos ou com cashback (comissões revertidas para você) e suporte antes, durante e após a viagem. Todas as viagens reservadas pela Trip Evolved no período de vigência entram no plano, inclusive viagens curtas.',
  },
  {
    title: 'Valor e vigência',
    content: 'O valor da assinatura é R$ 9.700,00 (pagamento único). A vigência começa na confirmação do pagamento e dura 12 meses. Não há renovação automática — ao final, você pode contratar de novo nas condições da época. Os primeiros 8 assinantes têm preço de lançamento de R$ 6.700,00, mantido enquanto forem clientes ativos e renovarem sem interrupção.',
  },
  {
    title: 'Quem pode usar os benefícios?',
    content: 'O assinante e a família direta (cônjuge/companheiro e dependentes) cadastrados na Trip Evolved. Apenas viagens reservadas exclusivamente pela Trip Evolved são elegíveis a cashback e valores sem comissão.',
  },
  {
    title: 'Garantia de valor',
    content: 'Você recebe em descontos e/ou cashback, durante a vigência do plano, o equivalente ao valor pago na assinatura. Se ao final dos 12 meses o total de benefícios for menor que o valor da assinatura, a Trip Evolved devolve a diferença (por exemplo, via Pix), em até 30 dias úteis, mediante solicitação.',
  },
  {
    title: 'Cancelamento e arrependimento',
    content: 'Você pode desistir em até 7 dias a partir da confirmação do pagamento e receber reembolso integral (direito do consumidor). Após esse prazo, em caso de cancelamento, você mantém direito à devolução da diferença da garantia de valor, proporcional ao tempo de vigência. O cancelamento do plano não cancela viagens já reservadas — essas seguem as regras de cada fornecedor.',
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
            Círculo Evolved — Versão 1.0
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
            href="https://drive.google.com/file/d/1w58l4uVdzktTGAkw2nT81Ds1ngLI4GzK/view?usp=sharing"
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
