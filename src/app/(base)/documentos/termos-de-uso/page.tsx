import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso da plataforma Trip Evolved — como funciona o site, seus direitos e deveres.',
}

const PLAIN_TERMS = [
  {
    title: 'O que fazemos?',
    content: 'Somos uma agência de viagens especializada em viagens personalizadas. Entendemos seu perfil e preferências e cuidamos do planejamento completo: passagens, hospedagem, aluguel de veículos, traslados, ingressos e o que mais for preciso. Operamos pelo Círculo Evolved, um serviço por assinatura com especialista dedicado e valores sem comissão — sem taxas escondidas.',
  },
  {
    title: 'Como funciona a plataforma?',
    content: 'Você acessa o site, recebe recomendações personalizadas ou escolhe entre as opções disponíveis. Para contratar viagens ou serviços, é necessário ter cadastro aprovado na plataforma. A Trip Evolved atua como intermediadora: planejamos e organizamos, mas a execução dos serviços (transporte, hospedagem, etc.) é responsabilidade dos fornecedores contratados.',
  },
  {
    title: 'É pago?',
    content: 'O Círculo Evolved tem valor anual para acesso aos benefícios e à curadoria. Ao contratá-lo, não há taxa extra da Trip Evolved sobre as reservas. Serviços fora do plano podem ter cobrança adicional. Você paga pelos serviços que contratar (passagens, hospedagens, ingressos etc.), conforme o que estiver incluso no que você escolher.',
  },
  {
    title: 'Os termos podem mudar?',
    content: 'Sim. A versão mais atualizada fica disponível no site. Se alguma alteração exigir sua autorização por lei, você será avisado antes para aceitar ou recusar.',
  },
  {
    title: 'Dados pessoais',
    content: 'Temos um Aviso de Privacidade que explica como tratamos seus dados. É importante ler e entender esse documento.',
  },
  {
    title: 'Arrependimento e cancelamento',
    content: 'Você tem direito de arrependimento em até 7 dias a partir da confirmação da contratação, com reembolso integral. Após esse prazo, políticas de cancelamento de terceiros (companhias aéreas, hotéis etc.) se aplicam — a Trip Evolved atua como intermediadora e não responde pelas regras de cada fornecedor.',
  },
]

export default function TermosDeUsoPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-secondary-500 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-baloo text-3xl md:text-4xl font-bold mb-4">
            Termos de Uso
          </h1>
          <p className="text-white/90 font-comfortaa text-lg">
            Versão 2.0 — Trip Evolved
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <h2 className="font-baloo text-2xl font-bold text-gray-900 mb-6">
          Em resumo
        </h2>
        <p className="text-gray-700 mb-10 font-comfortaa">
          Abaixo explicamos em linguagem simples os pontos principais dos nossos Termos de Uso. 
          Para dúvidas, estamos disponíveis em{' '}
          <a href="mailto:info@tripevolved.com.br" className="text-accent-600 hover:underline">info@tripevolved.com.br</a>
          {' '}e no telefone (51) 99358-2462, de segunda a sexta, 9h às 18h (horário de Brasília).
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
            Para ler o texto integral dos Termos de Uso da plataforma Trip Evolved, 
            incluindo definições técnicas, responsabilidades, cashback, propriedade intelectual e foro, 
            acesse o documento completo.
          </p>
          <Link
            href="https://drive.google.com/file/d/1bUY43MzwsiCSZMYUm6xwjfwTC0JKpTfr/view?usp=sharing"
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
