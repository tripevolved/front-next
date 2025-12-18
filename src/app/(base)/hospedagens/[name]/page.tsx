import { Metadata } from 'next'
import { StaysApiClient } from '@/clients/stays'
import { StayDetail } from '@/components/stays/StayDetail'

type Props = {
  params: Promise<{ name: string }>
}

async function getStay(uniqueName: string) {
  try {
    return await StaysApiClient.getStayByUniqueName(uniqueName)
  } catch (error) {
    throw new Error(`Failed to fetch stay ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const stay = await getStay((await params).name)
    
    if (!stay) {
      return {
        title: 'Hospedagem não encontrada',
        description: 'A hospedagem que você está procurando não existe.',
      }
    }

    const imageUrl = stay.images?.[0]?.url

    return {
      title: `${stay.title}${stay.subtitle ? ` - ${stay.subtitle}` : ''}`,
      description: stay.description || `Descubra ${stay.title}, uma hospedagem incrível para sua viagem a dois.`,
      openGraph: {
        title: `${stay.title}${stay.subtitle ? ` - ${stay.subtitle}` : ''}`,
        description: stay.description || `Descubra ${stay.title}, uma hospedagem incrível para sua viagem a dois.`,
        images: imageUrl ? [imageUrl] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${stay.title}${stay.subtitle ? ` - ${stay.subtitle}` : ''}`,
        description: stay.description || `Descubra ${stay.title}, uma hospedagem incrível para sua viagem a dois.`,
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

export default async function StayPage({ params }: Props) {
  const stay = await getStay((await params).name)

  return <StayDetail stay={stay} />
}

