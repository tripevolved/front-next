import Button from '@/components/common/Button'
import NewsletterModal from '@/components/NewsletterModal'
import { useState } from 'react'

interface NewsletterSectionProps {
  source: string
}

export default function NewsletterSection({ source }: NewsletterSectionProps) {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false)

  return (
    <>
      <section className="py-24 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Ainda não é o momento certo?
          </h2>
          <p className="text-secondary-600 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Assine nossa newsletter para os melhores conteúdos para sua viagem.
          </p>
          <Button
            onClick={() => setIsNewsletterModalOpen(true)}
            event="pre_assinar_newsletter"
            eventOptions={{
              source: `Newsletter Section - ${source}`
            }}
            className="font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Assinar newsletter
          </Button>
        </div>
      </section>

      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        additionalMetadata={[
          {
            key: 'source',
            value: `Newsletter CTA - ${source}`,
            keyDescription: 'Fonte do lead'
          }
        ]}
      />
    </>
  )
} 