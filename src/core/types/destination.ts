import { Photo } from "./photo";

export interface PublicDestination {
  title: string;
  recommendedBy: PublicDestinationExpert;
  photos: Photo[];
  videos: PublicDestinationVideo[];
  posts: Post[];
  features: PublicDestinationFeature[];
  tips: PublicDestinationTip[];
  faq: PublicDestinationFaq[];
}

export interface PublicDestinationVideo {
  provider: "youtube" | "vimeo" | string;
  source: string;
}

export interface PublicDestinationFeature {
  title: string;
  description: string;
  type: string; // Lista de nomes para emojis
}

export interface PublicDestinationTip {
  type: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface PublicDestinationExpert {
  name: string;
  photo: string;
  recommendationText: string;
  social: Social[]
}

interface Social {
  name: string;
  url: string;
}

export interface PublicDestinationFaq {
  answer: string;
  icon?: string;
  question: string;
}

interface Post {
 // TODO: implement rules
}
