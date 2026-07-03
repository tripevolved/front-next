import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Caribe sem complicação | Círculo Evolved',
  description:
    'Hospedagens escolhidas a dedo no Caribe com tarifas de atacado para casais. Curadoria para casal, 10 a 30% menos que tarifas públicas e garantia de recuperar o valor da assinatura.',
  openGraph: {
    title: 'Caribe sem complicação | Círculo Evolved',
    description:
      'Pare de perder horas comparando sites e correr o risco de escolher o hotel errado. Acesse tarifas de atacado e curadoria para casais no Caribe.',
    images: ['/assets/consultoria/caribe/hero.jpg'],
  },
}

export default function CaribeCirculoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
