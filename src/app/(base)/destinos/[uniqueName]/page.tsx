import { Metadata } from 'next'
import { DestinationsApiService } from '@/clients/destinations'
import { DestinationDetail } from '@/components/destinations/DestinationDetail'

type Props = {
  params: Promise<{ uniqueName: string }>
}

async function getDestination(uniqueName: string) {
  try {
    return await DestinationsApiService.getDestinationByUniqueName(uniqueName)
  } catch (error) {
    throw new Error('Failed to fetch destination')
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const destination = await getDestination((await params).uniqueName)
    
    if (!destination) {
      return {
        title: 'Destino não encontrado',
        description: 'O destino que você está procurando não existe.',
      }
    }

    return {
      title: `${destination.title}`,
      description: destination.recommendedBy.recommendationText || `Descubra ${destination.title}, um destino incrível para sua próxima viagem.`,
      openGraph: {
        title: `${destination.title}`,
        description: destination.recommendedBy.recommendationText || `Descubra ${destination.title}, um destino incrível para sua próxima viagem.`,
        images: destination.photos?.[0]?.sources?.[0]?.url ? [destination.photos[0].sources[0].url] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${destination.title}`,
        description: destination.recommendedBy.recommendationText || `Descubra ${destination.title}, um destino incrível para sua próxima viagem.`,
        images: destination.photos?.[0]?.sources?.[0]?.url ? [destination.photos[0].sources[0].url] : undefined,
      },
    }
  } catch (error) {
    return {
      title: 'Destino não encontrado',
      description: 'O destino que você está procurando não existe.',
    }
  }
}

export default async function DestinationPage({ params }: Props) {
  const destination = await getDestination((await params).uniqueName)

  return <DestinationDetail destination={destination} />
}