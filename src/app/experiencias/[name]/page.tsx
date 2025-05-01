import { ExperienceContent } from '@/components/experiences/ExperienceContent'
import { getExperienceByName } from '@/core/types/experiences'
import Link from 'next/link'
import { use } from 'react'

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
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = use(params)
  const experience = getExperienceByName(name)

  if (!experience) {
    return <ExperienceNotFound />
  }

  return <ExperienceContent experience={experience} />
} 