import { homeFAQQuestions } from '@/components/FAQ'
import HomeContent from '@/components/HomeContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trip Evolved - Hospedagens escolhidas a dedo com curadoria especializada',
  description: 'Selecionamos hospedagens a dedo e abolimos as comissões das reservas: você acessa tarifas 10 a 30% menores e não precisa perder tempo procurando a hospedagem certa.',
  alternates: {
    canonical: 'https://tripevolved.com.br',
  },
}

export default function Home() {
  return <HomeContent faqQuestions={homeFAQQuestions} />
} 