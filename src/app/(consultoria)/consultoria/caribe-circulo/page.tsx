'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import FAQ, { detailedFAQQuestions } from '@/components/FAQ'
import CirculoEvolvedSection from '@/components/circulo-evolved/CirculoEvolvedSection'
import { CustomersService } from '@/clients/customers'
import type { SubscriptionsResponse } from '@/clients/customers'

const CHECKOUT_PATH = '/app/circulo-evolved/checkout'
const SCROLL_CTA_TEXT = 'Ver os preços de atacado'
const CHECKOUT_CTA_TEXT = 'Contratar o Círculo Evolved'
const CIRCULO_SECTION_ID = 'preco'

const HERO_BULLETS = [
  'Curadoria de hotéis para casais — localização e estilo certos, sem erro de escolha.',
  'Acesso às mesmas tarifas de atacado que operadoras usam: 10 a 30% abaixo de Booking e Hoteis.com.',
  'Se você não economizar pelo menos o valor da assinatura, devolvemos a diferença.',
]

const HOW_IT_WORKS_STEPS = [
  {
    step: '1',
    title: 'Assine o Círculo Evolved',
    description: 'Um pagamento anual dá acesso à plataforma de tarifas de atacado e à curadoria.',
  },
  {
    step: '2',
    title: 'Escolha entre hospedagens selecionadas',
    description: 'Hotéis no Caribe já avaliados para casais — conforto, natureza e boa gastronomia.',
  },
  {
    step: '3',
    title: 'Compare os preços de atacado',
    description: 'Veja as tarifas líquidas lado a lado com os sites públicos e decida com clareza.',
  },
  {
    step: '4',
    title: 'Reserve sem comissão embutida',
    description: 'Pague o valor líquido, sem a margem que as agências online adicionam.',
  },
]

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 font-comfortaa text-white/90 items-start">
      <Image
        src="/assets/icons/icon-check-gold.svg"
        alt=""
        width={24}
        height={24}
        className="shrink-0 mt-0.5 w-6 h-6"
      />
      <span>{children}</span>
    </li>
  )
}

function ScrollToCirculoCta({
  source,
  className = 'inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all',
}: {
  source: string
  className?: string
}) {
  const scrollToCirculo = () => {
    document.getElementById(CIRCULO_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Button
      onClick={scrollToCirculo}
      event="pre_descobrir_viagem"
      eventOptions={{ source }}
      className={className}
    >
      {SCROLL_CTA_TEXT}
    </Button>
  )
}

export default function CaribeCirculoPage() {
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<SubscriptionsResponse | null>(null)
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(true)

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
        if (!cancelled) setSubscriptionsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/consultoria/caribe/hero.jpg"
            alt="Resort no Caribe"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Caribe sem complicação: hotéis escolhidos a dedo com tarifas de atacado para casais.
            </h1>
            <p className="text-white/90 font-comfortaa text-lg md:text-xl mb-8">
              Pare de perder horas comparando sites e correr o risco de escolher o hotel errado. O
              Círculo Evolved reúne curadoria de hospedagens e acesso às mesmas tarifas de atacado
              usadas por operadoras.
            </p>
            <ul className="space-y-4 mb-10">
              {HERO_BULLETS.map((bullet) => (
                <CheckBullet key={bullet}>{bullet}</CheckBullet>
              ))}
            </ul>
            <ScrollToCirculoCta source="Hero Section - Caribe Circulo" />
          </div>
        </div>
      </section>

      {/* Pain block */}
      <section className="py-20 md:py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[420px] md:h-[520px]">
              <Image
                src="/assets/consultoria/caribe/planning-challenges.jpg"
                alt="Casal planejando viagem ao Caribe"
                fill
                className="object-cover rounded-2xl shadow-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
                Se você é quem sempre planeja a viagem do casal, conhece o problema
              </h2>
              <div className="space-y-5 text-secondary-600 font-comfortaa text-lg mb-8">
                <p>
                  Abrir dezenas de abas, comparar resorts em localizações duvidosas, torcer para a
                  foto corresponder à realidade e ainda pagar a margem embutida dos sites de viagem.
                </p>
                <p>
                  No Caribe o risco é maior: destino distante, hospedagem cara e pouca margem para
                  errar hotel ou localização.
                </p>
                <p>
                  <span className="text-accent-600 font-bold">
                    O problema não é falta de opção — é falta de curadoria e acesso ao preço certo.
                  </span>
                </p>
              </div>
              <ScrollToCirculoCta source="Pain Section - Caribe Circulo" />
            </div>
          </div>
        </div>
      </section>

      {/* Solution block */}
      <section className="py-20 md:py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              O Caribe chama atenção. O Círculo Evolved resolve o resto.
            </h2>
            <p className="font-comfortaa text-lg text-secondary-600">
              Não vendemos pacote pronto nem promessa genérica de praia. Você entra em um clube de
              tarifas de atacado, com hospedagens já selecionadas para casais que querem conforto,
              natureza e boa gastronomia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[320px]">
                <Image
                  src="/assets/consultoria/caribe/relaxamento.jpg"
                  alt="Casal relaxando em resort no Caribe"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-xl font-bold mb-2">Curadoria para casal</h3>
                  <p className="text-white/90 font-comfortaa">
                    Hotéis selecionados por perfil — localização e estilo certos para o casal.
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[320px]">
                <Image
                  src="/assets/consultoria/caribe/aventura.jpg"
                  alt="Resort all inclusive no Caribe"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-xl font-bold mb-2">Tarifas de atacado</h3>
                  <p className="text-white/90 font-comfortaa">
                    As mesmas tarifas líquidas que operadoras usam — 10 a 30% abaixo dos sites públicos.
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[320px]">
                <Image
                  src="/assets/consultoria/caribe/cultura.jpg"
                  alt="Experiência gastronômica no Caribe"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-baloo text-xl font-bold mb-2">Sem comissão embutida</h3>
                  <p className="text-white/90 font-comfortaa">
                    Assinatura transparente. Você paga o valor líquido, sem financiar a margem de agências online.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <ScrollToCirculoCta source="Solution Section - Caribe Circulo" />
          </div>
        </div>
      </section>

      {/* Proof block */}
      <section className="py-20 md:py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Prova real: quanto um casal economiza no Caribe
              </h2>
              <p className="font-comfortaa text-lg text-secondary-700 mb-8 leading-relaxed">
                Veja exemplos reais de comparação em resort beira-mar no Caribe — tarifa pública,
                tarifa de site famoso e tarifa no Círculo Evolved.
              </p>
              <div className="font-comfortaa text-secondary-700 space-y-2 mb-6">
                <p className="font-semibold text-secondary-900">Exemplo de 7 noites para casal:</p>
                <ul className="list-none space-y-1">
                  <li>Tarifa pública: R$7.347,00</li>
                  <li>Tarifa &quot;membro&quot; em site famoso: R$6.681,00</li>
                  <li>Tarifa no Círculo Evolved: R$6.186,30</li>
                </ul>
                <p className="font-baloo font-bold text-accent-600 text-xl mt-4">
                  → R$ 1.160,70 de economia em uma única reserva
                </p>
              </div>
              <p className="text-xs text-secondary-500 font-comfortaa mb-8">
                *Cálculos baseados em hospedagem de 7 noites em resort beira-mar 4 estrelas em
                Curaçao. Imagem de comparação com base em hospedagem all inclusive 5 estrelas de 6
                noites na Riviera Maya.
              </p>
              <ScrollToCirculoCta source="Proof Section - Caribe Circulo" />
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl bg-transparent shadow-xl">
              <Image
                src="/assets/home/exemplo-trip.png"
                alt="Comparativo de tarifas Booking vs Círculo Evolved"
                width={1200}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-24 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-secondary-200 p-6 shadow-sm flex flex-col"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 text-white font-baloo text-xl font-bold mb-4">
                  {item.step}
                </span>
                <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-2">
                  {item.title}
                </h3>
                <p className="font-comfortaa text-secondary-600 text-sm flex-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <ScrollToCirculoCta source="How It Works Section - Caribe Circulo" />
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 md:py-20 bg-secondary-900">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-6">
            Garantia clara
          </h2>
          <div className="bg-white/10 border-2 border-accent-400/60 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <p className="font-comfortaa text-white text-lg leading-relaxed">
              Se você não recuperar o valor da assinatura em economia nas suas viagens, devolvemos a
              diferença.
            </p>
          </div>
          <ScrollToCirculoCta
            source="Guarantee Section - Caribe Circulo"
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          />
        </div>
      </section>

      {/* Pricing + checkout */}
      <CirculoEvolvedSection
        id={CIRCULO_SECTION_ID}
        className="scroll-mt-20"
        showPrice
        ctaText={CHECKOUT_CTA_TEXT}
        onCtaClick={() => router.push(CHECKOUT_PATH)}
        eventSource="Pricing Section - Caribe Circulo"
        manageSubscriptionsLocally={false}
        subscriptionsSnapshot={subscriptions}
        subscriptionsSnapshotLoading={subscriptionsLoading}
        subscriptionType="essential"
      />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-16 md:py-24 bg-secondary-50">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-10 text-center">
            Perguntas frequentes
          </h2>
          <FAQ questions={detailedFAQQuestions} />
          <div className="text-center mt-12">
            <ScrollToCirculoCta source="FAQ Section - Caribe Circulo" />
          </div>
        </div>
      </section>
    </div>
  )
}
