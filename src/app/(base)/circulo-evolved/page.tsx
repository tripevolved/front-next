'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FAQ from '@/components/FAQ'
import CirculoEvolvedSection from '@/components/circulo-evolved/CirculoEvolvedSection'

const PARA_QUEM_ITEMS = [
  'Casais e famílias que buscam um parceiro estratégico para suas viagens, não um vendedor',
  'Quem investe R$ 100 mil ou mais em viagens por ano e busca vantagens exclusivas',
  'Apaixonados por cruzeiros e hospedagens com conforto e gastronomia únicos',
  'Quem busca alinhamento e confiança com quem desenha suas viagens',
]

const BENEFIT_CARDS = [
  { id: 'curadoria', title: 'Curadoria', description: 'Seleção de destinos e experiências alinhadas ao que você busca.' },
  { id: 'travel-designer', title: 'Travel Designer Dedicado', description: 'Um parceiro para desenhar e cuidar de todas as suas viagens.' },
  { id: 'sem-comissoes', title: 'Sem comissões e taxas escondidas', description: 'Preços líquidos ou com cashback; você vê o valor real.' },
]

const FAQ_ITEMS = [
  { q: 'Por que há vagas limitadas no Círculo Evolved?', a: 'O Círculo Evolved tem um número limitado de vagas para que possamos dar o cuidado e a atenção que cada pessoa merece. Essa limitação garante que sua viagem seja desenhada e acompanhada com a dedicação que você espera — sem comprometer a qualidade do atendimento.' },
  { q: 'Quem pode ser elegível aos benefícios?', a: 'Após a contratação, cadastramos sua família. Apenas viagens com essas pessoas (família direta) são elegíveis aos benefícios de cashback ou zero comissão.' },
  { q: 'As viagens precisam ser realizadas em 12 meses?', a: 'As viagens precisam ser reservadas no período de 12 meses, mas podem ser realizadas depois — o suporte necessário permanece.' },
  { q: 'Quais viagens estão incluídas?', a: 'Todas as viagens que você realizar no período estão incluídas, inclusive viagens curtas e de fim de semana.' },
  { q: 'Preciso reservar tudo pela Trip Evolved?', a: 'Todos os trechos da viagem precisam ser reservados através da Trip Evolved para serem elegíveis à política sem comissões. Você terá transparência e clareza nos valores da sua viagem, sabendo exatamente quanto você NÃO vai pagar porque não somos comissionados.' },
  { q: 'Como funciona a garantia?', a: 'Você vai receber ao menos o valor do Círculo Evolved (R$6.700,00) de volta em cashback ou descontos devido à ausência de comissões. Se isso não acontecer, ao final dos 12 meses, te devolvemos a diferença.' },
  { q: 'Vocês só trabalham com viagens de lazer?', a: 'Sim! Nossa expertise é em viagens de lazer e vamos cuidar de cada detalhe para que sua viagem seja única e especial.' },
]

export default function CirculoEvolvedPage() {
  const router = useRouter()
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-secondary-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/80 to-secondary-500" aria-hidden />
        <div className="relative w-full max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="font-baloo text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Viajar bem também significa investir melhor
          </h1>
          <p className="font-comfortaa text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Um pagamento anual te dá acesso a curadoria única e valores sem comissão para suas viagens — que você não encontra em outro lugar.
          </p>
          <button
            type="button"
            onClick={() => scrollTo('para-quem')}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all shadow-lg hover:shadow-accent-500/30"
          >
            Quero saber mais
          </button>
        </div>
      </section>

      {/* Dois grandes problemas */}
      <section className="scroll-mt-20 py-16 md:py-24 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-10 md:mb-12 text-center">
            Por que pagar mais caro para construir a viagem sozinho?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-accent-300 rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-3">
                Aquilo que você não vê: comissões e taxas escondidas
              </h3>
              <p className="font-comfortaa text-secondary-700 leading-relaxed">
                Os preços que você vê online tem comissões embutidas - você vai pagar mais caro. Você não sabe o que está pagando e porque.
              </p>
            </div>
            <div className="bg-accent-300 rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-3">
                A indecisão: existem opções demais para você escolher sozinho
              </h3>
              <p className="font-comfortaa text-secondary-700 leading-relaxed">
                São tantas opções de destinos, hotéis e experiências que fica difícil decidir. Nós resolvemos: selecionamos o que faz sentido para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é o Círculo Evolved */}
      <section
        id="para-quem"
        className="scroll-mt-20 py-16 md:py-24 bg-secondary-50"
      >
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Para quem é o Círculo Evolved
              </h2>
              <ul className="space-y-4 mb-10">
                {PARA_QUEM_ITEMS.map((item, i) => (
                  <li key={i} className="flex gap-4 font-comfortaa text-secondary-700 items-start">
                    <Image
                      src="/assets/icons/icon-check-gold.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="shrink-0 mt-0.5 w-7 h-7"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/app/checkout/circulo-evolved"
                className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Contratar o Círculo Evolved
              </Link>
            </div>
            <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/consultoria/yosemite-trail.png"
                alt="Paisagem de trilha em Yosemite — experiências únicas para quem investe em viagem"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 benefit cards — CTAs scroll to sections below */}
      <section className="scroll-mt-20 py-16 md:py-24 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-10 text-center">
            O que você recebe no Círculo Evolved
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {BENEFIT_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-secondary-50 rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm flex flex-col"
              >
                <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900 mb-3">
                  {card.title}
                </h3>
                <p className="font-comfortaa text-secondary-700 mb-6 flex-1">
                  {card.description}
                </p>
                <button
                  type="button"
                  onClick={() => scrollTo(card.id)}
                  className="font-baloo text-accent-600 font-semibold hover:text-accent-700 transition-colors text-left"
                >
                  Saiba mais →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curadoria */}
      <section
        id="curadoria"
        className="scroll-mt-20 py-16 md:py-24 bg-secondary-50"
      >
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            Curadoria
          </h2>
          <p className="font-comfortaa text-lg text-secondary-700 mb-12 leading-relaxed max-w-4xl">
            Cada hospedagem, companhia de cruzeiro, destino e experiência passa por um rigoroso e profundo estudo, garantindo a qualidade e, <span className="text-accent-600 font-semibold">mais importante</span>, para quem a experiência se encaixa melhor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[320px] md:h-[360px]">
                <Image
                  src="/assets/consultoria/cruzeiros-unicos/destinos.jpg"
                  alt="Destinos paradisíacos em Cruzeiro da Explora Journeys"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Os melhores cruzeiros do mundo
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[320px] md:h-[360px]">
                <Image
                  src="/assets/consultoria/para-relaxar/aruba-jantar.jpg"
                  alt="Jantar romântico ao pôr do sol em Aruba"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Jantares românticos ao pôr do sol
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[320px] md:h-[360px]">
                <Image
                  src="/assets/consultoria/para-relaxar/redlane-spa.jpg"
                  alt="Tratamento de spa nas Bahamas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                  <p className="text-white font-comfortaa text-lg">
                    Tratamentos de spa no Caribe
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/app/checkout/circulo-evolved"
            className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero contratar
          </Link>
        </div>
      </section>

      {/* Travel Designer Dedicado */}
      <section
        id="travel-designer"
        className="scroll-mt-20 py-16 md:py-24 bg-white"
      >
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-10 md:mb-12">
            Especialista de viagens dedicado a você
          </h2>
          <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/consultoria/travel-designer.png"
                alt="Planejamento de viagem — parceiro estratégico ao seu lado"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div>
              <p className="font-comfortaa text-lg text-secondary-700 mb-10 leading-relaxed">
                Cada viagem conta com o seu parceiro estratégico, um especialista que estará ao seu lado, entendendo e construindo sua viagem.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mb-10">
                <div className="flex flex-col items-center text-center">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 text-white font-baloo text-xl font-bold mb-4">1</span>
                  <p className="font-comfortaa text-secondary-700">
                    Você nos conta sua ideia e datas de viagem
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 text-white font-baloo text-xl font-bold mb-4">2</span>
                  <p className="font-comfortaa text-secondary-700">
                    Construímos a proposta de viagem e ajustamos até a perfeição
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 text-white font-baloo text-xl font-bold mb-4">3</span>
                  <p className="font-comfortaa text-secondary-700">
                    Você contrata a viagem, unindo o melhor serviço ao melhor valor, sem comissões ou taxas escondidas
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/app/checkout/circulo-evolved"
                  className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                  Quero contratar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sem comissões e taxas escondidas */}
      <section
        id="sem-comissoes"
        className="scroll-mt-20 py-16 md:py-24 bg-secondary-50"
      >
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            Sem comissões e taxas escondidas
          </h2>
          <p className="font-comfortaa text-lg text-secondary-700 mb-10 leading-relaxed">
            No modelo comissionado, você não sabe o que está pagando nem porque. Cansamos dele porque cria incentivos que não se alinham à sua viagem e ao que você precisa. Para você, isso significa valores significativamente mais baixos, sem descontos artificiais, e uma relação de confiança total conosco.
          </p>
          <div className="font-comfortaa text-secondary-700 mb-10 space-y-2">
            <p className="font-semibold text-secondary-900">Exemplo de como funciona:</p>
            <ul className="list-none space-y-1 pl-0">
              <li>R$ 58.000,00 — cruzeiro Explora Journeys de 7 noites</li>
              <li>R$ 12.500,00 — hotéis confortáveis (4*+) e bem localizados pré e pós-cruzeiro (6 noites)</li>
              <li>R$ 12.000,00 — transfers e experiências</li>
            </ul>
            <p className="font-baloo font-bold text-accent-600 text-lg mt-4">
              → R$ 7.920,00 retornam em cashback ou desconto direto
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Link
              href="/app/checkout/circulo-evolved"
              className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero contratar
            </Link>
            <p className="text-xs text-secondary-500 font-comfortaa">
              *cálculos arredondados baseados em uma viagem real para o Mediterrâneo
            </p>
          </div>
        </div>
      </section>

      {/* Preço + CTA */}
      <CirculoEvolvedSection
        id="preco"
        className="scroll-mt-20"
        showPrice
        ctaText="Contratar o Círculo Evolved"
        onCtaClick={() => router.push('/app/checkout/circulo-evolved')}
        eventSource="Circulo Evolved - Landing"
      />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-16 md:py-24 bg-secondary-50">
        <div className="w-full max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary-900 mb-10 text-center">
            Perguntas frequentes
          </h2>
          <FAQ
            questions={FAQ_ITEMS.map((item) => ({
              question: item.q,
              answer: item.a,
            }))}
          />
        </div>
      </section>
    </div>
  )
}
