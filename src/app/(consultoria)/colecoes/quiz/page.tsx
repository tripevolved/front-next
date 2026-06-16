import { Suspense } from 'react'
import { CollectionQuizFlow, CollectionQuizLoadingSkeleton } from '@/components/collections-quiz'

export default function ColecoesConsultoriaPage() {
  return (
    <Suspense fallback={<CollectionQuizLoadingSkeleton />}>
      <CollectionQuizFlow />
    </Suspense>
  )
}
