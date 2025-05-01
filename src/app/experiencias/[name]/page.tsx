import { Metadata } from 'next'
import { ExperienceContent } from '@/components/experiences/ExperienceContent'
import { getExperienceByName } from '@/core/types/experiences'
import Link from 'next/link'
import { use } from 'react'

type Props = {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const experience = getExperienceByName((await params).name)
  
  if (!experience) {
    return {
      title: 'Experiência não encontrada',
      description: 'A experiência que você está procurando não existe.',
    }
  }

  return {
    title: `${experience.title} | Trip Evolved Viagens Personalizadas`,
    description: experience.description,
    openGraph: {
      title: `${experience.title} | Trip Evolved Viagens Personalizadas`,
      description: experience.description,
      images: experience.images?.[0] ? [experience.images[0]] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${experience.title} | Trip Evolved Viagens Personalizadas`,
      description: experience.description,
      images: experience.images?.[0] ? [experience.images[0]] : undefined,
    },
  }
}

function ExperienceNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-baloo font-bold text-secondary-900 mb-4">
          Experiência não encontrada
        </h1>
        <p className="text-lg text-secondary-600 mb-8">
          A experiência que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-700 transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}

export default function ExperiencePage({
  params,
}: Props) {
  const { name } = use(params)
  const experience = getExperienceByName(name)

  if (!experience) {
    return <ExperienceNotFound />
  }

  return <ExperienceContent experience={experience} />
} 