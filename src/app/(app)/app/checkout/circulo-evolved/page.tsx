'use client'

import Image from 'next/image'
import Link from 'next/link'

const CIRCULO_PRICE = 6700
const INCLUDED_ITEMS = [
  {
    title: 'Design de todas as viagens',
    description: 'Planejamento e desenho completo de cada viagem, sob medida, com roteiro e reservas cuidadas por nossa equipe.',
  },
  {
    title: 'Curadoria',
    description: 'Seleção de destinos, experiências e parceiros alinhados ao que você busca — cruzeiros, hospedagens e vivências que fazem sentido para você.',
  },
  {
    title: 'Valores sem comissões',
    description: 'Preços líquidos ou com cashback: as comissões são revertidas em seu benefício, e você vê o valor real da viagem.',
  },
]

const IMPORTANT_ANSWERS = [
  'Após a contratação, vamos cadastrar sua família. Apenas viagens com essas pessoas (família direta) são elegíveis aos benefícios.',
  'As viagens precisam ser organizadas no período de 12 meses, mas podem ser realizadas depois — o suporte necessário permanece.',
  'Todas as viagens realizadas no período estão incluídas, inclusive viagens curtas e de fim de semana.',
  'Todos os trechos da viagem precisam ser reservados através da Trip Evolved para serem elegíveis à política sem comissões.',
  'Não trabalhamos com todos os produtos e destinos, mas estamos em constante evolução e vamos avaliar qualquer destino que você deseje para sua viagem com nossos parceiros.',
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export default function CirculoEvolvedCheckoutPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900">
            Círculo Evolved — Checkout
          </h1>
          <p className="font-comfortaa text-secondary-600 mt-2">
            Confira o que está incluso e os termos antes de seguir para o pagamento.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content: benefits, guarantee, terms */}
          <div className="lg:col-span-2 space-y-8">
            {/* O que está incluso */}
            <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
              <h2 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-6">
                O que está incluso
              </h2>
              <ul className="space-y-4">
                {INCLUDED_ITEMS.map((item, i) => (
                  <li key={i} className="flex gap-4 font-comfortaa text-secondary-700 items-start">
                    <Image
                      src="/assets/icons/icon-check-gold.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="shrink-0 mt-0.5 w-6 h-6"
                    />
                    <div>
                      <span className="font-semibold text-secondary-900">{item.title}</span>
                      <span> — {item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Garantia */}
            <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
              <h2 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-4">
                Garantia
              </h2>
              <p className="font-comfortaa text-secondary-700 leading-relaxed">
                Você recebe o valor da assinatura de volta em descontos ou, ao final dos 12 meses, te devolvemos a diferença.
              </p>
            </section>

            {/* Respostas importantes */}
            <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
              <h2 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-6">
                Respostas importantes
              </h2>
              <ul className="font-comfortaa text-secondary-700 text-sm leading-relaxed space-y-4 list-none pl-0">
                {IMPORTANT_ANSWERS.map((q, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-secondary-200 text-secondary-700 font-baloo font-semibold text-xs flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Termos e condições */}
            <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
              <h2 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-4">
                Termos e condições
              </h2>
              <ul className="font-comfortaa text-secondary-700 text-sm leading-relaxed space-y-2 list-disc pl-5">
                <li>O Círculo Evolved é um serviço de assinatura anual. O acesso e os benefícios vigoram por 12 meses a partir da confirmação do pagamento.</li>
                <li>Os descontos e o cashback aplicam-se a viagens fechadas através da Trip Evolved durante o período de vigência da assinatura.</li>
                <li>Condições para pagamento do cashback estão sujeitas à política comercial vigente e devem ser confirmadas no ato da reserva da viagem.</li>
                <li>Ao prosseguir com o pagamento, você declara estar ciente e de acordo com estes termos e com os{' '}
                  <Link href="/termos-de-uso" target="_blank" className="text-accent-600 hover:underline font-medium">
                    Termos de Uso
                  </Link>{' '}
                  do site.
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar: price + CTA */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 bg-white rounded-2xl border border-secondary-200 p-6 shadow-sm">
              <h2 className="font-baloo text-lg font-bold text-secondary-900 mb-4">
                Resumo
              </h2>
              <p className="font-comfortaa text-secondary-600 text-sm mb-4">
                Assinatura anual — acesso a curadoria, desenho de viagem e viagens sem comissões por 12 meses.
              </p>
              <div className="border-t border-secondary-200 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-comfortaa text-secondary-700">Valor total</span>
                  <span className="font-baloo text-2xl font-bold text-secondary-900">
                    {formatCurrency(CIRCULO_PRICE)}
                  </span>
                </div>
                <p className="font-comfortaa text-xs text-secondary-500 mt-1">
                  Pagamento único
                </p>
              </div>
              <Link
                href="/app/checkout/circulo-evolved/pagamento"
                className="block w-full text-center font-baloo bg-accent-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-accent-600 transition-colors"
              >
                Ir para pagamento
              </Link>
              <p className="font-comfortaa text-xs text-secondary-500 text-center mt-4">
                Compra segura • Você será redirecionado ao ambiente de pagamento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
