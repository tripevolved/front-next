import { Metadata } from 'next'
import { getAccommodationPageSummary } from '@/services/api/server-travel-api'
import { AccommodationDetail } from '@/components/accommodation/AccommodationDetail'

type Props = {
  params: Promise<{ name: string }>
}

/** Plain text for meta tags when subtitle may contain HTML */
function plainTextForMeta(htmlOrText: string): string {
  return htmlOrText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const accommodation = await getAccommodationPageSummary((await params).name)
    
    if (!accommodation) {
      return {
        title: 'Hospedagem não encontrada',
        description: 'A hospedagem que você está procurando não existe.',
      }
    }

    const imageUrl = accommodation.images?.[0]?.url
    const metaTitle = [accommodation.title, accommodation.destination].filter(Boolean).join(' - ')
    const metaDescription =
      (accommodation.subtitle && plainTextForMeta(accommodation.subtitle)) ||
      `Hospedagem ${accommodation.title} em ${accommodation.destination}.`

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: imageUrl ? [imageUrl] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: imageUrl ? [imageUrl] : undefined,
      },
    }
  } catch (error) {
    return {
      title: 'Hospedagem não encontrada',
      description: 'A hospedagem que você está procurando não existe.',
    }
  }
}

export default async function AccommodationPage({ params }: Props) {
  const accommodation = await getAccommodationPageSummary((await params).name)

  return <AccommodationDetail accommodation={accommodation} />
}
