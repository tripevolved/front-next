'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CustomersService } from '@/clients/customers'
import type { SubscriptionsResponse } from '@/clients/customers'
import { getWhatsappLink } from '@/utils/helpers/whatsapp.helpers'

const CIRCULO_PRICE = 6700

const CIRCULO_WHATSAPP_MESSAGE =
  'Olá! Gostaria de saber sobre vagas para o Círculo Evolved. As vagas estão esgotadas no momento e gostaria de ser avisado quando houver disponibilidade.'
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
  const searchParams = useSearchParams()
  const permitirPagamento = searchParams?.get('permitirPagamento') ?? null
  const bypassPaymentCheck = permitirPagamento !== null && permitirPagamento !== ''

  const [subscriptions, setSubscriptions] = useState<SubscriptionsResponse | null>(null)
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true)

  useEffect(() => {
    let cancelled = false
    CustomersService.getSubscriptions()
      .then((data) => {
        if (!cancelled) setSubscriptions(data)
      })
      .catch(() => {
        if (!cancelled) setSubscriptions(null)
      })
      .finally(() => {
        if (!cancelled) setIsLoadingSubscriptions(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const noSpotsAvailable =
    !bypassPaymentCheck &&
    !isLoadingSubscriptions &&
    subscriptions != null &&
    subscriptions.available <= 0

  const showPaymentButton =
    bypassPaymentCheck || (!isLoadingSubscriptions && !noSpotsAvailable)

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
              {!bypassPaymentCheck && isLoadingSubscriptions && (
                <p className="font-comfortaa text-secondary-600 text-sm text-center py-3">
                  Verificando disponibilidade de vagas…
                </p>
              )}
              {showPaymentButton && (
                <>
                  <Link
                    href="/app/checkout/circulo-evolved/pagamento"
                    className="block w-full text-center font-baloo bg-accent-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-accent-600 transition-colors"
                  >
                    Ir para pagamento
                  </Link>
                  <p className="font-comfortaa text-xs text-secondary-500 text-center mt-4">
                    Compra segura • Você será redirecionado ao ambiente de pagamento
                  </p>
                </>
              )}
              {noSpotsAvailable && (
                <>
                  <p className="font-comfortaa text-secondary-700 text-xs italic mb-4 leading-relaxed">
                    No momento não há vagas disponíveis, mas estamos liberando novos lugares constantemente. Essa limitação existe para garantir o cuidado e o nosso nível de serviço para você, em todas as suas viagens. Entre em contato pelo WhatsApp e vamos te avisar quando surgir nova disponibilidade.
                  </p>
                  <a
                    href={getWhatsappLink(CIRCULO_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full font-baloo bg-[#25D366] text-white py-3 px-6 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Falar no WhatsApp
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
