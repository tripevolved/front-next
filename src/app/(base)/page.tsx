import { basicFAQQuestions } from '@/components/FAQ'
import HomeContent from '@/components/HomeContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trip Evolved - Viaje com valores sem comissões',
  description: 'Acesse tarifas exclusivas de hotéis escolhidos a dedo com curadoria especializada. O melhor valor garantido, sem precisar descobrir qual o melhor lugar para sua jornada.',
  alternates: {
    canonical: 'https://tripevolved.com.br',
  },
}

export default function Home() {
  return <HomeContent faqQuestions={basicFAQQuestions} />
} 