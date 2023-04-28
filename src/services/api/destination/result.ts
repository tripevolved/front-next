import { ApiRequestService } from "../api-request.service";

interface TipsProps {
  title: string;
  icon: string;
  mainText: string;
  toolTip: string;
}

interface FeaturesProps {
  title: string;
  description: string;
  icon: string;
}

interface RecomendationByProps {
  name: string;
  photo: string;
  instagram: string;
  tiktok: string;
  blog: string;
  recomendationText: string;
}

interface DestinationProps {
  title: string;
  recomendationBy: RecomendationByProps;
  photos: Array<string>;
  videos: Array<string>;
  posts: Array<string>;
  features: Array<FeaturesProps>;
  tips: Array<TipsProps>;
}

export const getResult = async (destinationName: string): Promise<DestinationProps> => {
  const url = `destinos/${destinationName}`;
  return ApiRequestService.get(url).then(({ data }) => data);
};
