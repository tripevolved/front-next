import { Metadata } from 'next'
import { AccommodationsApiService } from '@/clients/accommodations'
import { AccommodationDetail } from '@/components/accommodation/AccommodationDetail'

type Props = {
  params: Promise<{ name: string }>
}

async function getAccommodation(uniqueName: string) {
  try {
    return await AccommodationsApiService.getAccommodationByUniqueName(uniqueName)
  } catch (error) {
    throw new Error(`Failed to fetch accommodation ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const accommodation = await getAccommodation((await params).name)
    
    if (!accommodation) {
      return {
        title: 'Hospedagem não encontrada',
        description: 'A hospedagem que você está procurando não existe.',
      }
    }

    const imageUrl = accommodation.images?.[0]?.url

    return {
      title: `${accommodation.title}${accommodation.subtitle ? ` - ${accommodation.subtitle}` : ''}`,
      description: accommodation.description || `Descubra ${accommodation.title}, uma hospedagem incrível para sua viagem a dois.`,
      openGraph: {
        title: `${accommodation.title}${accommodation.subtitle ? ` - ${accommodation.subtitle}` : ''}`,
        description: accommodation.description || `Descubra ${accommodation.title}, uma hospedagem incrível para sua viagem a dois.`,
        images: imageUrl ? [imageUrl] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${accommodation.title}${accommodation.subtitle ? ` - ${accommodation.subtitle}` : ''}`,
        description: accommodation.description || `Descubra ${accommodation.title}, uma hospedagem incrível para sua viagem a dois.`,
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
  const accommodation = await getAccommodation((await params).name)

  return <AccommodationDetail accommodation={accommodation} />
}

