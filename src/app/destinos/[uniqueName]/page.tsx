import { DestinationsApiService } from '@/clients/destinations'
import { DestinationDetail } from '@/components/destinations/DestinationDetail'

type PageProps = {
  params: Promise<{ uniqueName: string }>
}

async function getDestination(uniqueName: string) {
  try {
    return await DestinationsApiService.getDestinationByUniqueName(uniqueName)
  } catch (error) {
    throw new Error('Failed to fetch destination')
  }
}

export default async function DestinationPage({ params }: PageProps) {
  const { uniqueName } = await params
  const destination = await getDestination(uniqueName)

  return <DestinationDetail destination={destination} />
}